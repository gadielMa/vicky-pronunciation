import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { VideoPlayer } from "@/components/platform/video-player";
import { AudioPlayer } from "@/components/platform/audio-player";
import { PdfViewer } from "@/components/platform/pdf-viewer";
import { SubscriptionGate } from "@/components/platform/subscription-gate";
import { ContentTypeBadge } from "@/components/platform/content-type-badge";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

type Props = {
  params: Promise<{ contentId: string }>;
};

export default async function AdultsContentPage({ params }: Props) {
  const { contentId } = await params;
  const supabase = await createClient();

  const { data: content } = await supabase
    .from("content_items")
    .select("*, categories(*, sections(*))")
    .eq("id", contentId)
    .eq("is_published", true)
    .single();

  if (!content) return notFound();

  // Check subscription
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let isSubscribed = false;
  if (user) {
    const { data: sub } = await supabase
      .from("subscriptions")
      .select("status")
      .eq("user_id", user.id)
      .in("status", ["active", "trialing"])
      .limit(1)
      .single();
    isSubscribed = !!sub;
  }

  const isLocked = !content.is_free && !isSubscribed;

  // Generate signed URL for private content
  let fileUrl = content.file_url;
  if (fileUrl && !isLocked) {
    // Determine bucket from content type
    const bucketMap: Record<string, string> = {
      video: "videos",
      storytelling_video: "videos",
      event_replay: "videos",
      audio: "audio",
      pdf: "documents",
      downloadable_game: "downloads",
      guided_activity: "downloads",
    };
    const bucket = bucketMap[content.content_type] ?? "documents";

    const { data: signedUrl } = await supabase.storage
      .from(bucket)
      .createSignedUrl(fileUrl, 3600);

    if (signedUrl) {
      fileUrl = signedUrl.signedUrl;
    }
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6">
        <ContentTypeBadge type={content.content_type} />
        <h1 className="mt-3 text-3xl font-bold text-gray-900">
          {content.title}
        </h1>
        {content.description && (
          <p className="mt-2 text-gray-600">{content.description}</p>
        )}
      </div>

      {isLocked ? (
        <SubscriptionGate />
      ) : (
        <div className="space-y-6">
          {/* Video types */}
          {["video", "storytelling_video", "event_replay"].includes(
            content.content_type
          ) &&
            fileUrl && <VideoPlayer url={fileUrl} title={content.title} />}

          {/* Audio */}
          {content.content_type === "audio" && fileUrl && (
            <AudioPlayer url={fileUrl} title={content.title} />
          )}

          {/* PDF */}
          {content.content_type === "pdf" && fileUrl && (
            <PdfViewer url={fileUrl} title={content.title} />
          )}

          {/* Downloadable content */}
          {["downloadable_game", "guided_activity"].includes(
            content.content_type
          ) &&
            fileUrl && (
              <div className="rounded-lg border bg-gray-50 p-8 text-center">
                <h3 className="mb-2 text-lg font-medium">
                  Ready to download
                </h3>
                <p className="mb-4 text-sm text-gray-500">
                  {content.file_size_bytes
                    ? `${(content.file_size_bytes / 1024 / 1024).toFixed(1)} MB`
                    : "Download available"}
                </p>
                <Button asChild>
                  <a href={fileUrl} download>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </a>
                </Button>
              </div>
            )}
        </div>
      )}
    </div>
  );
}
