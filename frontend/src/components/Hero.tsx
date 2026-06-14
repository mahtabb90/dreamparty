import { ArrowRight, Sparkles, Wand2, Calendar, ShieldCheck } from 'lucide-react';

export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="section" style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', paddingTop: '9rem', overflow: 'hidden' }}>
      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '4rem', alignItems: 'center' }} className="hero-grid">
          
          {/* Hero Content */}
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'left' }}>
            {/* Tagline */}
            <div 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'rgba(139, 92, 246, 0.1)',
                border: '1px solid rgba(139, 92, 246, 0.25)',
                color: '#c084fc',
                padding: '0.4rem 1rem',
                borderRadius: '100px',
                fontSize: '0.85rem',
                fontWeight: 600,
                width: 'fit-content',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                fontFamily: 'var(--font-display)',
                boxShadow: '0 0 15px rgba(139, 92, 246, 0.1)'
              }}
            >
              <Sparkles size={14} />
              <span>Introducing DreamParty AI</span>
            </div>

            {/* Title / Logo */}
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 800 }}>
              <span className="text-gradient-primary">Unforgettable</span>
              <br />
              <span className="text-gradient-magic" style={{ filter: 'drop-shadow(0 2px 20px rgba(236,72,153,0.15))' }}>Celebrations.</span>
            </h1>

            {/* Subtitle / Description */}
            <p style={{ fontSize: '1.25rem', color: '#f8f9fa', fontWeight: 500, opacity: 0.95, maxWidth: '550px' }}>
              Create unforgettable celebrations.
            </p>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: '1.6', maxWidth: '550px' }}>
              Personalized invitations, party themes, planning tools and AI-powered inspiration. Design like Canva, discover like Pinterest, smooth like Apple.
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
              <button onClick={() => scrollToSection('planner')} className="btn btn-primary">
                <span>Start Planning</span>
                <ArrowRight size={18} />
              </button>
              <button onClick={() => scrollToSection('features')} className="btn btn-secondary">
                Explore Features
              </button>
            </div>

            {/* Trust badges */}
            <div style={{ display: 'flex', gap: '1.5rem', marginTop: '2rem', flexWrap: 'wrap', borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8', fontSize: '0.85rem' }}>
                <Wand2 size={16} color="#06b6d4" />
                <span>AI Themes</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8', fontSize: '0.85rem' }}>
                <Calendar size={16} color="#ec4899" />
                <span>Instant Invites</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8', fontSize: '0.85rem' }}>
                <ShieldCheck size={16} color="#10b981" />
                <span>No Account Required</span>
              </div>
            </div>
          </div>

          {/* Hero Visual Mockup */}
          <div className="animate-fade-in delay-200" style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="hero-mockup-wrapper" style={{ position: 'relative', width: '100%', maxWidth: '500px' }}>
              
              {/* Glow Behind Mockup */}
              <div 
                style={{
                  position: 'absolute',
                  top: '20%',
                  left: '20%',
                  right: '20%',
                  bottom: '20%',
                  background: 'radial-gradient(circle, rgba(139, 92, 246, 0.35) 0%, transparent 70%)',
                  filter: 'blur(40px)',
                  zIndex: -1
                }}
              />

              {/* Main Card: Invitation Preview (Canva-like) */}
              <div 
                className="glass-card" 
                style={{ 
                  padding: '1.5rem', 
                  borderRadius: '24px', 
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 40px rgba(139, 92, 246, 0.15)',
                  transform: 'rotate(-2deg)',
                  zIndex: 2
                }}
              >
                <div style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #311042 100%)', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: 0, right: 0, width: '150px', height: '150px', background: 'radial-gradient(circle, rgba(236,72,153,0.15) 0%, transparent 70%)', filter: 'blur(10px)' }} />
                  <div style={{ padding: '2.5rem 1.5rem', textAlign: 'center', position: 'relative', zIndex: 1 }}>
                    <p style={{ fontFamily: 'var(--font-display)', color: '#d946ef', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>You're Invited</p>
                    <h3 style={{ fontSize: '2rem', fontFamily: 'var(--font-display)', fontWeight: 800, margin: '0.5rem 0', background: 'linear-gradient(to bottom, #ffffff, #e2e8f0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>AURELIA'S</h3>
                    <h2 style={{ fontSize: '3rem', fontFamily: 'var(--font-display)', fontWeight: 900, margin: '0.2rem 0', background: 'linear-gradient(to right, #ffd700, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '0.05em' }}>25TH</h2>
                    <p style={{ color: '#fff', fontSize: '1rem', fontStyle: 'italic', opacity: 0.9, marginTop: '0.2rem' }}>Midnight Stars & Golden Bubbles</p>
                    <div style={{ margin: '2rem auto 1.5rem auto', width: '40px', height: '1px', backgroundColor: 'rgba(255,255,255,0.2)' }} />
                    <p style={{ color: '#e2e8f0', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.05em' }}>SATURDAY, OCT 12TH • 9:00 PM</p>
                    <p style={{ color: '#94a3b8', fontSize: '0.8rem', marginTop: '0.3rem' }}>THE OBSIDIAN LOUNGE, NYC</p>
                  </div>
                </div>

                {/* Micro Editor Overlay controls */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Template: <b style={{ color: '#fff' }}>Midnight Cosmic</b></span>
                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ec4899' }}></span>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#8b5cf6' }}></span>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#06b6d4' }}></span>
                  </div>
                </div>
              </div>

              {/* Back Card 1: Theme Palette (Pinterest-like) */}
              <div 
                className="glass-card" 
                style={{ 
                  position: 'absolute',
                  top: '-15%',
                  right: '-12%',
                  width: '180px',
                  padding: '1rem',
                  borderRadius: '16px',
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.4)',
                  transform: 'rotate(8deg) scale(0.95)',
                  zIndex: 1
                }}
              >
                <p style={{ fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8', marginBottom: '0.6rem' }}>Selected Vibe</p>
                <h4 style={{ fontSize: '0.9rem', marginBottom: '0.8rem' }}>Midnight Stars</h4>
                <div style={{ display: 'flex', gap: '4px', height: '28px', borderRadius: '6px', overflow: 'hidden', marginBottom: '0.5rem' }}>
                  <div style={{ flex: 1, backgroundColor: '#0f172a' }} />
                  <div style={{ flex: 1, backgroundColor: '#311042' }} />
                  <div style={{ flex: 1, backgroundColor: '#8b5cf6' }} />
                  <div style={{ flex: 1, backgroundColor: '#d946ef' }} />
                  <div style={{ flex: 1, backgroundColor: '#f59e0b' }} />
                </div>
                <div style={{ fontSize: '0.65rem', color: '#64748b', display: 'flex', justifyContent: 'space-between' }}>
                  <span>Cosmic Vibe</span>
                  <span>100% Match</span>
                </div>
              </div>

              {/* Back Card 2: Planner Tasks Checkbox */}
              <div 
                className="glass-card" 
                style={{ 
                  position: 'absolute',
                  bottom: '-12%',
                  left: '-10%',
                  width: '210px',
                  padding: '1rem 1.25rem',
                  borderRadius: '16px',
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.4)',
                  transform: 'rotate(-6deg) scale(0.95)',
                  zIndex: 3
                }}
              >
                <p style={{ fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8', marginBottom: '0.6rem' }}>Checklist</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '3px', border: '1.5px solid #8b5cf6', backgroundColor: 'rgba(139,92,246,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ width: '6px', height: '6px', backgroundColor: '#8b5cf6', borderRadius: '1px' }}></span>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: '#f1f5f9', textDecoration: 'line-through', opacity: 0.6 }}>Customize invitation</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '3px', border: '1.5px solid #8b5cf6', backgroundColor: 'rgba(139,92,246,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ width: '6px', height: '6px', backgroundColor: '#8b5cf6', borderRadius: '1px' }}></span>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: '#f1f5f9', textDecoration: 'line-through', opacity: 0.6 }}>Select party theme</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '3px', border: '1.5px solid #64748b' }}></div>
                    <span style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>Send RSVP link</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      <style>{`
        @media (min-width: 992px) {
          .hero-grid {
            grid-template-columns: 1.2fr 0.8fr !important;
          }
        }
        @media (max-width: 991px) {
          .hero-grid {
            text-align: center !important;
            justify-items: center;
          }
          .hero-grid > div:first-child {
            align-items: center !important;
            text-align: center !important;
          }
          .hero-grid p {
            margin: 0 auto;
          }
          .hero-mockup-wrapper {
            margin-top: 3rem;
          }
        }
      `}</style>
    </section>
  );
}
