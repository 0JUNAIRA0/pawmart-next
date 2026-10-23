"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { IoAddCircleOutline, IoClose, IoListOutline, IoLogOutOutline, IoMenu } from "react-icons/io5";
import { useAuth } from "@/context/AuthContext";
import ThemeToggle from "./ThemeToggle";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/items", label: "Pets & Supplies" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-1.5 text-xl font-extrabold tracking-tight">
      <img src="/pawprint.png" alt="" className="h-7 w-7" />
      <span className="gradient-text">PawMart</span>
    </Link>
  );
}

export default function Navbar() {
  const { user, loading, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // close menus on outside click / Escape
  useEffect(() => {
    const onClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const closeAll = () => {
    setMenuOpen(false);
    setMobileOpen(false);
  };

  const isActive = (href) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/"));

  const handleLogout = async () => {
    closeAll();
    await logout();
    toast.success("Logged out");
    router.push("/");
  };

  const linkClass = (href) =>
    `relative rounded-full px-3 py-2 text-sm font-medium transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-primary ${
      isActive(href) ? "text-primary" : ""
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-base-content/5 bg-base-100/75 backdrop-blur-lg">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8" aria-label="Main">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="btn btn-ghost btn-circle btn-sm text-2xl lg:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? <IoClose /> : <IoMenu />}
          </button>
          <Logo />
        </div>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className={linkClass(l.href)} aria-current={isActive(l.href) ? "page" : undefined}>
                {l.label}
                {isActive(l.href) && <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-primary" />}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {loading ? (
            <span className="skeleton h-9 w-9 rounded-full" />
          ) : user ? (
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                onClick={() => setMenuOpen((o) => !o)}
                aria-haspopup="menu"
                aria-expanded={menuOpen}
                className="flex items-center gap-2 rounded-full border border-base-content/10 p-0.5 pr-3 transition hover:border-primary/50 focus-visible:outline-2 focus-visible:outline-primary"
              >
                <img
                  src={user.photoURL || "/avatar.png"}
                  alt=""
                  referrerPolicy="no-referrer"
                  className="h-8 w-8 rounded-full object-cover"
                  onError={(e) => (e.currentTarget.src = "/avatar.png")}
                />
                <span className="hidden max-w-28 truncate text-sm font-medium sm:inline">
                  {user.displayName?.split(" ")[0] || "Account"}
                </span>
              </button>

              {menuOpen && (
                <div role="menu" className="glass fade-up absolute right-0 mt-3 w-64 overflow-hidden rounded-2xl bg-base-100/95 p-2">
                  <div className="border-b border-base-content/10 px-3 pb-3 pt-2">
                    <p className="truncate font-semibold">{user.displayName || "PawMart member"}</p>
                    <p className="truncate text-xs opacity-70">{user.email}</p>
                  </div>
                  <Link role="menuitem" href="/items/add" onClick={closeAll} className="mt-1 flex items-center gap-2 rounded-xl px-3 py-2 text-sm hover:bg-primary/10 hover:text-primary">
                    <IoAddCircleOutline className="text-lg" /> Add Product
                  </Link>
                  <Link role="menuitem" href="/items/manage" onClick={closeAll} className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm hover:bg-primary/10 hover:text-primary">
                    <IoListOutline className="text-lg" /> Manage Products
                  </Link>
                  <button role="menuitem" type="button" onClick={handleLogout} className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm text-error hover:bg-error/10">
                    <IoLogOutOutline className="text-lg" /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/login" className="hidden rounded-full px-4 py-2 text-sm font-semibold transition hover:text-primary sm:inline-flex">
                Login
              </Link>
              <Link href="/register" className="btn-brand px-5! py-2! text-sm">
                Register
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fade-up border-t border-base-content/5 bg-base-100/95 px-4 pb-4 lg:hidden">
          <ul className="flex flex-col gap-1 pt-2">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={closeAll}
                  className={`block rounded-xl px-3 py-2.5 font-medium hover:bg-primary/10 ${isActive(l.href) ? "bg-primary/10 text-primary" : ""}`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            {!user && !loading && (
              <li>
                <Link href="/login" onClick={closeAll} className="block rounded-xl px-3 py-2.5 font-medium hover:bg-primary/10">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
}
