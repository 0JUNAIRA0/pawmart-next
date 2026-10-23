"use client";

import { useSyncExternalStore } from "react";
import { SEED_ITEMS } from "@/data/items";

const ADDED_KEY = "pawmart_added_items";
const DELETED_KEY = "pawmart_deleted_ids";
const EVENT = "pawmart-items-change";

function read(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || "[]");
  } catch {
    return [];
  }
}

function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage full or blocked; ignore
  }
  window.dispatchEvent(new Event(EVENT));
}

// ---- external store (cached so React gets a stable snapshot) ----
let cacheKey = null;
let cacheValue = SEED_ITEMS;

function getSnapshot() {
  let raw = "";
  try {
    raw = (localStorage.getItem(ADDED_KEY) || "") + "|" + (localStorage.getItem(DELETED_KEY) || "");
  } catch {
    return SEED_ITEMS;
  }
  if (raw !== cacheKey) {
    cacheKey = raw;
    const deleted = new Set(read(DELETED_KEY));
    cacheValue = [...read(ADDED_KEY), ...SEED_ITEMS].filter((i) => !deleted.has(i.id));
  }
  return cacheValue;
}

function getServerSnapshot() {
  return SEED_ITEMS;
}

function subscribe(callback) {
  window.addEventListener("storage", callback);
  window.addEventListener(EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(EVENT, callback);
  };
}

const noopSubscribe = () => () => {};

/** All items (user-added first, then seed), minus deleted ones. */
export function useItems() {
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  // `ready` is false during SSR/hydration, true once localStorage has been read.
  const ready = useSyncExternalStore(noopSubscribe, () => true, () => false);
  return { items, ready };
}

export function addItem(data) {
  const item = {
    ...data,
    id: `user-${Date.now().toString(36)}`,
    date: data.date || new Date().toISOString().slice(0, 10),
    rating: 0,
    isUserAdded: true,
  };
  write(ADDED_KEY, [item, ...read(ADDED_KEY)]);
  return item;
}

export function deleteItem(id) {
  const added = read(ADDED_KEY);
  if (added.some((i) => i.id === id)) {
    write(ADDED_KEY, added.filter((i) => i.id !== id));
  } else {
    write(DELETED_KEY, [...new Set([...read(DELETED_KEY), id])]);
  }
}

export function resetItems() {
  write(ADDED_KEY, []);
  write(DELETED_KEY, []);
}

export const formatPrice = (price) =>
  Number(price) === 0 ? "Free adoption" : `৳ ${Number(price).toLocaleString("en-US")}`;
