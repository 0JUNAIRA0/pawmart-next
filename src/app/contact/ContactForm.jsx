"use client";

import toast from "react-hot-toast";

export default function ContactForm() {
  const onSubmit = (e) => {
    e.preventDefault();
    toast.success("Thanks! Your message has been received.");
    e.currentTarget.reset();
  };

  return (
    <form onSubmit={onSubmit} className="glass space-y-4 rounded-3xl p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm font-semibold">
          Name
          <input required name="name" className="input-brand font-normal" placeholder="Your name" />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-semibold">
          Email
          <input required type="email" name="email" className="input-brand font-normal" placeholder="you@example.com" />
        </label>
      </div>
      <label className="flex flex-col gap-1.5 text-sm font-semibold">
        Message
        <textarea required name="message" rows={5} className="textarea w-full rounded-xl bg-base-100/70 font-normal focus:border-primary" placeholder="How can we help?" />
      </label>
      <button type="submit" className="btn-brand w-full py-3!">Send message</button>
    </form>
  );
}
