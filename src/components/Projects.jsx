import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const projects = [
    {
        id: 1,
        title: 'E-Commerce Platform',
        category: 'Full-Stack',
        year: '2024',
        description: 'Complete MERN stack e-commerce application with payment integration, admin dashboard, and real-time inventory management.',
        longDescription: 'Built a comprehensive e-commerce platform using the MERN stack. Features include user authentication with JWT, product management, shopping cart functionality, Stripe payment integration, order tracking, and an admin dashboard for managing products and orders. Implemented Redux for state management and used MongoDB for efficient data storage.',
        tags: ['MongoDB', 'Express.js', 'React', 'Node.js', 'Redux', 'Stripe API'],
        metrics: { users: '5K+', performance: '95/100', uptime: '99.9%' },
    },
    {
        id: 2,
        title: 'Real-Time Chat Application',
        category: 'Full-Stack',
        year: '2024',
        description: 'WebSocket-based chat app with private messaging, group chats, and real-time notifications.',
        longDescription: 'Developed a real-time messaging application using Socket.io for WebSocket connections. Features include one-on-one messaging, group chats, typing indicators, online status, message history, and push notifications. Built with React for the frontend and Node.js/Express for the backend, with MongoDB storing chat history.',
        tags: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'JWT', 'Express'],
        metrics: { messages: '100K+', latency: '<50ms', concurrent: '500+' },
    },
    {
        id: 3,
        title: 'Task Management System',
        category: 'Full-Stack',
        year: '2023',
        description: 'Project management tool with drag-and-drop functionality, team collaboration, and progress tracking.',
        longDescription: 'Created a comprehensive task management system similar to Trello. Features include drag-and-drop task boards, team collaboration, file attachments, comments, due dates, priority levels, and progress tracking. Implemented RESTful APIs with Express.js and used MongoDB for data persistence.',
        tags: ['MERN Stack', 'React DnD', 'REST API', 'MongoDB', 'Tailwind CSS'],
        metrics: { tasks: '50K+', teams: '200+', satisfaction: '4.8/5' },
    },
    {
        id: 4,
        title: 'Social Media Dashboard',
        category: 'Full-Stack',
        year: '2023',
        description: 'Analytics dashboard for social media metrics with data visualization and reporting features.',
        longDescription: 'Built a social media analytics dashboard that aggregates data from multiple platforms. Features include real-time data visualization using Chart.js, custom reports, scheduled posts, engagement metrics, and automated insights. Backend built with Node.js and Express, with MongoDB for data storage.',
        tags: ['React', 'Node.js', 'Chart.js', 'MongoDB', 'Express', 'REST API'],
        metrics: { dataPoints: '1M+', charts: '20+', exports: '10K+' },
    },
    {
        id: 5,
        title: 'Blog Platform',
        category: 'Full-Stack',
        year: '2023',
        description: 'Full-featured blogging platform with markdown support, comments, and user profiles.',
        longDescription: 'Developed a modern blogging platform with rich text editing using markdown, user authentication, comment system, like/share functionality, user profiles, and SEO optimization. Built with the MERN stack and implemented server-side rendering for better SEO performance.',
        tags: ['MongoDB', 'Express', 'React', 'Node.js', 'Markdown', 'SEO'],
        metrics: { posts: '5K+', users: '2K+', engagement: '75%' },
    },
    {
        id: 6,
        title: 'Expense Tracker',
        category: 'Full-Stack',
        year: '2022',
        description: 'Personal finance management app with budget tracking, expense categorization, and financial insights.',
        longDescription: 'Created a comprehensive expense tracking application that helps users manage their finances. Features include expense categorization, budget setting, recurring transactions, financial reports with charts, export to CSV, and multi-currency support. Built with React for the frontend and Node.js/Express/MongoDB for the backend.',
        tags: ['MERN Stack', 'Chart.js', 'JWT Auth', 'REST API', 'Responsive'],
        metrics: { transactions: '100K+', savings: '$500K+', users: '3K+' },
    },
];

export default function Projects() {
    const [selectedProject, setSelectedProject] = useState(null);
    const [filter, setFilter] = useState('All');
    const [hoveredId, setHoveredId] = useState(null);

    const categories = ['All', 'Full-Stack'];

    const filteredProjects = filter === 'All'
        ? projects
        : projects.filter(p => p.category === filter);

    return (
        <section id="projects" className="section-padding min-h-screen relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-1/3 right-0 w-96 h-96 bg-white/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/3 left-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="max-w-7xl mx-auto w-full relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="mb-6"
                    >
                        <span className="inline-block px-4 py-2 rounded-full border border-white/20 text-xs tracking-[0.2em] uppercase text-gray-400">
                            Portfolio
                        </span>
                    </motion.div>

                    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 lg:gap-8 mb-8">
                        <div>
                            <h2 className="heading-lg mb-4">
                                MERN Stack <span className="text-gradient">Projects</span>
                            </h2>
                            <p className="body-text max-w-2xl">
                                Full-stack web applications built with MongoDB, Express.js, React, and Node.js
                            </p>
                        </div>

                        {/* Project Count */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="glass rounded-2xl px-6 py-4 text-center"
                        >
                            <div className="text-3xl font-bold mb-1">{filteredProjects.length}</div>
                            <div className="text-xs text-gray-400 uppercase tracking-wide">Projects</div>
                        </motion.div>
                    </div>

                    {/* Filter Buttons */}
                    <div className="flex flex-wrap gap-3">
                        {categories.map((cat) => (
                            <motion.button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`px-6 py-3 rounded-full text-sm tracking-wide transition-all ${filter === cat
                                    ? 'bg-white text-black font-medium'
                                    : 'glass border border-white/20 hover:bg-white/10'
                                    }`}
                            >
                                {cat}
                            </motion.button>
                        ))}
                    </div>
                </motion.div>

                {/* Projects Grid */}
                <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4 }}
                                onHoverStart={() => setHoveredId(project.id)}
                                onHoverEnd={() => setHoveredId(null)}
                                onClick={() => setSelectedProject(project)}
                                className="glass-hover rounded-3xl overflow-hidden cursor-pointer group relative"
                            >
                                {/* Project Image */}
                                <div className="aspect-[4/3] bg-gradient-to-br from-gray-800 via-gray-850 to-gray-900 flex items-center justify-center overflow-hidden relative">
                                    {/* Animated Background Pattern */}
                                    <motion.div
                                        animate={{
                                            backgroundPosition: hoveredId === project.id ? ['0% 0%', '100% 100%'] : '0% 0%',
                                        }}
                                        transition={{
                                            duration: 10,
                                            repeat: Infinity,
                                            repeatType: 'reverse',
                                        }}
                                        className="absolute inset-0 opacity-10"
                                        style={{
                                            backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)',
                                            backgroundSize: '30px 30px',
                                        }}
                                    />

                                    <div className="absolute inset-0 bg-white/5 group-hover:scale-110 transition-transform duration-700" />
                                    <span className="text-gray-600 text-sm relative z-10">MERN Project</span>

                                    {/* Year Badge */}
                                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full glass text-xs text-gray-400">
                                        {project.year}
                                    </div>

                                    {/* Overlay on Hover */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: hoveredId === project.id ? 1 : 0 }}
                                        className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent flex flex-col justify-end p-6"
                                    >
                                        <motion.div
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: hoveredId === project.id ? 0 : 20, opacity: hoveredId === project.id ? 1 : 0 }}
                                            transition={{ delay: 0.1 }}
                                        >
                                            <div className="flex items-center gap-2 text-white text-sm font-medium">
                                                <span>View Details</span>
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </div>
                                        </motion.div>
                                    </motion.div>
                                </div>

                                {/* Project Info */}
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs tracking-widest text-gray-500 uppercase">
                                            {project.category}
                                        </span>
                                        {/* Metrics Preview */}
                                        <div className="flex gap-1">
                                            {Object.values(project.metrics).slice(0, 1).map((metric, i) => (
                                                <span key={i} className="text-xs text-green-400 font-medium">
                                                    {metric}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-display font-semibold mb-3 group-hover:text-white transition-colors">
                                        {project.title}
                                    </h3>

                                    <p className="text-sm text-gray-400 line-clamp-2 mb-4 leading-relaxed">
                                        {project.description}
                                    </p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.slice(0, 3).map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-3 py-1 rounded-full glass text-xs text-gray-400 group-hover:text-gray-300 transition-colors"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                        {project.tags.length > 3 && (
                                            <span className="px-3 py-1 rounded-full glass text-xs text-gray-500">
                                                +{project.tags.length - 3}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Hover Border Glow */}
                                <div className="absolute inset-0 rounded-3xl border border-white/0 group-hover:border-white/20 transition-colors pointer-events-none" />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* Project Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedProject(null)}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/95 backdrop-blur-xl"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 50 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 50 }}
                            onClick={(e) => e.stopPropagation()}
                            className="glass-strong rounded-3xl p-6 sm:p-8 md:p-12 max-w-5xl w-full max-h-[90vh] overflow-y-auto"
                        >
                            {/* Header */}
                            <div className="flex justify-between items-start mb-8">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="text-xs tracking-widest text-gray-500 uppercase">
                                            {selectedProject.category}
                                        </span>
                                        <span className="text-xs text-gray-600">•</span>
                                        <span className="text-xs text-gray-500">{selectedProject.year}</span>
                                    </div>
                                    <h3 className="heading-md mb-4">{selectedProject.title}</h3>

                                    {/* Key Metrics */}
                                    <div className="flex flex-wrap gap-4">
                                        {Object.entries(selectedProject.metrics).map(([key, value]) => (
                                            <div key={key} className="glass rounded-xl px-4 py-2">
                                                <div className="text-lg font-bold text-green-400">{value}</div>
                                                <div className="text-xs text-gray-500 uppercase tracking-wide">{key}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.1, rotate: 90 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setSelectedProject(null)}
                                    className="w-12 h-12 rounded-full glass flex items-center justify-center text-gray-400 hover:text-white transition-colors ml-4"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </motion.button>
                            </div>

                            {/* Project Image */}
                            <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl mb-8 flex items-center justify-center overflow-hidden relative">
                                <motion.div
                                    animate={{
                                        backgroundPosition: ['0% 0%', '100% 100%'],
                                    }}
                                    transition={{
                                        duration: 20,
                                        repeat: Infinity,
                                        repeatType: 'reverse',
                                    }}
                                    className="absolute inset-0 opacity-10"
                                    style={{
                                        backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)',
                                        backgroundSize: '40px 40px',
                                    }}
                                />
                                <span className="text-gray-600 relative z-10">Project Screenshot</span>
                            </div>

                            {/* Description */}
                            <div className="mb-8">
                                <h4 className="text-sm font-semibold mb-3 text-gray-400 uppercase tracking-wide">Project Overview</h4>
                                <p className="body-text leading-relaxed">
                                    {selectedProject.longDescription}
                                </p>
                            </div>

                            {/* Technologies */}
                            <div className="mb-8">
                                <h4 className="text-sm font-semibold mb-4 text-gray-400 uppercase tracking-wide">Technologies Used</h4>
                                <div className="flex flex-wrap gap-3">
                                    {selectedProject.tags.map((tag) => (
                                        <motion.span
                                            key={tag}
                                            whileHover={{ scale: 1.05, y: -2 }}
                                            className="px-5 py-2 rounded-full glass text-sm font-medium"
                                        >
                                            {tag}
                                        </motion.span>
                                    ))}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap gap-4">
                                <motion.button
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 rounded-full bg-white text-black font-medium text-sm tracking-wide flex items-center gap-2"
                                >
                                    <span>View Live Demo</span>
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 rounded-full text-sm tracking-wide border border-white/30 hover:bg-white/10 transition-all flex items-center gap-2"
                                >
                                    <span>View Code</span>
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                    </svg>
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
