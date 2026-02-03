import { motion } from 'framer-motion';
import RippleEffect from './RippleEffect';

export default function Hero() {
    return (
        <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
            {/* WebGL Ripple Background */}
            <RippleEffect />

            {/* Enhanced Gradient Overlay with vignette effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] pointer-events-none" />

            {/* Decorative Elements */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.1, scale: 1 }}
                transition={{ duration: 2, delay: 0.5 }}
                className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full blur-[120px] pointer-events-none"
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.05, scale: 1 }}
                transition={{ duration: 2, delay: 0.7 }}
                className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-white rounded-full blur-[150px] pointer-events-none"
            />

            {/* Main Content Container */}
            <div className="relative z-10 w-full max-w-6xl mx-auto px-6">
                {/* Glassmorphic Content Card */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="glass rounded-3xl p-8 md:p-16 backdrop-blur-xl"
                >
                    {/* Eyebrow Text */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="mb-6"
                    >
                        <span className="inline-block px-4 py-2 rounded-full border border-white/20 text-xs tracking-[0.2em] uppercase text-gray-400">
                            Portfolio 2024
                        </span>
                    </motion.div>

                    {/* Main Heading with Character Animation */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.6 }}
                        className="mb-6"
                    >
                        <h1 className="heading-xl mb-2 leading-[0.9]">
                            <span className="block text-gradient">MERN Stack Developer</span>
                        </h1>
                    </motion.div>

                    {/* Role/Title with typing effect feel */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="mb-8"
                    >
                        <p className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-white/90">
                            Full-Stack Web Developer
                            <span className="text-gray-500"> & </span>
                            Problem Solver
                        </p>
                    </motion.div>

                    {/* Description */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 1 }}
                        className="mb-12"
                    >
                        <p className="text-lg md:text-xl max-w-3xl text-gray-400 font-light leading-relaxed">
                            Building scalable web applications with MongoDB, Express.js, React, and Node.js.
                            Transforming ideas into robust, high-performance digital solutions.
                        </p>
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 1.2 }}
                        className="flex flex-wrap gap-4"
                    >
                        <motion.a
                            href="#projects"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="group relative px-8 py-4 rounded-full bg-white text-black font-medium text-sm tracking-wide overflow-hidden transition-all"
                        >
                            <span className="relative z-10">View My Work</span>
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-gray-200 to-white"
                                initial={{ x: '-100%' }}
                                whileHover={{ x: 0 }}
                                transition={{ duration: 0.3 }}
                            />
                        </motion.a>

                        <motion.a
                            href="#contact"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 rounded-full border border-white/30 text-white font-medium text-sm tracking-wide hover:bg-white/10 transition-all backdrop-blur-sm"
                        >
                            Get In Touch
                        </motion.a>

                        <motion.a
                            href="#about"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 rounded-full text-gray-400 font-medium text-sm tracking-wide hover:text-white transition-colors flex items-center gap-2"
                        >
                            <span>Learn More</span>
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </motion.a>
                    </motion.div>

                    {/* Stats or Quick Info */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1.4 }}
                        className="mt-12 pt-8 border-t border-white/10 grid grid-cols-3 gap-8"
                    >
                        <div>
                            <div className="text-3xl font-bold text-white mb-1">3+</div>
                            <div className="text-xs tracking-wide text-gray-500 uppercase">Years Experience</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-white mb-1">40+</div>
                            <div className="text-xs tracking-wide text-gray-500 uppercase">Web Apps Built</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-white mb-1">100%</div>
                            <div className="text-xs tracking-wide text-gray-500 uppercase">Client Satisfaction</div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Enhanced Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.6 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
            >
                <motion.a
                    href="#about"
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="flex flex-col items-center gap-3 cursor-pointer group"
                >
                    <span className="text-xs tracking-[0.2em] text-gray-500 uppercase group-hover:text-gray-300 transition-colors">
                        Scroll to Explore
                    </span>
                    <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
                        <motion.div
                            animate={{ y: [0, 12, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            className="w-1 h-2 bg-white rounded-full"
                        />
                    </div>
                </motion.a>
            </motion.div>
        </section>
    );
}
