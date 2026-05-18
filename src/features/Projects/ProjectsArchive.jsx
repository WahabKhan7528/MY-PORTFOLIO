import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const logEntries = [
  { id: "LOG_882", title: "PORTFOLIO_V1", year: "2023", category: "WEB_DEPLOY", status: "DEPRECATED" },
  { id: "LOG_714", title: "DASHBOARD_UI", year: "2024", category: "INTERFACE", status: "ARCHIVED" },
  { id: "LOG_601", title: "API_GATEWAY", year: "2024", category: "BACKEND", status: "OPERATIONAL" },
  { id: "LOG_442", title: "AUTH_PROTOCOL", year: "2025", category: "SECURITY", status: "ENCRYPTED" },
];

export default function ProjectsArchive() {
  const container = useRef(null);

  useGSAP(() => {
    gsap.fromTo(".archive-row", 
      { opacity: 0, x: -20 },
      { 
        opacity: 1, 
        x: 0, 
        duration: 0.8, 
        stagger: 0.1, 
        ease: "power2.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
          end: "top 40%",
          scrub: 1,
        }
      }
    );
  }, { scope: container });

  return (
    <section ref={container} className="bg-black py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 lg:px-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <span className="text-[12px] font-mono tracking-[0.8em] text-white/50 uppercase">SYSTEM_LOGS</span>
          <h2 className="text-4xl md:text-5xl font-display font-black tracking-tighter mt-4">LEGACY_ARCHIVE</h2>
        </div>

        <div className="w-full">
          {/* Header */}
          <div className="grid grid-cols-4 py-4 border-b border-white/10 hidden md:grid">
            <span className="text-[11px] font-mono text-white/50 uppercase tracking-widest">REFERENCE</span>
            <span className="text-[11px] font-mono text-white/50 uppercase tracking-widest">TITLE</span>
            <span className="text-[11px] font-mono text-white/50 uppercase tracking-widest">CATEGORY</span>
            <span className="text-[11px] font-mono text-white/50 uppercase tracking-widest text-right">STATUS</span>
          </div>

          {/* Rows */}
          <div className="flex flex-col">
            {logEntries.map((log) => (
              <div 
                key={log.id} 
                className="archive-row grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 py-8 border-b border-white/5 hover:bg-white/5 transition-colors group cursor-crosshair"
              >
                <span className="text-[14px] font-mono text-white/60 group-hover:text-white transition-colors">{log.id}</span>
                <span className="text-sm font-mono font-bold tracking-widest text-white">{log.title}</span>
                <span className="text-sm font-mono text-white/40 hidden sm:block">{log.category}</span>
                <div className="hidden md:flex justify-end items-center gap-2">
                  <div className={`w-1 h-1 rounded-full ${log.status === 'OPERATIONAL' ? 'bg-green-500 animate-pulse' : 'bg-white/20'}`} />
                  <span className="text-sm font-mono text-white/80 tracking-widest uppercase">{log.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

