import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/gsap";

const stack = [
  { category: "FRONTEND_CORE", tools: ["React 18", "Next.js", "TypeScript", "Tailwind CSS"] },
  { category: "BACKEND_ENGINE", tools: ["Node.js", "Express", "GraphQL", "Socket.io"] },
  { category: "DATA_ARCHITECTURE", tools: ["MongoDB", "PostgreSQL", "Redis", "Prisma"] },
  { category: "MOTION_SYSTEMS", tools: ["GSAP", "Framer Motion", "Three.js", "Canvas API"] }
];

export default function TechStack() {
  const container = useRef(null);

  useGSAP(() => {
    gsap.fromTo(".stack-card",
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 75%",
        }
      }
    );
  }, { scope: container });

  return (
    <section ref={container} className="py-24 md:py-32 lg:py-40 flex items-center bg-black border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.02] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-8">
           <div className="max-w-xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px w-8 bg-white/40" />
              <span className="text-[10px] font-mono tracking-[0.6em] text-white/50 uppercase">
                STACK_INTEGRITY
              </span>
            </div>
             <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-display font-black text-white tracking-tighter">
               THE ARSENAL.<br />
               <span className="text-white/20 italic uppercase tracking-widest text-4xl">Architecture</span>
             </h2>
           </div>
           <div className="hidden md:block">
              <div className="flex gap-2">
                 {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 bg-white/20" />
                 ))}
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stack.map((item, i) => (
            <div 
              key={i} 
              className="stack-card group p-8 bg-white/[0.02] border border-white/5 hover:border-white/20 hover:bg-white/[0.04] transition-all duration-500"
            >
              <div className="text-[10px] font-mono text-white/40 mb-8 tracking-widest uppercase">
                {item.category}
              </div>
              <div className="space-y-4">
                {item.tools.map((tool, idx) => (
                  <div key={idx} className="flex items-center justify-between group/tool">
                    <span className="text-lg font-display font-bold text-gray-400 group-hover/tool:text-white transition-colors">{tool}</span>
                    <div className="w-2 h-2 bg-white/10 group-hover/tool:bg-white transition-all" />
                  </div>
                ))}
              </div>
              
              <div className="mt-12 h-px w-full bg-white/5 relative overflow-hidden">
                 <div className="absolute top-0 left-0 h-full w-0 bg-white/30 group-hover:w-full transition-all duration-1000 ease-in-out" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
