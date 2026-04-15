import { Hero } from "@/components/landing/hero";
import { SectionPreview } from "@/components/landing/section-preview";
import { PricingCards } from "@/components/landing/pricing-cards";
import { Footer } from "@/components/landing/footer";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
          <span className="text-xl font-bold text-gray-900">
            Vicky Pronunciation
          </span>
          <div className="flex items-center gap-4">
            <a
              href="/login"
              className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              Sign in
            </a>
            <a
              href="/register"
              className="rounded-md bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-700"
            >
              Get started
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <Hero />

      {/* Sections Preview */}
      <section id="sections" className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Two paths, one platform
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Choose the experience that fits you best.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-lg gap-8 sm:grid-cols-2 lg:max-w-4xl">
            <SectionPreview
              title="Live Argentina"
              subtitle="For Adults"
              description="Dive into Argentine culture, master pronunciation, and prepare for your next trip to Buenos Aires."
              categories={[
                "Pronunciation",
                "Culture & Lifestyle",
                "Podcasts & Audio",
                "Conversation",
                "Travel to Buenos Aires",
                "Tango & Experiences",
              ]}
              gradient="bg-gradient-to-br from-rose-600 to-rose-800"
              icon="🇦🇷"
              href="/register"
            />
            <SectionPreview
              title="Grow Bilingual"
              subtitle="For Families"
              description="Raise bilingual kids with fun stories, games and activities the whole family can enjoy."
              categories={[
                "Kids 3-5",
                "Kids 6-10",
                "Parent + Child",
                "Games & Activities",
                "Stories",
                "Nanny Resources",
              ]}
              gradient="bg-gradient-to-br from-sky-600 to-sky-800"
              icon="👨‍👩‍👧‍👦"
              href="/register"
            />
          </div>
        </div>
      </section>

      {/* Pricing */}
      <PricingCards />

      {/* Footer */}
      <Footer />
    </div>
  );
}
