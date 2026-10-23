"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { IoAdd, IoEyeOutline, IoRefresh, IoTrashOutline } from "react-icons/io5";
import PrivateRoute from "@/components/PrivateRoute";
import { deleteItem, formatPrice, resetItems, useItems } from "@/lib/store";

function ManageTable() {
  const { items } = useItems();
  const [pending, setPending] = useState(null); // item awaiting delete confirmation

  const confirmDelete = () => {
    deleteItem(pending.id);
    toast.success(`"${pending.title}" deleted`);
    setPending(null);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">Dashboard</p>
          <h1 className="section-title">Manage Products</h1>
          <p className="mt-3 opacity-75">{items.length} products listed</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => {
              resetItems();
              toast.success("Demo data restored");
            }}
            className="btn-ghost-brand text-sm"
          >
            <IoRefresh /> Reset demo data
          </button>
          <Link href="/items/add" className="btn-brand text-sm">
            <IoAdd /> Add Product
          </Link>
        </div>
      </header>

      {items.length === 0 ? (
        <div className="glass rounded-2xl py-16 text-center">
          <p className="text-lg font-semibold">No products yet</p>
          <Link href="/items/add" className="btn-brand mt-5">Add your first product</Link>
        </div>
      ) : (
        <>
          {/* Desktop / tablet table */}
          <div className="glass hidden overflow-hidden rounded-2xl md:block">
            <table className="table">
              <thead>
                <tr className="text-sm">
                  <th>Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Location</th>
                  <th>Date</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="transition hover:bg-primary/5">
                    <td>
                      <div className="flex items-center gap-3">
                        <img src={item.image || "/fallback.png"} alt="" className="h-12 w-12 rounded-xl object-cover" onError={(e) => (e.currentTarget.src = "/fallback.png")} />
                        <div className="min-w-0">
                          <p className="font-semibold">{item.title}</p>
                          <p className="line-clamp-1 max-w-xs text-xs opacity-60">{item.shortDescription}</p>
                        </div>
                        {item.isUserAdded && <span className="badge badge-sm badge-primary badge-soft">Yours</span>}
                      </div>
                    </td>
                    <td>{item.category}</td>
                    <td className="font-semibold">{formatPrice(item.price)}</td>
                    <td>{item.location}</td>
                    <td className="whitespace-nowrap">{item.date}</td>
                    <td>
                      <div className="flex justify-end gap-2">
                        <Link href={`/items/${item.id}`} className="btn btn-sm btn-ghost rounded-full" aria-label={`View ${item.title}`}>
                          <IoEyeOutline /> View
                        </Link>
                        <button type="button" onClick={() => setPending(item)} className="btn btn-sm rounded-full border-error/30 bg-error/10 text-error hover:bg-error hover:text-white" aria-label={`Delete ${item.title}`}>
                          <IoTrashOutline /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <ul className="grid gap-4 md:hidden">
            {items.map((item) => (
              <li key={item.id} className="glass flex gap-4 rounded-2xl p-4">
                <img src={item.image || "/fallback.png"} alt="" className="h-20 w-20 shrink-0 rounded-xl object-cover" onError={(e) => (e.currentTarget.src = "/fallback.png")} />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold">{item.title}</p>
                  <p className="text-xs opacity-60">{item.category} · {item.location}</p>
                  <p className="mt-1 text-sm font-bold text-primary">{formatPrice(item.price)}</p>
                  <div className="mt-2 flex gap-2">
                    <Link href={`/items/${item.id}`} className="btn btn-xs btn-ghost rounded-full"><IoEyeOutline /> View</Link>
                    <button type="button" onClick={() => setPending(item)} className="btn btn-xs rounded-full bg-error/10 text-error"><IoTrashOutline /> Delete</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}

      {/* Delete confirmation */}
      {pending && (
        <div className="modal modal-open" role="dialog" aria-modal="true" aria-labelledby="del-title">
          <div className="modal-box rounded-3xl">
            <h3 id="del-title" className="text-lg font-bold">Delete this product?</h3>
            <p className="py-3 opacity-75">“{pending.title}” will be removed from the listings.</p>
            <div className="modal-action">
              <button type="button" className="btn btn-ghost rounded-full" onClick={() => setPending(null)} autoFocus>Cancel</button>
              <button type="button" className="btn btn-error rounded-full text-white" onClick={confirmDelete}>Delete</button>
            </div>
          </div>
          <button type="button" className="modal-backdrop" aria-label="Close" onClick={() => setPending(null)} />
        </div>
      )}
    </div>
  );
}

export default function ManageItemsPage() {
  return (
    <PrivateRoute>
      <ManageTable />
    </PrivateRoute>
  );
}
