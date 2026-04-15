import { createClient } from "@/lib/supabase/server";
import { ContentForm } from "@/components/admin/content-form";

export default async function NewContentPage() {
  const supabase = await createClient();

  const [sectionsResult, categoriesResult] = await Promise.all([
    supabase.from("sections").select("*").order("display_order"),
    supabase.from("categories").select("*").order("display_order"),
  ]);

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold text-gray-900">New Content</h1>
      <ContentForm
        sections={sectionsResult.data ?? []}
        categories={categoriesResult.data ?? []}
      />
    </div>
  );
}
