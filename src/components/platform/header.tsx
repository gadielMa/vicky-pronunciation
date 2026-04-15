"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useUser } from "@/hooks/use-user";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut, Settings, Shield } from "lucide-react";

export function Header() {
  const { profile, isAdmin } = useUser();
  const router = useRouter();
  const supabase = createClient();

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="flex h-16 items-center justify-between px-6">
        <Link href="/dashboard" className="text-xl font-bold text-gray-900">
          Vicky Pronunciation
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">
                {profile?.full_name || profile?.email || "Account"}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => router.push("/account")}>
              <Settings className="mr-2 h-4 w-4" />
              Account
            </DropdownMenuItem>
            {isAdmin && (
              <DropdownMenuItem onClick={() => router.push("/admin")}>
                <Shield className="mr-2 h-4 w-4" />
                Admin Panel
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
