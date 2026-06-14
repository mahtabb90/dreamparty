import React from 'react';
import { Mail, Palette, Moon, ClipboardList, Wand2, ArrowRight } from 'lucide-react';

interface FeatureCardProps {
  serviceNo: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  tabKey: string;
  glowColor: string;
  ctaLabel: string;
}

function FeatureCard({ serviceNo, icon, title, description, tabKey, glowColor, ctaLabel }: FeatureCardProps) {
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
        gap: '1rem',
        height: '100%',
        padding: '2.5rem 2rem',
        border: '1px solid rgba(222, 195, 157, 0.1)', /* Gold tinted border */
        boxShadow: '0 15px 35px rgba(0,0,0,0.4)'
      }}
    >
      {/* Top Row: Service Number and Icon */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: '0.25rem' }}>
        <span style={{ 
          fontSize: '0.7rem', 
          color: '#dec39d', 
          fontFamily: 'var(--font-display)', 
          fontWeight: 700, 
          letterSpacing: '0.15em', 
          textTransform: 'uppercase',
          opacity: 0.95
        }}>
          {serviceNo}
        </span>
        
        {/* Icon Container with radial glow */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '46px',
            height: '46px',
            borderRadius: '12px',
            backgroundColor: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(222, 195, 157, 0.15)',
            boxShadow: `0 0 15px ${glowColor}`,
            color: 'white',
            transition: 'all 0.3s ease',
          }}
          className="icon-box"
        >
          {icon}
        </div>
      </div>

      {/* Elegant line separator */}
      <div style={{ width: '40px', height: '1px', backgroundColor: 'rgba(222, 195, 157, 0.25)', margin: '0.2rem 0' }} />

      {/* Title & Description */}
      <div>
        <h3 style={{ 
          fontSize: '1.4rem', 
          fontFamily: 'var(--font-serif)', 
          fontStyle: 'italic', 
          fontWeight: 500, 
          color: '#fff', 
          marginBottom: '0.6rem',
          letterSpacing: '0.02em'
        }}>
          {title}
        </h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
          {description}
        </p>
      </div>

      {/* Elegant CTA Link */}
      <div 
        style={{ 
          marginTop: 'auto', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.4rem', 
          fontSize: '0.8rem', 
          fontWeight: 600, 
          color: 'var(--color-primary)',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          fontFamily: 'var(--font-display)',
          opacity: 0.85,
          transition: 'transform 0.3s ease'
        }}
        className="arrow-link"
      >
        <span>{ctaLabel}</span>
        <ArrowRight size={13} />
      </div>

      <style>{`
        .feature-card-item:hover {
          border-color: rgba(222, 195, 157, 0.35) !important;
          box-shadow: 0 20px 45px rgba(200, 122, 144, 0.12) !important;
        }
        .feature-card-item:hover .icon-box {
          transform: scale(1.08) rotate(4deg);
          border-color: rgba(222, 195, 157, 0.45);
          box-shadow: 0 0 25px ${glowColor};
        }
        .feature-card-item:hover .arrow-link {
          transform: translateX(4px);
          opacity: 1 !important;
          color: #fff !important;
        }
      `}</style>
    </div>
  );
}

export default function Features() {
  const features = [
    {
      serviceNo: 'Service No. 01',
      icon: <Mail size={20} color="#c87a90" />,
      title: 'Invitation Atelier',
      description: 'Our bespoke digital stationery salon. Craft custom invitation suites styled with gold-press details, letterpress cardstock, and elegant typography.',
      tabKey: 'invitation',
      glowColor: 'rgba(200, 122, 144, 0.2)',
      ctaLabel: 'Enter Atelier'
    },
    {
      serviceNo: 'Service No. 02',
      icon: <Palette size={20} color="#dec39d" />,
      title: 'Theme Curator',
      description: 'Aesthetic mood board direction. Explore hand-tailored color stories, velvet textures, and floral layouts curated by boutique designers.',
      tabKey: 'theme',
      glowColor: 'rgba(222, 195, 157, 0.2)',
      ctaLabel: 'Curate Aesthetics'
    },
    {
      serviceNo: 'Service No. 03',
      icon: <Moon size={20} color="#e5b3c0" />,
      title: 'Celestial Inspiration',
      description: 'Astrological alignment concepts. Coordinate planetary colors, signature party vibes, and themes matching your zodiac signature.',
      tabKey: 'zodiac',
      glowColor: 'rgba(229, 179, 192, 0.2)',
      ctaLabel: 'Align Stars'
    },
    {
      serviceNo: 'Service No. 04',
      icon: <ClipboardList size={20} color="#dfc9a5" />,
      title: 'Celebration Planner',
      description: 'Bespoke event itinerary. Map essential prep milestones, design guest timelines, and orchestrate champagne pairings in a digital journal.',
      tabKey: 'planner',
      glowColor: 'rgba(223, 201, 165, 0.2)',
      ctaLabel: 'Open Journal'
    },
    {
      serviceNo: 'Service No. 05',
      icon: <Wand2 size={20} color="#aa5b71" />,
      title: 'Party Magic',
      description: 'Concierge recommendation engine. Describe your dream soirée in natural language and allow the virtual butler to compile custom menus.',
      tabKey: 'ai',
      glowColor: 'rgba(170, 91, 113, 0.2)',
      ctaLabel: 'Consult Concierge'
    },
  ];

  return (
    <section id="features" className="section" style={{ position: 'relative', overflow: 'hidden' }}>
      
      {/* Ambient glow areas */}
      <div 
        style={{
          position: 'absolute',
          top: '25%',
          left: '-10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(200, 122, 144, 0.08) 0%, transparent 70%)',
          filter: 'blur(90px)',
          zIndex: -1,
          pointerEvents: 'none'
        }}
      />
      <div 
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '-5%',
          width: '450px',
          height: '450px',
          background: 'radial-gradient(circle, rgba(222, 195, 157, 0.06) 0%, transparent 70%)',
          filter: 'blur(85px)',
          zIndex: -1,
          pointerEvents: 'none'
        }}
      />

      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '4.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 800 }}>
            Everything You Need to <span className="text-gradient-magic">Celebrate</span>
          </h2>
          <p style={{ maxWidth: '600px', color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.6' }}>
            Elevate your celebration from standard to legendary. Explore our boutique design services, customized to make event curation effortless and exquisite.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="features-grid">
          {features.map((feat, index) => (
            <div key={index} className={`animate-fade-in delay-${(index + 1) * 100}`} style={{ height: '100%' }}>
              <FeatureCard
                serviceNo={feat.serviceNo}
                icon={feat.icon}
                title={feat.title}
                description={feat.description}
                tabKey={feat.tabKey}
                glowColor={feat.glowColor}
                ctaLabel={feat.ctaLabel}
              />
            </div>
          ))}
        </div>

      </div>

      <style>{`
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 2.25rem;
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
