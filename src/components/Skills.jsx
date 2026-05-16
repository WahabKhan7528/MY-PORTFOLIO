import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/gsap";

/**
 * Arsenal component - Technical proficiency visualization.
 * Redesigned with a machine-first "Precision Noir" aesthetic.
 * Features an "Asset Manifest" theme with high-fidelity UI elements.
 */
export default function Skills() {
    const container = useRef(null);

    const arsenal = [
        {
            category: "Interface Systems",
            id: "ARS-01",
            status: "Stable",
            items: ["React.js", "Next.js", "Tailwind CSS", "GSAP", "Framer Motion"],
            description: "Building fast, interactive user interfaces."
        },
        {
            category: "Backend",
            id: "ARS-02",
            status: "Optimized",
            items: ["Node.js", "Express.js", "REST APIs", "Socket.io", "GraphQL"],
            description: "Server-side logic and real-time features."
        },
        {
            category: "Databases",
            id: "ARS-03",
            status: "Secure",
            items: ["MongoDB", "PostgreSQL", "Firebase", "Redis", "Mongoose"],
            description: "Data storage and fast queries."
        },
        {
            category: "Deployment",
            id: "ARS-04",
            status: "Live",
            items: ["Docker", "Git", "AWS", "Vercel", "Linux"],
            description: "Deploying and running apps in production."
        },
    ];

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container.current,
                start: "top 70%",
            }
        });

        tl.fromTo(".arsenal-badge",
            { opacity: 0, x: -20 },
            { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" }
        )
            .fromTo(".arsenal-title",
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 1, ease: "expo.out" }, "-=0.4"
            )
            .fromTo(".arsenal-card",
                { opacity: 0, scale: 0.95, y: 40 },
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "expo.out",
                }, "-=0.6"
            );
    }, { scope: container });

    return (
        <section id="skills" ref={container} className="bg-black relative overflow-hidden flex items-center py-32 border-b border-white/5">
            {/* Background Infrastructure */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black to-transparent z-10" />
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-20 w-full">
                <div className="mb-16 sm:mb-20 lg:mb-24">
                    <div className="arsenal-badge flex items-center gap-4 mb-8">
                        <div className="h-[1px] w-12 bg-white/40" />
                        <span className="text-xs sm:text-sm md:text-base font-mono tracking-[0.8em] text-white/80 uppercase">Skills</span>
                    </div>
                    <h2 className="arsenal-title text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-display font-black tracking-tighter leading-[0.92] sm:leading-[0.9]">
                        Technical<br />
                        <span className="text-white/20">Skills</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10">
                    {arsenal.map((module, idx) => (
                        <div key={idx} className="arsenal-card group relative bg-black p-8 sm:p-10 md:p-16 lg:p-20 overflow-hidden transition-all duration-700 hover:bg-white/[0.03]">
                            {/* Scanning effect */}
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-y-full group-hover:animate-scan pointer-events-none z-30" />

                            {/* Holographic Mesh Overlay */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-700 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2)_0%,transparent_70%)]" />

                            {/* UI Decoration */}
                            <div className="absolute top-8 right-8 flex flex-col items-end gap-1.5 opacity-40 group-hover:opacity-80 transition-opacity duration-500">
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-mono tracking-widest uppercase">NODE_REF: {module.id}</span>
                                    <div className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse" />
                                </div>
                                <span className="text-xs font-mono tracking-widest uppercase text-white/60">MEMORY_ADDR: 0x{((idx + 1) * 256).toString(16).toUpperCase()}</span>
                            </div>

                            <div className="relative z-10 h-full flex flex-col">
                                <div className="mb-12">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-8 h-[1px] bg-white/20 group-hover:w-12 group-hover:bg-white transition-all duration-500" />
                                        <span className="text-sm font-mono text-white/70 tracking-[0.4em] uppercase group-hover:text-white transition-colors">INIT::{module.category}</span>
                                    </div>
                                    <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-bold tracking-tight mb-6 group-hover:translate-x-2 transition-transform duration-500">
                                        {module.category.split('_').join(' ')}
                                    </h3>
                                    <p className="text-sm sm:text-base md:text-lg text-white/60 font-mono leading-relaxed max-w-lg mb-10 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
                                        {module.description}
                                    </p>
                                </div>

                                <div className="mt-auto">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-8">
                                        {module.items.map((item, i) => (
                                            <div key={i} className="flex items-center gap-4 group/item">
                                                <div className="w-2 h-2 border border-white/20 group-hover/item:border-white group-hover/item:rotate-45 transition-all duration-300" />
                                                <span className="text-xs sm:text-sm md:text-base font-mono text-white/70 group-hover/item:text-white transition-colors uppercase tracking-widest font-medium">
                                                    {item}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Progress Indicator / Decrypting Animation */}
                                <div className="mt-16 w-full h-[2px] bg-white/5 relative overflow-hidden">
                                    <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-0 transition-transform duration-[1500ms] ease-in-out" />
                                </div>

                                <div className="mt-8 flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs font-mono text-white/40 tracking-widest uppercase">STATUS</span>
                                        <span className="text-xs font-mono text-white/80 tracking-widest uppercase group-hover:text-white transition-colors">[{module.status}]</span>
                                    </div>
                                    <span className="text-xs font-mono text-white/30 group-hover:text-white/50 transition-colors">PRTC_0{idx + 1} // 04</span>
                                </div>
                            </div>

                            {/* Corner Brackets */}
                            <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-white/10 group-hover:border-white/40 transition-all duration-500 group-hover:w-12 group-hover:h-12" />
                            <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-white/10 group-hover:border-white/40 transition-all duration-500 group-hover:w-12 group-hover:h-12" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
