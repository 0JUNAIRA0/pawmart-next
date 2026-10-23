import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <p className="gradient-text text-8xl font-extrabold">404</p>
      <h1 className="mt-4 text-2xl font-bold">This page wandered off 🐾</h1>
      <p className="mt-2 opacity-70">We couldn’t find the page you’re looking for.</p>
      <Link href="/" className="btn-brand mt-8">Back to home</Link>
    </div>
  );
}
