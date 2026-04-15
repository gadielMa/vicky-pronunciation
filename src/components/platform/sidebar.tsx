"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Home,
  Mic,
  Users,
  CreditCard,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: Home },
  { label: "Live Argentina", href: "/adults", icon: Mic },
  { label: "Grow Bilingual", href: "/families", icon: Users },
  { label: "Subscription", href: "/subscription", icon: CreditCard },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 border-r bg-gray-50 lg:block">
      <nav className="flex flex-col gap-1 p-4">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:bg-white hover:text-gray-900"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
