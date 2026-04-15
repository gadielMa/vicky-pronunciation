import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function SubscriptionSuccessPage() {
  return (
    <div className="mx-auto max-w-lg">
      <Card className="text-center">
        <CardHeader>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl">Welcome aboard!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            Your subscription is now active. You have full access to all content
            on the platform.
          </p>
        </CardContent>
        <CardFooter className="justify-center">
          <Button asChild>
            <Link href="/dashboard">Start exploring</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
