"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowRight, BookOpen, CalendarDays, Check, Heart, Mail, MapPin, Menu, RotateCcw, Sparkles } from "lucide-react";

const contactEmail = "languagelabvicky@gmail.com";
const contactHref = `mailto:${contactEmail}?subject=${encodeURIComponent("I'd like to find my Spanish table")}`;

const offers = [
  { id: "speaking-club", eyebrow: "Weekly · in person & online", title: "Speaking Club", description: "90 minutes of guided conversation on a fun theme each week, from travel stories to tarot to telenovelas. No textbooks, just talking. Max 8 people per table.", price: "£20", detail: "in person · £15 online", cta: "Book a seat" },
  { id: "bookclub", eyebrow: "Monthly · weekend afternoons", title: "Bilingual Book Club", description: "One book a month by Latin American and English writers, all discussed in Spanish. Read it in either language, compare translations, and talk it over with coffee and cake at our favourite vegan bakery in SW London. Learners (B1+) and native speakers welcome.", price: "£12", detail: "free for members", cta: "Join this month's read", featured: true },
  { id: "lessons", eyebrow: "6-week blocks", title: "Small-group lessons", description: "Want structure too? Join a 6-week course with me or one of our hand-picked native teachers. Maximum 6 students.", price: "£180", detail: "6 × 90-minute classes", cta: "Ask about the next block" },
];

const events = [
  { date: "Wed 18 Nov", title: "Speaking Club · Avanzado · Online", description: "¿Por qué los británicos piden perdón por todo?", translation: "Why do Brits say sorry for everything?", time: "5:30pm" },
  { date: "Sat 28 Nov", title: "Speaking Club · Intermedio · SW London", description: "Citas con latinos: ¿mito o realidad?", translation: "Dating Latin Americans: myth or reality?", time: "2pm" },
  { date: "Sat 5 Dec", title: "Book Club · Las cosas que perdimos en el fuego", description: "Mariana Enríquez · SW London", translation: "", time: "2pm" },
];

const questions = [
  ["Ayer ___ al cine con mis amigos.", ["voy", "fui", "iba", "iré"], 1],
  ["Cuando era pequeña, ___ en Buenos Aires.", ["viví", "vivía", "he vivido", "viviré"], 1],
  ["Espero que ___ buen tiempo el sábado.", ["hace", "hará", "haga", "hacía"], 2],
  ["Este libro es ___ interesante ___ el anterior.", ["tan / como", "más / como", "tan / que", "tanto / como"], 0],
  ["Si tuviera más tiempo, ___ más novelas.", ["leo", "leería", "leeré", "leyera"], 1],
  ["No creo que Marta ___ la novela todavía.", ["ha terminado", "haya terminado", "terminó", "termina"], 1],
  ["Me dijo que ___ al día siguiente.", ["vendrá", "viene", "vendría", "venga"], 2],
  ["«Estar en las nubes» significa…", ["estar muy feliz", "estar distraído", "viajar en avión", "estar enfermo"], 1],
  ["Si me ___ avisado, habría venido.", ["hubieras", "habías", "hayas", "habrías"], 0],
  ["Por mucho que lo ___, no lo vas a convencer.", ["intentas", "intentes", "intentarás", "intentaste"], 1],
] as const;

const faqs = [
  ["Where do we meet?", "For now, I'm picking lovely cafés and spots around SW London for us. Every booking shows the exact address, and speaking clubs also run online."],
  ["How do I know my level?", "Take our short quiz, then book a free consultation call with me. We'll find the right table for you."],
  ["Do I need to finish the book?", "Not necessarily! Come anyway. We'll read the best bits together and nobody checks your homework. Spoilers are at your own risk."],
  ["Can native speakers join the book club?", "¡Claro que sí! Native speakers bring the depth, learners bring fresh eyes. The speaking clubs are for learners only."],
  ["Is there a WhatsApp group?", "Yes! Once you book, you get the invite to our WhatsApp community: weekly prompts, voice notes, event news and a bit of chisme."],
  ["Can I come on my own?", "Highly recommended! Most people come solo and leave with new friends (and a new book on their list)."],
  ["What if I can't make it?", "No problem! Just let us know and we'll move you to the next session."],
];

export default function HomePage() {
  return <main className="entre-page"><Header /><Hero /><PainPoints /><Offers /><HowItWorks /><Events /><Books /><LevelQuiz /><About /><Testimonials /><Fit /><Faq /><Newsletter /><Footer /></main>;
}

function Header() {
  return <header className="entre-header">
    <a href="#top" className="entre-logo" aria-label="Entre Líneas, back to top"><Heart aria-hidden /><span>Entre Líneas</span></a>
    <nav className="entre-nav" aria-label="Main navigation"><a href="#clubs">Speaking clubs</a><a href="#bookclub">Book club</a><a href="#lessons">Lessons</a><a href="#events">Events</a><a href="#quiz">Level quiz</a><a href="#events" className="entre-button entre-button-small">Reserva tu lugar</a></nav>
    <details className="entre-mobile-nav"><summary aria-label="Open menu"><Menu aria-hidden /></summary><div><a href="#clubs">Speaking clubs</a><a href="#bookclub">Book club</a><a href="#lessons">Lessons</a><a href="#events">Events</a><a href="#quiz">Level quiz</a></div></details>
  </header>;
}

function Hero() {
  return <section id="top" className="entre-hero entre-container">
    <div className="entre-hero-copy entre-reveal"><p className="entre-kicker">Intermediate & advanced Spanish · SW London & online</p><h1>You understand Spanish. Now let&apos;s <em>talk</em>, read and fall in love with it.</h1><p className="entre-lead">Speaking clubs, a bilingual book club and small-group lessons in cosy cafés around SW London and online, hosted by Vicky, an Argentine teacher, translator and host based in London.</p><div className="entre-actions"><a href="#events" className="entre-button">See this month&apos;s sessions <ArrowRight aria-hidden /></a><a href="#quiz" className="entre-button entre-button-outline">Find my level</a></div></div>
    <div className="entre-portrait entre-reveal entre-delay-1"><div className="entre-portrait-backdrop" aria-hidden /><Image src="/images/entre-lineas/vicky-books.jpg" alt="Vicky choosing a book from her shelf of Virginia Woolf and Mary Shelley" width={900} height={1200} priority /><span className="entre-sticker entre-sticker-top">Hola, soy Vicky</span><span className="entre-sticker entre-sticker-bottom">“Leer es conversar con otros”</span></div>
  </section>;
}

function PainPoints() {
  const items = [["You understand, then freeze", "Netflix in Spanish? Easy. Ordering a drink and chatting after? Your mind goes blank."], ["Classes feel like school", "You don't need another grammar worksheet. You need real conversations."], ["Apps got you this far", "Your streak is impressive, but nobody on Duolingo laughs at your jokes."], ["You miss Spanish-speaking friends", "London is big. Finding your people, in your second language, is hard."]];
  return <section className="entre-section entre-section-white"><div className="entre-container"><p className="entre-kicker">¿Te suena?</p><h2>Stuck at “good, but not confident”?</h2><div className="entre-grid entre-grid-four entre-top-gap">{items.map(([title, copy]) => <article className="entre-soft-card" key={title}><Sparkles aria-hidden /><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>;
}

function Offers() {
  return <section id="clubs" className="entre-section"><div className="entre-container"><p className="entre-kicker">Three ways to join</p><h2>Pick your table</h2><p className="entre-section-lead">Every session runs in two levels: <strong>Intermedio</strong> (B1–B2) and <strong>Avanzado</strong> (C1+).</p><div className="entre-grid entre-grid-three entre-top-gap">{offers.map((offer) => <article id={offer.id} className={`entre-offer ${offer.featured ? "entre-offer-featured" : ""}`} key={offer.title}><p className="entre-pill">{offer.eyebrow}</p><h3>{offer.title}</h3><p>{offer.description}</p><p className="entre-price">{offer.price} <span>{offer.detail}</span></p><a href={contactHref} className={`entre-button ${offer.featured ? "entre-button-light" : ""}`}>{offer.cta}</a></article>)}</div><div className="entre-membership"><div><p className="entre-kicker">La Membresía</p><h3>4 speaking clubs + the book club, every month</h3><p>In person or online, your choice each week. Cancel anytime.</p></div><p className="entre-price">£60 <span>/ month</span></p><a href={contactHref} className="entre-button">Become a member</a></div></div></section>;
}

function HowItWorks() {
  const steps = [["1", "Find your level", "Take the 2-minute quiz, then book a free 15-minute call with me. We'll find your perfect table together."], ["2", "Book your seat", "Tables are small so everyone gets to speak. Book online and get the theme or book in advance."], ["3", "Come, talk, stay", "Grab a coffee and a pastry and talk. Afterwards, join our WhatsApp community to keep practising all week."]];
  return <section className="entre-section entre-section-blush"><div className="entre-container"><h2 className="entre-centered">Así funciona</h2><div className="entre-grid entre-grid-three entre-top-gap">{steps.map(([number, title, copy]) => <article className="entre-step" key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>;
}

function Events() {
  return <section id="events" className="entre-section"><div className="entre-container"><div className="entre-section-heading"><div><p className="entre-kicker">Este mes</p><h2>Upcoming sessions</h2></div><a href={contactHref}>Ask for the full calendar <ArrowRight aria-hidden /></a></div><div className="entre-event-list">{events.map((event) => <article className="entre-event" key={event.date + event.title}><CalendarDays aria-hidden /><p className="entre-event-date">{event.date}</p><div><h3>{event.title}</h3><p>{event.description} {event.translation && <em>({event.translation})</em>} · {event.time}</p></div><a href={contactHref} className="entre-button entre-button-small">Book</a></article>)}</div></div></section>;
}

function Books() {
  return <section className="entre-section entre-section-berry"><div className="entre-container"><p className="entre-kicker entre-kicker-light">Book club · próximas lecturas</p><h2>Spooky season starts here</h2><p className="entre-section-lead">Read in Spanish or in English, we discuss in Spanish. Both books exist in translation, so learners and native speakers share the same table.</p><div className="entre-grid entre-grid-two entre-top-gap"><article className="entre-book-card"><BookOpen aria-hidden /><p className="entre-pill">Diciembre · Sat 5 Dec, 2pm</p><h3>Las cosas que perdimos en el fuego</h3><strong>Mariana Enríquez · Argentina</strong><p>Dark, unforgettable stories set in Buenos Aires. Horror with something to say. In English: <em>Things We Lost in the Fire</em>.</p></article><article className="entre-book-card"><BookOpen aria-hidden /><p className="entre-pill">Enero · Sat 16 Jan</p><h3>Mandíbula</h3><strong>Mónica Ojeda · Ecuador</strong><p>Teenage girls, fear and obsession in a novel that will stay with you. In English: <em>Jawbone</em>.</p></article></div></div></section>;
}

function LevelQuiz() {
  const [index, setIndex] = useState(0); const [score, setScore] = useState(0); const finished = index === questions.length;
  const answer = (option: number) => { if (option === questions[index][2]) setScore((value) => value + 1); setIndex((value) => value + 1); };
  const reset = () => { setIndex(0); setScore(0); };
  const result = score <= 3 ? ["Not yet", "¡Vas muy bien! Our clubs start at B1, so let's chat about lessons that get you there."] : score <= 7 ? ["Intermedio", "¡Genial! You're ready for the Intermedio table."] : ["Avanzado", "¡Increíble! You'd love the Avanzado table."];
  return <section id="quiz" className="entre-section"><div className="entre-narrow"><div className="entre-centered"><p className="entre-kicker">2-minute quiz</p><h2>¿Cuál es tu nivel?</h2><p className="entre-section-lead">10 quick questions, then book a free 15-minute call with me to find your table.</p></div><div className="entre-quiz" aria-live="polite">{!finished ? <><div className="entre-quiz-meta"><strong>Question {index + 1} of {questions.length}</strong><span>{Math.round((index / questions.length) * 100)}%</span></div><div className="entre-progress"><span style={{ width: `${(index / questions.length) * 100}%` }} /></div><h3>{questions[index][0]}</h3><div className="entre-quiz-options">{questions[index][1].map((option, optionIndex) => <button type="button" onClick={() => answer(optionIndex)} key={option}>{option}</button>)}</div></> : <div className="entre-result"><span className="entre-result-icon"><Check aria-hidden /></span><p className="entre-kicker">Your score: {score} / {questions.length}</p><h3>{result[0]}</h3><p>{result[1]} Book your free 15-minute call with me to confirm and save your seat.</p><div className="entre-actions"><a href={contactHref} className="entre-button">Book my free call <ArrowRight aria-hidden /></a><button type="button" className="entre-reset" onClick={reset}><RotateCcw aria-hidden /> Take it again</button></div></div>}</div></div></section>;
}

function About() {
  return <section className="entre-section entre-section-white"><div className="entre-container entre-about"><div className="entre-portrait entre-portrait-reverse"><div className="entre-portrait-backdrop" aria-hidden /><Image src="/images/entre-lineas/vicky-mural.jpg" alt="Vicky smiling in front of a colourful painted beach mural" width={900} height={1200} /></div><div><p className="entre-kicker">Tu anfitriona</p><h2>Hola, soy Vicky</h2><p className="entre-section-lead">I&apos;m an Argentine Spanish and English teacher and translator living in London. I studied English Literature in Buenos Aires, Critical Writing at Oxford University, and did my CELTA at International House. I&apos;ve also spent years running a Spanish cultural centre, hosting everything from wine tastings to tarot nights.</p><p className="entre-section-lead">I host the clubs, and our lessons are taught by me and by qualified native teachers I&apos;ve hand-picked.</p><ul className="entre-credentials" aria-label="Qualifications"><li>BA English Literature, Buenos Aires</li><li>Oxford University</li><li>CELTA, International House</li><li>Translator</li></ul><p className="entre-signature">Besos, Vicky</p></div></div></section>;
}

function Testimonials() {
  const quotes = [["Thank you for everything you have done for us as students, both as a teacher and as Manager.", "Cara, adult learner"], ["I have been counting my swim laps in Spanish, and now when I am in a shop the prices come to me in Spanish.", "A learner, replying to Vicky's newsletter"], ["She is an amazing teacher and even though I had many lessons on past tenses before, she broke it down in a way I have never heard before.", "Anja, about one of my teachers"]];
  return <section className="entre-section"><div className="entre-container"><h2 className="entre-centered">Lo que dicen</h2><div className="entre-grid entre-grid-three entre-top-gap">{quotes.map(([quote, name]) => <figure className="entre-quote" key={name}><span>“</span><blockquote>{quote}</blockquote><figcaption>{name}</figcaption></figure>)}</div></div></section>;
}

function Fit() {
  return <section className="entre-section entre-section-white"><div className="entre-fit"><article className="entre-fit-yes"><h2>Es para ti si…</h2><ul><li>You&apos;re around B1 level or above</li><li>You want to speak more, not study more</li><li>You love books, coffee and good conversation</li><li>You want to meet people in London</li></ul></article><article><h2>No es para ti si…</h2><ul><li>You&apos;re a complete beginner (ask us about beginner lessons)</li><li>You want exam preparation</li><li>You&apos;d rather study alone</li></ul></article></div></section>;
}

function Faq() {
  return <section className="entre-section"><div className="entre-faq"><h2 className="entre-centered">Preguntas frecuentes</h2>{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden>+</span></summary><p>{answer}</p></details>)}</div></section>;
}

function Newsletter() {
  const [email, setEmail] = useState(""); const subscribeHref = `mailto:${contactEmail}?subject=${encodeURIComponent("Entre Líneas newsletter")}&body=${encodeURIComponent(`Hi Vicky! Please add me to the monthly calendar and newsletter. My email is ${email || "..."}.`)}`;
  return <section id="book" className="entre-newsletter"><div className="entre-narrow entre-centered"><Mail aria-hidden /><h2>Get the monthly calendar first</h2><p className="entre-section-lead">Be the first to see new sessions and the next book. You&apos;ll also get my newsletter with Spanish tips and a little bit of chisme.</p><p className="entre-signature">XOXO, Vicky</p><form onSubmit={(event) => { event.preventDefault(); window.location.href = subscribeHref; }} className="entre-newsletter-form"><label htmlFor="newsletter-email">Email address</label><input id="newsletter-email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="tu@email.com" /><button className="entre-button entre-button-light" type="submit">Quiero recibirlo</button></form></div></section>;
}

function Footer() {
  return <footer className="entre-footer"><div className="entre-container"><a href="#top" className="entre-logo"><Heart aria-hidden /><span>Entre Líneas</span></a><div><a href="https://www.instagram.com/languagelabwithvicky/" target="_blank" rel="noreferrer">Instagram @languagelabwithvicky</a><a href={`mailto:${contactEmail}`}>{contactEmail}</a></div><p><MapPin aria-hidden /> SW London & online</p></div></footer>;
}
