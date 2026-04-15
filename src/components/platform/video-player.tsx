"use client";

type VideoPlayerProps = {
  url: string;
  title: string;
};

export function VideoPlayer({ url, title }: VideoPlayerProps) {
  return (
    <div className="overflow-hidden rounded-lg bg-black">
      <video
        className="aspect-video w-full"
        controls
        preload="metadata"
        title={title}
      >
        <source src={url} />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
