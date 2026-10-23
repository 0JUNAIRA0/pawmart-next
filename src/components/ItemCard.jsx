"use client";

import Link from "next/link";
import { IoLocationOutline, IoStar } from "react-icons/io5";
import { formatPrice } from "@/lib/store";

const badgeColors = {
  Pets: "text-emerald-700 dark:text-emerald-300",
  "Pet Food": "text-amber-700 dark:text-amber-300",
  Accessories: "text-sky-700 dark:text-sky-300",
  "Care Products": "text-fuchsia-700 dark:text-fuchsia-300",
};

export default function ItemCard({ item }) {
  return (
    <article className="glass card-hover group flex h-full flex-col overflow-hidden rounded-2xl">
      <div className="relative aspect-4/3 overflow-hidden bg-base-200">
        <img
          src={item.image || "/fallback.png"}
          alt={item.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => (e.currentTarget.src = "/fallback.png")}
        />
        <span className={`absolute left-3 top-3 rounded-full px-3 py-1 bg-base-100/90 text-xs font-semibold shadow-sm backdrop-blur ${badgeColors[item.category] || "text-primary"}`}>
          {item.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="line-clamp-1 text-lg font-bold">{item.title}</h3>
          {item.rating > 0 && (
            <span className="flex shrink-0 items-center gap-1 text-sm font-medium">
              <IoStar className="text-amber-400" /> {item.rating}
            </span>
          )}
        </div>
        <p className="line-clamp-2 min-h-10 text-sm opacity-75">{item.shortDescription}</p>
        <div className="mt-1 flex items-center justify-between text-sm">
          <span className="font-bold text-primary">{formatPrice(item.price)}</span>
          <span className="flex items-center gap-1 opacity-70">
            <IoLocationOutline /> {item.location}
          </span>
        </div>
        <Link href={`/items/${item.id}`} className="btn-brand mt-auto w-full text-sm" aria-label={`View details of ${item.title}`}>
          View Details
        </Link>
      </div>
    </article>
  );
}
