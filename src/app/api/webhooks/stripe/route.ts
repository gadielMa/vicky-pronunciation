import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { getStripe } from "@/lib/stripe/client";
import { createAdminClient } from "@/lib/supabase/admin";
import type Stripe from "stripe";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Invalid signature";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  const supabase = createAdminClient();

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.client_reference_id;
      const subscriptionId = session.subscription as string;
      const customerId = session.customer as string;

      if (!userId || !subscriptionId) break;

      // Update stripe_customer_id
      await supabase
        .from("profiles")
        .update({ stripe_customer_id: customerId })
        .eq("id", userId);

      // Fetch subscription details from Stripe
      const sub = await getStripe().subscriptions.retrieve(subscriptionId);
      const subData = sub as unknown as Record<string, unknown>;
      const periodStart = subData.current_period_start as number;
      const periodEnd = subData.current_period_end as number;

      await supabase.from("subscriptions").upsert(
        {
          user_id: userId,
          stripe_subscription_id: subscriptionId,
          stripe_price_id: sub.items.data[0].price.id,
          status: sub.status as string,
          plan_name:
            sub.items.data[0].price.recurring?.interval === "year"
              ? "yearly"
              : "monthly",
          current_period_start: new Date(periodStart * 1000).toISOString(),
          current_period_end: new Date(periodEnd * 1000).toISOString(),
        },
        { onConflict: "stripe_subscription_id" }
      );
      break;
    }

    case "customer.subscription.updated": {
      const sub = event.data.object as Stripe.Subscription;
      const subData = sub as unknown as Record<string, unknown>;
      const periodStart = subData.current_period_start as number;
      const periodEnd = subData.current_period_end as number;

      await supabase
        .from("subscriptions")
        .update({
          status: sub.status as string,
          current_period_start: new Date(periodStart * 1000).toISOString(),
          current_period_end: new Date(periodEnd * 1000).toISOString(),
          cancel_at_period_end: sub.cancel_at_period_end,
          canceled_at: sub.canceled_at
            ? new Date(sub.canceled_at * 1000).toISOString()
            : null,
        })
        .eq("stripe_subscription_id", sub.id);
      break;
    }

    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription;
      await supabase
        .from("subscriptions")
        .update({ status: "canceled" })
        .eq("stripe_subscription_id", sub.id);
      break;
    }

    case "invoice.payment_failed": {
      const invoice = event.data.object as Stripe.Invoice;
      const invoiceData = invoice as unknown as Record<string, unknown>;
      const invoiceSubscription = invoiceData.subscription as string | null;
      if (invoiceSubscription) {
        await supabase
          .from("subscriptions")
          .update({ status: "past_due" })
          .eq("stripe_subscription_id", invoiceSubscription);
      }
      break;
    }
  }

  return NextResponse.json({ received: true });
}
