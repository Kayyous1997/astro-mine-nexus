
import { useEffect, useRef } from "react";

export default function MiningAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d")!;
    
    // Set canvas dimensions for high resolution
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    
    ctx.scale(dpr, dpr);
    
    // Array to store mining particles
    const particles: {
      x: number;
      y: number;
      size: number;
      speed: number;
      color: string;
      alpha: number;
    }[] = [];
    
    // Animation properties
    let animationFrame: number;
    const colors = ["#22d3ee", "#8b5cf6", "#10b981"];
    
    // Create new particles
    const createParticles = () => {
      const particleCount = Math.floor(Math.random() * 2) + 1;
      
      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * canvas.width / dpr;
        const y = canvas.height / dpr;
        const size = Math.random() * 3 + 1;
        const speed = Math.random() * 2 + 1;
        const colorIndex = Math.floor(Math.random() * colors.length);
        
        particles.push({
          x,
          y,
          size,
          speed,
          color: colors[colorIndex],
          alpha: 1,
        });
      }
    };
    
    // Update and draw particles
    const animate = () => {
      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
      
      // Create new particles occasionally
      if (Math.random() < 0.2) {
        createParticles();
      }
      
      // Update and draw existing particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        p.y -= p.speed;
        p.alpha -= 0.005;
        
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Remove particles that are out of view or fully transparent
        if (p.y < 0 || p.alpha <= 0) {
          particles.splice(i, 1);
          i--;
        }
      }
      
      animationFrame = requestAnimationFrame(animate);
    };
    
    // Start animation
    animate();
    
    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);
  
  return (
    <div className="relative h-64 bg-dark-card rounded-lg border border-white/10 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ width: '100%', height: '100%' }}
      />
      
      {/* Mining hardware visualization */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex justify-center">
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3].map((i) => (
            <div 
              key={i}
              className="w-16 h-12 bg-dark-bg border border-white/20 rounded-md flex items-center justify-center relative overflow-hidden"
            >
              {/* Mining lights */}
              <div className={`absolute top-1 right-1 w-1 h-1 rounded-full bg-cyber-green animate-pulse-glow`} />
              
              {/* Mining component */}
              <div className="w-10 h-6 bg-dark-accent rounded-sm flex items-center justify-center">
                <div className={`w-8 h-1 bg-cyber-purple/30 animate-mining-anim`} style={{ 
                  animationDelay: `${i * 0.3}s`
                }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
