import { createClient } from "@/lib/supabase/server";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default async function AdminCategoriesPage() {
  const supabase = await createClient();

  const { data: categories } = await supabase
    .from("categories")
    .select("*, sections(name)")
    .order("display_order");

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold text-gray-900">Categories</h1>

      <div className="rounded-lg border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Section</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Order</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(categories ?? []).map((cat: Record<string, unknown>) => (
              <TableRow key={cat.id as string}>
                <TableCell className="font-medium">
                  {cat.name as string}
                </TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {(cat.sections as Record<string, unknown>)?.name as string}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {cat.slug as string}
                </TableCell>
                <TableCell>{cat.display_order as number}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
