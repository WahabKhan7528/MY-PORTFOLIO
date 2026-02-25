import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navRef = useRef(null);
    const mobileBgRef = useRef(null);
    const mobileMenuRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Initial Load Animation
    useGSAP(() => {
        const tl = gsap.timeline({ delay: 2.5 });
        tl.fromTo(navRef.current,
            { y: -100 },
            { y: 0, duration: 1.0, ease: 'expo.out' }
        );
        tl.fromTo('.nav-item',
            { opacity: 0, y: -20 },
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.05, ease: 'expo.out' },
            "-=0.5"
        );
    }, []);

    // Mobile Menu Enter Animation
    useGSAP(() => {
        if (mobileMenuOpen && mobileBgRef.current && mobileMenuRef.current) {
            gsap.fromTo(mobileBgRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4 });
            gsap.fromTo(mobileMenuRef.current, { x: '100%' }, { x: 0, duration: 0.6, ease: 'expo.out' });
            gsap.fromTo('.mobile-nav-item',
                { opacity: 0, x: 30 },
                { opacity: 1, x: 0, duration: 0.6, stagger: 0.05, delay: 0.2, ease: 'expo.out' }
            );
        }
    }, { dependencies: [mobileMenuOpen] });

    const closeMenu = () => {
        if (mobileMenuRef.current && mobileBgRef.current) {
            gsap.to(mobileMenuRef.current, { x: '100%', duration: 0.3, ease: 'power2.inOut' });
            gsap.to(mobileBgRef.current, { opacity: 0, duration: 0.3, onComplete: () => setMobileMenuOpen(false) });
        } else {
            setMobileMenuOpen(false);
        }
    };

    const handleToggleMenu = () => {
        if (mobileMenuOpen) {
            closeMenu();
        } else {
            setMobileMenuOpen(true);
        }
    };

    // Close mobile menu when clicking on a link
    const handleNavClick = () => {
        closeMenu();
    };

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
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-4' : 'py-6'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
                    <div
                        className={`glass rounded-full px-6 sm:px-8 py-4 flex items-center justify-between transition-all duration-300 ${scrolled ? 'glass-strong' : ''
                            }`}
                    >
                        {/* Logo */}
                        <a
                            href="#home"
                            className="text-lg sm:text-xl font-display font-bold tracking-tight transition-transform hover:scale-105 active:scale-95 block"
                        >
                            WAHAB.
                        </a>

                        {/* Navigation Links */}
                        <ul className="hidden md:flex items-center gap-8">
                            {navItems.map((item) => (
                                <li key={item.name} className="nav-item opacity-0">
                                    <a
                                        href={item.href}
                                        className="text-sm tracking-wide text-gray-300 hover:text-white transition-colors relative group"
                                    >
                                        {item.name}
                                        <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
                                    </a>
                                </li>
                            ))}
                        </ul>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={handleToggleMenu}
                            className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5 relative z-50 transition-transform active:scale-95"
                            aria-label="Toggle menu"
                        >
                            <span
                                className={`w-6 h-[2px] bg-white transition-transform duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-[8px]' : ''}`}
                            />
                            <span
                                className={`w-6 h-[2px] bg-white transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}
                            />
                            <span
                                className={`w-6 h-[2px] bg-white transition-transform duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-[8px]' : ''}`}
                            />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-40 md:hidden">
                    {/* Backdrop */}
                    <div
                        ref={mobileBgRef}
                        className="absolute inset-0 bg-black/95 backdrop-blur-xl opacity-0"
                        onClick={closeMenu}
                    />

                    {/* Menu Content */}
                    <div
                        ref={mobileMenuRef}
                        className="absolute right-0 top-0 bottom-0 w-full sm:w-80 glass-strong p-8 pt-24 translate-x-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <nav>
                            <ul className="space-y-6">
                                {navItems.map((item) => (
                                    <li key={item.name} className="mobile-nav-item opacity-0 translate-x-12">
                                        <a
                                            href={item.href}
                                            onClick={handleNavClick}
                                            className="block text-2xl font-display font-semibold text-white hover:text-gray-300 transition-colors"
                                        >
                                            {item.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>

                            {/* Decorative Element */}
                            <div
                                className="absolute bottom-8 right-8 w-32 h-32 bg-white rounded-full blur-[80px] opacity-10"
                            />
                        </nav>
                    </div>
                </div>
            )}
        </>
    );
}
