import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const container = useRef(null);

  useGSAP(() => {
    gsap.to('.deco-float-1', {
      y: -20,
      rotation: 5,
      duration: 3,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut'
    });

    gsap.to('.deco-float-2', {
      y: 20,
      rotation: -5,
      duration: 4,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut'
    });

    const leftCols = gsap.utils.toArray('.left-col-item');
    gsap.fromTo(leftCols,
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 1.2,
        ease: 'expo.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: container.current,
          start: 'top 80%',
          once: true
        }
      }
    );

    const rightSide = gsap.utils.toArray('.right-side-anim');
    gsap.fromTo(rightSide,
      { opacity: 0, x: 30 },
      {
        opacity: 1,
        x: 0,
        duration: 1.2,
        ease: 'expo.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: container.current,
          start: 'top 80%',
          once: true
        }
      }
    );

    const techItems = gsap.utils.toArray('.tech-item');
    gsap.fromTo(techItems,
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'back.out(1.5)',
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.tech-grid',
          start: 'top 90%',
          once: true
        }
      }
    );

    const skillItems = gsap.utils.toArray('.skill-item');
    gsap.fromTo(skillItems,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        stagger: 0.05,
        scrollTrigger: {
          trigger: '.skills-flex',
          start: 'top 90%',
          once: true
        }
      }
    );
  }, { scope: container });

  return (
    <section
      id="about"
      ref={container}
      className="section-padding min-h-screen flex items-center relative overflow-hidden"
    >
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-white/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[150px] pointer-events-none" />

      <div
        className="deco-float-1 absolute top-1/3 left-1/4 w-32 h-32 border border-white/10 rounded-3xl pointer-events-none"
      />
      <div
        className="deco-float-2 absolute bottom-1/3 right-1/4 w-24 h-24 border border-white/10 rounded-full pointer-events-none"
      />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="left-col-item mb-6 opacity-0">
              <span className="inline-block px-4 py-2 rounded-full border border-white/20 text-xs tracking-[0.2em] uppercase text-gray-400">
                About Me
              </span>
            </div>

            <h2 className="left-col-item heading-lg mb-6 opacity-0">
              Passionate About{" "}
              <span className="text-gradient">Full-Stack Development</span>
            </h2>

            <div className="left-col-item space-y-4 text-gray-300 leading-relaxed opacity-0">
              <p>
                I'm a MERN stack developer specializing in building modern,
                scalable web applications. With expertise in MongoDB,
                Express.js, React, and Node.js, I create end-to-end solutions
                that solve real-world problems.
              </p>
              <p>
                My approach combines clean code practices, responsive design,
                and performance optimization to deliver applications that not
                only look great but perform exceptionally. From RESTful APIs to
                dynamic user interfaces, I handle every aspect of web
                development.
              </p>
              <p>
                When I'm not coding, I enjoy exploring new technologies,
                contributing to open-source projects, and collaborating with
                fellow developers to push the boundaries of what's possible on
                the web.
              </p>
            </div>

            <a
              href="#projects"
              className="left-col-item inline-block mt-8 px-8 py-4 rounded-full bg-white text-black font-medium text-sm tracking-wide opacity-0 transition-transform hover:scale-105 active:scale-95"
            >
              View My Projects
            </a>
          </div>

          <div className="space-y-6">
            <div
              className="right-side-anim glass-hover rounded-3xl p-8 transition-transform hover:-translate-y-1 opacity-0"
            >
              <h3 className="text-xl font-display font-semibold mb-6">
                Core Technologies
              </h3>
              <div className="tech-grid grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: "MongoDB", desc: "Database" },
                  { name: "Express.js", desc: "Backend" },
                  { name: "React.js", desc: "Frontend" },
                  { name: "Node.js", desc: "Runtime" },
                ].map((tech) => (
                  <div
                    key={tech.name}
                    className="tech-item glass rounded-2xl p-4 text-center opacity-0"
                  >
                    <div className="text-lg font-semibold mb-1">
                      {tech.name}
                    </div>
                    <div className="text-xs text-gray-500">{tech.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="right-side-anim glass-hover rounded-3xl p-8 transition-transform hover:-translate-y-1 opacity-0"
            >
              <h3 className="text-xl font-display font-semibold mb-6">
                Additional Expertise
              </h3>
              <div className="skills-flex flex flex-wrap gap-2">
                {[
                  "RESTful APIs",
                  "JWT Auth",
                  "Redux",
                  "Git & GitHub",
                  "Responsive Design",
                  "Tailwind CSS",
                  "Cloudinary",
                  "Deployment",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="skill-item px-4 py-2 rounded-full glass text-sm opacity-0 transition-transform hover:scale-110 hover:-translate-y-0.5"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="right-side-anim grid grid-cols-1 sm:grid-cols-3 gap-6 text-center opacity-0">
              <div>
                <div className="text-2xl font-bold text-white mb-1">4+</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">
                  Personal Projects
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white mb-1">2+</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">
                  Years of Practice
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white mb-1">∞</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">
                  Learning Mindset
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
