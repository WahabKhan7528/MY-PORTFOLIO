import { useState, useRef, useLayoutEffect } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap';

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navRef = useRef(null);
    const mobileBgRef = useRef(null);
    const mobileMenuRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

            // MOTION: Nav slides from y:-100 with opacity 0 to y:0, opacity:1. Delay 0.2s after preloader
            gsap.fromTo(navRef.current,
                { y: -100, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, delay: 0.2, ease: 'power2.out' }
            );

            // MOTION: Scroll behavior, above 80px transparent, below 80px glass with blur
            // We use CSS variables so we don't thrash layout
            ScrollTrigger.create({
                trigger: document.body,
                start: "80px top",
                onEnter: () => {
                    gsap.to(navRef.current, { '--nav-bg-opacity': 0.6, '--nav-blur': '20px', duration: 0.3, ease: 'power2.out' });
                },
                onLeaveBack: () => {
                    gsap.to(navRef.current, { '--nav-bg-opacity': 0, '--nav-blur': '0px', duration: 0.3, ease: 'power2.out' });
                }
            });


            // Active link indicator
            const indicator = navRef.current.querySelector('.nav-indicator');
            const navItems = navRef.current.querySelectorAll('.nav-item a');
            navItems.forEach(item => {
                item.addEventListener('mouseenter', (e) => {
                    const rect = e.target.getBoundingClientRect();
                    const containerRect = e.target.closest('ul').getBoundingClientRect();
                    // MOTION: Slide horizontal underline indicator
                    gsap.to(indicator, {
                        x: rect.left - containerRect.left,
                        width: rect.width,
                        duration: 0.3,
                        ease: 'power3.out',
                        opacity: 1
                    });
                });
            });
            const navList = navRef.current.querySelector('.nav-list');
            if (navList) {
                navList.addEventListener('mouseleave', () => {
                    gsap.to(indicator, { opacity: 0, duration: 0.3, ease: 'power2.out' });
                });
            }

        }, navRef);
        return () => ctx.revert();
    }, []);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            if (mobileMenuOpen) {
                // MOTION: Mobile menu background and panel entrance
                gsap.fromTo(mobileBgRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4 });
                gsap.fromTo(mobileMenuRef.current, { height: 0 }, { height: '100%', duration: 0.6, ease: 'power3.inOut' });
                // MOTION: Stagger mobile links
                gsap.fromTo('.mobile-nav-item',
                    { x: -40, opacity: 0 },
                    { x: 0, opacity: 1, duration: 0.45, stagger: 0.07, ease: 'power2.out', delay: 0.2 }
                );
            }
        });
        return () => ctx.revert();
    }, [mobileMenuOpen]);

    const closeMenu = () => {
        if (mobileMenuRef.current && mobileBgRef.current) {
            // MOTION: Mobile menu exit
            gsap.to(mobileMenuRef.current, { height: 0, duration: 0.4, ease: 'power3.inOut' });
            gsap.to(mobileBgRef.current, { opacity: 0, duration: 0.4, onComplete: () => setMobileMenuOpen(false) });
        } else {
            setMobileMenuOpen(false);
        }
    };

    const handleToggleMenu = () => mobileMenuOpen ? closeMenu() : setMobileMenuOpen(true);

    const navItems = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Skills', href: '#skills' },
        { name: 'Projects', href: '#projects' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <>
            <nav
                ref={navRef}
                style={{
                    '--nav-bg-opacity': 0,
                    '--nav-blur': '0px',
                    backgroundColor: 'rgba(0,0,0,var(--nav-bg-opacity))',
                    backdropFilter: 'blur(var(--nav-blur))'
                }}
                className="fixed top-0 left-0 right-0 z-50 py-4"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
                    <div className="flex items-center justify-between px-6 sm:px-8 py-4">
                        <a href="#home" className="text-lg sm:text-xl font-display font-bold tracking-tight text-white transition-transform hover:scale-105 active:scale-95 block">
                            WAHAB.
                        </a>

                        <ul className="nav-list hidden md:flex items-center gap-8 relative">
                            {navItems.map((item) => (
                                <li key={item.name} className="nav-item">
                                    <a href={item.href} className="block py-2 text-sm tracking-wide text-gray-300 hover:text-white transition-colors">
                                        {item.name}
                                    </a>
                                </li>
                            ))}
                            <div className="nav-indicator absolute bottom-0 left-0 h-[1px] bg-white opacity-0" />
                        </ul>

                        <button
                            onClick={handleToggleMenu}
                            className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5 relative z-50 transition-transform active:scale-95"
                            aria-label="Toggle menu"
                        >
                            <span className={`w-6 h-[2px] bg-white transition-transform duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-[8px]' : ''}`} />
                            <span className={`w-6 h-[2px] bg-white transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
                            <span className={`w-6 h-[2px] bg-white transition-transform duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-[8px]' : ''}`} />
                        </button>
                    </div>
                </div>
            </nav>

            {mobileMenuOpen && (
                <div className="fixed inset-0 z-40 md:hidden">
                    <div ref={mobileBgRef} className="absolute inset-0 bg-black/95 backdrop-blur-xl opacity-0" onClick={closeMenu} />

                    <div ref={mobileMenuRef} className="absolute left-0 top-0 w-full overflow-hidden bg-white/5 border-b border-white/10" onClick={(e) => e.stopPropagation()}>
                        <div className="p-8 pt-24">
                            <ul className="space-y-6">
                                {navItems.map((item) => (
                                    <li key={item.name} className="mobile-nav-item opacity-0">
                                        <a href={item.href} onClick={closeMenu} className="block text-2xl font-display font-semibold text-white hover:text-gray-300 transition-colors">
                                            {item.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
