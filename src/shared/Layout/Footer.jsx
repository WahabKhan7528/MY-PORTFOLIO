import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const date = new Date().getFullYear();
  const [time, setTime] = useState(new Date());
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      ".footer-letter",
      {
        y: 100,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom bottom",
          scrub: 1,
        }
      }
    );
  }, { scope: containerRef });

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" },
    { name: "Privacy", href: "/privacy" },
    { name: "Terms", href: "/terms" },
  ];

  const socialLinks = [
    { name: "GitHub", href: "https://github.com/WahabKhan7528", icon: "GH" },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/wahab-khan-3a21a521a/", icon: "LI" },
    { name: "Instagram", href: "#", icon: "IG" },
    { name: "Twitter", href: "#", icon: "X" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ];

  return (
    <footer className="w-full bg-black border-t border-white/5 pt-20 overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="flex flex-col xl:flex-row justify-between gap-16 mb-20">

          {/* Logo and Copyright */}
          <div className="flex flex-col justify-between mb-8 xl:mb-0 xl:w-1/4">
            <div>
              <div className="flex items-center gap-3">
                <span className="text-4xl font-medium tracking-tight text-white leading-none -mt-1 ml-1">
                  Wahab Khan
                </span>
              </div>

              <div className="mt-8 max-w-[280px]">
                <p className="text-[#666] text-base leading-relaxed font-medium">
                  I&apos;m Abdul Wahab Khan Arib — a full‑stack engineer and designer based in Bahawalpur, Pakistan. Building performant, accessible web applications and crafting polished UX.
                </p>
              </div>
            </div>

            <p className="hidden xl:block text-[#666] text-base mt-12">
              © {date} Wahab Khan
            </p>
          </div>

          {/* Links Section */}
          <div className="flex flex-col md:flex-row gap-12 lg:gap-24 xl:w-3/4 xl:justify-end">
            {/* Column 1: Navigation */}
            <div className="flex flex-col gap-6 md:w-32">
              <span className="text-[#666] text-base font-medium">Navigation</span>
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link key={link.name} to={link.href} className="text-[#bbb] hover:text-white transition-colors text-lg font-medium">
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Column 2: Secure Nodes */}
            <div className="flex flex-col gap-6 md:flex-1 max-w-md">
              <span className="text-[#666] text-base font-medium uppercase tracking-[0.2em]">
                Secure Nodes
              </span>
              <div className="flex flex-col gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-center justify-between p-5 bg-white/[0.02] hover:bg-white/[0.08] border border-white/[0.05] hover:border-white/[0.2] transition-all duration-500 overflow-hidden"
                  >
                    {/* Background slide effect */}
                    <div className="absolute inset-0 bg-white/[0.03] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />

                    <div className="relative z-10 flex items-center gap-6">
                      <span className="text-sm font-mono text-white/40 group-hover:text-white transition-colors duration-500">
                        [{social.icon}]
                      </span>
                      <span className="text-sm font-black tracking-[0.2em] uppercase text-white/70 group-hover:text-white transition-colors duration-500">
                        {social.name}
                      </span>
                    </div>

                    {/* Arrow icon that slides in */}
                    <div className="relative z-10 flex items-center justify-center w-6 h-6 overflow-hidden">
                      <svg
                        className="w-4 h-4 text-white -translate-x-8 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 ease-out"
                        fill="none" viewBox="0 0 24 24" stroke="currentColor"
                      >
                        <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Column 3: Legal & Actions */}
            <div className="flex flex-col gap-6 md:w-fit">
              <span className="text-[#666] text-base font-medium">Legal</span>
              <div className="flex flex-col gap-4">
                {legalLinks.map((link) => (
                  <Link key={link.name} to={link.href} className="text-[#bbb] hover:text-white transition-colors text-lg font-medium">
                    {link.name}
                  </Link>
                ))}
              </div>

              {/* Time & Action Button */}
              <div className="mt-8 flex flex-col gap-8">
                <div className="flex items-center gap-2 text-sm font-mono text-[#666] uppercase tracking-[0.2em]">
                  <span className="text-[#444]">SYS_TIME:</span>
                  <span className="text-[#bbb]">
                    {time.toLocaleTimeString("en-US", {
                      hour12: false,
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      timeZone: "Asia/Karachi"
                    })}{" "}
                    PKT
                  </span>
                </div>

                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="group relative flex items-center gap-4 py-4 px-6 min-h-[44px] border border-white/10 overflow-hidden transition-all duration-700 hover:border-white hover:text-black w-fit"
                >
                  {/* Background Inversion Layer */}
                  <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]" />

                  {/* Surgical Corner Accents */}
                  <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/30 group-hover:border-black/40 transition-colors duration-500" />
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/30 group-hover:border-black/40 transition-colors duration-500" />

                  <div className="relative z-10 flex items-center gap-4">
                    <span className="text-sm font-black tracking-[0.3em] uppercase text-white group-hover:text-black transition-colors duration-700">
                      Return_to_Top
                    </span>

                    <div className="relative w-5 h-5 flex items-center justify-center overflow-hidden text-white group-hover:text-black transition-colors duration-700">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-500 group-hover:-translate-y-8">
                        <path d="M6 1V11M6 1L1 6M6 1L11 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
                      </svg>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute translate-y-8 transition-transform duration-500 group-hover:translate-y-0">
                        <path d="M6 1V11M6 1L1 6M6 1L11 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
                      </svg>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Copyright */}
          <p className="block md:hidden text-[#666] text-base mt-4">
            © {date} Wahab Khan
          </p>
        </div>
      </div>

      {/* Giant Blocky Text at the Bottom */}
      <div ref={containerRef} className="relative w-full flex justify-center items-end px-4 mt-10">
        <h2
          className="text-[clamp(6rem,24vw,32rem)] font-black leading-[0.75] tracking-tighter uppercase whitespace-nowrap select-none flex text-[#1a1a1a]"
          style={{
            textShadow: `
              0px -1px 0px rgba(255,255,255,0.03),
              1px 1px 0px #151515,
              2px 2px 0px #151515,
              3px 3px 0px #151515,
              4px 4px 0px #151515,
              5px 5px 0px #111111,
              6px 6px 0px #111111,
              7px 7px 0px #111111,
              8px 8px 0px #0a0a0a,
              9px 9px 0px #0a0a0a,
              10px 10px 0px #0a0a0a
            `,
            WebkitTextStroke: '1px rgba(255,255,255,0.02)'
          }}
        >
          {['W', 'A', 'H', 'A', 'B'].map((letter, index) => (
            <span
              key={index}
              className="footer-letter inline-block"
            >
              <span className="inline-block transition-all duration-300 hover:-translate-y-6 hover:scale-110 hover:text-white cursor-crosshair">
                {letter}
              </span>
            </span>
          ))}
        </h2>
      </div>
    </footer>
  );
}
