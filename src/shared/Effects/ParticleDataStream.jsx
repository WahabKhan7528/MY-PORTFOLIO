import React, { useRef, useEffect } from 'react';

const ParticleDataStream = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    
    // Config
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const particleCount = isTouchDevice ? 60 : 120;
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;
    
    // For Lenis/Locomotive we might need to rely on bounding client rect of a fixed element 
    // or keep an eye on window.scrollY if Lenis syncs it. Lenis does sync window.scrollY.

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    class Particle {
      constructor() {
        this.reset(true);
      }

      reset(initial = false) {
        this.x = Math.random() * canvas.width;
        // Distribute randomly across the screen initially, otherwise spawn outside
        this.y = initial ? Math.random() * canvas.height : (Math.random() > 0.5 ? -20 : canvas.height + 20);
        
        // Base size and depth
        this.z = Math.random() * 2 + 0.1; // "Depth" for parallax
        this.size = this.z * 0.8;
        
        // Base movement
        this.speedY = (Math.random() - 0.5) * 0.5; // Slow drift
        this.speedX = (Math.random() - 0.5) * 0.2;
        
        // Visuals
        this.opacity = Math.random() * 0.4 + 0.1;
        
        // Randomly assign as data character or dust mote
        const rand = Math.random();
        if (rand > 0.85) {
          this.type = 'char';
          this.char = Math.random() > 0.5 ? '0' : '1';
        } else if (rand > 0.7) {
          this.type = 'line';
          this.length = Math.random() * 10 + 5;
        } else {
          this.type = 'dot';
        }
      }

      update(velocity) {
        // Intrinsic movement
        this.y += this.speedY;
        this.x += this.speedX;

        // Scroll reaction - closer particles (larger z) move faster
        const scrollEffect = velocity * (this.z * 0.4);
        this.y -= scrollEffect;

        // Boundary wrap
        if (this.y < -50) {
          this.y = canvas.height + 50;
          this.x = Math.random() * canvas.width;
        } else if (this.y > canvas.height + 50) {
          this.y = -50;
          this.x = Math.random() * canvas.width;
        }

        if (this.x < -20) this.x = canvas.width + 20;
        if (this.x > canvas.width + 20) this.x = -20;
      }

      draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        
        if (this.type === 'char') {
          ctx.font = `${this.size * 6}px monospace`;
          ctx.fillText(this.char, this.x, this.y);
        } else if (this.type === 'line') {
          ctx.beginPath();
          ctx.moveTo(this.x, this.y);
          ctx.lineTo(this.x, this.y + this.length);
          ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity * 0.5})`;
          ctx.lineWidth = this.size;
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const render = () => {
      // Calculate scroll velocity
      const currentScrollY = window.scrollY;
      const rawVelocity = currentScrollY - lastScrollY;
      
      // Smooth velocity transition
      scrollVelocity += (rawVelocity - scrollVelocity) * 0.15;
      lastScrollY = currentScrollY;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.update(scrollVelocity);
        p.draw();
      });

      // Decay velocity when scrolling stops
      if (Math.abs(scrollVelocity) > 0.01) {
        scrollVelocity *= 0.9;
      } else {
        scrollVelocity = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[50] pointer-events-none mix-blend-screen">
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-30"
      />
      {/* Optional gradient overlay to blend edges */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-transparent to-black/0 opacity-50" />
    </div>
  );
};

export default ParticleDataStream;

