import { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap';
import { Link, useLocation } from 'react-router-dom';
import { audioEngine } from '../lib/audio';

/**
 * Navbar component - High-fidelity "Precision Noir" implementation.
 * Features magnetic hover effects, GSAP-driven scroll states, 
 * and a technical, machine-first aesthetic.
 */
export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isAudioOn, setIsAudioOn] = useState(true);
    const navRef = useRef(null);
    const containerRef = useRef(null);
    const mobileMenuRef = useRef(null);
    const mobileLinksRef = useRef([]);
    const location = useLocation();

    // Scroll handler for background visibility
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Entrance animation
            gsap.fromTo(containerRef.current,
                { y: -100, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: 'expo.out', delay: 0.5 }
            );

            // Magnetic hover effect for logo
            const logo = navRef.current.querySelector('.logo-icon');
            if (logo && logo.parentElement) {
                logo.parentElement.addEventListener('mousemove', (e) => {
                    const rect = logo.getBoundingClientRect();
                    const x = e.clientX - rect.left - rect.width / 2;
                    const y = e.clientY - rect.top - rect.height / 2;
                    gsap.to(logo, {
                        x: x * 0.2,
                        y: y * 0.2,
                        rotation: x * 0.1,
                        duration: 0.4,
                        ease: 'power2.out'
                    });
                });
                logo.parentElement.addEventListener('mouseleave', () => {
                    gsap.to(logo, { x: 0, y: 0, rotation: 0, duration: 0.6, ease: 'elastic.out(1, 0.3)' });
                });
            }

            // Magnetic hover effect for desktop links
            const links = navRef.current.querySelectorAll('.nav-link');
            links.forEach(link => {
                const text = link.querySelector('.link-text');
                if (!text) return;
                
                link.addEventListener('mousemove', (e) => {
                    const rect = link.getBoundingClientRect();
                    const x = e.clientX - rect.left - rect.width / 2;
                    const y = e.clientY - rect.top - rect.height / 2;
                    
                    gsap.to(text, {
                        x: x * 0.3,
                        y: y * 0.3,
                        duration: 0.4,
                        ease: 'power2.out'
                    });
                });

                link.addEventListener('mouseleave', () => {
                    gsap.to(text, {
                        x: 0,
                        y: 0,
                        duration: 0.6,
                        ease: 'elastic.out(1, 0.3)'
                    });
                });
            });

        }, navRef);
        return () => ctx.revert();
    }, []);

    // Mobile Menu Animations
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
            const tl = gsap.timeline();
            
            tl.to(mobileMenuRef.current, {
                clipPath: 'circle(150% at 100% 0%)',
                duration: 0.8,
                ease: 'expo.inOut'
            })
            .fromTo(mobileLinksRef.current,
                { y: 50, opacity: 0, skewY: 5 },
                { y: 0, opacity: 1, skewY: 0, duration: 0.6, stagger: 0.1, ease: 'power4.out' },
                "-=0.4"
            );
        } else {
            document.body.style.overflow = '';
            gsap.to(mobileMenuRef.current, {
                clipPath: 'circle(0% at 100% 0%)',
                duration: 0.6,
                ease: 'expo.inOut'
            });
        }
    }, [mobileMenuOpen]);

    const navItems = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
        { name: 'Projects', href: '/projects' },
        { name: 'Contact', href: '/contact' },
    ];

    const toggleAudio = () => {
        const audioState = audioEngine.toggleMute();
        setIsAudioOn(audioState);
    };

    return (
        <>
            <header 
                ref={navRef}
                className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${isScrolled ? 'py-4' : 'py-8'}`}
            >
                <div 
                    ref={containerRef}
                    className={`max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between transition-all duration-500 rounded-none relative
                        ${isScrolled ? 'glass py-3 px-4 sm:px-6 md:px-8' : (location.pathname === '/' ? 'bg-transparent border-transparent py-3 px-4 sm:px-6 md:px-8' : 'glass py-3 px-4 sm:px-6 md:px-8')}'
                    `}
                >
                    {/* Technical Corner Accents */}
                    {isScrolled && (
                        <>
                            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/40" />
                            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/40" />
                            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/40" />
                            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/40" />
                        </>
                    )}

                    {/* Logo / Branding */}
                    <Link to="/" className="group relative flex items-center gap-3">
                        <span className="logo-icon font-display font-black text-lg tracking-[0.25em] text-white leading-none">
                            WAHAB.
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={`nav-link relative px-5 py-2 group overflow-hidden`}
                            >
                                <span className={`link-text relative z-10 block text-xs font-bold tracking-[0.2em] uppercase transition-colors duration-300 ${location.pathname === item.href ? 'text-white' : 'text-white/70 group-hover:text-white'}`}>
                                    {item.name}
                                </span>
                                {location.pathname === item.href && (
                                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[1px] bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                                )}
                                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300" />
                            </Link>
                        ))}
                    </nav>

                    {/* Audio Toggle (Desktop) */}
                    <button
                        onClick={toggleAudio}
                        className="hidden md:flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-white/50 hover:text-white transition-colors"
                    >
                        <span>[ AUDIO: {isAudioOn ? 'ON' : 'OFF'} ]</span>
                    </button>

                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden flex flex-col items-end justify-center gap-1 w-10 h-10 sm:gap-1.5 sm:w-12 sm:h-12 group z-[110]"
                        aria-label="Toggle menu"
                    >
                        <span className={`h-[1px] bg-white transition-all duration-500 ${mobileMenuOpen ? 'w-7 sm:w-8 -rotate-45 translate-y-[0.375rem] sm:translate-y-[0.5rem]' : 'w-6 sm:w-8 group-hover:w-5 sm:group-hover:w-6'}`} />
                        <span className={`h-[1px] bg-white transition-all duration-500 ${mobileMenuOpen ? 'opacity-0' : 'w-5 sm:w-6 group-hover:w-6 sm:group-hover:w-8'}`} />
                        <span className={`h-[1px] bg-white transition-all duration-500 ${mobileMenuOpen ? 'w-7 sm:w-8 rotate-45 -translate-y-[0.375rem] sm:-translate-y-[0.5rem]' : 'w-4 sm:w-4 group-hover:w-7 sm:group-hover:w-8'}`} />
                    </button>
                </div>
            </header>

            {/* Fullscreen Mobile Menu */}
            <div 
                ref={mobileMenuRef}
                className="fixed inset-0 z-[105] bg-black flex flex-col items-center justify-center"
                style={{ clipPath: 'circle(0% at 100% 0%)' }}
            >
                {/* Background Tech Elements */}
                <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-black text-white select-none whitespace-nowrap">
                        WAHAB KHAN WAHAB KHAN
                    </div>
                </div>

                <nav className="relative z-10 flex flex-col items-center gap-8">
                    {navItems.map((item, index) => (
                        <Link
                            key={item.name}
                            ref={el => mobileLinksRef.current[index] = el}
                            to={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="group flex items-center gap-4"
                        >
                            <span className="text-xs font-mono text-gray-500 group-hover:text-white transition-colors">0{index + 1}</span>
                            <span className={`text-5xl md:text-7xl font-display font-black tracking-tighter transition-all duration-500 group-hover:italic ${location.pathname === item.href ? 'text-white' : 'text-transparent stroke-white stroke-1 hover:text-white'}`}
                                  style={{ WebkitTextStroke: location.pathname === item.href ? '0' : '1px rgba(255,255,255,0.3)' }}>
                                {item.name}
                            </span>
                        </Link>
                    ))}
                </nav>

                {/* Mobile Footer Info */}
                <div className="absolute bottom-12 left-0 w-full px-12 flex justify-between items-end">
                    <div className="flex flex-col gap-2">
                        <span className="text-xs text-white/60 tracking-[0.3em] uppercase">Location</span>
                        <span className="text-sm font-medium">Remote / Global</span>
                    </div>
                    <div className="flex flex-col gap-2 items-end text-right">
                        <span className="text-xs text-white/60 tracking-[0.3em] uppercase">Socials</span>
                        <div className="flex gap-4">
                            {['LI', 'GH', 'TW'].map(s => (
                                <span key={s} className="text-sm font-bold hover:text-white cursor-pointer transition-colors">{s}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

