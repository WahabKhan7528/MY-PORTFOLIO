import { motion } from 'framer-motion';
import { useState } from 'react';

const skills = [
    {
        category: 'Frontend Development',
        items: [
            { name: 'React.js', level: 80 },
            { name: 'JavaScript (ES6+)', level: 85 },
            { name: 'HTML5 & CSS3', level: 92 },
            { name: 'Tailwind CSS', level: 90 },
        ],
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
        )
    },
    {
        category: 'Backend Development',
        items: [
            { name: 'Node.js', level: 80 },
            { name: 'Express.js', level: 80 },
            { name: 'RESTful APIs', level: 79 },
            { name: 'JWT Authentication', level: 80 },
        ],
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
            </svg>
        )
    },
    {
        category: 'Database & Tools',
        items: [
            { name: 'MongoDB', level: 88 },
            { name: 'Mongoose', level: 85 },
            { name: 'Git & GitHub', level: 90 },
            { name: 'Postman', level: 87 },
        ],
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
            </svg>
        )
    },
    {
        category: 'Additional Skills',
        items: [
            { name: 'Redux', level: 75 },
            { name: 'Git & GitHub', level: 85 },
            { name: 'Responsive Design', level: 80 },
            { name: 'Deployment', level: 85 },
        ],
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        )
    },
];

const tools = [
    'VS Code',
    'npm/npx',
    'Git & GitHub',
    'Chrome DevTools',
    'Postman',
    'Vercel',
    'Netlify',
    'MongoDB Compass',
];

export default function Skills() {
    const [hoveredSkill, setHoveredSkill] = useState(null);

    return (
        <section id="skills" className="section-padding min-h-screen flex items-center relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-white/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="max-w-7xl mx-auto w-full relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="mb-16 text-center"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="mb-6"
                    >
                        <span className="inline-block px-4 py-2 rounded-full border border-white/20 text-xs tracking-[0.2em] uppercase text-gray-400">
                            Technical Skills
                        </span>
                    </motion.div>

                    <h2 className="heading-lg mb-6">
                        MERN Stack <span className="text-gradient">Expertise</span>
                    </h2>
                    <p className="body-text max-w-2xl mx-auto">
                        Proficient in the complete MERN stack and modern web development tools
                    </p>
                </motion.div>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {skills.map((skill, index) => (
                        <motion.div
                            key={skill.category}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -8 }}
                            className="glass-hover rounded-3xl p-8 group relative overflow-hidden"
                        >
                            {/* Gradient Background - Single black to grey */}
                            <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-gray-800/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            {/* Icon */}
                            <motion.div
                                whileHover={{ rotate: 360, scale: 1.1 }}
                                transition={{ duration: 0.6 }}
                                className="w-16 h-16 rounded-2xl glass flex items-center justify-center mb-6 text-white/70 group-hover:text-white transition-colors relative z-10"
                            >
                                {skill.icon}
                            </motion.div>

                            {/* Category */}
                            <h3 className="text-xl font-display font-semibold mb-6 group-hover:text-white transition-colors relative z-10">
                                {skill.category}
                            </h3>

                            {/* Skills List with Progress Bars */}
                            <div className="space-y-4 relative z-10">
                                {skill.items.map((item, i) => (
                                    <motion.div
                                        key={item.name}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.4, delay: index * 0.1 + i * 0.05 }}
                                        viewport={{ once: true }}
                                        onHoverStart={() => setHoveredSkill(`${skill.category}-${item.name}`)}
                                        onHoverEnd={() => setHoveredSkill(null)}
                                        className="group/item"
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm tracking-wide text-gray-400 group-hover/item:text-gray-300 transition-colors">
                                                {item.name}
                                            </span>
                                            <span className="text-xs text-gray-500 font-medium">
                                                {item.level}%
                                            </span>
                                        </div>

                                        {/* Progress Bar */}
                                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${item.level}%` }}
                                                transition={{ duration: 1, delay: index * 0.1 + i * 0.1, ease: "easeOut" }}
                                                viewport={{ once: true }}
                                                className="h-full bg-gradient-to-r from-white/50 to-white rounded-full relative"
                                            >
                                                {/* Animated Glow */}
                                                <motion.div
                                                    animate={{
                                                        x: hoveredSkill === `${skill.category}-${item.name}` ? ['-100%', '200%'] : '-100%',
                                                    }}
                                                    transition={{
                                                        duration: 1.5,
                                                        repeat: hoveredSkill === `${skill.category}-${item.name}` ? Infinity : 0,
                                                        ease: "easeInOut",
                                                    }}
                                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-50"
                                                />
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Tools & Technologies */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="glass-strong rounded-3xl p-8 md:p-12"
                >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-8">
                        <div>
                            <h3 className="text-2xl font-display font-semibold mb-3">
                                Development Tools
                            </h3>
                            <p className="text-gray-400 text-sm">
                                Tools and platforms I use daily for development and deployment
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            {tools.map((tool, index) => (
                                <motion.span
                                    key={tool}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.4, delay: index * 0.05 }}
                                    viewport={{ once: true }}
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    className="px-5 py-2 rounded-full glass text-sm font-medium cursor-default"
                                >
                                    {tool}
                                </motion.span>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="mt-16 text-center"
                >
                    <p className="text-gray-400 mb-6">Want to see these skills in action?</p>
                    <motion.a
                        href="#projects"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-medium text-sm tracking-wide"
                    >
                        <span>View Projects</span>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
}
