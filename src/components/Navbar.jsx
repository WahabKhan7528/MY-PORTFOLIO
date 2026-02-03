import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when clicking on a link
    const handleNavClick = () => {
        setMobileMenuOpen(false);
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
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-4' : 'py-6'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
                    <div
                        className={`glass rounded-full px-6 sm:px-8 py-4 flex items-center justify-between transition-all duration-300 ${scrolled ? 'glass-strong' : ''
                            }`}
                    >
                        {/* Logo */}
                        <motion.a
                            href="#home"
                            className="text-lg sm:text-xl font-display font-bold tracking-tight"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Portfolio
                        </motion.a>

                        {/* Navigation Links */}
                        <ul className="hidden md:flex items-center gap-8">
                            {navItems.map((item, index) => (
                                <motion.li
                                    key={item.name}
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                >
                                    <a
                                        href={item.href}
                                        className="text-sm tracking-wide text-gray-300 hover:text-white transition-colors relative group"
                                    >
                                        {item.name}
                                        <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
                                    </a>
                                </motion.li>
                            ))}
                        </ul>

                        {/* Mobile Menu Button */}
                        <motion.button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5 relative z-50"
                            whileTap={{ scale: 0.9 }}
                            aria-label="Toggle menu"
                        >
                            <motion.span
                                animate={mobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                                className="w-6 h-[2px] bg-white transition-all"
                            />
                            <motion.span
                                animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                                className="w-6 h-[2px] bg-white transition-all"
                            />
                            <motion.span
                                animate={mobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                                className="w-6 h-[2px] bg-white transition-all"
                            />
                        </motion.button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 md:hidden"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        {/* Backdrop */}
                        <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" />

                        {/* Menu Content */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="absolute right-0 top-0 bottom-0 w-full sm:w-80 glass-strong p-8 pt-24"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <nav>
                                <ul className="space-y-6">
                                    {navItems.map((item, index) => (
                                        <motion.li
                                            key={item.name}
                                            initial={{ opacity: 0, x: 50 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.3, delay: index * 0.1 }}
                                        >
                                            <a
                                                href={item.href}
                                                onClick={handleNavClick}
                                                className="block text-2xl font-display font-semibold text-white hover:text-gray-300 transition-colors"
                                            >
                                                {item.name}
                                            </a>
                                        </motion.li>
                                    ))}
                                </ul>

                                {/* Decorative Element */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 0.1, scale: 1 }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                    className="absolute bottom-8 right-8 w-32 h-32 bg-white rounded-full blur-[80px]"
                                />
                            </nav>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
