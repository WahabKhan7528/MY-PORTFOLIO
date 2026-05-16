import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../lib/gsap';
import { Link } from 'react-router-dom';

/**
 * Footer component - High-fidelity "Precision Noir" implementation.
 * Features high-density technical metadata, brutalist typography,
 * and magnetic hover states.
 */
export default function Footer() {
    const footerRef = useRef(null);
    const date = new Date().getFullYear();

    // Modern GSAP Animation Logic
    useGSAP(() => {
        const tl = gsap.timeline({
            repeat: -1,
            repeatDelay: 0.5,
            defaults: { ease: 'power1.inOut' }
        });

        tl.set(['#footer-scanner', '#footer-reveal-text'], { opacity: 0 })
          .to(['#footer-scanner', '#footer-reveal-text'], { opacity: 1, duration: 0.4 })
          .fromTo('#footer-scanner',
              { top: '-250px' },
              { top: '100%', duration: 3 },
              'scan'
          )
          .fromTo('#footer-reveal-text',
              { webkitMaskPosition: '0 -250px', opacity: 1 },
              { webkitMaskPosition: '0 1000px', opacity: 1, duration: 3 },
              'scan'
          )
          .to(['#footer-scanner', '#footer-reveal-text'], { opacity: 0, duration: 0.6 });
    }, { scope: footerRef });

    const socialLinks = [
        { name: 'GitHub', href: 'https://github.com/WahabKhan7528', icon: 'GH' },
        { name: 'LinkedIn', href: 'https://www.linkedin.com/in/wahab-khan-3a21a521a/', icon: 'LI' },
        { name: 'Instagram', href: '#', icon: 'IG' },
        { name: 'Twitter', href: '#', icon: 'X' },
    ];

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
        { name: 'Projects', href: '/projects' },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <footer
            ref={footerRef}
            className="relative w-full bg-black border-t border-white/5 pt-16 sm:pt-24 md:pt-32 pb-8 sm:pb-10 overflow-hidden"
        >
            {/* Technical Scanning Reveal Effect */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* The Scanning Bar */}
                <div
                    id="footer-scanner"
                    className="absolute left-0 w-full h-[250px] bg-gradient-to-b from-transparent via-white/[0.12] to-transparent z-20"
                    style={{ top: '-250px' }}
                />

                {/* The Revealed Text Container */}
                <div className="absolute bottom-[140px] left-0 w-full flex justify-center pointer-events-none select-none z-10">
                    <h2
                        id="footer-reveal-text"
                        className="text-[22vw] font-black text-white leading-none tracking-tighter uppercase whitespace-nowrap opacity-0"
                        style={{
                            WebkitMaskImage: 'linear-gradient(to bottom, transparent, black, transparent)',
                            WebkitMaskSize: '100% clamp(12rem, 30vw, 20rem)',
                            WebkitMaskRepeat: 'no-repeat',
                            WebkitMaskPosition: '0 calc(clamp(12rem, 30vw, 20rem) * -1)'
                        }}
                    >
                        WAHAB
                    </h2>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-20 md:gap-8 mb-32">

                    {/* Brand Column */}
                    <div className="md:col-span-5">
                        <div className="flex flex-col gap-10">
                            <Link to="/" className="group inline-block">
                                <span className="font-display font-black text-4xl tracking-[0.25em] text-white uppercase relative">
                                    Wahab.
                                    <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-white transition-all duration-700 group-hover:w-full shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
                                </span>
                            </Link>
                            <p className="text-white/70 text-sm leading-relaxed max-w-sm font-medium tracking-widest uppercase opacity-90">
                                Architecting high-fidelity digital experiences through the intersection of brutalist design and machine-first engineering.
                            </p>
                        </div>
                    </div>

                    {/* Navigation Column */}
                    <div className="md:col-span-3">
                        <div className="flex flex-col gap-10">
                            <span className="text-xs text-white/60 uppercase tracking-[0.4em] font-black opacity-80">Core Directory</span>
                            <nav className="flex flex-col gap-5">
                                {navLinks.map((link, index) => (
                                    <Link
                                        key={link.name}
                                        to={link.href}
                                        className="group flex items-center gap-4 w-fit"
                                    >
                                        <span className="text-xs font-mono text-white/40 group-hover:text-white transition-colors duration-300">
                                            0{index + 1}
                                        </span>
                                        <span className="text-sm font-black tracking-[0.25em] uppercase text-white/70 group-hover:text-white transition-all duration-300 group-hover:translate-x-2">
                                            {link.name}
                                        </span>
                                    </Link>
                                ))}
                            </nav>
                        </div>
                    </div>

                    {/* Social/Technical Column */}
                    <div className="md:col-span-4">
                        <div className="flex flex-col gap-10">
                            <span className="text-xs text-white/60 uppercase tracking-[0.4em] font-black opacity-80">Secure Nodes</span>
                            <div className="grid grid-cols-2 gap-px bg-white/5 border border-white/5">
                                {socialLinks.map(social => (
                                    <a
                                        key={social.name}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group relative flex items-center justify-between p-6 bg-black hover:bg-white/[0.08] transition-colors duration-300 overflow-hidden"
                                    >
                                        {/* Subtle corner accent inside grid cell */}
                                        <div className="absolute top-0 right-0 w-1 h-1 border-t border-r border-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />

                                        <span className="text-xs font-black tracking-[0.2em] uppercase text-white/70 group-hover:text-white transition-colors">
                                            {social.name}
                                        </span>
                                        <span className="text-xs font-mono text-white/50 group-hover:text-white transition-colors">
                                            [{social.icon}]
                                        </span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-16 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-10">
                    <div className="flex flex-wrap justify-center md:justify-start items-center gap-x-8 gap-y-4 text-xs font-mono text-white/60 uppercase tracking-[0.2em]">
                        <span className="text-white/80 font-bold">© {date} Wahab Khan</span>
                        <div className="hidden md:block w-px h-3 bg-white/10" />
                        <span className="flex items-center gap-2">
                            <span className="text-white/40">LOC:</span> 31.5204° N, 74.3587° E
                        </span>
                        <div className="hidden md:block w-px h-3 bg-white/10" />
                        <span className="flex items-center gap-2">
                            <span className="text-white/40">SYS_TIME:</span> {new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })} UTC
                        </span>
                    </div>

                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="group relative flex items-center gap-8 py-4 px-10 border border-white/10 overflow-hidden transition-all duration-700 hover:border-white hover:text-black"
                    >
                        {/* Background Inversion Layer */}
                        <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]" />

                        {/* Surgical Corner Accents */}
                        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/30 group-hover:border-black/40 transition-colors duration-500" />
                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/30 group-hover:border-black/40 transition-colors duration-500" />

                        <div className="relative z-10 flex items-center gap-5">
                            <div className="flex flex-col items-start">
                                <span className="text-sm font-black font-bold  tracking-[0.4em] uppercase">
                                    Return_to_Top
                                </span>
                            </div>
                            
                            <div className="relative w-5 h-5 flex items-center justify-center overflow-hidden">
                                <svg 
                                    width="12" 
                                    height="12" 
                                    viewBox="0 0 12 12" 
                                    fill="none" 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    className="transition-transform duration-500 group-hover:-translate-y-8"
                                >
                                    <path d="M6 1V11M6 1L1 6M6 1L11 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
                                </svg>
                                <svg 
                                    width="12" 
                                    height="12" 
                                    viewBox="0 0 12 12" 
                                    fill="none" 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    className="absolute translate-y-8 transition-transform duration-500 group-hover:translate-y-0"
                                >
                                    <path d="M6 1V11M6 1L1 6M6 1L11 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
                                </svg>
                            </div>
                        </div>
                    </button>
                </div>
            </div>

            {/* Brutalist Frame Accents */}
            <div className="absolute top-0 left-0 w-8 h-px bg-gradient-to-r from-white/40 to-transparent" />
            <div className="absolute top-0 left-0 w-px h-8 bg-gradient-to-b from-white/40 to-transparent" />

            <div className="absolute top-0 right-0 w-8 h-px bg-gradient-to-l from-white/40 to-transparent" />
            <div className="absolute top-0 right-0 w-px h-8 bg-gradient-to-b from-white/40 to-transparent" />

            <div className="absolute bottom-0 left-0 w-8 h-px bg-gradient-to-r from-white/40 to-transparent" />
            <div className="absolute bottom-0 left-0 w-px h-8 bg-gradient-to-t from-white/40 to-transparent" />

            <div className="absolute bottom-0 right-0 w-8 h-px bg-gradient-to-l from-white/40 to-transparent" />
            <div className="absolute bottom-0 right-0 w-px h-8 bg-gradient-to-t from-white/40 to-transparent" />
        </footer>
    );
}
