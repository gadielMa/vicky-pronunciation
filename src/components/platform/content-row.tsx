import Link from "next/link";
import { ContentCard } from "./content-card";
import { ArrowRight } from "lucide-react";
import type { ContentItem } from "@/types/database";

type ContentRowProps = {
  title: string;
  href: string;
  items: ContentItem[];
  sectionSlug: string;
  isSubscribed: boolean;
};

export function ContentRow({
  title,
  href,
  items,
  sectionSlug,
  isSubscribed,
}: ContentRowProps) {
  if (items.length === 0) return null;

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        <Link
          href={href}
          className="flex items-center gap-1 text-sm text-rose-600 hover:text-rose-700"
        >
          See all
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {items.map((item) => (
          <div key={item.id} className="w-64 shrink-0">
            <ContentCard
              content={item}
              sectionSlug={sectionSlug}
              isSubscribed={isSubscribed}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
