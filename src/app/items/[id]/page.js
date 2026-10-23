"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { IoArrowBack, IoCalendarOutline, IoLocationOutline, IoPricetagOutline, IoStar } from "react-icons/io5";
import ItemCard from "@/components/ItemCard";
import Loading from "@/components/Loading";
import { formatPrice, useItems } from "@/lib/store";

export default function ItemDetailsPage() {
  const { id } = useParams();
  const { items, ready } = useItems();
  const item = items.find((i) => i.id === id);

  if (!item && !ready) return <Loading />;

  if (!item) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
        <span className="text-6xl">🐶</span>
        <h1 className="mt-4 text-2xl font-bold">Item not found</h1>
        <p className="mt-2 opacity-70">It may have been removed or the link is incorrect.</p>
        <Link href="/items" className="btn-brand mt-6">
          <IoArrowBack /> Back to items
        </Link>
      </div>
    );
  }

  const related = items.filter((i) => i.category === item.category && i.id !== item.id).slice(0, 4);
  const info = [
    { icon: IoPricetagOutline, label: "Price", value: formatPrice(item.price) },
    { icon: IoLocationOutline, label: "Location", value: item.location },
    {
      icon: IoCalendarOutline,
      label: "Listed on",
      value: new Date(item.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
    },
  ];
  const specs = Object.entries(item.specs || {});

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Link href="/items" className="btn-ghost-brand mb-8 text-sm">
        <IoArrowBack /> Back to items
      </Link>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="glass overflow-hidden rounded-3xl">
          <img
            src={item.image || "/fallback.png"}
            alt={item.title}
            className="aspect-4/3 h-full w-full object-cover"
            onError={(e) => (e.currentTarget.src = "/fallback.png")}
          />
        </div>

        <div className="fade-up">
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{item.category}</span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">{item.title}</h1>
          {item.rating > 0 && (
            <p className="mt-3 flex items-center gap-1 text-sm">
              <IoStar className="text-amber-400" /> <span className="font-semibold">{item.rating}</span>
              <span className="opacity-60">/ 5 community rating</span>
            </p>
          )}
          <p className="mt-4 text-lg opacity-80">{item.shortDescription}</p>

          <dl className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {info.map(({ icon: Icon, label, value }) => (
              <div key={label} className="glass rounded-2xl p-4">
                <dt className="flex items-center gap-1.5 text-xs uppercase tracking-wide opacity-60">
                  <Icon /> {label}
                </dt>
                <dd className="mt-1 font-bold">{value}</dd>
              </div>
            ))}
          </dl>

          <h2 className="mt-8 text-xl font-bold">Description</h2>
          <p className="mt-2 leading-relaxed opacity-85">{item.fullDescription}</p>

          {specs.length > 0 && (
            <>
              <h2 className="mt-8 text-xl font-bold">Key information</h2>
              <div className="glass mt-3 overflow-hidden rounded-2xl">
                <table className="w-full text-sm">
                  <tbody>
                    {specs.map(([k, v]) => (
                      <tr key={k} className="border-b border-base-content/5 last:border-0">
                        <th scope="row" className="w-2/5 px-4 py-3 text-left font-medium opacity-70">{k}</th>
                        <td className="px-4 py-3 font-semibold">{v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20" aria-labelledby="related-title">
          <h2 id="related-title" className="section-title mb-8 text-2xl! sm:text-3xl!">
            Related {item.category}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((r) => (
              <ItemCard key={r.id} item={r} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
