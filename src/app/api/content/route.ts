import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { searchParams } = new URL(request.url);

  let query = supabase
    .from("content_items")
    .select("*, categories(name, slug, sections(name, slug))");

  const categoryId = searchParams.get("category_id");
  if (categoryId) query = query.eq("category_id", categoryId);

  const published = searchParams.get("published");
  if (published === "true") query = query.eq("is_published", true);

  const { data, error } = await query.order("display_order");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();

  // Verify admin
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await request.json();
  body.created_by = user.id;

  const { data, error } = await supabase
    .from("content_items")
    .insert(body)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(data, { status: 201 });
}
