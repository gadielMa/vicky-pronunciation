import Link from "next/link";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mic, Users, ArrowRight } from "lucide-react";

const sections = [
  {
    title: "Live Argentina",
    subtitle: "For Adults",
    description:
      "Culture, podcasts, conversation, travel, tango & pronunciation.",
    href: "/adults",
    icon: Mic,
    gradient: "from-rose-500 to-rose-700",
  },
  {
    title: "Grow Bilingual",
    subtitle: "For Families",
    description:
      "Stories, games, activities and resources for kids and parents.",
    href: "/families",
    icon: Users,
    gradient: "from-sky-500 to-sky-700",
  },
];

export function SectionSelector() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {sections.map((section) => (
        <Link key={section.href} href={section.href} className="group">
          <Card className="h-full overflow-hidden transition-shadow hover:shadow-lg">
            <div
              className={`bg-gradient-to-br ${section.gradient} p-6 text-white`}
            >
              <section.icon className="h-10 w-10" />
              <h3 className="mt-3 text-2xl font-bold">{section.title}</h3>
              <p className="text-sm opacity-90">{section.subtitle}</p>
            </div>
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-base">
                Explore
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </CardTitle>
              <CardDescription>{section.description}</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  );
}
