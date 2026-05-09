import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/gsap";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Environment } from "@react-three/drei";

const projects = [
  {
    id: 1,
    title: "The Best College Website",
    category: "Full Stack",
    year: "2025",
    description: "A full-stack college website with integrated LMS and CMS for academic and administrative management.",
    tags: ["MERN Stack", "LMS", "CMS", "REST API"],
    demoUrl: "https://the-best-group-of-colleges.vercel.app/",
    repoUrl: "https://github.com/WahabKhan7528/THE-BEST-GROUP-OF-COLLEGES",
    image: "/project-images/TBC/1.webp",
  },
  {
    id: 5,
    title: "Premium Client Portfolio",
    category: "Front End",
    year: "2026",
    description: "A sophisticated portfolio website crafted for a professional client, emphasizing high-end aesthetics and smooth performance.",
    tags: ["React", "GSAP", "Modern UI", "Client Project"],
    image: "/project-images/Momo Portfolio/2.webp",
  },
  {
    id: 2,
    title: "ENCODEX",
    category: "WEB-APP",
    year: "2026",
    description: "A client-side encryption tool for securely encrypting text and files directly in the browser.",
    tags: ["JavaScript", "Web Crypto API", "AES-GCM", "PBKDF2"],
    image: "/project-images/encodex-1.png",
  },
  {
    id: 3,
    title: "Library Management System",
    category: "Full Stack",
    year: "2026",
    description: "A comprehensive library management system with user authentication, book management, and Email service.",
    tags: ["React", "Node.js", "MongoDB", "Express", "JWT"],
    image: null,
  },
  {
    id: 4,
    title: "WOXO BLOGS",
    category: "Front End",
    year: "2023",
    description: "A modern, responsive blog platform focused on clean UI, readability, and smooth user experience.",
    tags: ["React", "Tailwind CSS", "React Router"],
    image: "/project-images/woxo-blogs-1.png",
  },
];

// 3D Background Blob that reacts to scrolling
function BackgroundBlob() {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      // Smooth continuous rotation
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
      <mesh ref={meshRef} scale={1.8}>
        <icosahedronGeometry args={[1, 64]} />
        <MeshDistortMaterial 
          color="#1a1a1a" 
          envMapIntensity={2} 
          clearcoat={1} 
          clearcoatRoughness={0.1} 
          metalness={0.8} 
          roughness={0.2} 
          distort={0.4} 
          speed={1.5} 
        />
      </mesh>
    </Float>
  );
}

export default function Projects() {
  const container = useRef(null);
  const wrapperRef = useRef(null);

  useGSAP(() => {
    const sections = gsap.utils.toArray('.project-panel');
    
    // 1. Horizontal Scroll Pinning
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        pin: true,
        scrub: 1, // Smooth scrubbing effect
        snap: 1 / (sections.length - 1), // Snap to closest project
        end: () => "+=" + (window.innerWidth * sections.length), // Scroll duration based on width
      }
    });

    // Move the wrapper horizontally
    tl.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none"
    });

    // 2. Parallax Zoom & Reveal inside horizontal scroll
    sections.forEach((section) => {
      const img = section.querySelector('.project-img');
      const content = section.querySelector('.project-content');
      
      if (img) {
        // Massive Zoom Effect on the image while it comes into view horizontally
        gsap.fromTo(img, 
          { scale: 1 }, 
          {
            scale: 1.6,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              containerAnimation: tl, // Bind to the horizontal scroll timeline
              start: "left right", // When the left of the section hits the right of the screen
              end: "right left",   // When the right of the section hits the left of the screen
              scrub: true,
            }
          }
        );
      }

      if (content) {
        // Text reveals as it enters horizontally
        gsap.fromTo(content, 
          { opacity: 0, x: 100, scale: 0.9 }, 
          {
            opacity: 1, 
            x: 0, 
            scale: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              containerAnimation: tl,
              start: "left 75%", 
              end: "center center",
              scrub: true,
            }
          }
        );
      }
    });

    // 3. 3D Canvas rotation tied to vertical scroll
    gsap.to('.canvas-container', {
      rotationZ: 45,
      scale: 1.2,
      scrollTrigger: {
        trigger: container.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      }
    });

  }, { scope: container });

  return (
    <section 
      id="projects" 
      ref={container} 
      className="relative w-full h-screen overflow-hidden bg-black text-white"
    >
      {/* 3D Background Canvas */}
      <div className="canvas-container absolute inset-0 z-0 pointer-events-none opacity-60">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} intensity={1} />
          <Environment preset="city" />
          <BackgroundBlob />
        </Canvas>
      </div>

      {/* Persistent Header */}
      <div className="absolute top-10 left-10 md:top-20 md:left-20 z-20">
        <div className="text-xs tracking-[0.2em] uppercase text-gray-400 mb-2">Portfolio 2026</div>
        <h2 className="heading-lg text-white">Selected Works</h2>
      </div>

      {/* Horizontal Scroll Wrapper */}
      <div 
        ref={wrapperRef} 
        className="flex h-full z-10 relative items-center" 
        style={{ width: `${projects.length * 100}vw` }}
      >
        {projects.map((project) => (
          <div 
            key={project.id} 
            className="project-panel flex w-screen h-full items-center justify-center relative px-8 md:px-20"
          >
            <div className="flex flex-col lg:flex-row w-full max-w-7xl gap-8 lg:gap-16 items-center">
                
              {/* Image Container with hidden overflow for Zoom Parallax */}
              <div className="w-full lg:w-3/5 aspect-video overflow-hidden rounded-3xl relative shadow-2xl shadow-black/50 border border-white/10 group cursor-none">
                {project.image ? (
                   <img 
                     src={project.image} 
                     alt={project.title} 
                     className="project-img absolute inset-0 w-full h-full object-cover origin-center" 
                   />
                ) : (
                   <div className="project-img absolute inset-0 w-full h-full bg-gradient-to-br from-gray-900 to-black flex items-center justify-center text-2xl font-bold text-gray-500">
                     Under Construction
                   </div>
                )}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
              </div>

              {/* Text Content */}
              <div className="project-content w-full lg:w-2/5 flex flex-col gap-4">
                 <span className="text-sm tracking-[0.2em] uppercase text-gray-400">
                   {project.category} • {project.year}
                 </span>
                 
                 <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight font-display">
                   {project.title}
                 </h3>
                 
                 <p className="text-lg text-gray-300 leading-relaxed mt-4">
                   {project.description}
                 </p>
                 
                 <div className="flex flex-wrap gap-2 mt-6">
                    {project.tags.map(tag => (
                        <span key={tag} className="px-4 py-2 rounded-full glass border border-white/10 text-xs text-gray-300">
                          {tag}
                        </span>
                    ))}
                 </div>
                 
                 <div className="mt-10 flex gap-4">
                    <a 
                      href={project.demoUrl || "#"} 
                      target="_blank" 
                      rel="noreferrer"
                      className="px-8 py-4 bg-white text-black rounded-full font-medium text-sm tracking-wide transition-all hover:scale-105 active:scale-95 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                    >
                      View Live
                    </a>
                    {project.repoUrl && (
                      <a 
                        href={project.repoUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="px-8 py-4 rounded-full border border-white/30 text-white font-medium text-sm tracking-wide hover:bg-white/10 transition-all hover:scale-105 active:scale-95"
                      >
                        Source Code
                      </a>
                    )}
                 </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
