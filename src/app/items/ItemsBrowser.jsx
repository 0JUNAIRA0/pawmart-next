"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { IoCloseCircle, IoSearch } from "react-icons/io5";
import ItemCard from "@/components/ItemCard";
import { useItems } from "@/lib/store";
import { CATEGORIES, LOCATIONS, PRICE_RANGES } from "@/data/items";

const SORTS = {
  newest: (a, b) => b.date.localeCompare(a.date),
  "price-asc": (a, b) => a.price - b.price,
  "price-desc": (a, b) => b.price - a.price,
  rating: (a, b) => (b.rating || 0) - (a.rating || 0),
};

export default function ItemsBrowser() {
  const params = useSearchParams();
  const { items } = useItems();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(() => {
    const c = params.get("category");
    return CATEGORIES.includes(c) ? c : "all";
  });
  const [price, setPrice] = useState("all");
  const [location, setLocation] = useState("all");
  const [sort, setSort] = useState("newest");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const range = PRICE_RANGES.find((r) => r.value === price);
    return items
      .filter((i) => !q || `${i.title} ${i.shortDescription} ${i.category}`.toLowerCase().includes(q))
      .filter((i) => category === "all" || i.category === category)
      .filter((i) => location === "all" || i.location === location)
      .filter((i) => !range || range.value === "all" || (i.price >= range.min && i.price <= range.max))
      .sort(SORTS[sort]);
  }, [items, search, category, price, location, sort]);

  const hasFilters = search || category !== "all" || price !== "all" || location !== "all";
  const clearAll = () => {
    setSearch("");
    setCategory("all");
    setPrice("all");
    setLocation("all");
  };

  const selectClass = "select w-full rounded-xl bg-base-100/70 focus:border-primary focus:outline-primary/40";

  return (
    <>
      <div className="glass mb-8 rounded-2xl p-4 sm:p-5">
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr]">
          <label className="input w-full rounded-xl bg-base-100/70 focus-within:border-primary focus-within:outline-primary/40">
            <IoSearch className="opacity-60" />
            <input
              type="search"
              placeholder="Search pets, food, accessories…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search items"
              className="grow"
            />
          </label>
          <select className={selectClass} value={category} onChange={(e) => setCategory(e.target.value)} aria-label="Filter by category">
            <option value="all">All categories</option>
            {CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <select className={selectClass} value={price} onChange={(e) => setPrice(e.target.value)} aria-label="Filter by price">
            {PRICE_RANGES.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
          <select className={selectClass} value={location} onChange={(e) => setLocation(e.target.value)} aria-label="Filter by location">
            <option value="all">All locations</option>
            {LOCATIONS.map((l) => (
              <option key={l}>{l}</option>
            ))}
          </select>
          <select className={selectClass} value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort items">
            <option value="newest">Newest first</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="rating">Top rated</option>
          </select>
        </div>
      </div>

      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm opacity-75" aria-live="polite">
          Showing <span className="font-semibold text-base-content">{filtered.length}</span> of {items.length} items
        </p>
        {hasFilters && (
          <button type="button" onClick={clearAll} className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
            <IoCloseCircle /> Clear filters
          </button>
        )}
      </div>

      {filtered.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="glass flex flex-col items-center rounded-2xl px-6 py-16 text-center">
          <span className="text-5xl">🐾</span>
          <h2 className="mt-4 text-xl font-bold">No items match your search</h2>
          <p className="mt-2 opacity-70">Try a different keyword or clear the filters.</p>
          <button type="button" onClick={clearAll} className="btn-brand mt-6">
            Clear filters
          </button>
        </div>
      )}
    </>
  );
}
