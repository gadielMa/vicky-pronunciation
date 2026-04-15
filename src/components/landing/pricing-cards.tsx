import Link from "next/link";
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

export function PricingCards() {
  return (
    <section id="pricing" className="bg-gray-50 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Simple pricing
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            One subscription, everything included.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-lg gap-8 sm:grid-cols-2 lg:max-w-2xl">
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
              <Button asChild variant="outline" className="w-full">
                <Link href="/register">Get started</Link>
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
              <p className="text-sm text-muted-foreground">
                That&apos;s only $10/month
              </p>
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
              <Button asChild className="w-full">
                <Link href="/register">Get started</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}
