
import React, { useEffect, useRef, useState } from 'react';
import Matter from 'https://esm.sh/matter-js@0.19.0';

interface PhysicsSandboxProps {
  isActive: boolean;
  onReset: () => void;
}

const PhysicsSandbox: React.FC<PhysicsSandboxProps> = ({ isActive, onReset }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const itemsRef = useRef<{ element: HTMLElement; body: Matter.Body }[]>([]);

  useEffect(() => {
    if (!isActive) return;

    // 1. Setup Engine
    const engine = Matter.Engine.create();
    engineRef.current = engine;
    
    // 2. Query elements to "crush"
    const selectors = '.project-card, .glass, h1, h2, .hero-letter, [role="button"], button, .skill-tag';
    const elements = Array.from(document.querySelectorAll(selectors)) as HTMLElement[];
    
    const bodies: { element: HTMLElement; body: Matter.Body }[] = [];
    
    elements.forEach((el, i) => {
      const rect = el.getBoundingClientRect();
      if (rect.width < 5 || rect.height < 5) return;

      // Create a body for each element
      const body = Matter.Bodies.rectangle(
        rect.left + rect.width / 2,
        rect.top + rect.height / 2,
        rect.width,
        rect.height,
        {
          restitution: 0.5,
          friction: 0.1,
          chamfer: { radius: 8 },
          label: `item-${i}`
        }
      );

      // Store initial style to restore later
      el.dataset.originalTransform = el.style.transform;
      el.dataset.originalPosition = el.style.position;
      el.dataset.originalZIndex = el.style.zIndex;
      el.dataset.originalOpacity = el.style.opacity;

      // Prepare element for physics
      el.style.position = 'fixed';
      el.style.top = '0';
      el.style.left = '0';
      el.style.width = `${rect.width}px`;
      el.style.height = `${rect.height}px`;
      el.style.zIndex = '15000';
      el.style.pointerEvents = 'none'; 
      el.style.margin = '0';

      bodies.push({ element: el, body });
    });

    itemsRef.current = bodies;
    Matter.World.add(engine.world, bodies.map(b => b.body));

    // 3. Add Boundaries
    const floor = Matter.Bodies.rectangle(
      window.innerWidth / 2,
      window.innerHeight + 50,
      window.innerWidth * 2,
      100,
      { isStatic: true }
    );
    const leftWall = Matter.Bodies.rectangle(-50, window.innerHeight / 2, 100, window.innerHeight * 2, { isStatic: true });
    const rightWall = Matter.Bodies.rectangle(window.innerWidth + 50, window.innerHeight / 2, 100, window.innerHeight * 2, { isStatic: true });
    
    Matter.World.add(engine.world, [floor, leftWall, rightWall]);

    // 4. Mouse Control
    const mouse = Matter.Mouse.create(document.body);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false }
      }
    });
    Matter.World.add(engine.world, mouseConstraint);

    // 5. Runner
    const runner = Matter.Runner.create();
    runnerRef.current = runner;
    Matter.Runner.run(runner, engine);

    // 6. Update Loop
    let animFrame: number;
    const update = () => {
      itemsRef.current.forEach(({ element, body }) => {
        const { x, y } = body.position;
        const angle = body.angle;
        element.style.transform = `translate(${x - element.offsetWidth / 2}px, ${y - element.offsetHeight / 2}px) rotate(${angle}rad)`;
      });
      animFrame = requestAnimationFrame(update);
    };
    update();

    return () => {
      cancelAnimationFrame(animFrame);
      if (runnerRef.current) Matter.Runner.stop(runnerRef.current);
      if (engineRef.current) Matter.World.clear(engineRef.current.world, false);
      
      // Cleanup DOM styles
      itemsRef.current.forEach(({ element }) => {
        element.style.position = element.dataset.originalPosition || '';
        element.style.transform = element.dataset.originalTransform || '';
        element.style.zIndex = element.dataset.originalZIndex || '';
        element.style.opacity = element.dataset.originalOpacity || '';
        element.style.pointerEvents = '';
        element.style.top = '';
        element.style.left = '';
      });
    };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-[20000] pointer-events-none">
      <div className="absolute top-12 left-1/2 -translate-x-1/2 pointer-events-auto flex flex-col items-center gap-4">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onReset();
          }}
          className="bg-white text-black px-12 py-6 rounded-full font-syne font-black uppercase tracking-[0.4em] text-xs hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_50px_rgba(255,255,255,0.3)]"
        >
          Restore Reality
        </button>
        <span className="text-[8px] uppercase tracking-[0.5em] text-white/40">Press ESC to reset instantly</span>
      </div>
      
      {/* Visual Distortion Overlay */}
      <div className="absolute inset-0 bg-blue-500/10 mix-blend-color pointer-events-none" />
      <div className="absolute inset-0 border-[20px] border-white/10 pointer-events-none" />
    </div>
  );
};

export default PhysicsSandbox;
