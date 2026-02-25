import { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
    {
        name: 'Instagram',
        url: 'https://www.instagram.com/nexyvora/',
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5a4.25 4.25 0 004.25-4.25v-8.5A4.25 4.25 0 0016.25 3.5h-8.5zm8.75 2a1 1 0 110 2 1 1 0 010-2zM12 7a5 5 0 110 10 5 5 0 010-10zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z" />
            </svg>
        ),
    },
    {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/in/abdul-wahab-khan-arib/',
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                <circle cx="4" cy="4" r="2" />
            </svg>
        ),
    },
    {
        name: 'GitHub',
        url: 'https://github.com/WahabKhan7528',
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
        ),
    },
];

const contactMethods = [
    {
        title: 'Email',
        value: 'haribkhan0625@gmail.com',
        href: 'mailto:haribkhan0625@gmail.com',
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        ),
    },
    {
        title: 'Phone',
        value: '+92 3078997313',
        href: 'tel:+923078997313',
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
        ),
    },
    {
        title: 'Location',
        value: 'Bahawalpur,Pakistan',
        href: 'https://www.google.com/maps/place/Bahawalpur/data=!4m2!3m1!1s0x393b90c46c611ad5:0xfcdf0da8e103f862?sa=X&ved=1t:242&ictx=111',
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        ),
    },
];

export default function Contact() {
    const container = useRef(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const [focusedField, setFocusedField] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    useGSAP(() => {
        gsap.fromTo('.contact-eyebrow',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 1.0, ease: 'expo.out', scrollTrigger: { trigger: '.contact-section', start: 'top 80%', once: true } }
        );

        gsap.fromTo('.contact-title',
            { opacity: 0, x: -30 },
            { opacity: 1, x: 0, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: '.contact-section', start: 'top 80%', once: true } }
        );

        const methods = gsap.utils.toArray('.contact-method');
        gsap.fromTo(methods,
            { opacity: 0, x: -20 },
            { opacity: 1, x: 0, duration: 0.8, ease: 'expo.out', stagger: 0.1, scrollTrigger: { trigger: '.contact-section', start: 'top 80%', once: true } }
        );

        gsap.fromTo('.social-section',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 1.0, ease: 'expo.out', delay: 0.2, scrollTrigger: { trigger: '.contact-section', start: 'top 80%', once: true } }
        );

        gsap.fromTo('.availability-badge',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 1.0, ease: 'expo.out', delay: 0.3, scrollTrigger: { trigger: '.contact-section', start: 'top 80%', once: true } }
        );

        gsap.fromTo('.contact-form-container',
            { opacity: 0, x: 30 },
            { opacity: 1, x: 0, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: '.contact-section', start: 'top 80%', once: true } }
        );

        gsap.fromTo('.contact-footer',
            { opacity: 0 },
            { opacity: 1, duration: 0.8, scrollTrigger: { trigger: '.contact-footer', start: 'top 90%', once: true } }
        );

    }, { scope: container });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const emailjs = (await import('@emailjs/browser')).default;

            await emailjs.send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                {
                    name: formData.name,
                    email: formData.email,
                    subject: formData.subject,
                    message: formData.message,
                },
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            );

            setSubmitStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            console.error('EmailJS Error:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <section id="contact" ref={container} className="contact-section section-padding min-h-screen flex items-center relative overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-white/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="max-w-7xl mx-auto w-full relative z-10">
                <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
                    <div className="lg:col-span-2">
                        <div className="contact-eyebrow mb-6 opacity-0">
                            <span className="inline-block px-4 py-2 rounded-full border border-white/20 text-xs tracking-[0.2em] uppercase text-gray-400">
                                Get In Touch
                            </span>
                        </div>

                        <div className="contact-title opacity-0">
                            <h2 className="heading-lg mb-6 leading-tight">
                                Let's Create
                                <span className="block text-gradient">Something Amazing</span>
                            </h2>

                            <p className="body-text mb-12 text-lg leading-relaxed">
                                Have a project in mind? Let's discuss how we can work together to bring your vision to life.
                            </p>
                        </div>

                        <div className="space-y-4 mb-12">
                            {contactMethods.map((method) => (
                                <a
                                    key={method.title}
                                    href={method.href}
                                    className="contact-method flex items-center gap-4 p-4 rounded-2xl glass hover:bg-white/5 transition-all transition-transform hover:translate-x-1 group opacity-0"
                                >
                                    <div className="w-12 h-12 rounded-xl glass flex items-center justify-center text-gray-400 group-hover:text-white transition-colors">
                                        {method.icon}
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">{method.title}</div>
                                        <div className="text-sm font-medium">{method.value}</div>
                                    </div>
                                </a>
                            ))}
                        </div>

                        <div className="social-section opacity-0">
                            <h3 className="text-sm font-semibold mb-4 text-gray-400 uppercase tracking-wide">Follow Me</h3>
                            <div className="flex gap-3">
                                {socialLinks.map((social) => (
                                    <a
                                        key={social.name}
                                        href={social.url}
                                        className="w-12 h-12 rounded-xl glass-hover flex items-center justify-center text-gray-400 hover:text-white transition-all hover:scale-110 hover:-translate-y-0.5 active:scale-95"
                                        title={social.name}
                                    >
                                        {social.icon}
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div className="availability-badge opacity-0 mt-8 flex items-center gap-3 p-4 rounded-2xl glass">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                            </span>
                            <span className="text-sm text-gray-300">Available for new projects</span>
                        </div>
                    </div>

                    <div className="contact-form-container lg:col-span-3 opacity-0">
                        <div className="relative">
                            <div className="glass-strong rounded-3xl p-8 lg:p-12 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[100px] pointer-events-none" />

                                <h3 className="text-2xl font-display font-semibold mb-2">Send a Message</h3>
                                <p className="text-gray-400 text-sm mb-8">Fill out the form below and I'll get back to you within 24 hours</p>

                                <form onSubmit={handleSubmit} className="space-y-6 relative z-10" >
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                                                <div className={`absolute -inset-0.5 bg-gradient-to-r from-white/20 to-white/10 rounded-2xl -z-10 transition-opacity duration-300 ${focusedField === 'name' ? 'opacity-100' : 'opacity-0'}`} />
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
                                                <div className={`absolute -inset-0.5 bg-gradient-to-r from-white/20 to-white/10 rounded-2xl -z-10 transition-opacity duration-300 ${focusedField === 'email' ? 'opacity-100' : 'opacity-0'}`} />
                                            </div>
                                        </div>
                                    </div>

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
                                            <div className={`absolute -inset-0.5 bg-gradient-to-r from-white/20 to-white/10 rounded-2xl -z-10 transition-opacity duration-300 ${focusedField === 'subject' ? 'opacity-100' : 'opacity-0'}`} />
                                        </div>
                                    </div>

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
                                            <div className={`absolute -inset-0.5 bg-gradient-to-r from-white/20 to-white/10 rounded-2xl -z-10 transition-opacity duration-300 ${focusedField === 'message' ? 'opacity-100' : 'opacity-0'}`} />
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting || submitStatus === 'success'}
                                            className="flex-1 px-8 py-5 rounded-2xl bg-white text-black font-semibold text-sm tracking-wide transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group hover:scale-[1.02] active:scale-98"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

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
                                        </button>
                                    </div>

                                    <div className={`transition-all duration-500 overflow-hidden ${submitStatus === 'success' ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'}`}>
                                        <div className="p-4 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center gap-3 mt-4">
                                            <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className="text-sm text-green-300">Thank you! Your message has been sent successfully.</span>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <footer className="contact-footer mt-32 pt-12 border-t border-white/10 opacity-0">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
                        <p className="text-sm text-gray-500">
                            © 2026 ABDUL WAHAB KHAN ARIB
                        </p>
                        <p className="text-sm text-gray-500">All rights reserved.</p>
                    </div>
                </footer>
            </div>
        </section>
    );
}
