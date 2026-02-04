import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function FloatingResumeButton() {
    const ref = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();

        const centerX = left + width / 2;
        const centerY = top + height / 2;

        const distanceX = clientX - centerX;
        const distanceY = clientY - centerY;

        // Smoother, slightly stronger magnetic pull
        setPosition({ x: distanceX * 0.35, y: distanceY * 0.35 });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
        setIsHovered(false);
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    return (
        <motion.div
            className="fixed bottom-8 right-8 z-50 pointer-events-auto"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
        >
            <motion.a
                ref={ref}
                href="/resume.pdf"
                download="Wahab_Resume.pdf"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onMouseEnter={handleMouseEnter}
                layout
                animate={{ x: position.x, y: position.y }}
                transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                    mass: 0.1,
                    layout: { type: "spring", stiffness: 300, damping: 25 }
                }}
                className="relative flex items-center justify-center bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden cursor-pointer group"
                style={{
                    borderRadius: 9999,
                    height: 56,
                    paddingLeft: isHovered ? 24 : 0,
                    paddingRight: isHovered ? 24 : 0,
                    width: isHovered ? "auto" : 56,
                    minWidth: 56
                }}
            >
                {/* Glowing background effect */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />

                {/* Text */}
                <motion.span
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: isHovered ? "auto" : 0, opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="font-medium text-white whitespace-nowrap overflow-hidden"
                    style={{ marginRight: isHovered ? 8 : 0 }}
                >
                    Download Resume
                </motion.span>

                {/* Icon */}
                <div className="flex items-center justify-center w-5 h-5 text-white">
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-5 h-5"
                    >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                </div>
            </motion.a>
        </motion.div>
    );
}
