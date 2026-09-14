import Link from "next/link";
import type { ReactNode } from "react";

export function SiteHeader({ account }: { account?: ReactNode }) {
  return (
    <nav className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-[rgba(71,67,80,0.1)] bg-[#fffdfb]/95 px-5 backdrop-blur md:px-10">
      <Link href="/" className="text-lg font-extrabold tracking-[-0.04em] text-[var(--navy)]">
        el<span className="text-[var(--purple-dark)]">Sur</span>
        <span className="ml-2 text-xs font-semibold tracking-normal text-[var(--navy-light)]">with Victoria</span>
      </Link>
      <div className="flex items-center gap-4">
        <Link href="/#sessions" className="hidden text-sm font-semibold text-[var(--navy-light)] transition hover:text-[var(--purple-dark)] sm:block">Offerings</Link>
        <Link href="/#family-app" className="hidden text-sm font-semibold text-[var(--navy-light)] transition hover:text-[var(--purple-dark)] md:block">The app</Link>
        {account ?? <Link href="/login" className="hidden text-sm font-semibold text-[var(--navy-light)] transition hover:text-[var(--purple-dark)] lg:block">Sign in</Link>}
        <Link href="/#contact" className="rounded-full bg-[var(--purple-dark)] px-4 py-2 text-sm font-bold text-white transition hover:bg-[var(--purple-darkest)]">Ask about availability</Link>
      </div>
    </nav>
  );
}

export function SiteFooter() {
  return (
    <footer className="flex flex-col justify-between gap-4 bg-[var(--navy)] px-5 py-7 text-sm text-white/60 md:flex-row md:px-10">
      <p><span className="font-extrabold text-white">elSur</span> with Victoria</p>
      <div className="flex gap-5">
        <Link href="/" className="transition hover:text-white">Home</Link>
        <Link href="/login" className="transition hover:text-white">Sign in</Link>
        <Link href="/families" className="transition hover:text-white">Family learning app</Link>
        <a href="https://www.instagram.com/induliru.tech/" target="_blank" rel="noreferrer" className="transition hover:text-white">Made by Induliru</a>
      </div>
    </footer>
  );
}
