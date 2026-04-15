import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-rose-50 via-white to-sky-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Learn Argentine Spanish.{" "}
            <span className="text-rose-600">Live the culture.</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Whether you&apos;re an adult discovering Buenos Aires or a family
            raising bilingual kids, we have the content, community and culture
            you need.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button asChild size="lg">
              <Link href="/register">Get started</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="#sections">Explore content</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
