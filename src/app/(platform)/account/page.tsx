"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useUser } from "@/hooks/use-user";
import { useSubscription } from "@/hooks/use-subscription";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function AccountPage() {
  const { user, profile } = useUser();
  const { subscription, isSubscribed } = useSubscription(user?.id);
  const [managingSubscription, setManagingSubscription] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  async function handleManageSubscription() {
    setManagingSubscription(true);
    const res = await fetch("/api/stripe/create-portal", { method: "POST" });
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    }
    setManagingSubscription(false);
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Account</h1>

      {/* Profile */}
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <p className="text-sm text-muted-foreground">Name</p>
            <p className="font-medium">{profile?.full_name || "-"}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="font-medium">{profile?.email || user?.email}</p>
          </div>
        </CardContent>
      </Card>

      {/* Subscription */}
      <Card>
        <CardHeader>
          <CardTitle>Subscription</CardTitle>
          <CardDescription>
            {isSubscribed
              ? "You have an active subscription"
              : "No active subscription"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isSubscribed && subscription ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-medium">
                  {subscription.plan_name === "yearly" ? "Yearly" : "Monthly"}{" "}
                  Plan
                </span>
                <Badge className="bg-green-100 text-green-700">Active</Badge>
              </div>
              {subscription.current_period_end && (
                <p className="text-sm text-muted-foreground">
                  Renews{" "}
                  {new Date(
                    subscription.current_period_end
                  ).toLocaleDateString()}
                </p>
              )}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Subscribe to access all content.
            </p>
          )}
        </CardContent>
        <CardFooter>
          {isSubscribed ? (
            <Button
              onClick={handleManageSubscription}
              variant="outline"
              disabled={managingSubscription}
            >
              {managingSubscription ? "Loading..." : "Manage subscription"}
            </Button>
          ) : (
            <Button onClick={() => router.push("/subscription")}>
              View plans
            </Button>
          )}
        </CardFooter>
      </Card>

      {/* Sign out */}
      <Button onClick={handleSignOut} variant="outline" className="w-full">
        Sign out
      </Button>
    </div>
  );
}
