import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Pencil } from "lucide-react";

export default async function AdminContentPage() {
  const supabase = await createClient();

  const { data: items } = await supabase
    .from("content_items")
    .select("*, categories(name, sections(name))")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Content</h1>
        <Button asChild>
          <Link href="/admin/content/new">
            <Plus className="mr-2 h-4 w-4" />
            New Content
          </Link>
        </Button>
      </div>

      <div className="rounded-lg border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Section</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-12" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {(items ?? []).length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="py-8 text-center text-muted-foreground">
                  No content yet. Click &quot;New Content&quot; to get started.
                </TableCell>
              </TableRow>
            ) : (
              (items ?? []).map((item: Record<string, unknown>) => (
                <TableRow key={item.id as string}>
                  <TableCell className="font-medium">
                    {item.title as string}
                  </TableCell>
                  <TableCell>
                    {(item.categories as Record<string, unknown>)?.sections
                      ? ((item.categories as Record<string, Record<string, unknown>>).sections.name as string)
                      : "-"}
                  </TableCell>
                  <TableCell>
                    {(item.categories as Record<string, unknown>)?.name as string ?? "-"}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{item.content_type as string}</Badge>
                  </TableCell>
                  <TableCell>
                    {item.is_published ? (
                      <Badge className="bg-green-100 text-green-700">
                        Published
                      </Badge>
                    ) : (
                      <Badge variant="secondary">Draft</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button asChild variant="ghost" size="sm">
                      <Link href={`/admin/content/${item.id}/edit`}>
                        <Pencil className="h-4 w-4" />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
