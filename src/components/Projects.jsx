import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "ENCODEX - Secure Text and File Encryption",
    category: "WEB-APP",
    year: "2026",
    description:
      "A client-side encryption tool for securely encrypting text and files directly in the browser.",
    longDescription:
      "Developed a browser-based encryption application that allows users to encrypt and decrypt text and files entirely on the client side. Implemented AES-GCM 256-bit encryption using the Web Crypto API, with keys derived from user passphrases via PBKDF2. Each encryption uses a random salt and IV to ensure security. The app works offline, sends no data to servers, and supports features such as file encryption, compression, QR code sharing, templates, password generation, and session history. Encrypted data and passphrases are intended to be shared separately for enhanced security.",
    tags: [
      "JavaScript",
      "Web Crypto API",
      "AES-GCM",
      "PBKDF2",
      "Client-Side Security",
      "Responsive UI",
    ],
    demoUrl: "https://encodex-chi.vercel.app/",
    repoUrl: "https://github.com/WahabKhan7528/ENCODEX",
    image: "/project-images/encodex-1.png",
  },
  {
    id: 2,
    title: "Library Management System",
    category: "Full Stack",
    year: "2026",
    description:
      "A comprehensive library management system with user authentication, book management, and Email service.",
    longDescription:
      "Developing a full-stack library management system that enables users to register, log in, and manage book inventories. The backend is built with Node.js and Express, utilizing MongoDB for data storage. Features include secure user authentication with JWT, CRUD operations for books, and integration with Cloudinary for image uploads. Additionally, the system incorporates Nodemailer to send email notifications for overdue books and other alerts. The project emphasizes security, scalability, and a user-friendly interface.",
    tags: ["React", "Node.js", "Cloudinary", "MongoDB", "JWT", "Express", "Nodemailer", "REST API", "CRUD Operations"],
    repoUrl: "https://github.com/WahabKhan7528/library-system",
    image: null,
    status: "Under Construction",
  },
  {
    id: 3,
    title: "WOXO BLOGS – Blog Platform",
    category: "Front End",
    year: "2023",
    description:
      "A modern, responsive blog platform focused on clean UI, readability, and smooth user experience.",
    longDescription:
      "Built a frontend-focused blogging platform that allows users to browse and read blog posts in a clean, distraction-free interface.The project emphasizes modern UI design, responsive layouts, and well-structured components.WOXO BLOGS was developed as a Semester project to strengthen frontend fundamentals and real-world React workflow.",
    tags: [
      "React",
      "Responsive Design",
      "Component-Based Architecture",
      "Modern UI",
      "Tailwind CSS",
      "React Router",
    ],
    demoUrl: "https://woxo-blogs-v2.vercel.app/",
    repoUrl: "https://github.com/WahabKhan7528/WOXO-BLOGS-V2", // replace if needed
    image: "/project-images/woxo-blogs-1.png",
  },
  {
    id: 4,
    title: "The Best College Website – LMS & CMS",
    category: "Full Stack",
    year: "2025",
    description:
      "A full-stack college website with integrated LMS and CMS for academic and administrative management.",
    longDescription:
      "Developing a comprehensive college website that combines a Learning Management System (LMS) and a Content Management System (CMS) in a single platform. The system includes role-based dashboards for students, faculty, and administrators, enabling course management, assignment distribution, and academic content delivery. The CMS module allows administrators to manage news, events, galleries, and course listings. The project focuses on secure authentication, scalable architecture, and a clean, user-friendly interface, serving as a practical implementation of real-world academic management workflows.",
    tags: [
      "MERN Stack",
      "LMS",
      "CMS",
      "Role-Based Access",
      "Authentication and Authorization",
      "Portals",
      "REST API",
    ],
    demoUrl: "https://the-best-group-of-colleges.vercel.app/",
    repoUrl: "https://github.com/WahabKhan7528/THE-BEST-GROUP-OF-COLLEGES",
    image: "/project-images/tbc-2.png",
  },
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState("All");
  const [hoveredId, setHoveredId] = useState(null);

  const container = useRef(null);
  const modalRef = useRef(null);
  const modalBgRef = useRef(null);

  const categories = ["All", "Full Stack", "WEB-APP", "Front End", "Live", "GitHub"];

  const filteredProjects = projects.filter((project) => {
    if (filter === "All") return true;
    if (filter === "Live") return !!project.demoUrl;
    if (filter === "GitHub") return !!project.repoUrl;
    return project.category === filter;
  });

  useGSAP(() => {
    // Header initial animations
    gsap.fromTo('.projects-header',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: '.projects-header', start: 'top 85%', once: true } }
    );
    gsap.fromTo('.projects-eyebrow',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1.0, ease: 'expo.out', scrollTrigger: { trigger: '.projects-header', start: 'top 85%', once: true } }
    );
    gsap.fromTo('.projects-count',
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 1.0, ease: 'back.out(1.5)', scrollTrigger: { trigger: '.projects-header', start: 'top 85%', once: true } }
    );
  }, { scope: container });

  // On Filter Change
  useGSAP(() => {
    gsap.fromTo('.project-card',
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.8, stagger: 0.05, ease: 'expo.out', clearProps: 'all' }
    );
  }, { dependencies: [filter], scope: container });

  // Modal animations
  useGSAP(() => {
    if (selectedProject) {
      gsap.fromTo(modalBgRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4 });
      gsap.fromTo(modalRef.current,
        { scale: 0.95, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: 'expo.out' }
      );
    }
  }, { dependencies: [selectedProject] });

  const closeProject = () => {
    if (modalRef.current && modalBgRef.current) {
      gsap.to(modalRef.current, { scale: 0.9, opacity: 0, y: 50, duration: 0.3 });
      gsap.to(modalBgRef.current, { opacity: 0, duration: 0.3, onComplete: () => setSelectedProject(null) });
    } else {
      setSelectedProject(null);
    }
  };

  return (
    <section
      id="projects"
      ref={container}
      className="section-padding min-h-screen relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-white/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Header */}
        <div className="projects-header mb-16 opacity-0">
          <div className="projects-eyebrow mb-6 opacity-0">
            <span className="inline-block px-4 py-2 rounded-full border border-white/20 text-xs tracking-[0.2em] uppercase text-gray-400">
              Portfolio
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 lg:gap-8 mb-8">
            <div>
              <h2 className="heading-lg mb-4">
                MERN Stack <span className="text-gradient">Projects</span>
              </h2>
              <p className="body-text max-w-2xl">
                Full-stack web applications built with MongoDB, Express.js,
                React, and Node.js
              </p>
            </div>

            {/* Project Count */}
            <div className="projects-count glass rounded-2xl px-6 py-4 text-center opacity-0">
              <div className="text-3xl font-bold mb-1">
                {filteredProjects.length}
              </div>
              <div className="text-xs text-gray-400 uppercase tracking-wide">
                Projects
              </div>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-3 rounded-full text-sm tracking-wide transition-all hover:scale-105 active:scale-95 ${filter === cat
                  ? "bg-white text-black font-medium"
                  : "glass border border-white/20 hover:bg-white/10"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="project-card glass-hover rounded-3xl overflow-hidden cursor-pointer group relative"
            >
              {/* Project Image */}
              <div className="aspect-video from-gray-800 via-gray-850 to-gray-900 flex items-center justify-center overflow-hidden relative bg-black/40">
                {/* Custom Background Pattern logic replacing framer-motion */}
                <div
                  className={`absolute inset-0 opacity-10 transition-all duration-1000 ease-linear`}
                  style={{
                    backgroundImage: "radial-gradient(circle at center, white 1px, transparent 1px)",
                    backgroundSize: "30px 30px",
                    backgroundPosition: hoveredId === project.id ? "100% 100%" : "0% 0%"
                  }}
                />

                {project.image && (
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-contain p-2 opacity-80 group-hover:opacity-100 transition-all duration-700"
                  />
                )}

                <div className="absolute inset-0 bg-white/5 group-hover:scale-110 transition-transform duration-700" />
                {!project.image && (
                  <span className="text-gray-500 font-bold text-lg relative z-10">
                    {project.status || "MERN Project"}
                  </span>
                )}

                {/* Year Badge */}
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full glass text-xs text-gray-400 z-20">
                  {project.year}
                </div>

                {/* Overlay on Hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent flex flex-col justify-end p-6 z-20 transition-opacity duration-300 ${hoveredId === project.id ? 'opacity-100' : 'opacity-0'}`}
                >
                  <div className={`transition-all duration-300 ${hoveredId === project.id ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}>
                    <div className="flex items-center gap-2 text-white text-sm font-medium">
                      <span>View Details</span>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs tracking-widest text-gray-500 uppercase">
                    {project.category}
                  </span>
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
            </div>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <div
          ref={modalBgRef}
          onClick={closeProject}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/95 backdrop-blur-xl opacity-0"
        >
          <div
            ref={modalRef}
            onClick={(e) => e.stopPropagation()}
            className="glass-strong rounded-3xl p-6 sm:p-8 md:p-12 max-w-5xl w-full max-h-[90vh] overflow-y-auto opacity-0 scale-90 translate-y-12"
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-8">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs tracking-widest text-gray-500 uppercase">
                    {selectedProject.category}
                  </span>
                  <span className="text-xs text-gray-600">•</span>
                  <span className="text-xs text-gray-500">
                    {selectedProject.year}
                  </span>
                </div>
                <h3 className="heading-md mb-4">{selectedProject.title}</h3>
              </div>

              <button
                onClick={closeProject}
                className="w-12 h-12 rounded-full glass flex items-center justify-center text-gray-400 hover:text-white transition-all ml-4 hover:scale-110 hover:rotate-90 active:scale-95"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Project Image */}
            <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl mb-8 flex items-center justify-center overflow-hidden relative">
              <div
                className="absolute inset-0 opacity-10 animate-[pulse_10s_ease-in-out_infinite]"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at center, white 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />

              {selectedProject.image ? (
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-contain p-2"
                />
              ) : (
                <span className="text-gray-500 font-bold text-xl relative z-10">
                  {selectedProject.status || "Project Screenshot"}
                </span>
              )}
            </div>

            {/* Description */}
            <div className="mb-8">
              <h4 className="text-sm font-semibold mb-3 text-gray-400 uppercase tracking-wide">
                Project Overview
              </h4>
              <p className="body-text leading-relaxed">
                {selectedProject.longDescription}
              </p>
            </div>

            {/* Technologies */}
            <div className="mb-8">
              <h4 className="text-sm font-semibold mb-4 text-gray-400 uppercase tracking-wide">
                Technologies Used
              </h4>
              <div className="flex flex-wrap gap-3">
                {selectedProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-5 py-2 rounded-full glass text-sm font-medium transition-transform hover:scale-105 hover:-translate-y-0.5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              {selectedProject.demoUrl && (
                <a
                  href={selectedProject.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 rounded-full bg-white text-black font-medium text-sm tracking-wide flex items-center gap-2 transition-transform hover:scale-105 hover:-translate-y-0.5 active:scale-95"
                >
                  <span>View Live Demo</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              )}
              {selectedProject.repoUrl && (
                <a
                  href={selectedProject.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 rounded-full text-sm tracking-wide border border-white/30 hover:bg-white/10 flex items-center gap-2 transition-all hover:scale-105 hover:-translate-y-0.5 active:scale-95"
                >
                  <span>View Code</span>
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
