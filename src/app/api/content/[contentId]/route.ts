import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

type Context = {
  params: Promise<{ contentId: string }>;
};

export async function GET(_request: NextRequest, context: Context) {
  const { contentId } = await context.params;
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("content_items")
    .select("*, categories(name, slug, sections(name, slug))")
    .eq("id", contentId)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(data);
}

export async function PATCH(request: NextRequest, context: Context) {
  const { contentId } = await context.params;
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

  const { data, error } = await supabase
    .from("content_items")
    .update(body)
    .eq("id", contentId)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(data);
}

export async function DELETE(_request: NextRequest, context: Context) {
  const { contentId } = await context.params;
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

  const { error } = await supabase
    .from("content_items")
    .delete()
    .eq("id", contentId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
