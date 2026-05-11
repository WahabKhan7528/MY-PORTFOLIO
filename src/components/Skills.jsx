import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "../lib/gsap";

const skills = [
  {
    category: "Core MERN",
    items: [
      { name: "React.js", level: 90 },
      { name: "JavaScript (ES6+)", level: 85 },
      { name: "Node.js", level: 82 },
      { name: "Express.js", level: 80 },
    ],
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
        />
      </svg>
    ),
  },
  {
    category: "Styling & UI",
    items: [
      { name: "Tailwind CSS", level: 95 },
      { name: "Modern CSS / SCSS", level: 92 },
      { name: "Responsive Design", level: 90 },
      { name: "CSS Modules", level: 85 },
    ],
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
        />
      </svg>
    ),
  },
  {
    category: "Databases & APIs",
    items: [
      { name: "MongoDB", level: 88 },
      { name: "Mongoose", level: 85 },
      { name: "REST APIs", level: 86 },
      { name: "Authentication", level: 82 },
    ],
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 3a4 4 0 00-4 4v2H7a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-1V7a4 4 0 00-4-4zm-2 6V7a2 2 0 114 0v2h-4z"
        />
      </svg>
    ),
  },
  {
    category: "Tools & Deployment",
    items: [
      { name: "Git & GitHub", level: 90 },
      { name: "Postman", level: 84 },
      { name: "Vercel", level: 88 },
      { name: "Netlify", level: 82 },
    ],
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
        />
      </svg>
    ),
  },
];

const tools = [
  "VS Code",
  "npm/npx",
  "Git & GitHub",
  "Chrome DevTools",
  "Postman",
  "Vercel",
  "Netlify",
  "MongoDB Compass",
];

export default function Skills() {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const container = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".skills-header",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".skills-header",
            start: "top 85%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        ".skills-eyebrow",
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".skills-header",
            start: "top 85%",
            once: true,
          },
        },
      );

      const cards = gsap.utils.toArray(".skill-card");
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "expo.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".skills-grid",
            start: "top 85%",
            once: true,
          },
        },
      );

      const progressBars = gsap.utils.toArray(".progress-fill");
      gsap.fromTo(
        progressBars,
        { width: 0 },
        {
          width: (i, el) => el.dataset.level + "%",
          duration: 2,
          ease: "expo.out",
          stagger: 0.05,
          scrollTrigger: {
            trigger: ".skills-grid",
            start: "top 85%",
            once: true,
          },
        },
      );

      const skillItems = gsap.utils.toArray(".skill-item");
      gsap.fromTo(
        skillItems,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.4,
          stagger: 0.02,
          scrollTrigger: {
            trigger: ".skills-grid",
            start: "top 85%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        ".tools-section",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: ".tools-section",
            start: "top 85%",
            once: true,
          },
        },
      );

      const toolsPills = gsap.utils.toArray(".tool-pill");
      gsap.fromTo(
        toolsPills,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          stagger: 0.05,
          scrollTrigger: {
            trigger: ".tools-section",
            start: "top 85%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        ".bottom-cta",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.4,
          scrollTrigger: {
            trigger: ".bottom-cta",
            start: "top 90%",
            once: true,
          },
        },
      );
    },
    { scope: container },
  );

  useGSAP(() => {
    if (hoveredSkill) {
      gsap.to(`.glow-${hoveredSkill.replace(/[^a-zA-Z0-9]/g, "")}`, {
        x: "200%",
        duration: 1.5,
        repeat: -1,
        ease: "sine.inOut",
        overwrite: "auto",
      });
    }
  }, [hoveredSkill]);

  return (
    <section
      id="skills"
      ref={container}
      className="section-padding min-h-screen flex items-center relative overflow-hidden"
    >
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-white/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="skills-header mb-16 text-center">
          <div className="skills-eyebrow mb-6">
            <span className="inline-block px-4 py-2 rounded-full border border-white/20 text-xs tracking-[0.2em] uppercase text-gray-400">
              Technical Skills
            </span>
          </div>

          <h2 className="heading-lg mb-6">
            MERN Stack <span className="text-gradient">Expertise</span>
          </h2>
          <p className="body-text max-w-2xl mx-auto">
            Specializing in React, Node.js, Express, and MongoDB to build
            performant, end-to-end web applications
          </p>
        </div>

        <div className="skills-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {skills.map((skill) => (
            <div
              key={skill.category}
              className="skill-card glass-hover rounded-3xl p-8 group relative overflow-hidden transition-transform hover:-translate-y-2 duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-gray-800/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center mb-6 text-white/70 group-hover:text-white transition-all duration-700 relative z-10 group-hover:rotate-[360deg] group-hover:scale-110">
                {skill.icon}
              </div>

              <h3 className="text-xl font-display font-semibold mb-6 group-hover:text-white transition-colors relative z-10">
                {skill.category}
              </h3>

              <div className="space-y-4 relative z-10">
                {skill.items.map((item) => {
                  const hoverId = `${skill.category}-${item.name}`;
                  const safeHoverId = hoverId.replace(/[^a-zA-Z0-9]/g, "");

                  return (
                    <div
                      key={item.name}
                      onMouseEnter={() => setHoveredSkill(hoverId)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      className="skill-item group/item"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm tracking-wide text-gray-400 group-hover/item:text-gray-300 transition-colors">
                          {item.name}
                        </span>
                        <span className="text-xs text-gray-500 font-medium">
                          {item.level}%
                        </span>
                      </div>

                      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div
                          data-level={item.level}
                          className="progress-fill h-full bg-gradient-to-r from-white/50 to-white rounded-full relative"
                        >
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

        <div className="tools-section border border-white/10 rounded-[2rem] p-8 md:p-12 mt-20 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-10 md:gap-12 relative z-10">
            <div className="md:w-1/3">
              <div className="text-[10px] tracking-[0.3em] uppercase text-gray-500 mb-4 font-bold">
                Workflow
              </div>
              <h3 className="text-3xl md:text-4xl font-display font-black leading-tight tracking-tighter mb-4">
                DEVELOPMENT
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">
                  SUITE
                </span>
              </h3>
              <p className="text-gray-400 text-sm font-light leading-relaxed">
                The tools, platforms, and environments I use daily to architect,
                build, and deploy high-performance applications.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 md:w-2/3 md:justify-end">
              {tools.map((tool) => (
                <span
                  key={tool}
                  className="tool-pill px-6 py-3 rounded-full border border-white/10 bg-black/50 text-white text-xs tracking-[0.1em] uppercase font-bold cursor-default hover:bg-white hover:text-black hover:scale-105 transition-all duration-300"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="bottom-cta mt-16 text-center">
          <p className="text-gray-400 mb-6">
            Want to see these skills in action?
          </p>
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-medium text-sm tracking-wide transition-transform hover:scale-105 active:scale-95"
          >
            <span>View Projects</span>
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
          </a>
        </div>
      </div>
    </section>
  );
}
