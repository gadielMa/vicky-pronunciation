export const PLANS = {
  monthly: {
    name: "Monthly",
    priceId: process.env.STRIPE_PRICE_MONTHLY!,
    price: 14.99,
    interval: "month" as const,
  },
  yearly: {
    name: "Yearly",
    priceId: process.env.STRIPE_PRICE_YEARLY!,
    price: 119.99,
    interval: "year" as const,
    savings: "Save 33%",
  },
};
