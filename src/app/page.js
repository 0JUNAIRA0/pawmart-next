import Link from "next/link";
import { IoArrowForward, IoHeartOutline, IoPeopleOutline, IoShieldCheckmarkOutline, IoStar } from "react-icons/io5";
import { PiBowlFood, PiDog, PiFirstAidKit, PiTennisBall } from "react-icons/pi";
import FeaturedItems from "@/components/home/FeaturedItems";

const categories = [
  { name: "Pets", icon: PiDog, text: "Dogs, cats, rabbits & more waiting for a home", count: "4+ listings" },
  { name: "Pet Food", icon: PiBowlFood, text: "Healthy, balanced meals and tasty treats", count: "3+ listings" },
  { name: "Accessories", icon: PiTennisBall, text: "Beds, collars, cages and toys", count: "3+ listings" },
  { name: "Care Products", icon: PiFirstAidKit, text: "Supplements, filters and grooming", count: "3+ listings" },
];

const reasons = [
  { icon: IoHeartOutline, title: "Save a Life", text: "Every adoption gives a rescued pet a second chance and frees a shelter spot for another animal." },
  { icon: IoShieldCheckmarkOutline, title: "Verified Listings", text: "Listings come from signed-in members, with clear details, specs and location before you reach out." },
  { icon: IoPeopleOutline, title: "Caring Community", text: "Join pet lovers across Bangladesh who share tips, supplies and a love for animals." },
];

const testimonials = [
  { name: "Nusrat Jahan", role: "Adopted a Persian cat", img: "https://i.ibb.co.com/TBN4FCn1/rsz-3525.png", quote: "Luna has filled our home with so much joy. The listing was clear and the owner was lovely to talk to." },
  { name: "Tanvir Ahmed", role: "Bought pet supplies", img: "https://i.ibb.co.com/svQdjqmG/rsz-12147911439.png", quote: "Found a great scratching post and food at fair prices, all from sellers near me in Sylhet." },
  { name: "Marko Islam", role: "Adopted a puppy", img: "https://i.ibb.co.com/4gRdKpm6/rsz-1marko.png", quote: "Adopting Rex was the best decision we made this year. PawMart made the whole process easy." },
];

const stats = [
  { value: "1.2k+", label: "Happy adoptions" },
  { value: "350+", label: "Active listings" },
  { value: "9", label: "Cities covered" },
];

export default function HomePage() {
  return (
    <>
      {/* 1. HERO */}
      <section className="relative isolate overflow-hidden">
        <img
          src="https://i.ibb.co.com/ch4Vr53H/rsz-132148345898.jpg"
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-linear-to-r from-black/80 via-black/55 to-black/20" />
        <div className="mx-auto flex min-h-[78vh] max-w-7xl flex-col justify-center px-4 py-24 text-white sm:px-6 lg:px-8">
          <span className="fade-up mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-sm backdrop-blur">
            🐾 Adopt, don’t shop
          </span>
          <h1 className="fade-up max-w-2xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Find your new <span className="bg-linear-to-r from-[#ff6b6b] to-[#ffb199] bg-clip-text text-transparent">furry best friend</span> today
          </h1>
          <p className="fade-up mt-6 max-w-xl text-lg text-white/85">
            Thousands of pets are waiting for a loving home. Adopt for free, or shop trusted food, accessories and care products from people near you.
          </p>
          <div className="fade-up mt-9 flex flex-wrap gap-4">
            <Link href="/items" className="btn-brand px-8! py-3.5! text-base">
              Browse Pets & Supplies <IoArrowForward />
            </Link>
            <Link href="/about" className="inline-flex items-center rounded-full border border-white/40 px-8 py-3.5 font-semibold transition hover:bg-white hover:text-black">
              Learn more
            </Link>
          </div>
          <dl className="mt-14 grid max-w-lg grid-cols-3 gap-6">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="text-3xl font-bold">{s.value}</dd>
                <dd className="text-sm text-white/70">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 2. CATEGORIES */}
      <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8" aria-labelledby="cat-title">
        <div className="mb-10 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">Categories</p>
          <h2 id="cat-title" className="section-title">Explore by Category</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map(({ name, icon: Icon, text, count }) => (
            <Link
              key={name}
              href={`/items?category=${encodeURIComponent(name)}`}
              className="glass card-hover group flex flex-col items-center rounded-2xl p-7 text-center focus-visible:outline-2 focus-visible:outline-primary"
            >
              <span className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-3xl text-primary transition group-hover:bg-primary group-hover:text-white">
                <Icon />
              </span>
              <h3 className="text-lg font-bold">{name}</h3>
              <p className="mt-2 text-sm opacity-75">{text}</p>
              <span className="mt-4 text-xs font-semibold text-primary">{count}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. FEATURED ITEMS */}
      <FeaturedItems />

      {/* 4. WHY ADOPT */}
      <section className="bg-base-200/60 py-20" aria-labelledby="why-title">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="relative">
            <img
              src="https://i.ibb.co.com/WNDg7WNv/slide1.jpg"
              alt="A happy adopted dog with its owner"
              className="aspect-4/3 w-full rounded-3xl object-cover shadow-xl"
            />
            <div className="glass absolute -bottom-6 right-4 flex items-center gap-3 rounded-2xl bg-base-100/90 px-5 py-4 sm:right-8">
              <span className="text-3xl">🏡</span>
              <div>
                <p className="font-bold">1,200+ pets</p>
                <p className="text-xs opacity-70">found a forever home</p>
              </div>
            </div>
          </div>
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">Why PawMart</p>
            <h2 id="why-title" className="section-title">Why adopt from PawMart?</h2>
            <p className="mt-4 opacity-75">We make it simple and safe to give a pet a home, and to care for them once they arrive.</p>
            <div className="mt-8 space-y-5">
              {reasons.map(({ icon: Icon, title, text }) => (
                <div key={title} className="flex gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-2xl text-primary">
                    <Icon />
                  </span>
                  <div>
                    <h3 className="font-bold">{title}</h3>
                    <p className="mt-1 text-sm opacity-75">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8" aria-labelledby="t-title">
        <div className="mb-10 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">Testimonials</p>
          <h2 id="t-title" className="section-title">Our Happy Pet Parents</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="glass card-hover flex h-full flex-col rounded-2xl p-7">
              <div className="mb-4 flex gap-0.5 text-amber-400" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <IoStar key={i} />
                ))}
              </div>
              <blockquote className="flex-1 leading-relaxed opacity-85">“{t.quote}”</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <img src={t.img} alt="" className="h-12 w-12 rounded-full object-cover ring-2 ring-primary/30" />
                <div>
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-xs opacity-70">{t.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* 6. CTA BANNER */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-[#b00020] to-[#ff5722] px-6 py-14 text-center text-white sm:px-12">
          <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
          <div className="absolute -bottom-12 -right-6 h-48 w-48 rounded-full bg-white/10" />
          <h2 className="relative text-3xl font-bold sm:text-4xl">Have a pet or product to share?</h2>
          <p className="relative mx-auto mt-3 max-w-xl text-white/85">
            Create a free account and list it in under a minute. Reach pet lovers in your city.
          </p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/items/add" className="rounded-full bg-white px-8 py-3 font-semibold text-[#b00020] transition hover:-translate-y-0.5 hover:shadow-lg">
              Add a listing
            </Link>
            <Link href="/register" className="rounded-full border border-white/60 px-8 py-3 font-semibold transition hover:bg-white/10">
              Join PawMart
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
