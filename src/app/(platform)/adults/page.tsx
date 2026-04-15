import { createClient } from "@/lib/supabase/server";
import { ContentRow } from "@/components/platform/content-row";

export default async function AdultsPage() {
  const supabase = await createClient();

  // Fetch categories for adults section
  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .eq("section_id", (
      await supabase
        .from("sections")
        .select("id")
        .eq("slug", "adults")
        .single()
    ).data?.id)
    .order("display_order");

  // Fetch content per category
  const categoriesWithContent = await Promise.all(
    (categories ?? []).map(async (category) => {
      const { data: items } = await supabase
        .from("content_items")
        .select("*")
        .eq("category_id", category.id)
        .eq("is_published", true)
        .order("display_order")
        .limit(10);
      return { ...category, items: items ?? [] };
    })
  );

  // Check subscription
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
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Live Argentina</h1>
        <p className="mt-2 text-gray-600">
          Culture, podcasts, conversation, travel, tango &amp; pronunciation for
          adults.
        </p>
      </div>

      {categoriesWithContent.map((category) => (
        <ContentRow
          key={category.id}
          title={category.name}
          href={`/adults/${category.slug}`}
          items={category.items}
          sectionSlug="adults"
          isSubscribed={isSubscribed}
        />
      ))}

      {categoriesWithContent.every((c) => c.items.length === 0) && (
        <div className="flex h-48 items-center justify-center rounded-lg border border-dashed">
          <p className="text-muted-foreground">
            Content coming soon. Stay tuned!
          </p>
        </div>
      )}
    </div>
  );
}
