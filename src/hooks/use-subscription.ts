"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Subscription } from "@/types/database";

export function useSubscription(userId: string | undefined) {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    async function fetchSubscription() {
      const { data } = await supabase
        .from("subscriptions")
        .select("*")
        .eq("user_id", userId)
        .in("status", ["active", "trialing"])
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      setSubscription(data);
      setLoading(false);
    }

    fetchSubscription();
  }, [userId, supabase]);

  return {
    subscription,
    loading,
    isSubscribed: !!subscription,
  };
}
