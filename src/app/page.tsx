import Link from "next/link";
import {
  Brain,
  ChevronDown,
  Flag,
  Gamepad2,
  Heart,
  Home as HomeIcon,
  MapPin,
  Plane,
  School,
  Sparkles,
  Users,
} from "lucide-react";

export default function HomePage() {
  return (
    <div
      className="min-h-screen"
      style={{
        background: "#fff",
        color: "var(--navy)",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <Nav />
      <Hero />
      <BadgesStrip />
      <ForWho />
      <Spectrum />
      <Values />
      <Team />
      <Faq />
      <Signup />
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <nav
      className="sticky top-0 z-50 flex items-center justify-between px-7 h-14 bg-white"
      style={{ borderBottom: "0.5px solid rgba(71,67,80,0.12)" }}
    >
      <div
        className="text-xl font-bold tracking-tight"
        style={{ color: "var(--purple-dark)", letterSpacing: "-0.3px" }}
      >
        Vicky<span style={{ color: "var(--mint-dark)" }}>Pronunciation</span>
      </div>
      <div className="flex items-center gap-6">
        <a
          href="#for-who"
          className="text-[13px] hidden sm:inline transition-colors"
          style={{ color: "var(--navy-light)" }}
        >
          For whom
        </a>
        <a
          href="#spectrum"
          className="text-[13px] hidden sm:inline transition-colors"
          style={{ color: "var(--navy-light)" }}
        >
          Spectrum
        </a>
        <a
          href="#team"
          className="text-[13px] hidden sm:inline transition-colors"
          style={{ color: "var(--navy-light)" }}
        >
          Team
        </a>
        <Link
          href="/register"
          className="text-[13px] font-semibold text-white rounded-full px-[18px] py-2"
          style={{ background: "var(--purple-dark)" }}
        >
          Suscribite
        </Link>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section
      className="px-7 pt-16 pb-14 text-center"
      style={{ background: "var(--cream)" }}
    >
      <div
        className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider rounded-full px-3.5 py-1 mb-5"
        style={{ background: "var(--purple-light)", color: "var(--purple-dark)" }}
      >
        <MapPin className="size-3.5" aria-hidden />
        Argentine Spanish, from the heart
      </div>
      <h1
        className="text-4xl md:text-5xl font-bold leading-tight max-w-2xl mx-auto mb-4"
        style={{ color: "var(--navy)", letterSpacing: "-0.5px" }}
      >
        Your family&apos;s bridge to{" "}
        <em
          className="not-italic"
          style={{ color: "var(--purple-dark)" }}
        >
          Argentina
        </em>{" "}
        — through language, culture &amp; play
      </h1>
      <p
        className="text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-8"
        style={{ color: "var(--navy-light)" }}
      >
        The first platform teaching real Argentine Spanish to kids and families
        — with interactive lessons, cultural immersion, and specialist-reviewed
        activities for every learner.
      </p>
      <div className="flex gap-3 justify-center flex-wrap">
        <Link
          href="/lessons/saludos-argentinos"
          className="text-sm font-semibold text-white rounded-full px-7 py-3"
          style={{ background: "var(--purple-dark)" }}
        >
          Start learning — ¡dale!
        </Link>
        <a
          href="#spectrum"
          className="text-sm font-semibold rounded-full px-7 py-3 bg-white"
          style={{
            color: "var(--purple-dark)",
            border: "1.5px solid var(--purple)",
          }}
        >
          See how it works
        </a>
      </div>
      <div
        className="mt-7 text-xs"
        style={{ color: "var(--navy-light)" }}
      >
        Argentina · Family · Inclusion
      </div>
    </section>
  );
}

function BadgesStrip() {
  const badges = [
    { icon: Brain, label: "Psychologist-reviewed" },
    { icon: Gamepad2, label: "Gamified lessons" },
    { icon: Heart, label: "Autism-inclusive" },
    { icon: Users, label: "Built for families" },
    { icon: Flag, label: "100% Argentine" },
  ];
  return (
    <div
      className="px-7 py-4 flex gap-2.5 justify-center flex-wrap"
      style={{ background: "var(--mint-light)" }}
    >
      {badges.map(({ icon: Icon, label }) => (
        <div
          key={label}
          className="flex items-center gap-2 bg-white rounded-full px-4 py-1.5 text-xs font-semibold"
          style={{
            color: "var(--mint-darkest)",
            border: "0.5px solid rgba(58,173,160,0.25)",
          }}
        >
          <Icon className="size-3.5" style={{ color: "var(--mint-dark)" }} aria-hidden />
          {label}
        </div>
      ))}
    </div>
  );
}

function ForWho() {
  const cards = [
    {
      icon: HomeIcon,
      title: "Bilingual families",
      desc:
        "Your kids were born in the UK but your heart is in Buenos Aires. Give them the language before they grow up wondering why they didn't have it.",
      bg: "var(--purple-light)",
      iconBg: "var(--purple)",
    },
    {
      icon: Plane,
      title: "Argentines in the UK",
      desc:
        "You want your children to speak your mother tongue, know your culture, and feel proud of where they come from. We built this for you.",
      bg: "var(--mint-light)",
      iconBg: "var(--mint-dark)",
    },
    {
      icon: School,
      title: "Au pairs, nannies & teachers",
      desc:
        "Looking for inclusive, engaging Spanish material you can actually use with children? Our activities are ready to go — no prep required.",
      bg: "var(--blush)",
      iconBg: "var(--blush-dark)",
    },
    {
      icon: Sparkles,
      title: "Curious families",
      desc:
        "You fell in love with Argentina — on a trip, through a partner, from a show. Now you want your kids to learn the language the right way: the real way.",
      bg: "var(--cream)",
      iconBg: "var(--navy)",
    },
  ];

  return (
    <section id="for-who" className="px-7 py-14 bg-white">
      <SectionLabel>Who is this for?</SectionLabel>
      <SectionH>Made for everyone who loves Argentina</SectionH>
      <SectionSub>
        Whether you grew up speaking Spanish at home or you&apos;ve never heard a
        word of it — there&apos;s a place for your family here.
      </SectionSub>
      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(({ icon: Icon, title, desc, bg, iconBg }) => (
          <div
            key={title}
            className="rounded-2xl p-5"
            style={{
              background: bg,
              border: "0.5px solid rgba(71,67,80,0.1)",
            }}
          >
            <div
              className="size-9 rounded-xl flex items-center justify-center mb-3 text-white"
              style={{ background: iconBg }}
              aria-hidden
            >
              <Icon className="size-[18px]" />
            </div>
            <div
              className="text-sm font-semibold mb-1.5"
              style={{ color: "var(--navy)" }}
            >
              {title}
            </div>
            <div
              className="text-xs leading-relaxed"
              style={{ color: "var(--navy-light)" }}
            >
              {desc}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Spectrum() {
  const pills = [
    "Predictable lesson structure",
    "Sensory-aware design",
    "Multiple response modes",
    "Parent dashboard",
    "Psychologist co-designed",
  ];
  return (
    <section
      id="spectrum"
      className="px-7 py-12 text-center"
      style={{ background: "var(--navy)" }}
    >
      <div
        className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider rounded-full px-3.5 py-1 mb-4"
        style={{
          background: "rgba(172,128,241,0.2)",
          color: "var(--purple)",
        }}
      >
        <Brain className="size-3.5" aria-hidden /> First of its kind
      </div>
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">
        The first Argentine Spanish platform designed for children on the spectrum
      </h2>
      <p
        className="text-sm md:text-base leading-relaxed max-w-lg mx-auto mb-6"
        style={{ color: "rgba(255,255,255,0.7)" }}
      >
        Every activity reviewed by Yoel Malagrino, Psychologist specialising in
        Autism. Structured routines, sensory-aware design, and a Readiness
        Ritual before every lesson — so every child can learn.
      </p>
      <div className="flex gap-2 justify-center flex-wrap">
        {pills.map((p) => (
          <div
            key={p}
            className="text-xs rounded-full px-3.5 py-1.5"
            style={{
              background: "rgba(255,255,255,0.08)",
              color: "rgba(255,255,255,0.85)",
              border: "0.5px solid rgba(255,255,255,0.15)",
            }}
          >
            {p}
          </div>
        ))}
      </div>
    </section>
  );
}

function Values() {
  const cards = [
    {
      icon: Flag,
      title: "Authentically Argentine",
      text: "Not textbook Spanish. Not neutral Latin American. Every word, every expression, every cultural moment is 100% from Buenos Aires — because that's where we're from.",
    },
    {
      icon: Heart,
      title: "Inclusive by design",
      text: "Language learning should be for every child. Our activities are designed to work for neurodiverse learners, with specialist psychology input at every step.",
    },
    {
      icon: Users,
      title: "Family-first",
      text: "We're a family who built this together. We know what it means to want your children to carry a culture and a language — because we feel that every single day.",
    },
    {
      icon: Gamepad2,
      title: "Learning through play",
      text: "No worksheets. No rote repetition. Games, songs, stories, cultural moments — and a coach who makes every lesson feel like an adventure, not homework.",
    },
  ];
  return (
    <section className="px-7 py-14" style={{ background: "var(--cream)" }}>
      <SectionLabel>Our values</SectionLabel>
      <SectionH>Argentina, family, and inclusion</SectionH>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-7">
        {cards.map(({ icon: Icon, title, text }) => (
          <div
            key={title}
            className="bg-white rounded-2xl p-5"
            style={{ border: "0.5px solid rgba(71,67,80,0.1)" }}
          >
            <Icon
              className="size-5 mb-2.5"
              style={{ color: "var(--purple)" }}
              aria-hidden
            />
            <div
              className="text-sm font-semibold mb-1.5"
              style={{ color: "var(--navy)" }}
            >
              {title}
            </div>
            <div
              className="text-xs leading-relaxed"
              style={{ color: "var(--navy-light)" }}
            >
              {text}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Team() {
  const members = [
    {
      letter: "Y",
      name: "Yoel",
      role: "Psychologist",
      desc: "Autism specialist. Designs and reviews all spectrum-inclusive activities and the Readiness Ritual programme.",
      bg: "var(--purple-light)",
      avatar: "var(--purple-dark)",
      roleColor: "var(--purple)",
    },
    {
      letter: "G",
      name: "Gadiel",
      role: "Engineer",
      desc: "Builds the platform. Makes sure every lesson is beautiful, fast, and works perfectly on every screen.",
      bg: "var(--mint-light)",
      avatar: "var(--mint-dark)",
      roleColor: "var(--mint-dark)",
    },
    {
      letter: "V",
      name: "Vicky",
      role: "Teacher",
      desc: "Your coach Valentina. Creates every lesson, brings the Argentine warmth, and teaches you the language she grew up speaking.",
      bg: "var(--blush)",
      avatar: "var(--blush-dark)",
      roleColor: "var(--blush-dark)",
    },
  ];
  return (
    <section id="team" className="px-7 py-14 bg-white">
      <SectionLabel>Who made this</SectionLabel>
      <SectionH>Two brothers and a sister</SectionH>
      <p
        className="text-[15px] leading-relaxed max-w-lg mb-8"
        style={{ color: "var(--navy-light)" }}
      >
        We built the platform we wish had existed when we were growing up
        between cultures. A psychologist, an engineer, and a teacher — all
        Argentine, all passionate, all convinced that language is one of the
        greatest gifts you can give a child.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {members.map((m) => (
          <div
            key={m.name}
            className="rounded-2xl p-5 text-center"
            style={{
              background: m.bg,
              border: "0.5px solid rgba(71,67,80,0.1)",
            }}
          >
            <div
              className="rounded-full flex items-center justify-center text-xl font-bold text-white mx-auto mb-3"
              style={{ background: m.avatar, width: "52px", height: "52px" }}
            >
              {m.letter}
            </div>
            <div
              className="text-sm font-semibold mb-1"
              style={{ color: "var(--navy)" }}
            >
              {m.name}
            </div>
            <div
              className="text-[11px] font-semibold uppercase tracking-wider mb-2"
              style={{ color: m.roleColor }}
            >
              {m.role}
            </div>
            <div
              className="text-xs leading-relaxed"
              style={{ color: "var(--navy-light)" }}
            >
              {m.desc}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Faq() {
  const items = [
    {
      q: "Who exactly is Vicky Pronunciation for?",
      a: "Families with Argentine roots living abroad, bilingual children growing up between cultures, curious families who want to learn real Argentine Spanish, au pairs and teachers looking for inclusive materials, and children on the autism spectrum who need a specially designed learning environment.",
    },
    {
      q: "Do my children need to speak any Spanish already?",
      a: "Not at all. Our Kids pathway starts from absolute zero — no Spanish assumed, no prior knowledge needed. Every lesson is designed for complete beginners aged 4–14, with games and activities that make learning feel natural from day one.",
    },
    {
      q: "What makes it different from Duolingo or other apps?",
      a: "We teach specifically Argentine Spanish — the accent, the slang, the culture, the expressions Argentines actually use. We also offer a unique spectrum-inclusive strand reviewed by a specialist psychologist, family plans, live sessions, and a warm coaching relationship — not a cold app experience.",
    },
    {
      q: "How do I sign up?",
      a: "Click Suscribite at the top — you'll get access to all lessons, the welcome pack, and founding member pricing. You can also try our first lesson for free, no signup required.",
    },
    {
      q: "Is there support for children with autism or neurodiverse profiles?",
      a: "Yes — this is one of our most unique features. Every spectrum activity is co-designed with Yoel Malagrino, a psychologist specialising in Autism. Activities include a Readiness Ritual, sensory-aware design, and a parent dashboard for tracking emotional readiness before each session.",
    },
  ];
  return (
    <section className="px-7 py-12 bg-white">
      <SectionLabel>Questions</SectionLabel>
      <SectionH>How does it work?</SectionH>
      <div className="flex flex-col max-w-xl mt-6">
        {items.map((it, idx) => (
          <details
            key={idx}
            className="group py-4"
            style={{ borderBottom: "0.5px solid rgba(71,67,80,0.12)" }}
          >
            <summary
              className="text-sm font-semibold flex justify-between items-center gap-3 cursor-pointer list-none"
              style={{ color: "var(--navy)" }}
            >
              {it.q}
              <ChevronDown
                className="size-4 shrink-0 transition-transform group-open:rotate-180"
                style={{ color: "var(--purple)" }}
                aria-hidden
              />
            </summary>
            <div
              className="text-[13px] leading-relaxed pt-2.5"
              style={{ color: "var(--navy-light)" }}
            >
              {it.a}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

function Signup() {
  return (
    <section
      className="px-7 py-14 text-center"
      style={{ background: "var(--purple-light)" }}
    >
      <h2
        className="text-2xl md:text-3xl font-bold mb-2.5 leading-tight"
        style={{ color: "var(--purple-darkest)" }}
      >
        Ready to start your family&apos;s Argentine journey?
      </h2>
      <p
        className="text-sm leading-relaxed max-w-md mx-auto mb-7"
        style={{ color: "var(--purple-dark)" }}
      >
        Get full access to every lesson, the welcome pack, and founding member
        pricing. Or try the first lesson free, no signup required.
      </p>
      <div className="flex gap-3 justify-center flex-wrap">
        <Link
          href="/register"
          className="text-sm font-semibold text-white rounded-full px-7 py-3"
          style={{ background: "var(--purple-dark)" }}
        >
          ¡Dale, suscribite!
        </Link>
        <Link
          href="/lessons/saludos-argentinos"
          className="text-sm font-semibold rounded-full px-7 py-3 bg-white"
          style={{
            color: "var(--purple-dark)",
            border: "1.5px solid var(--purple)",
          }}
        >
          Try the first lesson free
        </Link>
      </div>
      <div
        className="text-[11px] mt-3 opacity-80"
        style={{ color: "var(--purple-dark)" }}
      >
        No credit card needed to try the first lesson.
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer
      className="px-7 py-8 flex justify-between items-center flex-wrap gap-3"
      style={{ background: "var(--navy)" }}
    >
      <div className="text-lg font-bold text-white">
        Vicky<span style={{ color: "var(--mint)" }}>Pronunciation</span>
      </div>
      <div
        className="text-xs"
        style={{ color: "rgba(255,255,255,0.5)" }}
      >
        © {new Date().getFullYear()} Vicky Pronunciation · Built with love
      </div>
      <div className="flex gap-4">
        <Link
          href="/login"
          className="text-xs transition-colors"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          Sign in
        </Link>
        <a
          href="#"
          className="text-xs transition-colors"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          Privacy
        </a>
        <a
          href="#"
          className="text-xs transition-colors"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          Contact
        </a>
      </div>
    </footer>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="text-[11px] font-semibold uppercase tracking-wider mb-2.5"
      style={{ color: "var(--purple)" }}
    >
      {children}
    </div>
  );
}

function SectionH({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-2xl md:text-[26px] font-bold mb-2 leading-tight"
      style={{ color: "var(--navy)" }}
    >
      {children}
    </h2>
  );
}

function SectionSub({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-sm leading-relaxed mb-8 max-w-md"
      style={{ color: "var(--navy-light)" }}
    >
      {children}
    </p>
  );
}
