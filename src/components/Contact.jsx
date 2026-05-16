import { useState, useRef, useMemo } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/gsap";
import { PERSONAL } from "../config/personal";

const socialLinks = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/abdul-wahab-khan-arib/",
    label: "Professional",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    url: "https://github.com/WahabKhan7528",
    label: "Code",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/nexyvora/",
    label: "Visuals",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.805.249 2.227.412.558.217.957.477 1.377.896.42.419.68.818.896 1.376.163.422.358 1.057.412 2.227.059 1.265.071 1.646.071 4.85s-.012 3.584-.071 4.85c-.054 1.17-.249 1.805-.412 2.227-.217.558-.477.957-.896 1.377-.419.42-.818.68-1.376.896-.422.163-1.057.359-2.227.412-1.266.059-1.647.071-4.85.071s-3.584-.012-4.85-.071c-1.17-.054-1.805-.249-2.227-.412-.558-.217-.957-.477-1.377-.896-.42-.419-.68-.818-.896-1.376-.163-.422-.359-1.057-.412-2.227-.059-1.266-.071-1.647-.071-4.85s.012-3.584.071-4.85c.054-1.17.249-1.805.412-2.227.217-.558.477-.957.896-1.377.419-.42.818-.68 1.376-.896.422-.163 1.057-.358 2.227-.412 1.265-.059 1.646-.071 4.85-.071zm0-2.163c-3.259 0-3.667.014-4.947.072-1.277.059-2.148.262-2.911.558-.788.306-1.457.715-2.122 1.381-.666.665-1.075 1.334-1.381 2.122-.296.763-.499 1.634-.558 2.911-.058 1.28-.072 1.688-.072 4.947s.014 3.667.072 4.947c.059 1.277.262 2.148.558 2.911.306.788.715 1.457 1.381 2.122.665.666 1.334 1.075 2.122 1.381.763.296 1.634.499 2.911.558 1.28.058 1.688.072 4.947.072s3.667-.014 4.947-.072c1.277-.059 2.148-.262 2.911-.558.788-.306 1.457-.715 2.122-1.381.666-.665 1.075-1.334 1.381-2.122.296-.763.499-1.634.558-2.911.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.059-1.277-.262-2.148-.558-2.911-.306-.788-.715-1.457-1.381-2.122-.665-.666-1.334-1.075-2.122-1.381-.763-.296-1.634-.499-2.911-.558-1.28-.058-1.688-.072-4.947-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
];

export default function Contact({ isHero = false }) {
  const container = useRef(null);
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

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
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%",
          once: true,
        }
      });

      tl.fromTo(".contact-meta",
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 1, ease: "power3.out" }
      )
        .fromTo(".contact-title",
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power4.out" },
          "-=0.6"
        )
        .fromTo(".info-item",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" },
          "-=0.4"
        )
        .fromTo(".form-container",
          { opacity: 0, scale: 0.98, y: 30 },
          { opacity: 1, scale: 1, y: 0, duration: 1, ease: "power4.out" },
          "-=0.8"
        );

      // Subtle glow animation for the glass container
      gsap.to(".glass-glow", {
        opacity: 0.6,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    },
    { scope: container }
  );

  const sanitize = (str = "") => str.replace(/<[^>]*>/g, "").trim();
  const COOLDOWN_MS = 30_000;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSubmitStatus(null);

    if (!isValid) return;

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
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        payload,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      lastSubmitRef.current = Date.now();
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section
      id="contact"
      ref={container}
      className={`relative w-full bg-black overflow-hidden flex flex-col items-center justify-center px-4 sm:px-6 md:px-12 lg:px-24 ${isHero ? 'min-h-[70vh] py-20' : 'py-32 sm:py-48'}`}
    >
      {/* Premium Background Elements */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(circle_at_50%_50%,#ffffff_0%,transparent_70%)]" />
      <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:120px_120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-24 lg:gap-32">

          {/* Left Column: Direct Info */}
          <div className="flex flex-col justify-center lg:max-w-xl">
            <div className="contact-meta flex items-center gap-4 mb-8">
              <div className="h-px w-12 bg-white/30" />
              <span className="text-[10px] font-mono tracking-[0.6em] text-white/70 uppercase">Contact</span>
            </div>

            <h2 className="contact-title text-6xl sm:text-7xl md:text-8xl font-display font-black text-white tracking-tighter leading-[0.85] mb-12">
              Let's<br />
              <span className="text-white/30 italic">connect</span>
            </h2>

            <div className="space-y-12 mb-16">
              {PERSONAL.contactMethods.map((method, idx) => (
                <div key={idx} className="info-item group">
                  <div className="text-sm font-mono text-white/70 uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-white/40 rounded-full group-hover:bg-white/80 transition-colors" />
                    {method.title}
                  </div>
                  <a
                    href={method.href}
                    className="text-xl sm:text-2xl md:text-3xl font-light text-white/90 hover:text-white transition-all flex items-center gap-3 group-hover:translate-x-2 duration-300"
                  >
                    {method.value}
                    <svg className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              ))}
            </div>

            <div className="info-item space-y-6">
              <div className="text-sm font-mono text-white/70 uppercase tracking-[0.2em]">Social</div>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((social, idx) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative p-5 border border-white/10 flex flex-col justify-between gap-6 overflow-hidden transition-all duration-500 hover:border-white/30 hover:bg-white/[0.02] rounded-none w-full sm:w-[180px]"
                    title={social.name}
                  >
                    {/* Corner Accents */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/30 group-hover:border-white transition-colors duration-300" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/30 group-hover:border-white transition-colors duration-300" />

                    {/* Header: Icon & Index */}
                    <div className="flex justify-between items-center w-full relative z-10">
                      <div className="text-white/60 group-hover:text-white transition-colors duration-300 transform group-hover:scale-110">
                        {social.icon}
                      </div>
                      <span className="text-[10px] font-mono text-white/20 group-hover:text-white/40 transition-colors">
                        [0{idx + 1}]
                      </span>
                    </div>

                    {/* Content: Name & Label */}
                    <div className="flex flex-col gap-1 relative z-10">
                      <span className="text-sm font-bold text-white group-hover:tracking-wider transition-all duration-300">
                        {social.name}
                      </span>
                      <span className="text-[9px] font-mono text-white/40 group-hover:text-white/70 transition-colors uppercase tracking-widest">
                        {social.label}
                      </span>
                    </div>

                    {/* Hover reveal background shift */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Interaction Form */}
          <div
            className="form-container relative w-full p-8 sm:p-12 md:p-16 border border-white/5 transition-all duration-700 overflow-hidden group/form hover:border-white/20 hover:bg-white/[0.04] hover:backdrop-blur-xl"
            ref={formRef}
          >
            {/* Surgical Corner Accents - Responsive to Hover */}
            <div className="corner-accent absolute -top-px -left-px w-8 h-8 border-t border-l border-white/20 group-hover/form:border-white/60 transition-colors duration-500" />
            <div className="corner-accent absolute -top-px -right-px w-8 h-8 border-t border-r border-white/20 group-hover/form:border-white/60 transition-colors duration-500" />
            <div className="corner-accent absolute -bottom-px -left-px w-8 h-8 border-b border-l border-white/20 group-hover/form:border-white/60 transition-colors duration-500" />
            <div className="corner-accent absolute -bottom-px -right-px w-8 h-8 border-b border-r border-white/20 group-hover/form:border-white/60 transition-colors duration-500" />

            {/* Hover Reveal Scanning Line */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-white/40 -translate-y-full group-hover/form:translate-y-[800px] transition-transform duration-[3s] ease-linear pointer-events-none opacity-0 group-hover/form:opacity-100" />

              <div className="flex flex-col gap-3 mb-16 relative z-10">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 bg-white/40 animate-pulse" />
                <h3 className="text-2xl font-bold text-white tracking-widest">Contact Form</h3>
              </div>
              <div className="h-0.5 w-24 bg-white/40 origin-left scale-x-0 group-hover/form:scale-x-100 transition-transform duration-700" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-14 relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                <div className="group relative">
                  <label className="absolute -top-8 left-0 text-xs sm:text-sm font-mono text-white/60 uppercase tracking-[0.3em] transition-all duration-500 group-focus-within:text-white group-focus-within:-translate-y-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border-b border-white/20 py-4 text-white text-lg font-light focus:outline-none focus:border-white/60 transition-all duration-500 placeholder-white/40"
                    placeholder="Type your name..."
                  />
                  <div className="absolute bottom-0 left-0 h-px w-0 bg-white group-focus-within:w-full transition-all duration-700" />
                </div>
                <div className="group relative">
                  <label className="absolute -top-8 left-0 text-xs sm:text-sm font-mono text-white/60 uppercase tracking-[0.3em] transition-all duration-500 group-focus-within:text-white group-focus-within:-translate-y-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border-b border-white/20 py-4 text-white text-lg font-light focus:outline-none focus:border-white/60 transition-all duration-500 placeholder-white/40"
                    placeholder="name@gateway.com"
                  />
                  <div className="absolute bottom-0 left-0 h-px w-0 bg-white group-focus-within:w-full transition-all duration-700" />
                </div>
              </div>

              <div className="group relative">
                <label className="absolute -top-8 left-0 text-xs sm:text-sm font-mono text-white/60 uppercase tracking-[0.3em] transition-all duration-500 group-focus-within:text-white group-focus-within:-translate-y-1">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-b border-white/20 py-4 text-white text-lg font-light focus:outline-none focus:border-white/60 transition-all duration-500 placeholder-white/40"
                  placeholder="What are we building?"
                />
                <div className="absolute bottom-0 left-0 h-px w-0 bg-white group-focus-within:w-full transition-all duration-700" />
              </div>

              <div className="group relative">
                <label className="absolute -top-8 left-0 text-xs sm:text-sm font-mono text-white/60 uppercase tracking-[0.3em] transition-all duration-500 group-focus-within:text-white group-focus-within:-translate-y-1">Message Payload</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full bg-transparent border-b border-white/20 py-4 text-white text-lg font-light focus:outline-none focus:border-white/60 transition-all duration-500 resize-none placeholder-white/40"
                  placeholder="Detail your requirements..."
                />
                <div className="absolute bottom-0 left-0 h-px w-0 bg-white group-focus-within:w-full transition-all duration-700" />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || submitStatus === "success" || !isValid}
                className="group relative w-full py-7 bg-transparent border border-white/20 text-white font-bold uppercase tracking-[0.5em] overflow-hidden transition-all duration-700 hover:border-white hover:text-black rounded-none"
              >
                {/* Background Inversion Layer */}
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]" />

                <div className="relative z-10 flex items-center justify-center gap-4">
                  <span className="text-xs sm:text-sm">
                    {isSubmitting ? "Sending..." : submitStatus === "success" ? "Sent" : "Send Message"}
                  </span>
                  {!isSubmitting && submitStatus !== "success" && (
                    <svg className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7-7 7" />
                    </svg>
                  )}
                </div>
              </button>
            </form>

            {/* Status Feedback / Technical Log */}
            {(submitStatus || errorMessage) && (
              <div className="mt-12 pt-8 border-t border-white/10 animate-pulse relative z-10">
                <div className={`text-xs font-mono tracking-[0.3em] flex items-center gap-3 ${submitStatus === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                  <span className={`w-2 h-2 rounded-full ${submitStatus === 'success' ? 'bg-green-400' : 'bg-red-400'} animate-ping`} />
                  {submitStatus === 'success' ? 'Message sent' : `Error: ${errorMessage}`}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Subtle Background Text */}
      <div className="absolute -bottom-20 -left-20 text-[clamp(8rem,20vw,30rem)] font-black text-white/[0.01] pointer-events-none select-none leading-none tracking-tighter uppercase">
        TRANSMIT
      </div>
    </section>
  );
}
