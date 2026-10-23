import { IoCallOutline, IoLocationOutline, IoMailOutline } from "react-icons/io5";
import ContactForm from "./ContactForm";

export const metadata = { title: "Contact" };

const info = [
  { icon: IoMailOutline, label: "Email", value: "support@pawmart.com" },
  { icon: IoCallOutline, label: "Phone", value: "+880 1700-000000" },
  { icon: IoLocationOutline, label: "Office", value: "Dhaka, Bangladesh" },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-10 text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">Get in touch</p>
        <h1 className="section-title">Contact Us</h1>
        <p className="mx-auto mt-3 max-w-xl opacity-75">Questions about a listing or adoption? We usually reply within a day.</p>
      </header>
      <div className="grid gap-8 md:grid-cols-[1fr_1.5fr]">
        <ul className="space-y-4">
          {info.map(({ icon: Icon, label, value }) => (
            <li key={label} className="glass flex items-center gap-4 rounded-2xl p-5">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-xl text-primary">
                <Icon />
              </span>
              <div>
                <p className="text-xs uppercase tracking-wide opacity-60">{label}</p>
                <p className="font-semibold">{value}</p>
              </div>
            </li>
          ))}
        </ul>
        <ContactForm />
      </div>
    </div>
  );
}
