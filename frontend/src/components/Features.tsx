import React from 'react';
import { Mail, Palette, Moon, ClipboardList, Wand2, ArrowRight } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  tabKey: string;
  glowColor: string;
}

function FeatureCard({ icon, title, description, tabKey, glowColor }: FeatureCardProps) {
  const handleCardClick = () => {
    // Scroll to the planner section
    const plannerSec = document.getElementById('planner');
    if (plannerSec) {
      plannerSec.scrollIntoView({ behavior: 'smooth' });
    }
    // Fire a custom event to change the tab in the PlannerSuite dashboard
    const event = new CustomEvent('select-planner-tab', { detail: tabKey });
    window.dispatchEvent(event);
  };

  return (
    <div 
      className="glass-card feature-card-item"
      onClick={handleCardClick}
      style={{
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '1.25rem',
        height: '100%',
        padding: '2.25rem 2rem',
        border: '1px solid rgba(255, 255, 255, 0.06)'
      }}
    >
      {/* Icon Container with subtle radial glow */}
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '54px',
          height: '54px',
          borderRadius: '14px',
          backgroundColor: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: `0 0 20px ${glowColor}`,
          color: 'white',
          transition: 'all 0.3s ease',
        }}
        className="icon-box"
      >
        {icon}
      </div>

      <div>
        <h3 style={{ fontSize: '1.3rem', marginBottom: '0.6rem', fontWeight: 600 }}>{title}</h3>
        <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>{description}</p>
      </div>

      <div 
        style={{ 
          marginTop: 'auto', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.4rem', 
          fontSize: '0.85rem', 
          fontWeight: 600, 
          color: 'var(--color-primary)',
          opacity: 0.8,
          transition: 'transform 0.3s ease'
        }}
        className="arrow-link"
      >
        <span>Open Creator</span>
        <ArrowRight size={14} />
      </div>

      <style>{`
        .feature-card-item:hover .icon-box {
          transform: scale(1.1) rotate(4deg);
          border-color: rgba(255, 255, 255, 0.2);
          box-shadow: 0 0 30px ${glowColor};
        }
        .feature-card-item:hover .arrow-link {
          transform: translateX(4px);
          opacity: 1;
        }
      `}</style>
    </div>
  );
}

export default function Features() {
  const features = [
    {
      icon: <Mail size={24} color="#8b5cf6" />,
      title: 'Invitation Creator',
      description: 'Design gorgeous, interactive digital birthday invitations. Customize layouts, colors, and typography instantly.',
      tabKey: 'invitation',
      glowColor: 'rgba(139, 92, 246, 0.25)',
    },
    {
      icon: <Palette size={24} color="#ec4899" />,
      title: 'Theme Generator',
      description: 'Explore high-end curated aesthetic themes (Retro Wave, Cyberpunk, Boho, Forest) with cohesive color palettes.',
      tabKey: 'theme',
      glowColor: 'rgba(236, 72, 153, 0.25)',
    },
    {
      icon: <Moon size={24} color="#06b6d4" />,
      title: 'Zodiac Inspiration',
      description: 'Uncover theme proposals aligned with your stars. Enter birthday dates to get celestial party vibes.',
      tabKey: 'zodiac',
      glowColor: 'rgba(6, 182, 212, 0.25)',
    },
    {
      icon: <ClipboardList size={24} color="#eab308" />,
      title: 'Party Planner',
      description: 'Stay organized with an interactive, checklist planner designed to map your steps from theme selection to party night.',
      tabKey: 'planner',
      glowColor: 'rgba(234, 179, 8, 0.25)',
    },
    {
      icon: <Wand2 size={24} color="#10b981" />,
      title: 'AI Recommendations',
      description: 'Describe your dream celebration in natural language and watch the AI assemble custom concepts, menus, and guides.',
      tabKey: 'ai',
      glowColor: 'rgba(16, 185, 129, 0.25)',
    },
  ];

  return (
    <section id="features" className="section" style={{ position: 'relative' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem', display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 800 }}>
            Everything You Need to <span className="text-gradient-magic">Celebrate</span>
          </h2>
          <p style={{ maxWidth: '600px', color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.6' }}>
            Elevate your celebration from standard to legendary. Explore our premium features, designed to make birthday planning delightful and effortless.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="features-grid">
          {features.map((feat, index) => (
            <div key={index} className={`animate-fade-in delay-${(index + 1) * 100}`} style={{ height: '100%' }}>
              <FeatureCard
                icon={feat.icon}
                title={feat.title}
                description={feat.description}
                tabKey={feat.tabKey}
                glowColor={feat.glowColor}
              />
            </div>
          ))}
        </div>

      </div>

      <style>{`
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 2rem;
        }
        @media (max-width: 480px) {
          .features-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
