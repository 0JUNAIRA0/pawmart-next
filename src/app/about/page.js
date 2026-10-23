import Link from "next/link";
import { IoHeartOutline, IoLeafOutline, IoShieldCheckmarkOutline } from "react-icons/io5";

export const metadata = { title: "About" };

const values = [
  { icon: IoHeartOutline, title: "Animals first", text: "Every feature is built to help more pets find safe, loving homes." },
  { icon: IoShieldCheckmarkOutline, title: "Trust & safety", text: "Only signed-in members can list, so every listing has a real person behind it." },
  { icon: IoLeafOutline, title: "Local & simple", text: "Find pets and supplies in your own city, with no middlemen and no fuss." },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="grid items-center gap-12 lg:grid-cols-2">
        <div className="fade-up">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">About us</p>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            About <span className="gradient-text">PawMart</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed opacity-80">
            PawMart is a community marketplace that connects pet owners, rescuers and buyers across Bangladesh. You can
            adopt a pet for free, or buy and sell food, accessories and care products from people near you.
          </p>
          <p className="mt-4 leading-relaxed opacity-75">
            We started PawMart because too many healthy pets never find a home, and good pet supplies are hard to find
            locally. Our goal is simple: make adoption easy and make caring for pets affordable.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/items" className="btn-brand">Browse listings</Link>
            <Link href="/contact" className="btn-ghost-brand">Contact us</Link>
          </div>
        </div>
        <img
          src="https://i.ibb.co.com/6R7WqfqM/rsz-12148872588.jpg"
          alt="A rescued pet relaxing at its new home"
          className="aspect-4/3 w-full rounded-3xl object-cover shadow-xl"
        />
      </section>

      <section className="mt-24" aria-labelledby="values-title">
        <h2 id="values-title" className="section-title mb-10 text-center">What we stand for</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {values.map(({ icon: Icon, title, text }) => (
            <div key={title} className="glass card-hover rounded-2xl p-7">
              <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-2xl text-primary">
                <Icon />
              </span>
              <h3 className="text-lg font-bold">{title}</h3>
              <p className="mt-2 text-sm opacity-75">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="glass mt-24 grid gap-8 rounded-3xl p-8 text-center sm:grid-cols-3 sm:p-12">
        {[
          ["1,200+", "Pets adopted"],
          ["350+", "Active listings"],
          ["9", "Cities served"],
        ].map(([n, l]) => (
          <div key={l}>
            <p className="gradient-text text-4xl font-extrabold">{n}</p>
            <p className="mt-1 text-sm opacity-75">{l}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
