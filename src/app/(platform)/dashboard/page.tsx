import { SectionSelector } from "@/components/platform/section-selector";

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back
        </h1>
        <p className="mt-2 text-gray-600">
          Choose a section to start learning.
        </p>
      </div>
      <SectionSelector />
    </div>
  );
}
