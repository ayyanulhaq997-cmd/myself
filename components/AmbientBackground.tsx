
import React, { useEffect, useRef } from 'react';

const AmbientBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width: number;
    let height: number;
    let animationFrameId: number;
    let time = 0;
    
    const mouse = { x: 0.5, y: 0.5 };
    const targetMouse = { x: 0.5, y: 0.5 };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const draw = () => {
      time += 0.005;
      
      // Smoothly interpolate mouse position
      mouse.x += (targetMouse.x - mouse.x) * 0.05;
      mouse.y += (targetMouse.y - mouse.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Create a complex gradient mesh using multiple overlapping radial gradients
      const drawBlob = (x: number, y: number, radius: number, color1: string, color2: string) => {
        const grad = ctx.createRadialGradient(x, y, 0, x, y, radius);
        grad.addColorStop(0, color1);
        grad.addColorStop(1, color2);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      };

      ctx.globalCompositeOperation = 'screen';

      // Aurora 1 - Deep Blue
      drawBlob(
        width * (0.5 + Math.sin(time) * 0.2 + (mouse.x - 0.5) * 0.1),
        height * (0.5 + Math.cos(time * 0.8) * 0.2 + (mouse.y - 0.5) * 0.1),
        width * 0.8,
        'rgba(20, 30, 100, 0.15)',
        'rgba(0, 0, 0, 0)'
      );

      // Aurora 2 - Indigo/Purple
      drawBlob(
        width * (0.3 + Math.cos(time * 1.2) * 0.2),
        height * (0.7 + Math.sin(time * 0.5) * 0.2),
        width * 0.6,
        'rgba(50, 20, 120, 0.1)',
        'rgba(0, 0, 0, 0)'
      );

      // Aurora 3 - Cyan highlight near mouse
      drawBlob(
        width * mouse.x,
        height * mouse.y,
        width * 0.4,
        'rgba(59, 130, 246, 0.08)',
        'rgba(0, 0, 0, 0)'
      );

      ctx.globalCompositeOperation = 'source-over';
      animationFrameId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouse.x = e.clientX / window.innerWidth;
      targetMouse.y = e.clientY / window.innerHeight;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-0 pointer-events-none opacity-60" 
      style={{ filter: 'blur(40px)' }}
    />
  );
};

export default AmbientBackground;
