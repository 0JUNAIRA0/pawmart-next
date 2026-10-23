"use client";

import Link from "next/link";
import { IoArrowForward } from "react-icons/io5";
import ItemCard from "@/components/ItemCard";
import { useItems } from "@/lib/store";

export default function FeaturedItems() {
  const { items } = useItems();
  const featured = [...items].sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 4);

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8" aria-labelledby="featured-title">
      <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">Top rated</p>
          <h2 id="featured-title" className="section-title">Featured Pets & Supplies</h2>
          <p className="mt-3 max-w-xl opacity-75">Hand-picked listings our community loves the most this week.</p>
        </div>
        <Link href="/items" className="btn-ghost-brand text-sm">
          View all <IoArrowForward />
        </Link>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
