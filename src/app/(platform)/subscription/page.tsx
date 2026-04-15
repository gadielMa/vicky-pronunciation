"use client";

import { useState } from "react";
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
import { Check } from "lucide-react";

const features = [
  "Full access to Live Argentina (Adults)",
  "Full access to Grow Bilingual (Families)",
  "New content every week",
  "Downloadable resources & games",
  "Audio & video lessons",
  "Cancel anytime",
];

export default function SubscriptionPage() {
  const { user } = useUser();
  const { subscription, isSubscribed } = useSubscription(user?.id);
  const [loading, setLoading] = useState<string | null>(null);

  async function handleSubscribe(plan: "monthly" | "yearly") {
    setLoading(plan);
    const res = await fetch("/api/stripe/create-checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan }),
    });
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    }
    setLoading(null);
  }

  async function handleManage() {
    setLoading("manage");
    const res = await fetch("/api/stripe/create-portal", { method: "POST" });
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    }
    setLoading(null);
  }

  if (isSubscribed) {
    return (
      <div className="mx-auto max-w-lg">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">
          Your Subscription
        </h1>
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <CardTitle>
                {subscription?.plan_name === "yearly" ? "Yearly" : "Monthly"}{" "}
                Plan
              </CardTitle>
              <Badge className="bg-green-100 text-green-700">Active</Badge>
            </div>
            <CardDescription>
              {subscription?.current_period_end && (
                <>
                  Renews{" "}
                  {new Date(
                    subscription.current_period_end
                  ).toLocaleDateString()}
                </>
              )}
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button
              onClick={handleManage}
              variant="outline"
              disabled={loading === "manage"}
            >
              {loading === "manage" ? "Loading..." : "Manage subscription"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900">
          Choose your plan
        </h1>
        <p className="mt-2 text-gray-600">
          One subscription, full access to everything.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {/* Monthly */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly</CardTitle>
            <CardDescription>Flexible, no commitment</CardDescription>
            <div className="mt-4">
              <span className="text-4xl font-bold">$14.99</span>
              <span className="text-muted-foreground">/month</span>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                  {f}
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button
              onClick={() => handleSubscribe("monthly")}
              variant="outline"
              className="w-full"
              disabled={loading === "monthly"}
            >
              {loading === "monthly" ? "Loading..." : "Subscribe monthly"}
            </Button>
          </CardFooter>
        </Card>

        {/* Yearly */}
        <Card className="relative border-rose-200 shadow-lg">
          <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-rose-600">
            Save 33%
          </Badge>
          <CardHeader>
            <CardTitle>Yearly</CardTitle>
            <CardDescription>Best value</CardDescription>
            <div className="mt-4">
              <span className="text-4xl font-bold">$119.99</span>
              <span className="text-muted-foreground">/year</span>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                  {f}
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button
              onClick={() => handleSubscribe("yearly")}
              className="w-full"
              disabled={loading === "yearly"}
            >
              {loading === "yearly" ? "Loading..." : "Subscribe yearly"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
