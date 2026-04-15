import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ContentGrid } from "@/components/platform/content-grid";

type Props = {
  params: Promise<{ categorySlug: string }>;
};

export default async function FamiliesCategoryPage({ params }: Props) {
  const { categorySlug } = await params;
  const supabase = await createClient();

  const { data: section } = await supabase
    .from("sections")
    .select("id")
    .eq("slug", "families")
    .single();

  if (!section) return notFound();

  const { data: category } = await supabase
    .from("categories")
    .select("*")
    .eq("section_id", section.id)
    .eq("slug", categorySlug)
    .single();

  if (!category) return notFound();

  const { data: items } = await supabase
    .from("content_items")
    .select("*")
    .eq("category_id", category.id)
    .eq("is_published", true)
    .order("display_order");

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let isSubscribed = false;
  if (user) {
    const { data: sub } = await supabase
      .from("subscriptions")
      .select("status")
      .eq("user_id", user.id)
      .in("status", ["active", "trialing"])
      .limit(1)
      .single();
    isSubscribed = !!sub;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{category.name}</h1>
        {category.description && (
          <p className="mt-2 text-gray-600">{category.description}</p>
        )}
      </div>
      <ContentGrid
        items={items ?? []}
        sectionSlug="families"
        isSubscribed={isSubscribed}
      />
    </div>
  );
}
