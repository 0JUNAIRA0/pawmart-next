import Link from "next/link";
import { FaFacebookF, FaInstagram, FaXTwitter, FaYoutube } from "react-icons/fa6";

const columns = [
  {
    title: "Explore",
    links: [
      { href: "/", label: "Home" },
      { href: "/items", label: "Pets & Supplies" },
      { href: "/about", label: "About Us" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Categories",
    links: [
      { href: "/items?category=Pets", label: "Pets for Adoption" },
      { href: "/items?category=Pet%20Food", label: "Pet Food" },
      { href: "/items?category=Accessories", label: "Accessories" },
      { href: "/items?category=Care%20Products", label: "Care Products" },
    ],
  },
];

const socials = [
  { icon: FaFacebookF, label: "Facebook" },
  { icon: FaXTwitter, label: "X (Twitter)" },
  { icon: FaInstagram, label: "Instagram" },
  { icon: FaYoutube, label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-base-content/10 bg-base-200/60">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="space-y-4 sm:col-span-2 lg:col-span-1">
          <Link href="/" className="flex items-center gap-1.5 text-2xl font-extrabold">
            <img src="/pawprint.png" alt="" className="h-7 w-7" />
            <span className="gradient-text">PawMart</span>
          </Link>
          <p className="max-w-xs text-sm leading-relaxed opacity-75">
            PawMart connects local pet lovers for adoption and trusted pet-care products across Bangladesh.
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">{col.title}</h3>
            <ul className="space-y-2.5 text-sm">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="opacity-75 transition hover:text-primary hover:opacity-100">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">Follow Us</h3>
          <div className="flex gap-3">
            {socials.map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-base-content/15 transition hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-white"
              >
                <Icon />
              </a>
            ))}
          </div>
          <p className="mt-5 text-sm opacity-75">support@pawmart.com</p>
        </div>
      </div>
      <div className="border-t border-base-content/10 py-6 text-center text-sm opacity-70">
        © {new Date().getFullYear()} PawMart. All rights reserved.
      </div>
    </footer>
  );
}
