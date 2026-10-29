import React, { useEffect, useRef } from 'react';

const ParticleNetwork = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    
    const particleCount = window.innerWidth < 768 ? 50 : 100;
    const colors = ['#ea580c', '#c2410c', '#0f766e', '#fdefe6']; // Ink & Ember palette

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.z = Math.random() * 2 + 0.5; // Depth multiplier
        this.vx = (Math.random() - 0.5) * 1.2 * this.z;
        this.vy = (Math.random() - 0.5) * 1.2 * this.z;
        this.radius = (Math.random() * 2.5 + 1) * this.z;
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
        if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        // Adding a subtle glow effect to larger particles
        if (this.radius > 3) {
          ctx.shadowBlur = 15;
          ctx.shadowColor = this.color;
        } else {
          ctx.shadowBlur = 0;
        }
        ctx.fill();
        ctx.shadowBlur = 0; // Reset
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Cinematic ink gradient background with transparency
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, 'rgba(11, 10, 9, 0.85)'); // Brand ink (85% opacity)
      gradient.addColorStop(1, 'rgba(23, 19, 16, 0.95)'); // Raised ink (95% opacity)
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particleCount; i++) {
        particles[i].update();
        particles[i].draw();
        
        for (let j = i + 1; j < particleCount; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          // Connect particles that are close
          if (dist < 180) {
            ctx.beginPath();
            const opacity = 1 - (dist / 180);
            ctx.strokeStyle = `rgba(234, 88, 12, ${opacity * 0.4})`; // Soft ember lines
            ctx.lineWidth = (particles[i].z + particles[j].z) * 0.3; // Line width based on depth
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, overflow: 'hidden' }}>
      {/* Underlying space image for extra depth */}
      <img src="/assets/images/placeholder-bg.jpg" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3, filter: 'grayscale(50%)' }} alt="Space Depth" />
      
      {/* Underlying faint grid image for extra tech texture */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px', zIndex: 1, pointerEvents: 'none' }}></div>
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%', position: 'relative', zIndex: 2 }} />
    </div>
  );
};

export default ParticleNetwork;



