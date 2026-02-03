import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const socialLinks = [
    {
        name: 'Twitter',
        url: '#',
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
            </svg>
        ),
    },
    {
        name: 'LinkedIn',
        url: '#',
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                <circle cx="4" cy="4" r="2" />
            </svg>
        ),
    },
    {
        name: 'GitHub',
        url: '#',
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
        ),
    },
    {
        name: 'Dribbble',
        url: '#',
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm7.5 5.5c1.5 1.9 2.4 4.3 2.5 6.9-2.3-.5-4.4-.6-6.3-.4-.2-.5-.4-1-.6-1.5 2.1-.9 3.8-2.1 4.4-5zm-1.1-1.4c-.5 2.6-2 3.7-3.9 4.6-1.2-2.2-2.5-4-3.9-5.4 1.2-.5 2.5-.8 3.9-.8 1.4 0 2.7.2 4 .6zM8.5 2.5c1.5 1.5 2.8 3.3 4 5.5-2.6.8-5.5 1.2-8.6 1.2 0-.1 0-.2 0-.3 0-2.5 1.7-4.6 4.1-5.8.2-.1.3-.2.5-.3zm-6 9.5c3.3 0 6.4-.5 9.2-1.4.2.4.4.9.6 1.3-3.8 1.2-6.8 3.6-8.5 6.6-1.5-1.8-2.4-4.1-2.4-6.6 0 0 .1-.1.1-.1zm2.5 8.5c1.5-2.7 4.2-4.9 7.6-6 1 2.5 1.7 5.2 2 8-2.6.9-5.5.5-7.9-1-.5-.3-1-.6-1.5-1zm9.5 1.5c-.3-2.6-1-5.2-1.9-7.5 1.7-.2 3.6-.1 5.7.4-.4 3.1-2.1 5.8-4.5 7.5.2.1.4.1.7.1z" />
            </svg>
        ),
    },
];

const contactMethods = [
    {
        title: 'Email',
        value: 'hello@example.com',
        href: 'mailto:hello@example.com',
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        ),
    },
    {
        title: 'Phone',
        value: '+1 (555) 123-4567',
        href: 'tel:+15551234567',
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
        ),
    },
    {
        title: 'Location',
        value: 'San Francisco, CA',
        href: '#',
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        ),
    },
];

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const [focusedField, setFocusedField] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 2000));

        console.log('Form submitted:', formData);
        setIsSubmitting(false);
        setSubmitStatus('success');

        // Reset form after success
        setTimeout(() => {
            setFormData({ name: '', email: '', subject: '', message: '' });
            setSubmitStatus(null);
        }, 3000);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <section id="contact" className="section-padding min-h-screen flex items-center relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-white/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="max-w-7xl mx-auto w-full relative z-10">
                <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
                    {/* Contact Info - 2 columns */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="lg:col-span-2"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="mb-6"
                        >
                            <span className="inline-block px-4 py-2 rounded-full border border-white/20 text-xs tracking-[0.2em] uppercase text-gray-400">
                                Get In Touch
                            </span>
                        </motion.div>

                        <h2 className="heading-lg mb-6 leading-tight">
                            Let's Create
                            <span className="block text-gradient">Something Amazing</span>
                        </h2>

                        <p className="body-text mb-12 text-lg leading-relaxed">
                            Have a project in mind? Let's discuss how we can work together to bring your vision to life.
                        </p>

                        {/* Contact Methods */}
                        <div className="space-y-4 mb-12">
                            {contactMethods.map((method, index) => (
                                <motion.a
                                    key={method.title}
                                    href={method.href}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    whileHover={{ x: 4 }}
                                    className="flex items-center gap-4 p-4 rounded-2xl glass hover:bg-white/5 transition-all group"
                                >
                                    <div className="w-12 h-12 rounded-xl glass flex items-center justify-center text-gray-400 group-hover:text-white transition-colors">
                                        {method.icon}
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">{method.title}</div>
                                        <div className="text-sm font-medium">{method.value}</div>
                                    </div>
                                </motion.a>
                            ))}
                        </div>

                        {/* Social Links */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            viewport={{ once: true }}
                        >
                            <h3 className="text-sm font-semibold mb-4 text-gray-400 uppercase tracking-wide">Follow Me</h3>
                            <div className="flex gap-3">
                                {socialLinks.map((social) => (
                                    <motion.a
                                        key={social.name}
                                        href={social.url}
                                        whileHover={{ scale: 1.1, y: -2 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="w-12 h-12 rounded-xl glass-hover flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                                        title={social.name}
                                    >
                                        {social.icon}
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>

                        {/* Availability Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            viewport={{ once: true }}
                            className="mt-8 flex items-center gap-3 p-4 rounded-2xl glass"
                        >
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                            </span>
                            <span className="text-sm text-gray-300">Available for new projects</span>
                        </motion.div>
                    </motion.div>

                    {/* Contact Form - 3 columns */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="lg:col-span-3"
                    >
                        <div className="relative">
                            {/* Form Container */}
                            <div className="glass-strong rounded-3xl p-8 lg:p-12 relative overflow-hidden">
                                {/* Decorative Elements */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[100px] pointer-events-none" />

                                <h3 className="text-2xl font-display font-semibold mb-2">Send a Message</h3>
                                <p className="text-gray-400 text-sm mb-8">Fill out the form below and I'll get back to you within 24 hours</p>

                                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                                    {/* Name & Email Row */}
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="relative">
                                            <label htmlFor="name" className="block text-sm font-medium tracking-wide text-gray-300 mb-3">
                                                Your Name
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    onFocus={() => setFocusedField('name')}
                                                    onBlur={() => setFocusedField(null)}
                                                    required
                                                    className={`w-full px-5 py-4 rounded-2xl bg-black/20 border backdrop-blur-sm transition-all placeholder:text-gray-600 focus:outline-none ${focusedField === 'name'
                                                            ? 'border-white/40 bg-black/30'
                                                            : 'border-white/10 hover:border-white/20'
                                                        }`}
                                                    placeholder="John Doe"
                                                />
                                                {focusedField === 'name' && (
                                                    <motion.div
                                                        layoutId="focus-indicator"
                                                        className="absolute -inset-0.5 bg-gradient-to-r from-white/20 to-white/10 rounded-2xl -z-10"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        exit={{ opacity: 0 }}
                                                    />
                                                )}
                                            </div>
                                        </div>

                                        <div className="relative">
                                            <label htmlFor="email" className="block text-sm font-medium tracking-wide text-gray-300 mb-3">
                                                Email Address
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    onFocus={() => setFocusedField('email')}
                                                    onBlur={() => setFocusedField(null)}
                                                    required
                                                    className={`w-full px-5 py-4 rounded-2xl bg-black/20 border backdrop-blur-sm transition-all placeholder:text-gray-600 focus:outline-none ${focusedField === 'email'
                                                            ? 'border-white/40 bg-black/30'
                                                            : 'border-white/10 hover:border-white/20'
                                                        }`}
                                                    placeholder="john@example.com"
                                                />
                                                {focusedField === 'email' && (
                                                    <motion.div
                                                        layoutId="focus-indicator"
                                                        className="absolute -inset-0.5 bg-gradient-to-r from-white/20 to-white/10 rounded-2xl -z-10"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        exit={{ opacity: 0 }}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Subject */}
                                    <div className="relative">
                                        <label htmlFor="subject" className="block text-sm font-medium tracking-wide text-gray-300 mb-3">
                                            Subject
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                id="subject"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                onFocus={() => setFocusedField('subject')}
                                                onBlur={() => setFocusedField(null)}
                                                required
                                                className={`w-full px-5 py-4 rounded-2xl bg-black/20 border backdrop-blur-sm transition-all placeholder:text-gray-600 focus:outline-none ${focusedField === 'subject'
                                                        ? 'border-white/40 bg-black/30'
                                                        : 'border-white/10 hover:border-white/20'
                                                    }`}
                                                placeholder="Project Inquiry"
                                            />
                                            {focusedField === 'subject' && (
                                                <motion.div
                                                    layoutId="focus-indicator"
                                                    className="absolute -inset-0.5 bg-gradient-to-r from-white/20 to-white/10 rounded-2xl -z-10"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                />
                                            )}
                                        </div>
                                    </div>

                                    {/* Message */}
                                    <div className="relative">
                                        <label htmlFor="message" className="block text-sm font-medium tracking-wide text-gray-300 mb-3">
                                            Message
                                        </label>
                                        <div className="relative">
                                            <textarea
                                                id="message"
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                onFocus={() => setFocusedField('message')}
                                                onBlur={() => setFocusedField(null)}
                                                required
                                                rows={6}
                                                className={`w-full px-5 py-4 rounded-2xl bg-black/20 border backdrop-blur-sm transition-all resize-none placeholder:text-gray-600 focus:outline-none ${focusedField === 'message'
                                                        ? 'border-white/40 bg-black/30'
                                                        : 'border-white/10 hover:border-white/20'
                                                    }`}
                                                placeholder="Tell me about your project, goals, and timeline..."
                                            />
                                            {focusedField === 'message' && (
                                                <motion.div
                                                    layoutId="focus-indicator"
                                                    className="absolute -inset-0.5 bg-gradient-to-r from-white/20 to-white/10 rounded-2xl -z-10"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                />
                                            )}
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <div className="flex items-center gap-4">
                                        <motion.button
                                            type="submit"
                                            disabled={isSubmitting || submitStatus === 'success'}
                                            whileHover={{ scale: isSubmitting ? 1 : 1.02, y: isSubmitting ? 0 : -2 }}
                                            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                                            className="flex-1 px-8 py-5 rounded-2xl bg-white text-black font-semibold text-sm tracking-wide transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                                        >
                                            {/* Button Background Effect */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white opacity-0 group-hover:opacity-100 transition-opacity" />

                                            <span className="relative z-10 flex items-center gap-3">
                                                {isSubmitting ? (
                                                    <>
                                                        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                        </svg>
                                                        <span>Sending...</span>
                                                    </>
                                                ) : submitStatus === 'success' ? (
                                                    <>
                                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                        <span>Message Sent!</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <span>Send Message</span>
                                                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                        </svg>
                                                    </>
                                                )}
                                            </span>
                                        </motion.button>
                                    </div>

                                    {/* Success Message */}
                                    <AnimatePresence>
                                        {submitStatus === 'success' && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className="p-4 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center gap-3"
                                            >
                                                <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <span className="text-sm text-green-300">Thank you! Your message has been sent successfully.</span>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </form>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Footer */}
                <motion.footer
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="mt-32 pt-12 border-t border-white/10"
                >
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <p className="text-sm text-gray-500">
                            © 2024 Your Name. All rights reserved.
                        </p>
                        <div className="flex gap-8 text-sm text-gray-500">
                            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
                        </div>
                    </div>
                </motion.footer>
            </div>
        </section>
    );
}
