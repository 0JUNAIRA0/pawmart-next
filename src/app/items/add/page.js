"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import PrivateRoute from "@/components/PrivateRoute";
import { useAuth } from "@/context/AuthContext";
import { addItem } from "@/lib/store";
import { CATEGORIES, LOCATIONS } from "@/data/items";

const EMPTY = {
  title: "",
  category: "",
  price: "",
  location: "",
  date: "",
  shortDescription: "",
  fullDescription: "",
  image: "",
};

function validate(v) {
  const e = {};
  if (v.title.trim().length < 3) e.title = "Title must be at least 3 characters.";
  if (!v.category) e.category = "Please choose a category.";
  if (v.price === "" || Number(v.price) < 0) e.price = "Enter a price of 0 or more (0 = free adoption).";
  if (!v.location) e.location = "Please choose a location.";
  if (!v.date) e.date = "Please pick a date.";
  if (v.shortDescription.trim().length < 10) e.shortDescription = "Short description needs at least 10 characters.";
  else if (v.shortDescription.length > 120) e.shortDescription = "Keep it under 120 characters.";
  if (v.fullDescription.trim().length < 30) e.fullDescription = "Full description needs at least 30 characters.";
  if (v.image && !/^https?:\/\/\S+$/i.test(v.image.trim())) e.image = "Enter a valid URL starting with http(s)://";
  return e;
}

function Field({ label, name, error, hint, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-semibold">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${name}-error`} className="text-xs text-error">{error}</p>
      ) : hint ? (
        <p className="text-xs opacity-60">{hint}</p>
      ) : null}
    </div>
  );
}

function AddItemForm() {
  const { user } = useAuth();
  const [values, setValues] = useState(EMPTY);
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [lastAdded, setLastAdded] = useState(null);

  const errors = validate(values);
  const show = (name) => (touched[name] ? errors[name] : undefined);

  const onChange = (e) => setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
  const onBlur = (e) => setTouched((t) => ({ ...t, [e.target.name]: true }));

  const inputProps = (name) => ({
    id: name,
    name,
    value: values[name],
    onChange,
    onBlur,
    "aria-invalid": !!show(name),
    "aria-describedby": show(name) ? `${name}-error` : undefined,
  });

  const errCls = (name) => (show(name) ? "border-error! focus:outline-error/40!" : "");

  const onSubmit = async (e) => {
    e.preventDefault();
    setTouched(Object.fromEntries(Object.keys(EMPTY).map((k) => [k, true])));
    if (Object.keys(errors).length) {
      toast.error("Please fix the highlighted fields.");
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 600)); // small delay so the loading state is visible
    const item = addItem({
      ...values,
      title: values.title.trim(),
      price: Number(values.price),
      image: values.image.trim(),
      shortDescription: values.shortDescription.trim(),
      fullDescription: values.fullDescription.trim(),
      specs: { Category: values.category, Location: values.location },
      ownerEmail: user?.email,
    });
    setSubmitting(false);
    setValues(EMPTY);
    setTouched({});
    setLastAdded(item);
    toast.success(`"${item.title}" was added!`);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <header className="mb-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">New listing</p>
        <h1 className="section-title">Add a Product</h1>
        <p className="mt-3 opacity-75">List a pet for adoption or a product for sale. Fields marked with validation will guide you.</p>
      </header>

      {lastAdded && (
        <div role="status" className="alert alert-success mb-6 rounded-2xl">
          <span>
            Listing added successfully.{" "}
            <Link href={`/items/${lastAdded.id}`} className="font-semibold underline">View it</Link> or{" "}
            <Link href="/items/manage" className="font-semibold underline">manage products</Link>.
          </span>
        </div>
      )}

      <form onSubmit={onSubmit} noValidate className="glass space-y-5 rounded-3xl p-6 sm:p-8">
        <Field label="Title" name="title" error={show("title")}>
          <input {...inputProps("title")} className={`input-brand ${errCls("title")}`} placeholder="e.g. Golden Retriever Puppy" />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Category" name="category" error={show("category")}>
            <select {...inputProps("category")} className={`select w-full rounded-xl bg-base-100/70 ${errCls("category")}`}>
              <option value="" disabled>Select a category</option>
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="Price (৳)" name="price" error={show("price")} hint="Use 0 for free adoption.">
            <input {...inputProps("price")} type="number" min="0" className={`input-brand ${errCls("price")}`} placeholder="0" />
          </Field>
          <Field label="Location" name="location" error={show("location")}>
            <select {...inputProps("location")} className={`select w-full rounded-xl bg-base-100/70 ${errCls("location")}`}>
              <option value="" disabled>Select a city</option>
              {LOCATIONS.map((l) => <option key={l}>{l}</option>)}
            </select>
          </Field>
          <Field label="Available from" name="date" error={show("date")}>
            <input {...inputProps("date")} type="date" className={`input-brand ${errCls("date")}`} />
          </Field>
        </div>

        <Field label="Short description" name="shortDescription" error={show("shortDescription")} hint={`${values.shortDescription.length}/120 characters — shown on cards.`}>
          <input {...inputProps("shortDescription")} maxLength={140} className={`input-brand ${errCls("shortDescription")}`} placeholder="One line that sums it up" />
        </Field>

        <Field label="Full description" name="fullDescription" error={show("fullDescription")}>
          <textarea {...inputProps("fullDescription")} rows={5} className={`textarea w-full rounded-xl bg-base-100/70 focus:border-primary ${errCls("fullDescription")}`} placeholder="Personality, condition, what's included, etc." />
        </Field>

        <Field label="Image URL (optional)" name="image" error={show("image")} hint="Paste a direct image link (e.g. from imgbb).">
          <input {...inputProps("image")} type="url" className={`input-brand ${errCls("image")}`} placeholder="https://…" />
        </Field>

        {values.image && !errors.image && (
          <img src={values.image} alt="Preview" className="h-40 w-full rounded-2xl object-cover" onError={(e) => (e.currentTarget.style.display = "none")} />
        )}

        <button type="submit" disabled={submitting} className="btn-brand w-full py-3!">
          {submitting && <span className="loading loading-spinner loading-sm" />}
          {submitting ? "Adding…" : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default function AddItemPage() {
  return (
    <PrivateRoute>
      <AddItemForm />
    </PrivateRoute>
  );
}
