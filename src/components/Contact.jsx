import { useState, useRef, useMemo } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "../lib/gsap";
import { PERSONAL } from "../config/personal";

const socialLinks = [
  {
    name: "Instagram",
    url: "https://www.instagram.com/nexyvora/",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5a4.25 4.25 0 004.25-4.25v-8.5A4.25 4.25 0 0016.25 3.5h-8.5zm8.75 2a1 1 0 110 2 1 1 0 010-2zM12 7a5 5 0 110 10 5 5 0 010-10zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/abdul-wahab-khan-arib/",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    url: "https://github.com/WahabKhan7528",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
];

const contactMethods = PERSONAL.contactMethods;

export default function Contact() {
  const container = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [focusedField, setFocusedField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const lastSubmitRef = useRef(0);

  const isValid = useMemo(() => {
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return (
      formData.name.trim().length > 1 &&
      emailRe.test(formData.email) &&
      formData.subject.trim().length > 2 &&
      formData.message.trim().length > 5
    );
  }, [formData]);

  useGSAP(
    () => {
      const section = container.current;

      gsap.fromTo(
        ".contact-title",
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: { trigger: section, start: "top 80%", once: true },
        },
      );

      const methods = gsap.utils.toArray(".contact-method");
      gsap.fromTo(
        methods,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "expo.out",
          stagger: 0.1,
          scrollTrigger: { trigger: section, start: "top 80%", once: true },
        },
      );

      gsap.fromTo(
        ".social-section",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: "expo.out",
          delay: 0.2,
          scrollTrigger: { trigger: section, start: "top 80%", once: true },
        },
      );

      gsap.fromTo(
        ".availability-badge",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: "expo.out",
          delay: 0.3,
          scrollTrigger: { trigger: section, start: "top 80%", once: true },
        },
      );

      gsap.fromTo(
        ".contact-form-container",
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: { trigger: section, start: "top 80%", once: true },
        },
      );

      gsap.fromTo(
        ".contact-footer",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: ".contact-footer",
            start: "top 90%",
            once: true,
          },
        },
      );
    },
    { scope: container },
  );

  const sanitize = (str = "") => str.replace(/<[^>]*>/g, "").trim();
  const COOLDOWN_MS = 30_000;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSubmitStatus(null);

    if (!isValid) {
      setErrorMessage("Please fill in all fields with valid information.");
      return;
    }

    const now = Date.now();
    if (now - lastSubmitRef.current < COOLDOWN_MS) {
      setErrorMessage("Please wait a moment before sending another message.");
      return;
    }

    setIsSubmitting(true);

    const payload = {
      name: sanitize(formData.name),
      email: sanitize(formData.email),
      subject: sanitize(formData.subject),
      message: sanitize(formData.message),
    };

    try {
      const emailjs = await import("@emailjs/browser");
      if (emailjs.init) {
        try {
          emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
        } catch (e) {
          // init might not be required; ignore init failures
        }
      }

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        payload,
      );

      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      lastSubmitRef.current = Date.now();
    } catch (error) {
      console.error("EmailJS Error (dev):", error);
      setSubmitStatus("error");
      setErrorMessage(
        "Unable to send message right now. Please try again later.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section
      id="contact"
      ref={container}
      className="contact-section section-padding min-h-screen flex items-center relative overflow-hidden py-20 sm:py-24"
    >
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-125 h-125 bg-white/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10 px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-16">
          <div className="lg:col-span-2 flex flex-col justify-between gap-12 lg:gap-0">
            <div>
              <div className="contact-title">
                <h2 className="text-5xl sm:text-6xl md:text-[80px] lg:text-[100px] font-display font-black leading-[0.9] tracking-tighter mb-6 sm:mb-8 text-white">
                  LET'S
                  <br />
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-white via-white/80 to-white/40">
                    TALK.
                  </span>
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-gray-400 font-light max-w-md leading-relaxed mb-10 sm:mb-16">
                  Have a project in mind? Let's discuss how we can work together
                  to bring your vision to life.
                </p>
              </div>

              <div className="space-y-6 sm:space-y-8 mb-12 sm:mb-16">
                {contactMethods.map((method) => (
                  <div key={method.title} className="contact-method group">
                    <div className="text-[10px] tracking-[0.3em] uppercase text-gray-500 mb-2 font-bold">
                      {method.title}
                    </div>
                    <a
                      href={method.href}
                      className="text-lg sm:text-xl md:text-2xl font-light text-white hover:text-gray-300 transition-colors inline-block relative overflow-hidden break-all sm:break-normal"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {method.value}
                      <span className="absolute bottom-0 left-0 w-full h-px bg-white transform origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="social-section mb-8">
                <div className="text-[10px] tracking-[0.3em] uppercase text-gray-500 mb-4 font-bold">
                  Socials
                </div>
                <div className="flex flex-wrap gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300 hover:scale-105"
                      title={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-container lg:col-span-3 lg:pl-12 flex flex-col justify-center">
            <form
              onSubmit={handleSubmit}
              className="space-y-6 lg:space-y-10 relative z-10 w-full max-w-2xl ml-0 lg:ml-auto"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-10">
                <div className="relative group">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border-b border-white/20 py-4 text-white text-base sm:text-lg font-light placeholder:text-gray-600 focus:outline-none focus:border-white transition-colors"
                    placeholder="What's your name?"
                  />
                </div>

                <div className="relative group">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border-b border-white/20 py-4 text-white text-base sm:text-lg font-light placeholder:text-gray-600 focus:outline-none focus:border-white transition-colors"
                    placeholder="Your email address"
                  />
                </div>
              </div>

              <div className="relative group">
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-b border-white/20 py-4 text-white text-base sm:text-lg font-light placeholder:text-gray-600 focus:outline-none focus:border-white transition-colors"
                  placeholder="Subject"
                />
              </div>

              <div className="relative group">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full bg-transparent border-b border-white/20 py-4 text-white text-base sm:text-lg font-light placeholder:text-gray-600 focus:outline-none focus:border-white transition-colors resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <div className="pt-8">
                <button
                  type="submit"
                  disabled={
                    isSubmitting || submitStatus === "success" || !isValid
                  }
                  className="w-full md:w-auto px-12 py-5 rounded-full bg-white text-black font-bold text-xs tracking-[0.2em] uppercase transition-all flex items-center justify-center gap-4 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
                >
                  <span>
                    {isSubmitting
                      ? "Sending..."
                      : submitStatus === "success"
                        ? "Message Sent"
                        : "Send Message"}
                  </span>
                  {!isSubmitting && submitStatus !== "success" && (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  )}
                </button>
              </div>

              <div
                className={`transition-all duration-500 overflow-hidden ${submitStatus === "success" ? "max-h-24 opacity-100" : "max-h-0 opacity-0"}`}
              >
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3 mt-4">
                  <span className="text-sm text-gray-300 font-light">
                    Thank you! Your message has been sent successfully. I'll get
                    back to you soon.
                  </span>
                </div>
              </div>
              {errorMessage && (
                <div className="text-sm text-red-400 mt-2">{errorMessage}</div>
              )}
            </form>
          </div>
        </div>

        <footer className="contact-footer mt-20 sm:mt-32 pt-10 sm:pt-12 border-t border-white/10 opacity-0">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6 text-center md:text-left">
            <p className="text-sm text-gray-500">
              © 2026 ABDUL WAHAB KHAN ARIB
            </p>
            <p className="text-sm text-gray-500">All rights reserved.</p>
          </div>
        </footer>
      </div>
    </section>
  );
}
