import { Calendar, Search, Lightbulb, PartyPopper } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      num: '01',
      icon: <Calendar size={20} color="#c87a90" />,
      title: 'Enter Birthday Details',
      description: 'Input your name, age, and date. Our system begins matching details immediately to align with your personal vibe and stars.'
    },
    {
      num: '02',
      icon: <Search size={20} color="#dec39d" />,
      title: 'Discover Theme Vibes',
      description: 'Explore visual mood boards, copy curated color palettes, and match themes directly linked with your cosmic zodiac sign.'
    },
    {
      num: '03',
      icon: <Lightbulb size={20} color="#e5b3c0" />,
      title: 'Generate Party Ideas',
      description: 'Describe details to the custom AI recommendation engine to formulate specific food menus, drink pairings, and sound playlists.'
    },
    {
      num: '04',
      icon: <PartyPopper size={20} color="#dfc9a5" />,
      title: 'Create Perfect Parties',
      description: 'Customize and download your stellar invitation template, track tasks on your dynamic checklist, and host the perfect event.'
    }
  ];

  return (
    <section id="how-it-works" className="section" style={{ position: 'relative', overflow: 'hidden' }}>
      
      {/* Background glow overlay */}
      <div 
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(222, 195, 157, 0.04) 0%, transparent 70%)',
          filter: 'blur(50px)',
          zIndex: -1,
          pointerEvents: 'none'
        }}
      />

      <div className="container">
        
        {/* Section Title */}
        <div style={{ textAlign: 'center', marginBottom: '5rem', display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 800 }}>
            How It <span className="text-gradient-magic">Works</span>
          </h2>
          <p style={{ maxWidth: '600px', color: 'var(--text-muted)', fontSize: '1.02rem', lineHeight: '1.6' }}>
            A simplified, high-end pipeline designed to take you from a date on the calendar to a legendary celebration.
          </p>
        </div>

        {/* Steps Grid / Timeline */}
        <div className="steps-container" style={{ position: 'relative' }}>
          
          {/* Connector Line (Horizontal Desktop) */}
          <div className="timeline-line-desktop" />

          <div className="steps-grid">
            {steps.map((step, idx) => (
              <div 
                key={idx} 
                className={`animate-fade-in delay-${(idx + 1) * 100}`}
                style={{ position: 'relative', zIndex: 2 }}
              >
                <div 
                  className="glass-card step-card" 
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    padding: '2.5rem 1.75rem',
                    height: '100%',
                    border: '1px solid rgba(255, 255, 255, 0.05)'
                  }}
                >
                  {/* Glowing step indicator badge */}
                  <div 
                    className="step-badge"
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      background: 'rgba(5, 5, 8, 0.85)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      boxShadow: '0 0 20px rgba(222, 195, 157, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.1rem',
                      fontWeight: 800,
                      fontFamily: 'var(--font-display)',
                      color: 'white',
                      marginBottom: '1.5rem',
                      position: 'relative',
                      transition: 'all 0.4s ease'
                    }}
                  >
                    {step.num}
                    
                    {/* Small Mini Icon */}
                    <div 
                      style={{
                        position: 'absolute',
                        bottom: '-4px',
                        right: '-4px',
                        backgroundColor: '#0d0d16',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        width: '26px',
                        height: '26px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.4)'
                      }}
                    >
                      {step.icon}
                    </div>
                  </div>

                  <h3 style={{ fontSize: '1.2rem', marginBottom: '0.75rem', fontWeight: 600 }}>{step.title}</h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>{step.description}</p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

      <style>{`
        .steps-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
        }
        .timeline-line-desktop {
          position: absolute;
          top: 57px;
          left: 10%;
          right: 10%;
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(200,122,144,0.3) 15%, rgba(222,195,157,0.3) 50%, rgba(229,179,192,0.3) 85%, transparent);
          z-index: 1;
        }
        .step-card:hover .step-badge {
          transform: scale(1.1);
          border-color: var(--color-primary);
          box-shadow: 0 0 25px rgba(222, 195, 157, 0.45);
          color: var(--color-primary);
        }
        
        @media (max-width: 991px) {
          .steps-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .timeline-line-desktop {
            display: none;
          }
        }
        @media (max-width: 576px) {
          .steps-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
