"use client";

import { Headphones } from "lucide-react";

type AudioPlayerProps = {
  url: string;
  title: string;
};

export function AudioPlayer({ url, title }: AudioPlayerProps) {
  return (
    <div className="rounded-lg border bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="mb-6 flex items-center justify-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-rose-100">
          <Headphones className="h-10 w-10 text-rose-600" />
        </div>
      </div>
      <h3 className="mb-4 text-center text-lg font-medium">{title}</h3>
      <audio className="w-full" controls preload="metadata">
        <source src={url} />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}
