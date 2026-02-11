
import React, { useEffect, useRef, useState } from 'react';
import Matter from 'https://esm.sh/matter-js@0.19.0';

interface PhysicsSandboxProps {
  isActive: boolean;
  onReset: () => void;
}

const PhysicsSandbox: React.FC<PhysicsSandboxProps> = ({ isActive, onReset }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const itemsRef = useRef<{ element: HTMLElement; body: Matter.Body }[]>([]);

  useEffect(() => {
    if (!isActive) return;

    // 1. Setup Engine
    const engine = Matter.Engine.create();
    engineRef.current = engine;
    
    // 2. Query elements to "crush"
    // We target projects, bento items, headers, and skills
    const selectors = '.project-card, .glass, h1, h2, .hero-letter, [role="button"]';
    const elements = Array.from(document.querySelectorAll(selectors)) as HTMLElement[];
    
    const bodies: { element: HTMLElement; body: Matter.Body }[] = [];
    
    elements.forEach((el, i) => {
      const rect = el.getBoundingClientRect();
      if (rect.width < 10 || rect.height < 10) return;

      // Create a body for each element
      const body = Matter.Bodies.rectangle(
        rect.left + rect.width / 2,
        rect.top + rect.height / 2,
        rect.width,
        rect.height,
        {
          restitution: 0.6,
          friction: 0.1,
          chamfer: { radius: 10 },
          label: `item-${i}`
        }
      );

      // Store initial style to restore later
      el.dataset.originalTransform = el.style.transform;
      el.dataset.originalPosition = el.style.position;
      el.dataset.originalZIndex = el.style.zIndex;

      // Prepare element for physics
      el.style.position = 'fixed';
      el.style.top = '0';
      el.style.left = '0';
      el.style.width = `${rect.width}px`;
      el.style.height = `${rect.height}px`;
      el.style.zIndex = '9999';
      el.style.pointerEvents = 'none'; // Physics engine handles mouse via constraint
      el.style.margin = '0';

      bodies.push({ element: el, body });
    });

    itemsRef.current = bodies;
    Matter.World.add(engine.world, bodies.map(b => b.body));

    // 3. Add Boundaries (Floor, Walls)
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

    // 6. Update Loop (Synchronize DOM with Physics)
    const update = () => {
      itemsRef.current.forEach(({ element, body }) => {
        const { x, y } = body.position;
        const angle = body.angle;
        element.style.transform = `translate(${x - element.offsetWidth / 2}px, ${y - element.offsetHeight / 2}px) rotate(${angle}rad)`;
      });
      if (isActive) requestAnimationFrame(update);
    };
    update();

    return () => {
      if (runnerRef.current) Matter.Runner.stop(runnerRef.current);
      if (engineRef.current) Matter.World.clear(engineRef.current.world, false);
      
      // Cleanup DOM styles
      itemsRef.current.forEach(({ element }) => {
        element.style.position = element.dataset.originalPosition || '';
        element.style.transform = element.dataset.originalTransform || '';
        element.style.zIndex = element.dataset.originalZIndex || '';
        element.style.pointerEvents = '';
        element.style.top = '';
        element.style.left = '';
      });
    };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-[10000] pointer-events-none">
      <div className="absolute top-10 left-1/2 -translate-x-1/2 pointer-events-auto">
        <button 
          onClick={onReset}
          className="glass px-8 py-4 rounded-full font-syne font-black uppercase tracking-[0.3em] text-[10px] hover:bg-white hover:text-black transition-all duration-500 border border-white/20"
        >
          Restore Reality
        </button>
      </div>
      
      {/* Visual Glitch Overlay */}
      <div className="absolute inset-0 bg-blue-500/5 mix-blend-overlay pointer-events-none animate-pulse" />
    </div>
  );
};

export default PhysicsSandbox;
