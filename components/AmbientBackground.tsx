
import React, { useEffect, useRef } from 'react';

interface AmbientBackgroundProps {
  isCharging?: boolean;
}

const AmbientBackground: React.FC<AmbientBackgroundProps> = ({ isCharging }) => {
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
    
    const inputPos = { x: 0.5, y: 0.5 };
    const targetPos = { x: 0.5, y: 0.5 };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const draw = () => {
      time += isCharging ? 0.02 : 0.005; // Speed up when charging
      
      inputPos.x += (targetPos.x - inputPos.x) * 0.05;
      inputPos.y += (targetPos.y - inputPos.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      const drawBlob = (x: number, y: number, radius: number, color1: string, color2: string) => {
        const grad = ctx.createRadialGradient(x, y, 0, x, y, radius);
        grad.addColorStop(0, color1);
        grad.addColorStop(1, color2);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      };

      ctx.globalCompositeOperation = 'screen';

      const blueColor = isCharging ? 'rgba(255, 30, 30, 0.2)' : 'rgba(20, 30, 100, 0.15)';
      const purpleColor = isCharging ? 'rgba(100, 0, 0, 0.15)' : 'rgba(50, 20, 120, 0.1)';

      // Aurora 1
      drawBlob(
        width * (0.5 + Math.sin(time) * 0.2 + (inputPos.x - 0.5) * 0.1),
        height * (0.5 + Math.cos(time * 0.8) * 0.2 + (inputPos.y - 0.5) * 0.1),
        width * 0.8,
        blueColor,
        'rgba(0, 0, 0, 0)'
      );

      // Aurora 2
      drawBlob(
        width * (0.3 + Math.cos(time * 1.2) * 0.2),
        height * (0.7 + Math.sin(time * 0.5) * 0.2),
        width * 0.6,
        purpleColor,
        'rgba(0, 0, 0, 0)'
      );

      // Aurora 3
      drawBlob(
        width * inputPos.x,
        height * inputPos.y,
        width * (isCharging ? 0.8 : 0.4),
        isCharging ? 'rgba(255, 255, 255, 0.15)' : 'rgba(59, 130, 246, 0.08)',
        'rgba(0, 0, 0, 0)'
      );

      ctx.globalCompositeOperation = 'source-over';
      animationFrameId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetPos.x = e.clientX / window.innerWidth;
      targetPos.y = e.clientY / window.innerHeight;
    };

    const handleDeviceMotion = (e: DeviceOrientationEvent) => {
      if (e.beta !== null && e.gamma !== null) {
        targetPos.x = (e.gamma + 90) / 180;
        targetPos.y = (e.beta + 180) / 360;
      }
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('deviceorientation', handleDeviceMotion);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('deviceorientation', handleDeviceMotion);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isCharging]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-0 pointer-events-none opacity-60" 
      style={{ filter: 'blur(40px)' }}
    />
  );
};

export default AmbientBackground;
