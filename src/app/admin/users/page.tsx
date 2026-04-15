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

export default async function AdminUsersPage() {
  const supabase = await createClient();

  const { data: profiles } = await supabase
    .from("profiles")
    .select("*, subscriptions(status)")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold text-gray-900">Users</h1>

      <div className="rounded-lg border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Subscription</TableHead>
              <TableHead>Joined</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(profiles ?? []).map((p: Record<string, unknown>) => {
              const subs = p.subscriptions as Record<string, unknown>[] | null;
              const activeSub = subs?.find(
                (s) => s.status === "active" || s.status === "trialing"
              );
              return (
                <TableRow key={p.id as string}>
                  <TableCell className="font-medium">
                    {(p.full_name as string) || "-"}
                  </TableCell>
                  <TableCell>{p.email as string}</TableCell>
                  <TableCell>
                    <Badge
                      variant={p.role === "admin" ? "default" : "secondary"}
                    >
                      {p.role as string}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {activeSub ? (
                      <Badge className="bg-green-100 text-green-700">
                        Active
                      </Badge>
                    ) : (
                      <Badge variant="outline">None</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(p.created_at as string).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
