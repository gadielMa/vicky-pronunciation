import { Badge } from "@/components/ui/badge";
import {
  Video,
  Headphones,
  FileText,
  Play,
  Gamepad2,
  BookOpen,
  type LucideIcon,
} from "lucide-react";
import type { ContentType } from "@/types/database";

const config: Record<ContentType, { label: string; icon: LucideIcon; variant: "default" | "secondary" | "outline" }> = {
  video: { label: "Video", icon: Video, variant: "default" },
  audio: { label: "Audio", icon: Headphones, variant: "secondary" },
  pdf: { label: "PDF", icon: FileText, variant: "outline" },
  event_replay: { label: "Replay", icon: Play, variant: "secondary" },
  downloadable_game: { label: "Game", icon: Gamepad2, variant: "default" },
  guided_activity: { label: "Activity", icon: BookOpen, variant: "secondary" },
  storytelling_video: { label: "Story", icon: Video, variant: "default" },
};

export function ContentTypeBadge({ type }: { type: ContentType }) {
  const { label, icon: Icon, variant } = config[type];
  return (
    <Badge variant={variant} className="gap-1">
      <Icon className="h-3 w-3" />
      {label}
    </Badge>
  );
}
