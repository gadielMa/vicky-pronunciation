import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type SectionPreviewProps = {
  title: string;
  subtitle: string;
  description: string;
  categories: string[];
  gradient: string;
  icon: string;
  href: string;
};

export function SectionPreview({
  title,
  subtitle,
  description,
  categories,
  gradient,
  icon,
  href,
}: SectionPreviewProps) {
  return (
    <Card className="overflow-hidden border-0 shadow-lg">
      <div className={`${gradient} px-6 py-8 text-white`}>
        <span className="text-4xl">{icon}</span>
        <h3 className="mt-4 text-2xl font-bold">{title}</h3>
        <p className="text-sm opacity-90">{subtitle}</p>
      </div>
      <CardHeader>
        <CardTitle className="text-lg">What&apos;s inside</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="mb-6 space-y-2">
          {categories.map((cat) => (
            <li key={cat} className="flex items-center gap-2 text-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
              {cat}
            </li>
          ))}
        </ul>
        <Button asChild variant="outline" className="w-full">
          <Link href={href}>Explore {title}</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
