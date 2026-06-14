import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import PlannerSuite from './components/PlannerSuite';
import Showcase from './components/Showcase';
import Footer from './components/Footer';

export default function App() {
  // Generate particles with randomized sizing, types, and movement sways
  const particles = React.useMemo(() => {
    return Array.from({ length: 32 }).map((_, i) => {
      const type = i % 2 === 0 ? 'bokeh' : 'sparkle';
      const size = type === 'bokeh' ? Math.random() * 16 + 8 : Math.random() * 6 + 9; // Bokeh: 8-24px, Sparkle: 9-15px
      const left = Math.random() * 100;
      const delay = Math.random() * 15;
      const duration = Math.random() * 18 + 14; // 14s to 32s
      return { id: i, type, size, left, delay, duration };
    });
  }, []);

  return (
    <>
      {/* Background glowing elements (Apple style blur) */}
      <div className="glowing-bg-elements" aria-hidden="true">
        <div className="glow-circle glow-circle-1" />
        <div className="glow-circle glow-circle-2" />
        <div className="glow-circle glow-circle-3" />
        <div className="glow-circle glow-circle-4" />
        <div className="glow-circle glow-circle-5" />
      </div>

      {/* Floating celebration lights & rotating sparkles */}
      <div className="particles-container" aria-hidden="true">
        {particles.map((p) => (
          <div
            key={p.id}
            className={`floating-particle ${p.type}`}
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              left: `${p.left}%`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Sticky navigation bar */}
      <Header />

      {/* Primary landing layout elements */}
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <PlannerSuite />
        <Showcase />
      </main>

      {/* Site footer */}
      <Footer />
    </>
  );
}
