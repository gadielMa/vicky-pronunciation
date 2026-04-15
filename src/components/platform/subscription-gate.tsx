import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

export function SubscriptionGate() {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed bg-gray-50 p-12 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
        <Lock className="h-8 w-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900">
        Subscribe to access this content
      </h3>
      <p className="mt-2 max-w-md text-sm text-gray-500">
        This content is available exclusively to subscribers. Get full access to
        all lessons, activities and resources.
      </p>
      <Button asChild className="mt-6">
        <Link href="/subscription">View plans</Link>
      </Button>
    </div>
  );
}
