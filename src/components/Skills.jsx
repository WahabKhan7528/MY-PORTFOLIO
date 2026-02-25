import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
    const container = useRef(null);

    useGSAP(() => {
        // Header Animations
        gsap.fromTo('.skills-header',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: '.skills-header', start: 'top 85%', once: true } }
        );

        gsap.fromTo('.skills-eyebrow',
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: '.skills-header', start: 'top 85%', once: true } }
        );

        // Cards Stagger
        const cards = gsap.utils.toArray('.skill-card');
        gsap.fromTo(cards,
            { opacity: 0, y: 40 },
            {
                opacity: 1,
                y: 0,
                duration: 1.2,
                ease: 'expo.out',
                stagger: 0.1,
                scrollTrigger: { trigger: '.skills-grid', start: 'top 85%', once: true }
            }
        );

        // Progress Bars Stagger
        const progressBars = gsap.utils.toArray('.progress-fill');
        gsap.fromTo(progressBars,
            { width: 0 },
            {
                width: (i, el) => el.dataset.level + '%',
                duration: 2,
                ease: 'expo.out',
                stagger: 0.05,
                scrollTrigger: { trigger: '.skills-grid', start: 'top 85%', once: true }
            }
        );

        // Inside card items stagger
        const skillItems = gsap.utils.toArray('.skill-item');
        gsap.fromTo(skillItems,
            { opacity: 0, x: -20 },
            {
                opacity: 1,
                x: 0,
                duration: 0.4,
                stagger: 0.02,
                scrollTrigger: { trigger: '.skills-grid', start: 'top 85%', once: true }
            }
        );

        // Tools Section
        gsap.fromTo('.tools-section',
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, scrollTrigger: { trigger: '.tools-section', start: 'top 85%', once: true } }
        );

        const toolsPills = gsap.utils.toArray('.tool-pill');
        gsap.fromTo(toolsPills,
            { opacity: 0, scale: 0.8 },
            {
                opacity: 1,
                scale: 1,
                duration: 0.4,
                stagger: 0.05,
                scrollTrigger: { trigger: '.tools-section', start: 'top 85%', once: true }
            }
        );

        // Bottom CTA
        gsap.fromTo('.bottom-cta',
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, delay: 0.4, scrollTrigger: { trigger: '.bottom-cta', start: 'top 90%', once: true } }
        );

    }, { scope: container });

    // Handle Glow Continuous Animation
    useGSAP(() => {
        if (hoveredSkill) {
            gsap.to(`.glow-${hoveredSkill.replace(/[^a-zA-Z0-9]/g, '')}`, {
                x: '200%',
                duration: 1.5,
                repeat: -1,
                ease: 'sine.inOut',
                overwrite: 'auto'
            });
        }
    }, [hoveredSkill]);

    return (
        <section id="skills" ref={container} className="section-padding min-h-screen flex items-center relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-white/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="max-w-7xl mx-auto w-full relative z-10">
                {/* Header */}
                <div className="skills-header mb-16 text-center opacity-0">
                    <div className="skills-eyebrow mb-6 opacity-0">
                        <span className="inline-block px-4 py-2 rounded-full border border-white/20 text-xs tracking-[0.2em] uppercase text-gray-400">
                            Technical Skills
                        </span>
                    </div>

                    <h2 className="heading-lg mb-6">
                        MERN Stack <span className="text-gradient">Expertise</span>
                    </h2>
                    <p className="body-text max-w-2xl mx-auto">
                        Proficient in the complete MERN stack and modern web development tools
                    </p>
                </div>

                {/* Skills Grid */}
                <div className="skills-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {skills.map((skill) => (
                        <div
                            key={skill.category}
                            className="skill-card glass-hover rounded-3xl p-8 group relative overflow-hidden opacity-0 transition-transform hover:-translate-y-2 duration-300"
                        >
                            {/* Gradient Background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-gray-800/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                            {/* Icon */}
                            <div
                                className="w-16 h-16 rounded-2xl glass flex items-center justify-center mb-6 text-white/70 group-hover:text-white transition-all duration-700 relative z-10 group-hover:rotate-[360deg] group-hover:scale-110"
                            >
                                {skill.icon}
                            </div>

                            {/* Category */}
                            <h3 className="text-xl font-display font-semibold mb-6 group-hover:text-white transition-colors relative z-10">
                                {skill.category}
                            </h3>

                            {/* Skills List with Progress Bars */}
                            <div className="space-y-4 relative z-10">
                                {skill.items.map((item) => {
                                    const hoverId = `${skill.category}-${item.name}`;
                                    const safeHoverId = hoverId.replace(/[^a-zA-Z0-9]/g, '');

                                    return (
                                        <div
                                            key={item.name}
                                            onMouseEnter={() => setHoveredSkill(hoverId)}
                                            onMouseLeave={() => setHoveredSkill(null)}
                                            className="skill-item group/item opacity-0"
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
                                                <div
                                                    data-level={item.level}
                                                    className="progress-fill h-full bg-gradient-to-r from-white/50 to-white rounded-full relative"
                                                >
                                                    {/* Animated Glow */}
                                                    <div
                                                        className={`glow-${safeHoverId} absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-50 -translate-x-full`}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Tools & Technologies */}
                <div className="tools-section glass-strong rounded-3xl p-8 md:p-12 opacity-0">
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
                            {tools.map((tool) => (
                                <span
                                    key={tool}
                                    className="tool-pill px-5 py-2 rounded-full glass text-sm font-medium cursor-default opacity-0 transition-transform hover:scale-110 hover:-translate-y-0.5"
                                >
                                    {tool}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="bottom-cta mt-16 text-center opacity-0">
                    <p className="text-gray-400 mb-6">Want to see these skills in action?</p>
                    <a
                        href="#projects"
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-medium text-sm tracking-wide transition-transform hover:scale-105 active:scale-95"
                    >
                        <span>View Projects</span>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
}
