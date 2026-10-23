import { Suspense } from "react";
import ItemsBrowser from "./ItemsBrowser";
import Loading from "@/components/Loading";

export const metadata = { title: "Pets & Supplies" };

export default function ItemsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">Browse</p>
        <h1 className="section-title">Pets & Supplies</h1>
        <p className="mt-3 max-w-2xl opacity-75">
          Search pets available for adoption and pet-care products near you. Use the filters to narrow things down.
        </p>
      </header>
      <Suspense fallback={<Loading />}>
        <ItemsBrowser />
      </Suspense>
    </div>
  );
}
