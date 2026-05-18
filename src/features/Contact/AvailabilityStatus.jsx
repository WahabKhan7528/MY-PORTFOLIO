import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

export default function AvailabilityStatus() {
  const container = useRef(null);

  useGSAP(() => {
    gsap.fromTo(".status-item", 
      { opacity: 0, y: 20 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        stagger: 0.1, 
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
          end: "top 40%",
          scrub: 1,
        }
      }
    );
  }, { scope: container });

  const metrics = [
    { label: "Availability", value: "Open for remote work", detail: "Current status" },
    { label: "Response Time", value: "24–48 hours", detail: "Average reply" }
  ];

  return (
    <section ref={container} className="py-24 bg-black border-y border-white/5 px-4 sm:px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 md:gap-1">
        {metrics.map((m, i) => (
          <div key={i} className="status-item flex-1 p-6 sm:p-10 border border-white/5 bg-white/[0.02] relative group overflow-hidden flex flex-col justify-between min-h-[180px] transition-all duration-500 hover:bg-white/[0.04]">
            {/* Background scanning effect */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            
            <div className="relative z-10">
              <div className="text-xs font-mono text-white/70 uppercase tracking-[0.4em] mb-6 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-white/60 rounded-full" />
                {m.label}
              </div>
              <div className="text-lg sm:text-xl md:text-2xl font-display font-black text-white tracking-tighter mb-2 uppercase leading-tight break-words">
                {m.value}
              </div>
            </div>

            <div className="relative z-10 mt-4">
              <div className="text-xs font-mono text-white/60 uppercase tracking-[0.2em] italic border-t border-white/5 pt-4">
                // {m.detail}
              </div>
            </div>
            
            {/* Surgical Corner Accents */}
            <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-white/20 group-hover:border-white/60 transition-colors" />
            <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-white/20 group-hover:border-white/60 transition-colors" />
            
            {/* Subtle glow on hover */}
            <div className="absolute inset-0 bg-white/[0.01] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          </div>
        ))}
      </div>
    </section>
  );
}

