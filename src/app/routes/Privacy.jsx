import React from "react";
import { PERSONAL } from "@/config/personal";

export default function Privacy() {
  return (
    <main className="max-w-4xl mx-auto px-4 pt-40 md:pt-48 pb-16">
      <h1 className="text-3xl sm:text-4xl font-black mb-6">Privacy Policy</h1>

      <p className="mb-4 text-white/80">
        This Privacy Policy explains how {PERSONAL.name} collects, processes, and protects personal data submitted through this website. It describes what is collected, why, how long it is retained, and your rights with respect to your data.
      </p>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Personal data we collect</h2>
        <ul className="list-disc ml-6 text-white/70">
          <li>Contact information you provide (name, email, message) when using the contact form or requesting materials.</li>
          <li>Automatically collected analytics data (IP-derived region, device type, page views) used for performance and debugging.</li>
          <li>Optional files you upload when responding to hiring or project forms.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">How we use your data</h2>
        <p className="text-white/70">Collected data is used to reply to inquiries, send requested documents (resumes, proposals), improve site performance, and prevent abuse. We do not sell or rent personal information to third parties.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Analytics and cookies</h2>
        <p className="text-white/70">The site may use minimal analytics (e.g., Google Analytics or Plausible) to measure traffic and performance. These tools aggregate data and can be opted out of via your browser settings. Cookies used are strictly for session management and analytics.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Data retention & security</h2>
        <p className="text-white/70">Personal data submitted via the contact form will be retained only as long as necessary to respond to the request and any related follow-up (typically up to 2 years), unless a longer retention is required by law. Reasonable administrative and technical safeguards are used to protect data; however no internet transmission is 100% secure.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Your rights</h2>
        <p className="text-white/70">You have the right to request access to, rectification, or deletion of your personal data. To exercise these rights, contact {PERSONAL.name} at <a className="underline" href={`mailto:${PERSONAL.email}`}>{PERSONAL.email}</a>. We will respond within a reasonable timeframe.</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Contact</h2>
        <p className="text-white/70">Questions or requests related to this policy can be sent to <a className="underline" href={`mailto:${PERSONAL.email}`}>{PERSONAL.email}</a>.</p>
      </section>
    </main>
  );
}
