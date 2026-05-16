import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/gsap";

export default function ContactFAQ() {
  const container = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 95%",
        once: true
      }
    });

    tl.fromTo(".faq-meta",
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 1, ease: "power3.out" }
    )
      .fromTo(".faq-title",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power4.out" },
        "-=0.6"
      )
      .fromTo(".status-node",
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8, stagger: 0.1, ease: "back.out(1.7)" },
        "-=0.4"
      )
      .fromTo(".faq-item",
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.8, stagger: 0.12, ease: "power3.out" },
        "-=0.6"
      );

    // Subtle background scanning effect
    gsap.to(".bg-scan-line", {
      y: "100%",
      duration: 10,
      repeat: -1,
      ease: "none",
    });

  }, { scope: container });

  const faqs = [
    {
      q: "What tech do you use?",
      a: "I work mainly with React and Node.js. I use Tailwind for styling and GSAP for animations.",
      id: "Q1",
      status: "Ready"
    },
    {
      q: "How can I reach you?",
      a: "Use this form or reach out via email or social links. I usually reply within 24–48 hours.",
      id: "Q2",
      status: "Active"
    },
    {
      q: "How long do projects take?",
      a: "Small projects can take about 2 weeks. Larger projects often take 4–8 weeks depending on scope.",
      id: "Q3",
      status: "Varies"
    },
    {
      q: "Do you work remotely?",
      a: "Yes — I work remotely and can coordinate across time zones.",
      id: "Q4",
      status: "Available"
    }
  ];

  return (
    <section ref={container} className="py-32 sm:py-48 bg-black px-4 sm:px-6 md:px-12 lg:px-24 overflow-hidden relative">
      {/* Background Architectural Elements */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:80px_80px]" />
      <div className="bg-scan-line absolute top-0 left-0 w-full h-[100px] bg-gradient-to-b from-transparent via-white/[0.02] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 lg:gap-32 relative z-10">
        <div className="lg:w-1/3 flex flex-col justify-start">
          <div className="faq-meta flex items-center gap-4 mb-8">
            <div className="h-px w-10 bg-white/40" />
            <span className="text-[10px] font-mono tracking-[0.6em] text-white/80 uppercase">Questions</span>
          </div>
          <h2 className="faq-title text-5xl sm:text-6xl md:text-7xl font-display font-black leading-[0.85] tracking-tighter text-white mb-16">
            FAQ<br />
            <span className="text-white/60 italic">Answers</span>
          </h2>

          <div className="space-y-6 mt-auto hidden lg:block">
            {/* Response Time Node */}
            <div className="status-node p-8 border border-white/10 bg-white/[0.03] relative group overflow-hidden transition-all duration-500 hover:border-white/30 hover:bg-white/[0.06]">
              {/* Surgical Corners */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Scanning Bar */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-white/20 -translate-y-full group-hover:translate-y-[120px] transition-transform duration-[2s] ease-linear pointer-events-none" />

              <div className="flex justify-between items-center mb-6 relative z-10">
                <span className="text-[11px] font-mono text-white/70 tracking-[0.3em]">Response Time</span>
                <div className="flex gap-1.5">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className={`w-1.5 h-1.5 ${i === 1 ? 'bg-white/80' : 'bg-white/20'}`} />
                  ))}
                </div>
              </div>
              <div className="text-2xl font-mono text-white tracking-[0.05em] mb-1 relative z-10">24–48 hours</div>
              <div className="text-[10px] font-mono text-white/50 tracking-[0.2em] relative z-10">Reply window</div>
            </div>

            {/* Current Status Node */}
            <div className="status-node p-8 border border-white/10 bg-white/[0.03] relative group overflow-hidden transition-all duration-500 hover:border-white/30 hover:bg-white/[0.06]">
              {/* Surgical Corners */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Scanning Bar */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-white/20 -translate-y-full group-hover:translate-y-[120px] transition-transform duration-[2s] ease-linear pointer-events-none" />

              <div className="flex justify-between items-center mb-6 relative z-10">
                <span className="text-[11px] font-mono text-white/70 tracking-[0.3em]">System state</span>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-white/90 uppercase tracking-widest bg-white/10 px-2 py-0.5">ACTIVE</span>
                </div>
              </div>
              <div className="text-2xl font-mono text-white tracking-[0.05em] mb-1 relative z-10">Accepting projects</div>
              <div className="text-[10px] font-mono text-white/50 tracking-[0.2em] relative z-10">Queue open</div>
            </div>
          </div>
        </div>

        <div className="lg:w-2/3 space-y-px bg-white/10 border border-white/10">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`faq-item group relative transition-all duration-700 ${activeIndex === i ? 'bg-white/[0.08]' : 'bg-black hover:bg-white/[0.04]'}`}
            >
              {/* Surgical Corner Accents */}
              <div className={`absolute top-0 left-0 w-4 h-4 border-t border-l border-white/80 transition-all duration-500 ${activeIndex === i ? 'opacity-100' : 'opacity-0'}`} />
              <div className={`absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/80 transition-all duration-500 ${activeIndex === i ? 'opacity-100' : 'opacity-0'}`} />

              <button
                onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                className="w-full text-left p-10 flex justify-between items-center relative z-10"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-6">
                    <span className="text-xs font-mono text-white/60 group-hover:text-white/80 transition-colors tracking-[0.3em]">{faq.id}</span>
                    <div className="h-px w-8 bg-white/20 group-hover:w-12 transition-all" />
                  </div>
                  <span className={`text-lg sm:text-xl md:text-2xl font-mono tracking-wider uppercase transition-colors duration-500 ${activeIndex === i ? 'text-white' : 'text-white/70 group-hover:text-white'}`}>
                    {faq.q}
                  </span>
                </div>
                <div className="relative w-10 h-10 flex items-center justify-center">
                  <div className={`absolute w-full h-[1px] bg-white/80 transition-transform duration-500 ${activeIndex === i ? 'rotate-[135deg]' : 'rotate-0'}`} />
                  <div className={`absolute w-[1px] h-full bg-white/80 transition-transform duration-500 ${activeIndex === i ? 'rotate-[135deg]' : 'rotate-0'}`} />
                </div>
              </button>

              <div
                className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] ${activeIndex === i ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="px-10 pb-14 relative">
                  <div className="flex gap-10">
                    <div className="w-px bg-white/30 shrink-0 self-stretch relative">
                      <div className={`absolute top-0 left-0 w-full bg-white/80 transition-all duration-1000 delay-300 ${activeIndex === i ? 'h-full' : 'h-0'}`} />
                    </div>
                    <div className="space-y-10">
                      <p className="text-white text-base sm:text-lg md:text-xl font-light leading-relaxed max-w-2xl uppercase tracking-wide">
                        {faq.a}
                      </p>

                      <div className="flex flex-col sm:flex-row gap-16 items-start sm:items-end">
                        <div className="space-y-6 flex-1">
                          <div className="flex justify-between items-center text-xs font-mono text-white/40 tracking-[0.3em]">
                            <span>Progress</span>
                            <span>100%</span>
                          </div>
                          <div className="h-2 w-full bg-white/5 relative overflow-hidden">
                            <div className={`absolute top-0 left-0 h-full bg-white/80 transition-all duration-1500 delay-500 ease-out ${activeIndex === i ? 'w-full' : 'w-0'}`} />
                          </div>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="group/cta flex items-center gap-6 px-10 py-5 border-2 border-white/10 hover:border-white/60 hover:bg-white/[0.05] transition-all duration-500 rounded-none shrink-0"
                        >
                          <span className="text-xs font-mono text-white/80 group-hover/cta:text-white tracking-[0.3em]">Contact Now</span>
                          <svg className="w-6 h-6 text-white/40 group-hover/cta:text-white group-hover/cta:translate-x-2 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Background Decorative Text */}
      <div className="absolute -bottom-24 -right-24 text-[clamp(10rem,30vw,45rem)] font-black text-white/[0.01] pointer-events-none select-none leading-none tracking-tighter">
        FAQ
      </div>
    </section>
  );
}


