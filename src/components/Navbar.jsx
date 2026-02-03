import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Skills', href: '#skills' },
        { name: 'Projects', href: '#projects' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-4' : 'py-6'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div
                    className={`glass rounded-full px-8 py-4 flex items-center justify-between transition-all duration-300 ${scrolled ? 'glass-strong' : ''
                        }`}
                >
                    {/* Logo */}
                    <motion.a
                        href="#home"
                        className="text-xl font-display font-bold tracking-tight"
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
                        className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5"
                        whileTap={{ scale: 0.9 }}
                    >
                        <span className="w-6 h-[1px] bg-white" />
                        <span className="w-6 h-[1px] bg-white" />
                        <span className="w-6 h-[1px] bg-white" />
                    </motion.button>
                </div>
            </div>
        </motion.nav>
    );
}
