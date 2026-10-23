"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { authErrorMessage, useAuth } from "@/context/AuthContext";
import { firebaseConfigured } from "@/lib/firebase";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(mode, v) {
  const e = {};
  if (mode === "register" && v.name.trim().length < 2) e.name = "Please enter your name.";
  if (!EMAIL_RE.test(v.email)) e.email = "Enter a valid email address.";
  if (mode === "register") {
    if (v.password.length < 6) e.password = "At least 6 characters.";
    else if (!/[A-Z]/.test(v.password) || !/[a-z]/.test(v.password)) e.password = "Use both uppercase and lowercase letters.";
    if (v.photoURL && !/^https?:\/\/\S+$/i.test(v.photoURL)) e.photoURL = "Enter a valid URL.";
  } else if (!v.password) {
    e.password = "Please enter your password.";
  }
  return e;
}

export default function AuthForm({ mode }) {
  const isRegister = mode === "register";
  const { user, loading, login, register, loginWithGoogle } = useAuth();
  const router = useRouter();
  const params = useSearchParams();
  const redirectTo = params.get("redirect")?.startsWith("/") ? params.get("redirect") : "/";

  const [values, setValues] = useState({ name: "", photoURL: "", email: "", password: "" });
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [formError, setFormError] = useState("");

  // already signed in → leave the auth page
  useEffect(() => {
    if (!loading && user && !submitting) router.replace(redirectTo);
  }, [loading, user, submitting, router, redirectTo]);

  const errors = validate(mode, values);
  const show = (n) => (touched[n] ? errors[n] : undefined);
  const onChange = (e) => {
    setFormError("");
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
  };
  const onBlur = (e) => setTouched((t) => ({ ...t, [e.target.name]: true }));

  const done = (msg) => {
    toast.success(msg);
    router.replace(redirectTo);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setTouched({ name: true, photoURL: true, email: true, password: true });
    if (Object.keys(errors).length) return;
    setSubmitting(true);
    try {
      if (isRegister) {
        await register(values.name.trim(), values.email, values.password, values.photoURL.trim());
        done("Account created — welcome to PawMart!");
      } else {
        await login(values.email, values.password);
        done("Welcome back!");
      }
    } catch (err) {
      setFormError(authErrorMessage(err));
      setSubmitting(false);
    }
  };

  const onGoogle = async () => {
    setSubmitting(true);
    try {
      await loginWithGoogle();
      done("Signed in with Google");
    } catch (err) {
      setFormError(authErrorMessage(err));
      setSubmitting(false);
    }
  };

  const field = (name, label, props = {}) => (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-semibold">{label}</label>
      <input
        id={name}
        name={name}
        value={values[name]}
        onChange={onChange}
        onBlur={onBlur}
        aria-invalid={!!show(name)}
        aria-describedby={show(name) ? `${name}-error` : undefined}
        className={`input-brand ${show(name) ? "border-error!" : ""}`}
        {...props}
      />
      {show(name) && <p id={`${name}-error`} className="text-xs text-error">{show(name)}</p>}
    </div>
  );

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <div className="glass fade-up w-full max-w-md rounded-3xl p-7 sm:p-9">
        <div className="mb-7 text-center">
          <img src="/pawprint.png" alt="" className="mx-auto mb-3 h-10 w-10" />
          <h1 className="text-2xl font-extrabold">{isRegister ? "Create your account" : "Welcome back"}</h1>
          <p className="mt-1 text-sm opacity-70">
            {isRegister ? "Join PawMart to list and manage products." : "Login to add and manage your products."}
          </p>
        </div>

        {!firebaseConfigured && (
          <div role="status" className="alert alert-info alert-soft mb-5 rounded-2xl text-sm">
            Preview mode: you can browse the site, but sign-in is unavailable right now.
          </div>
        )}

        {formError && (
          <div role="alert" className="alert alert-error alert-soft mb-5 rounded-2xl text-sm">{formError}</div>
        )}

        <form onSubmit={onSubmit} noValidate className="space-y-4">
          {isRegister && field("name", "Full name", { autoComplete: "name", placeholder: "Your name" })}
          {isRegister && field("photoURL", "Photo URL (optional)", { type: "url", placeholder: "https://…" })}
          {field("email", "Email", { type: "email", autoComplete: "email", placeholder: "you@example.com" })}

          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-sm font-semibold">Password</label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPw ? "text" : "password"}
                value={values.password}
                onChange={onChange}
                onBlur={onBlur}
                autoComplete={isRegister ? "new-password" : "current-password"}
                aria-invalid={!!show("password")}
                aria-describedby={show("password") ? "password-error" : undefined}
                className={`input-brand pr-11 ${show("password") ? "border-error!" : ""}`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPw((s) => !s)}
                aria-label={showPw ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 z-10 -translate-y-1/2 text-lg opacity-60 hover:opacity-100"
              >
                {showPw ? <IoEyeOffOutline /> : <IoEyeOutline />}
              </button>
            </div>
            {show("password") ? (
              <p id="password-error" className="text-xs text-error">{show("password")}</p>
            ) : isRegister ? (
              <p className="text-xs opacity-60">6+ characters with uppercase and lowercase letters.</p>
            ) : null}
          </div>

          <button type="submit" disabled={submitting || !firebaseConfigured} className="btn-brand w-full py-3!">
            {submitting && <span className="loading loading-spinner loading-sm" />}
            {isRegister ? "Register" : "Login"}
          </button>
        </form>

        <div className="divider my-6 text-xs opacity-60">OR</div>

        <button
          type="button"
          onClick={onGoogle}
          disabled={submitting || !firebaseConfigured}
          className="flex w-full items-center justify-center gap-2 rounded-full border border-base-content/15 bg-base-100 py-3 font-semibold transition hover:border-primary/50 hover:shadow-md disabled:opacity-60"
        >
          <FcGoogle className="text-xl" /> Continue with Google
        </button>

        <p className="mt-6 text-center text-sm opacity-80">
          {isRegister ? "Already have an account? " : "New to PawMart? "}
          <Link
            href={`${isRegister ? "/login" : "/register"}${redirectTo !== "/" ? `?redirect=${encodeURIComponent(redirectTo)}` : ""}`}
            className="font-semibold text-primary hover:underline"
          >
            {isRegister ? "Login" : "Create an account"}
          </Link>
        </p>
      </div>
    </div>
  );
}
