import { ContentCard } from "./content-card";
import type { ContentItem } from "@/types/database";

type ContentGridProps = {
  items: ContentItem[];
  sectionSlug: string;
  isSubscribed: boolean;
};

export function ContentGrid({
  items,
  sectionSlug,
  isSubscribed,
}: ContentGridProps) {
  if (items.length === 0) {
    return (
      <div className="flex h-48 items-center justify-center rounded-lg border border-dashed">
        <p className="text-sm text-muted-foreground">
          No content available yet.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {items.map((item) => (
        <ContentCard
          key={item.id}
          content={item}
          sectionSlug={sectionSlug}
          isSubscribed={isSubscribed}
        />
      ))}
    </div>
  );
}
