import type { Metadata } from "next";
import { LessonExperience } from "./lesson-experience";
import { SiteFooter, SiteHeader } from "@/components/landing/site-chrome";

export const metadata: Metadata = {
  title: "Saludos Argentinos — Vicky Pronunciation",
  description:
    "A warm, calm, neuroinclusive Spanish lesson for children ages 5–8 — learn Argentinian greetings with Valentina.",
  openGraph: {
    title: "Saludos Argentinos",
    description:
      "A calming, neuroinclusive children's lesson on Argentinian greetings.",
  },
};

export default function SaludosArgentinosPage() {
  return <><SiteHeader /><LessonExperience /><SiteFooter /></>;
}
