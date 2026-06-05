import React from "react";
import { PERSONAL } from "@/config/personal";

export default function Terms() {
  return (
    <main className="max-w-4xl mx-auto px-4 pt-40 md:pt-48 pb-16">
      <h1 className="text-3xl sm:text-4xl font-black mb-6">Terms of Service</h1>

      <p className="mb-4 text-white/80">These Terms govern your access to and use of this website. By using the site you agree to these Terms. If you do not agree, please do not use the site.</p>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Content and intellectual property</h2>
        <p className="text-white/70">All content on this site (text, images, code samples) is the intellectual property of {PERSONAL.name} unless otherwise noted. You may view and share content for non-commercial purposes, but reproduction or redistribution requires permission.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Project engagements</h2>
        <p className="text-white/70">Any project engagement, estimate, or proposal communicated via this site is non-binding until a written agreement is signed. Deliverables, timelines, and payment terms are defined in separate contracts.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Disclaimer & limitation of liability</h2>
        <p className="text-white/70">The site is provided 'as is' without warranties of any kind. To the fullest extent permitted by law, {PERSONAL.name} disclaims liability for any direct, indirect, or consequential losses arising from the use of this site.</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Governing law & contact</h2>
        <p className="text-white/70">These Terms are governed by the laws of Pakistan. For questions about these Terms or to request permissions, contact <a className="underline" href={`mailto:${PERSONAL.email}`}>{PERSONAL.email}</a>.</p>
      </section>
    </main>
  );
}
