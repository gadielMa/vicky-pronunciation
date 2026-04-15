import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ContentForm } from "@/components/admin/content-form";

type Props = {
  params: Promise<{ contentId: string }>;
};

export default async function EditContentPage({ params }: Props) {
  const { contentId } = await params;
  const supabase = await createClient();

  const [contentResult, sectionsResult, categoriesResult] = await Promise.all([
    supabase.from("content_items").select("*").eq("id", contentId).single(),
    supabase.from("sections").select("*").order("display_order"),
    supabase.from("categories").select("*").order("display_order"),
  ]);

  if (!contentResult.data) return notFound();

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold text-gray-900">Edit Content</h1>
      <ContentForm
        sections={sectionsResult.data ?? []}
        categories={categoriesResult.data ?? []}
        initialData={contentResult.data}
      />
    </div>
  );
}
