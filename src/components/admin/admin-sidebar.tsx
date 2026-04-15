"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FileVideo,
  FolderOpen,
  Users,
  ArrowLeft,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Content", href: "/admin/content", icon: FileVideo },
  { label: "Categories", href: "/admin/categories", icon: FolderOpen },
  { label: "Users", href: "/admin/users", icon: Users },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 border-r bg-gray-900 text-white">
      <div className="p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
          Admin Panel
        </p>
      </div>
      <nav className="flex flex-col gap-1 px-3">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/admin" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-gray-800 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto border-t border-gray-800 p-3">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-400 hover:bg-gray-800 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to platform
        </Link>
      </div>
    </aside>
  );
}
