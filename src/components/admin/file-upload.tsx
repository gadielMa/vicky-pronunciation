"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X, CheckCircle } from "lucide-react";

type FileUploadProps = {
  bucket: string;
  path: string;
  accept?: string;
  maxSizeMB?: number;
  onUploadComplete: (storagePath: string) => void;
  label?: string;
};

export function FileUpload({
  bucket,
  path,
  accept,
  maxSizeMB = 500,
  onUploadComplete,
  label = "Upload file",
}: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [uploaded, setUploaded] = useState(false);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile && droppedFile.size <= maxSizeMB * 1024 * 1024) {
        setFile(droppedFile);
        setError(null);
        setUploaded(false);
      } else {
        setError(`File too large. Maximum size: ${maxSizeMB}MB`);
      }
    },
    [maxSizeMB]
  );

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      if (selected.size > maxSizeMB * 1024 * 1024) {
        setError(`File too large. Maximum size: ${maxSizeMB}MB`);
        return;
      }
      setFile(selected);
      setError(null);
      setUploaded(false);
    }
  };

  async function handleUpload() {
    if (!file) return;

    setUploading(true);
    setProgress(0);
    setError(null);

    try {
      const filePath = `${path}/${file.name}`;

      // Get signed upload URL
      const res = await fetch("/api/upload/signed-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bucket, filePath, contentType: file.type }),
      });

      if (!res.ok) throw new Error("Failed to get upload URL");

      const { signedUrl, token } = await res.json();

      // Upload directly to Supabase Storage
      const xhr = new XMLHttpRequest();
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          setProgress(Math.round((e.loaded / e.total) * 100));
        }
      };

      await new Promise<void>((resolve, reject) => {
        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve();
          } else {
            reject(new Error(`Upload failed with status ${xhr.status}`));
          }
        };
        xhr.onerror = () => reject(new Error("Upload failed"));
        xhr.open("PUT", signedUrl);
        xhr.setRequestHeader("Content-Type", file.type);
        if (token) {
          xhr.setRequestHeader("x-upsert", "true");
        }
        xhr.send(file);
      });

      setUploaded(true);
      onUploadComplete(filePath);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium">{label}</label>
      <div
        className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors hover:border-gray-400"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        {uploaded ? (
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle className="h-5 w-5" />
            <span className="text-sm font-medium">Uploaded: {file?.name}</span>
          </div>
        ) : file ? (
          <div className="w-full space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">{file.name}</span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  setFile(null);
                  setProgress(0);
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            {uploading && (
              <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full bg-rose-600 transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}
            <Button
              type="button"
              onClick={handleUpload}
              disabled={uploading}
              className="w-full"
            >
              {uploading ? `Uploading ${progress}%` : "Upload"}
            </Button>
          </div>
        ) : (
          <>
            <Upload className="mb-2 h-8 w-8 text-gray-400" />
            <p className="text-sm text-gray-500">
              Drag and drop or{" "}
              <label className="cursor-pointer text-rose-600 hover:underline">
                browse
                <input
                  type="file"
                  className="hidden"
                  accept={accept}
                  onChange={handleFileSelect}
                />
              </label>
            </p>
            <p className="mt-1 text-xs text-gray-400">
              Max {maxSizeMB}MB
            </p>
          </>
        )}
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
