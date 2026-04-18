import Link from "next/link";
import { Card } from "@/components/ui/card";
import { ContentTypeBadge } from "./content-type-badge";
import { Lock, Play } from "lucide-react";
import type { ContentItem } from "@/types/database";

type ContentCardProps = {
  content: ContentItem;
  sectionSlug: string;
  isSubscribed: boolean;
};

export function ContentCard({
  content,
  sectionSlug,
  isSubscribed,
}: ContentCardProps) {
  const isLocked = !content.is_free && !isSubscribed;
  const href = `/${sectionSlug}/content/${content.id}`;

  return (
    <Link href={href} className="group">
      <Card className="overflow-hidden transition-shadow hover:shadow-md">
        {/* Thumbnail */}
        <div className="relative aspect-video bg-gray-100">
          {content.thumbnail_url ? (
            <img
              src={
                content.thumbnail_url.startsWith("http")
                  ? content.thumbnail_url
                  : `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/thumbnails/${content.thumbnail_url}`
              }
              alt={content.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
              <Play className="h-8 w-8 text-gray-400" />
            </div>
          )}
          {isLocked && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <Lock className="h-6 w-6 text-white" />
            </div>
          )}
          <div className="absolute bottom-2 left-2">
            <ContentTypeBadge type={content.content_type} />
          </div>
          {content.duration_seconds && (
            <span className="absolute bottom-2 right-2 rounded bg-black/70 px-1.5 py-0.5 text-xs text-white">
              {Math.floor(content.duration_seconds / 60)}:
              {String(content.duration_seconds % 60).padStart(2, "0")}
            </span>
          )}
        </div>
        {/* Info */}
        <div className="p-3">
          <h3 className="line-clamp-2 text-sm font-medium text-gray-900 group-hover:text-rose-600">
            {content.title}
          </h3>
          {content.description && (
            <p className="mt-1 line-clamp-2 text-xs text-gray-500">
              {content.description}
            </p>
          )}
        </div>
      </Card>
    </Link>
  );
}
