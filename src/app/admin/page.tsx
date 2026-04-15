import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileVideo, Users, FolderOpen, CreditCard } from "lucide-react";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const [contentResult, usersResult, categoriesResult, subsResult] =
    await Promise.all([
      supabase
        .from("content_items")
        .select("id", { count: "exact", head: true }),
      supabase.from("profiles").select("id", { count: "exact", head: true }),
      supabase
        .from("categories")
        .select("id", { count: "exact", head: true }),
      supabase
        .from("subscriptions")
        .select("id", { count: "exact", head: true })
        .in("status", ["active", "trialing"]),
    ]);

  const stats = [
    {
      label: "Total Content",
      value: contentResult.count ?? 0,
      icon: FileVideo,
    },
    { label: "Users", value: usersResult.count ?? 0, icon: Users },
    {
      label: "Categories",
      value: categoriesResult.count ?? 0,
      icon: FolderOpen,
    },
    {
      label: "Active Subscribers",
      value: subsResult.count ?? 0,
      icon: CreditCard,
    },
  ];

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold text-gray-900">Dashboard</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
