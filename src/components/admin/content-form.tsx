"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileUpload } from "./file-upload";
import { CONTENT_TYPES, CONTENT_TYPE_LABELS } from "@/lib/constants";
import { toast } from "sonner";
import type { Section, Category, ContentItem, ContentType } from "@/types/database";

type ContentFormProps = {
  sections: Section[];
  categories: Category[];
  initialData?: ContentItem;
};

const ACCEPT_MAP: Record<string, string> = {
  video: ".mp4,.webm,.mov",
  storytelling_video: ".mp4,.webm,.mov",
  event_replay: ".mp4,.webm,.mov",
  audio: ".mp3,.m4a,.wav,.ogg",
  pdf: ".pdf",
  downloadable_game: ".zip,.rar",
  guided_activity: ".zip,.pdf",
};

const BUCKET_MAP: Record<string, string> = {
  video: "videos",
  storytelling_video: "videos",
  event_replay: "videos",
  audio: "audio",
  pdf: "documents",
  downloadable_game: "downloads",
  guided_activity: "downloads",
};

const MAX_SIZE_MAP: Record<string, number> = {
  video: 500,
  storytelling_video: 500,
  event_replay: 500,
  audio: 100,
  pdf: 50,
  downloadable_game: 200,
  guided_activity: 200,
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function ContentForm({
  sections,
  categories,
  initialData,
}: ContentFormProps) {
  const router = useRouter();
  const isEditing = !!initialData;

  const [sectionId, setSectionId] = useState(
    initialData
      ? categories.find((c) => c.id === initialData.category_id)?.section_id ?? ""
      : ""
  );
  const [categoryId, setCategoryId] = useState(initialData?.category_id ?? "");
  const [contentType, setContentType] = useState<ContentType>(
    initialData?.content_type ?? "video"
  );
  const [title, setTitle] = useState(initialData?.title ?? "");
  const [slug, setSlug] = useState(initialData?.slug ?? "");
  const [description, setDescription] = useState(
    initialData?.description ?? ""
  );
  const [fileUrl, setFileUrl] = useState(initialData?.file_url ?? "");
  const [thumbnailUrl, setThumbnailUrl] = useState(
    initialData?.thumbnail_url ?? ""
  );
  const [durationMinutes, setDurationMinutes] = useState(
    initialData?.duration_seconds
      ? String(Math.floor(initialData.duration_seconds / 60))
      : ""
  );
  const [durationSeconds, setDurationSeconds] = useState(
    initialData?.duration_seconds
      ? String(initialData.duration_seconds % 60)
      : ""
  );
  const [isFree, setIsFree] = useState(initialData?.is_free ?? false);
  const [isPublished, setIsPublished] = useState(
    initialData?.is_published ?? false
  );
  const [displayOrder, setDisplayOrder] = useState(
    String(initialData?.display_order ?? 0)
  );
  const [saving, setSaving] = useState(false);

  // Auto-generate slug from title
  useEffect(() => {
    if (!isEditing) {
      setSlug(slugify(title));
    }
  }, [title, isEditing]);

  // Filter categories by selected section
  const filteredCategories = categories.filter(
    (c) => c.section_id === sectionId
  );

  // Reset category when section changes
  useEffect(() => {
    if (!filteredCategories.find((c) => c.id === categoryId)) {
      setCategoryId("");
    }
  }, [sectionId, filteredCategories, categoryId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const totalSeconds =
      (parseInt(durationMinutes || "0") * 60) +
      parseInt(durationSeconds || "0");

    const body = {
      category_id: categoryId,
      title,
      slug,
      description: description || null,
      content_type: contentType,
      file_url: fileUrl || null,
      thumbnail_url: thumbnailUrl || null,
      duration_seconds: totalSeconds || null,
      is_free: isFree,
      is_published: isPublished,
      display_order: parseInt(displayOrder) || 0,
      published_at: isPublished ? new Date().toISOString() : null,
    };

    const url = isEditing
      ? `/api/content/${initialData.id}`
      : "/api/content";
    const method = isEditing ? "PATCH" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      toast.success(isEditing ? "Content updated" : "Content created");
      router.push("/admin/content");
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      toast.error(data.error || "Something went wrong");
    }

    setSaving(false);
  }

  const uploadPath = sectionId && categoryId
    ? `${sections.find((s) => s.id === sectionId)?.slug}/${filteredCategories.find((c) => c.id === categoryId)?.slug}`
    : "temp";

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      {/* Section */}
      <div className="space-y-2">
        <Label>Section</Label>
        <Select value={sectionId} onValueChange={setSectionId}>
          <SelectTrigger>
            <SelectValue placeholder="Select section" />
          </SelectTrigger>
          <SelectContent>
            {sections.map((s) => (
              <SelectItem key={s.id} value={s.id}>
                {s.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Category */}
      <div className="space-y-2">
        <Label>Category</Label>
        <Select
          value={categoryId}
          onValueChange={setCategoryId}
          disabled={!sectionId}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {filteredCategories.map((c) => (
              <SelectItem key={c.id} value={c.id}>
                {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Content Type */}
      <div className="space-y-2">
        <Label>Content Type</Label>
        <Select
          value={contentType}
          onValueChange={(v) => setContentType(v as ContentType)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {CONTENT_TYPES.map((t) => (
              <SelectItem key={t} value={t}>
                {CONTENT_TYPE_LABELS[t]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Lesson title"
          required
        />
      </div>

      {/* Slug */}
      <div className="space-y-2">
        <Label htmlFor="slug">Slug</Label>
        <Input
          id="slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="url-friendly-name"
          required
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Brief description of the content"
          rows={3}
        />
      </div>

      {/* Thumbnail Upload */}
      <FileUpload
        bucket="thumbnails"
        path={uploadPath}
        accept=".jpg,.jpeg,.png,.webp"
        maxSizeMB={5}
        onUploadComplete={setThumbnailUrl}
        label="Thumbnail image"
      />

      {/* Main File Upload */}
      <FileUpload
        bucket={BUCKET_MAP[contentType] ?? "documents"}
        path={uploadPath}
        accept={ACCEPT_MAP[contentType]}
        maxSizeMB={MAX_SIZE_MAP[contentType] ?? 100}
        onUploadComplete={setFileUrl}
        label="Main file"
      />

      {/* Duration (for video/audio) */}
      {["video", "audio", "storytelling_video", "event_replay"].includes(
        contentType
      ) && (
        <div className="space-y-2">
          <Label>Duration</Label>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              min="0"
              value={durationMinutes}
              onChange={(e) => setDurationMinutes(e.target.value)}
              placeholder="min"
              className="w-20"
            />
            <span className="text-sm text-gray-500">min</span>
            <Input
              type="number"
              min="0"
              max="59"
              value={durationSeconds}
              onChange={(e) => setDurationSeconds(e.target.value)}
              placeholder="sec"
              className="w-20"
            />
            <span className="text-sm text-gray-500">sec</span>
          </div>
        </div>
      )}

      {/* Display Order */}
      <div className="space-y-2">
        <Label htmlFor="order">Display Order</Label>
        <Input
          id="order"
          type="number"
          min="0"
          value={displayOrder}
          onChange={(e) => setDisplayOrder(e.target.value)}
          className="w-24"
        />
      </div>

      {/* Toggles */}
      <div className="flex gap-6">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isFree}
            onChange={(e) => setIsFree(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300"
          />
          <span className="text-sm">Free preview</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300"
          />
          <span className="text-sm">Published</span>
        </label>
      </div>

      {/* Submit */}
      <div className="flex gap-4 pt-4">
        <Button type="submit" disabled={saving || !categoryId}>
          {saving
            ? "Saving..."
            : isEditing
              ? "Update content"
              : "Create content"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/content")}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
