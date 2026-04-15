export const SECTIONS = {
  ADULTS: "adults",
  FAMILIES: "families",
} as const;

export const SECTION_NAMES = {
  [SECTIONS.ADULTS]: "Live Argentina",
  [SECTIONS.FAMILIES]: "Grow Bilingual",
} as const;

export const CONTENT_TYPES = [
  "video",
  "audio",
  "pdf",
  "event_replay",
  "downloadable_game",
  "guided_activity",
  "storytelling_video",
] as const;

export type ContentType = (typeof CONTENT_TYPES)[number];

export const CONTENT_TYPE_LABELS: Record<ContentType, string> = {
  video: "Video",
  audio: "Audio / Podcast",
  pdf: "PDF / Resource",
  event_replay: "Event Replay",
  downloadable_game: "Downloadable Game",
  guided_activity: "Guided Activity",
  storytelling_video: "Storytelling Video",
};

export const STORAGE_BUCKETS = {
  VIDEOS: "videos",
  AUDIO: "audio",
  DOCUMENTS: "documents",
  DOWNLOADS: "downloads",
  THUMBNAILS: "thumbnails",
  PUBLIC_ASSETS: "public-assets",
} as const;
