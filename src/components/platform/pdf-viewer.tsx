"use client";

import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";

type PdfViewerProps = {
  url: string;
  title: string;
};

export function PdfViewer({ url, title }: PdfViewerProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-gray-500" />
          <span className="font-medium">{title}</span>
        </div>
        <Button asChild variant="outline" size="sm">
          <a href={url} download target="_blank" rel="noopener noreferrer">
            <Download className="mr-2 h-4 w-4" />
            Download
          </a>
        </Button>
      </div>
      <iframe
        src={url}
        className="h-[600px] w-full rounded-lg border"
        title={title}
      />
    </div>
  );
}
