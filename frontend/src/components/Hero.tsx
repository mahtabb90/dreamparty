import { ArrowRight, Sparkles, Calendar, Heart } from 'lucide-react';
import logoImg from '../assets/dreamparty-logo-cropped-dark.png';

// Pseudo-random coordinates/durations for floating sparkles to avoid React hydration mismatches
const heroSparklesData = [
  { size: 10, left: 12, bottom: 5, color: '#dec39d', duration: 11, delay: 0 },
  { size: 7, left: 78, bottom: 18, color: '#e5b3c0', duration: 13, delay: 1.5 },
  { size: 12, left: 28, bottom: 2, color: '#c87a90', duration: 9, delay: 3 },
  { size: 8, left: 88, bottom: 28, color: '#dfc9a5', duration: 15, delay: 0.5 },
  { size: 14, left: 8, bottom: 22, color: '#dec39d', duration: 10, delay: 2 },
  { size: 9, left: 62, bottom: -4, color: '#e5b3c0', duration: 12, delay: 4 },
  { size: 8, left: 42, bottom: 14, color: '#c87a90', duration: 14, delay: 1.2 },
  { size: 7, left: 92, bottom: 0, color: '#dfc9a5', duration: 11, delay: 3.2 },
  { size: 11, left: 18, bottom: 32, color: '#dec39d', duration: 16, delay: 2.5 },
  { size: 8, left: 68, bottom: 24, color: '#e5b3c0', duration: 8, delay: 0.8 }
];

export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="section" style={{ minHeight: '92vh', display: 'flex', alignItems: 'center', paddingTop: '8rem', overflow: 'hidden', position: 'relative' }}>
      
      {/* Large Soft Blush & Champagne Glow behind Hero Section */}
      <div 
        className="champagne-ambient-glow"
        style={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '60vw',
          height: '60vw',
          background: 'radial-gradient(circle, rgba(222, 195, 157, 0.22) 0%, rgba(200, 122, 144, 0.05) 65%, transparent 100%)',
          filter: 'blur(130px)',
          zIndex: -1,
          pointerEvents: 'none'
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '5rem', alignItems: 'center' }} className="hero-grid">
          
          {/* Hero Content (Left Side) */}
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', textAlign: 'left' }}>
            
            {/* Full Logo above main headline with animated glow, aura, and sparkles */}
            <div style={{ 
              marginBottom: '1.25rem', 
              display: 'inline-flex', 
              alignItems: 'center', 
              position: 'relative',
              padding: '10px 0',
              alignSelf: 'flex-start'
            }}>
              {/* Soft rose-gold backdrop aura */}
              <div style={{
                position: 'absolute',
                inset: '-15px',
                background: 'radial-gradient(circle, rgba(255, 190, 170, 0.18) 0%, rgba(214, 138, 160, 0.06) 45%, transparent 70%)',
                filter: 'blur(10px)',
                borderRadius: '50%',
                zIndex: -1,
                animation: 'logo-aura-pulse 10s infinite alternate ease-in-out',
                pointerEvents: 'none'
              }} />

              {/* Twinkling star sparkles */}
              <div style={{
                position: 'absolute',
                top: '-4px',
                left: '12px',
                color: '#dec39d',
                fontSize: '13px',
                textShadow: '0 0 4px #dec39d',
                animation: 'logo-sparkle-twinkle 4s infinite ease-in-out',
                pointerEvents: 'none'
              }}>✦</div>
              <div style={{
                position: 'absolute',
                bottom: '-4px',
                right: '35px',
                color: '#e5b3c0',
                fontSize: '10px',
                textShadow: '0 0 4px #e5b3c0',
                animation: 'logo-sparkle-twinkle 5s infinite ease-in-out 1.5s',
                pointerEvents: 'none'
              }}>✦</div>
              <div style={{
                position: 'absolute',
                top: '15px',
                right: '-8px',
                color: '#dfc9a5',
                fontSize: '11px',
                textShadow: '0 0 4px #dfc9a5',
                animation: 'logo-sparkle-twinkle 6s infinite ease-in-out 3s',
                pointerEvents: 'none'
              }}>✦</div>

              {/* Floating logo image */}
              <img 
                src={logoImg} 
                alt="DreamParty Logo" 
                className="hero-logo-animated"
                style={{
                  width: 'clamp(220px, 25vw, 270px)',
                  height: 'auto',
                  objectFit: 'contain',
                  display: 'block',
                  imageRendering: 'auto'
                }} 
              />
            </div>

            {/* Large Luxury Headline */}
            <h1 style={{ 
              color: '#fff',
              margin: '0 0 1.5rem 0',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.3rem'
            }}>
              <span className="text-gradient-primary" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(1.6rem, 3.2vw, 2.7rem)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                Make Every
              </span>
              <span style={{ 
                fontFamily: 'var(--font-serif)', 
                fontStyle: 'italic', 
                fontWeight: 600, 
                fontSize: 'clamp(2.3rem, 4.6vw, 3.9rem)', 
                background: 'linear-gradient(135deg, #f7f2eb 0%, #dfc9a5 35%, #e5b3c0 70%, #c87a90 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 0 10px rgba(229, 179, 192, 0.45)) drop-shadow(0 0 25px rgba(200, 122, 144, 0.25))',
                lineHeight: 1.1,
                paddingBottom: '0.1rem'
              }}>
                Birthday
              </span>
              <span className="text-gradient-primary" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(1.9rem, 3.8vw, 3.2rem)', letterSpacing: '-0.01em', lineHeight: 1.1 }}>
                Unforgettable
              </span>
            </h1>

            {/* Subtitle / Elegant Description */}
            <p style={{ 
              fontSize: 'clamp(1.05rem, 1.8vw, 1.22rem)', 
              color: '#f3e8ee', 
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              lineHeight: '1.6', 
              maxWidth: '520px',
              opacity: 0.9,
              margin: '0 0 1.75rem 0'
            }}>
              Create beautiful invitations, discover curated themes, and plan every birthday detail in one elegant place.
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
              <button onClick={() => scrollToSection('planner')} className="btn btn-primary" style={{ padding: '1.05rem 2.5rem' }}>
                <span>Create My Invitation</span>
                <ArrowRight size={16} />
              </button>
              <button onClick={() => scrollToSection('features')} className="btn btn-secondary" style={{ padding: '1.05rem 2.5rem' }}>
                Explore Ideas
              </button>
            </div>

            {/* Trust details */}
            <div style={{ display: 'flex', gap: '1.75rem', marginTop: '1.5rem', flexWrap: 'wrap', borderTop: '1px solid rgba(222, 195, 157, 0.08)', paddingTop: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#dec39d', fontSize: '0.82rem', fontFamily: 'var(--font-display)', fontWeight: 500, letterSpacing: '0.03em' }}>
                <Sparkles size={14} color="#c87a90" />
                <span>Beautiful Invitations</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#dec39d', fontSize: '0.82rem', fontFamily: 'var(--font-display)', fontWeight: 500, letterSpacing: '0.03em' }}>
                <Calendar size={14} color="#c87a90" />
                <span>Curated Themes</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#dec39d', fontSize: '0.82rem', fontFamily: 'var(--font-display)', fontWeight: 500, letterSpacing: '0.03em' }}>
                <Heart size={14} color="#c87a90" />
                <span>No Account Required</span>
              </div>
            </div>
          </div>

          {/* Luxury Celebration Scene (Right Side) */}
          <div className="animate-fade-in delay-200" style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            
            {/* Visual Scene Wrapper */}
            <div className="luxury-scene-wrapper" style={{ 
              position: 'relative', 
              width: '100%', 
              height: '480px', 
              maxWidth: '460px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              
              {/* Radial Champagne gold Glow Behind Scene */}
              <div 
                style={{
                  position: 'absolute',
                  width: '320px',
                  height: '320px',
                  background: 'radial-gradient(circle, rgba(222, 195, 157, 0.28) 0%, rgba(200, 122, 144, 0.08) 60%, transparent 100%)',
                  filter: 'blur(45px)',
                  zIndex: 1,
                  pointerEvents: 'none'
                }}
              />

              {/* Drifting Gold Confetti */}
              {Array.from({ length: 14 }).map((_, i) => {
                const colors = ['#dec39d', '#e5b3c0', '#c87a90', '#dfc9a5'];
                const size = Math.random() * 5 + 4; // 4px to 9px
                const left = Math.random() * 90 + 5; // 5% to 95%
                const top = Math.random() * 50 - 20; // -20% to 30%
                const delay = Math.random() * 8;
                const duration = Math.random() * 5 + 6; // 6s to 11s
                const color = colors[i % colors.length];
                return (
                  <div
                    key={`confetti-${i}`}
                    className="drifting-confetti"
                    style={{
                      position: 'absolute',
                      top: `${top}%`,
                      left: `${left}%`,
                      width: `${size}px`,
                      height: `${size * (Math.random() * 1.5 + 1)}px`,
                      backgroundColor: color,
                      borderRadius: Math.random() > 0.5 ? '2px' : '50%',
                      opacity: 0.65,
                      zIndex: i % 2 === 0 ? 3 : 6,
                      pointerEvents: 'none',
                      boxShadow: `0 0 8px ${color}`,
                      animation: `confetti-drift-${i % 3} ${duration}s infinite linear`,
                      animationDelay: `${delay}s`,
                    }}
                  />
                );
              })}

              {/* FLOATING METALLIC BALLOONS */}
              {/* Balloon 1: Champagne Gold */}
              <div className="celebration-balloon balloon-gold" style={{
                position: 'absolute',
                width: '105px',
                height: '130px',
                borderRadius: '50% 50% 50% 50% / 40% 40% 60% 60%',
                background: 'radial-gradient(circle at 35% 30%, #ffffff 0%, rgba(222, 195, 157, 0.82) 40%, rgba(182, 145, 98, 0.95) 100%)',
                boxShadow: 'inset -6px -6px 15px rgba(0,0,0,0.45), 0 15px 30px rgba(0,0,0,0.3)',
                top: '2%',
                left: '10%',
                zIndex: 3,
                transform: 'rotate(-10deg)',
                animation: 'float-ball-1 7s infinite alternate ease-in-out'
              }}>
                <div style={{ position: 'absolute', bottom: '-7px', left: 'calc(50% - 5px)', width: '10px', height: '7px', background: '#b69162', clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
                <svg style={{ position: 'absolute', bottom: '-75px', left: 'calc(50% - 15px)', width: '30px', height: '75px', fill: 'none', stroke: 'rgba(222,195,157,0.22)', strokeWidth: 1.2 }}>
                  <path d="M15,0 C5,22 25,48 15,75" />
                </svg>
              </div>

              {/* Balloon 2: Rose Gold */}
              <div className="celebration-balloon balloon-rose" style={{
                position: 'absolute',
                width: '90px',
                height: '112px',
                borderRadius: '50% 50% 50% 50% / 40% 40% 60% 60%',
                background: 'radial-gradient(circle at 35% 30%, #ffffff 0%, rgba(229, 179, 192, 0.8) 45%, rgba(144, 71, 91, 0.95) 100%)',
                boxShadow: 'inset -5px -5px 12px rgba(0,0,0,0.45), 0 12px 25px rgba(0,0,0,0.25)',
                top: '-5%',
                left: '36%',
                zIndex: 2,
                transform: 'rotate(6deg)',
                animation: 'float-ball-2 8.5s infinite alternate ease-in-out'
              }}>
                <div style={{ position: 'absolute', bottom: '-7px', left: 'calc(50% - 5px)', width: '10px', height: '7px', background: '#aa5b71', clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
                <svg style={{ position: 'absolute', bottom: '-75px', left: 'calc(50% - 15px)', width: '30px', height: '75px', fill: 'none', stroke: 'rgba(229,179,192,0.22)', strokeWidth: 1.2 }}>
                  <path d="M15,0 C25,22 5,48 15,75" />
                </svg>
              </div>

              {/* Balloon 3: Blush Pink Translucent */}
              <div className="celebration-balloon balloon-blush" style={{
                position: 'absolute',
                width: '82px',
                height: '102px',
                borderRadius: '50% 50% 50% 50% / 40% 40% 60% 60%',
                background: 'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.45) 0%, rgba(200, 122, 144, 0.42) 50%, rgba(144, 71, 91, 0.78) 100%)',
                boxShadow: 'inset -4px -4px 10px rgba(0,0,0,0.3), 0 10px 20px rgba(0,0,0,0.2)',
                backdropFilter: 'blur(1px)',
                top: '8%',
                left: '56%',
                zIndex: 1,
                transform: 'rotate(15deg)',
                animation: 'float-ball-3 6s infinite alternate ease-in-out'
              }}>
                <div style={{ position: 'absolute', bottom: '-7px', left: 'calc(50% - 5px)', width: '10px', height: '7px', background: '#90475b', clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
                <svg style={{ position: 'absolute', bottom: '-75px', left: 'calc(50% - 15px)', width: '30px', height: '75px', fill: 'none', stroke: 'rgba(200,122,144,0.18)', strokeWidth: 1.2 }}>
                  <path d="M15,0 C5,18 25,43 15,75" />
                </svg>
              </div>


              {/* LAYERED INVITATION SUITE CARD */}
              
              {/* Outer Envelope Stand / Shadows */}
              <div className="scene-envelope" style={{
                position: 'absolute',
                width: '300px',
                height: '220px',
                background: 'linear-gradient(135deg, #1c1417 0%, #0d0a0b 100%)',
                borderRadius: '14px',
                boxShadow: '0 25px 50px rgba(0,0,0,0.7)',
                transform: 'rotate(-7deg) translateY(25px)',
                border: '1px solid rgba(222, 195, 157, 0.12)',
                zIndex: 4,
                overflow: 'hidden'
              }}>
                {/* Envelope Flap crease detail */}
                <div style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0, height: '110px',
                  background: 'rgba(255,255,255,0.015)',
                  clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)',
                  borderBottom: '1.5px solid rgba(222,195,157,0.08)'
                }} />
              </div>

              {/* Soft champagne glow behind the card */}
              <div 
                style={{
                  position: 'absolute',
                  width: '320px',
                  height: '420px',
                  background: 'radial-gradient(circle, rgba(222, 195, 157, 0.38) 0%, rgba(200, 122, 144, 0.12) 55%, transparent 100%)',
                  filter: 'blur(35px)',
                  transform: 'rotate(2deg) translate(15px, -10px)',
                  zIndex: 4,
                  pointerEvents: 'none'
                }}
              />

              {/* Main Bespoke Invitation Card */}
              <div 
                className="scene-invitation-card"
                style={{ 
                  position: 'absolute',
                  width: '270px',
                  height: '350px',
                  background: 'linear-gradient(135deg, #1f1519 0%, #2b1a20 100%)',
                  borderRadius: '16px', 
                  border: '1.5px solid #dec39d', /* Metallic Rose Gold boundary border */
                  padding: '2.25rem 1.5rem',
                  boxShadow: '0 35px 70px rgba(0,0,0,0.8), inset 0 0 20px rgba(222,195,157,0.06)',
                  transform: 'rotate(2deg) translate(15px, -10px)',
                  zIndex: 5,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  textAlign: 'center',
                  overflow: 'hidden'
                }}
              >
                {/* Sliding Reflection Sheen */}
                <div className="card-reflection-sheen" style={{
                  position: 'absolute',
                  top: 0,
                  left: '-150%',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.08) 50%, transparent)',
                  transform: 'skewX(-25deg)',
                  pointerEvents: 'none',
                  zIndex: 2
                }} />
                {/* Gold border inset */}
                <div style={{
                  position: 'absolute',
                  top: '5px', left: '5px', right: '5px', bottom: '5px',
                  border: '0.5px solid rgba(222, 195, 157, 0.22)',
                  borderRadius: '13px',
                  pointerEvents: 'none'
                }} />
                
                {/* Inner radial gradient sheen */}
                <div style={{
                  position: 'absolute',
                  top: '-70px', right: '-70px', width: '180px', height: '180px',
                  background: 'radial-gradient(circle, rgba(222,195,157,0.06) 0%, transparent 70%)',
                  filter: 'blur(8px)',
                  pointerEvents: 'none'
                }} />
                
                {/* Card Top Block */}
                <div>
                  <p style={{
                    fontFamily: 'var(--font-display)',
                    color: '#dec39d',
                    fontSize: '0.62rem',
                    fontWeight: 700,
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    marginBottom: '0.5rem'
                  }}>
                    You are Invited
                  </p>
                  <h3 style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.75rem',
                    fontWeight: 500,
                    lineHeight: 1.15,
                    color: '#fff',
                    fontStyle: 'italic',
                    marginBottom: '0.2rem',
                    background: 'linear-gradient(to bottom, #ffffff 40%, #f3e8ee 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}>
                    Maja's
                  </h3>
                  <h2 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '2.5rem',
                    fontWeight: 800,
                    color: '#fff',
                    letterSpacing: '0.04em',
                    lineHeight: 1,
                    background: 'linear-gradient(to right, #dec39d, #e5b3c0)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}>
                    30TH
                  </h2>
                </div>

                {/* Card Bottom Block */}
                <div>
                  <p style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '0.8rem',
                    fontStyle: 'italic',
                    color: '#e5b3c0',
                    lineHeight: 1.35,
                    marginBottom: '0.75rem',
                    opacity: 0.95
                  }}>
                    “An evening of champagne, laughter and unforgettable memories.”
                  </p>
                  
                  <div style={{ width: '30px', height: '1px', backgroundColor: 'rgba(222, 195, 157, 0.28)', margin: '0 auto 0.75rem auto' }} />

                  <p style={{
                    fontFamily: 'var(--font-display)',
                    color: '#dec39d',
                    fontSize: '0.68rem',
                    fontWeight: 600,
                    letterSpacing: '0.06em',
                    marginBottom: '0.2rem'
                  }}>
                    SATURDAY, OCT 12TH • 9:00 PM
                  </p>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    color: 'rgba(255,255,255,0.4)',
                    fontSize: '0.62rem',
                    letterSpacing: '0.05em'
                  }}>
                    THE ORANGERIE ATELIER, NYC
                  </p>
                </div>
              </div>

              {/* Floating rose-gold particles specifically around invitation card */}
              <div style={{ position: 'absolute', width: '270px', height: '350px', transform: 'rotate(2deg) translate(15px, -10px)', zIndex: 6, pointerEvents: 'none' }}>
                <div style={{
                  position: 'absolute',
                  top: '-15px',
                  left: '40px',
                  color: '#dec39d',
                  fontSize: '14px',
                  textShadow: '0 0 5px #dec39d',
                  animation: 'float-particle-card 6s infinite ease-in-out'
                }}>✦</div>
                <div style={{
                  position: 'absolute',
                  top: '120px',
                  right: '-12px',
                  color: '#e5b3c0',
                  fontSize: '12px',
                  textShadow: '0 0 5px #e5b3c0',
                  animation: 'float-particle-card 7s infinite ease-in-out 1s'
                }}>✦</div>
                <div style={{
                  position: 'absolute',
                  bottom: '-10px',
                  left: '80px',
                  color: '#c87a90',
                  fontSize: '15px',
                  textShadow: '0 0 5px #c87a90',
                  animation: 'float-particle-card 8s infinite ease-in-out 2s'
                }}>✦</div>
                <div style={{
                  position: 'absolute',
                  bottom: '160px',
                  left: '-15px',
                  color: '#dfc9a5',
                  fontSize: '13px',
                  textShadow: '0 0 5px #dfc9a5',
                  animation: 'float-particle-card 6.5s infinite ease-in-out 1.5s'
                }}>✦</div>
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  color: '#dfc9a5',
                  fontSize: '11px',
                  textShadow: '0 0 5px #dfc9a5',
                  animation: 'float-particle-card 5.5s infinite ease-in-out 0.5s'
                }}>✦</div>
              </div>


              {/* Champagne Composition backglow */}
              <div 
                style={{
                  position: 'absolute',
                  bottom: '-12%',
                  left: '-10%',
                  width: '260px',
                  height: '260px',
                  background: 'radial-gradient(circle, rgba(222, 195, 157, 0.25) 0%, rgba(200, 122, 144, 0.06) 65%, transparent 100%)',
                  filter: 'blur(30px)',
                  zIndex: 5,
                  pointerEvents: 'none'
                }}
              />

              {/* LUXURY CHAMPAGNE COMPOSITION (Bottom Left Overlay) */}
              <div 
                className="scene-champagne-composition"
                style={{
                  position: 'absolute',
                  bottom: '-8%',
                  left: '-2%',
                  width: '240px',
                  height: '290px',
                  zIndex: 6,
                  pointerEvents: 'none',
                  transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                <svg width="240" height="290" viewBox="0 0 240 290">
                  <defs>
                    {/* Glass gradients */}
                    <linearGradient id="glass-gradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="rgba(255,255,255,0.35)" />
                      <stop offset="30%" stopColor="rgba(255,255,255,0.06)" />
                      <stop offset="70%" stopColor="rgba(255,255,255,0.06)" />
                      <stop offset="100%" stopColor="rgba(255,255,255,0.45)" />
                    </linearGradient>
                    <linearGradient id="champagne-liquid" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgba(245, 225, 195, 0.75)" />
                      <stop offset="60%" stopColor="rgba(228, 203, 168, 0.85)" />
                      <stop offset="100%" stopColor="rgba(206, 131, 153, 0.9)" />
                    </linearGradient>
                    <linearGradient id="glass-stem" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
                      <stop offset="50%" stopColor="rgba(255,255,255,0.12)" />
                      <stop offset="100%" stopColor="rgba(255,255,255,0.38)" />
                    </linearGradient>
                    <radialGradient id="glass-base" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
                      <stop offset="100%" stopColor="transparent" />
                    </radialGradient>
                    {/* Bottle glass gradient */}
                    <linearGradient id="bottle-glass" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#0d080a" />
                      <stop offset="25%" stopColor="#24151a" />
                      <stop offset="50%" stopColor="#432832" />
                      <stop offset="75%" stopColor="#24151a" />
                      <stop offset="100%" stopColor="#0a0607" />
                    </linearGradient>
                    {/* Foil gradient */}
                    <linearGradient id="foil-gold" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#b69162" />
                      <stop offset="30%" stopColor="#dec39d" />
                      <stop offset="50%" stopColor="#f7f2eb" />
                      <stop offset="70%" stopColor="#dec39d" />
                      <stop offset="100%" stopColor="#8c6c40" />
                    </linearGradient>
                    {/* Label gradient */}
                    <linearGradient id="label-gold" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#f7f2eb" />
                      <stop offset="40%" stopColor="#dfc9a5" />
                      <stop offset="80%" stopColor="#dec39d" />
                      <stop offset="100%" stopColor="#c87a90" />
                    </linearGradient>
                  </defs>

                  {/* Glass 1 (Back left of bottle) */}
                  <g transform="translate(15, 110) rotate(-6)">
                    {/* Bowl Outer */}
                    <path d="M 8,10 Q 8,85 22,90 Q 36,85 36,10 Z" fill="url(#glass-gradient)" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" />
                    {/* Liquid */}
                    <path d="M 10,35 Q 10,84 22,88 Q 34,84 34,35 Z" fill="url(#champagne-liquid)" />
                    {/* Bubbles */}
                    <circle cx="16" cy="55" r="0.8" fill="#fff" opacity="0.85" />
                    <circle cx="26" cy="68" r="1.1" fill="#fff" opacity="0.75" />
                    <circle cx="21" cy="48" r="0.9" fill="#fff" opacity="0.9" />
                    <circle cx="18" cy="74" r="0.7" fill="#fff" opacity="0.6" />
                    <circle cx="28" cy="58" r="1" fill="#fff" opacity="0.8" />
                    {/* Glass Rim highlight */}
                    <path d="M 8,10 Q 22,13 36,10" stroke="rgba(255,255,255,0.6)" strokeWidth="0.8" fill="none" />
                    {/* Glass reflection shine */}
                    <path d="M 12,18 C 12,42 16,68 20,80" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2" fill="none" />
                    {/* Stem */}
                    <line x1="22" y1="90" x2="22" y2="155" stroke="url(#glass-stem)" strokeWidth="2.5" />
                    {/* Base */}
                    <ellipse cx="22" cy="155" rx="18" ry="4" fill="url(#glass-base)" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
                  </g>

                  {/* Champagne Bottle (Center) */}
                  <g transform="translate(55, 10) rotate(5)">
                    {/* Bottle Shadow inside SVG */}
                    <path d="M 23,260 C 23,262 25,264 28,264 L 72,264 C 75,264 77,262 77,260 L 77,135 C 77,108 58,92 58,70 L 58,20 L 42,20 L 42,70 C 42,92 23,108 23,135 Z" fill="rgba(0,0,0,0.45)" filter="blur(8px)" />
                    {/* Bottle Glass Body */}
                    <path d="M 25,258 C 25,260 27,262 30,262 L 70,262 C 73,262 75,260 75,258 L 75,135 C 75,110 57,95 57,75 L 57,25 L 43,25 L 43,75 C 43,110 25,110 25,135 Z" fill="url(#bottle-glass)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />
                    {/* Foil neck wrap */}
                    <path d="M 43,75 C 43,75 50,78 57,75 L 57,25 L 59,25 C 60,25 60,20 60,20 L 40,20 C 40,20 40,25 41,25 L 43,25 Z" fill="url(#foil-gold)" />
                    <path d="M 43,40 Q 50,43 57,40" stroke="rgba(0,0,0,0.18)" strokeWidth="0.8" fill="none" />
                    <path d="M 43,55 Q 50,58 57,55" stroke="rgba(0,0,0,0.18)" strokeWidth="0.8" fill="none" />
                    {/* Label */}
                    <rect x="30" y="130" width="40" height="65" rx="4" fill="url(#label-gold)" stroke="rgba(255,255,255,0.15)" strokeWidth="0.6" />
                    <text x="50" y="152" fontFamily="var(--font-serif)" fontSize="6.5" fontWeight="bold" fill="#24151a" textAnchor="middle" letterSpacing="0.6">MAJA</text>
                    <text x="50" y="162" fontFamily="var(--font-display)" fontSize="4.5" fill="rgba(36,21,26,0.8)" textAnchor="middle" letterSpacing="1.2">BRUT</text>
                    <text x="50" y="180" fontSize="7" fill="#90475b" textAnchor="middle">✦</text>
                    {/* Glass reflection shine on bottle */}
                    <path d="M 32,135 C 32,110 46,90 46,75" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" fill="none" />
                    <path d="M 28,140 L 28,245" stroke="rgba(255,255,255,0.15)" strokeWidth="2" fill="none" />
                    <path d="M 72,140 L 72,245" stroke="rgba(0,0,0,0.3)" strokeWidth="1.5" fill="none" />
                  </g>

                  {/* Glass 2 (Front right of bottle) */}
                  <g transform="translate(130, 125) rotate(8)">
                    {/* Bowl Outer */}
                    <path d="M 8,10 Q 8,85 22,90 Q 36,85 36,10 Z" fill="url(#glass-gradient)" stroke="rgba(255,255,255,0.28)" strokeWidth="0.8" />
                    {/* Liquid */}
                    <path d="M 10,35 Q 10,84 22,88 Q 34,84 34,35 Z" fill="url(#champagne-liquid)" />
                    {/* Bubbles */}
                    <circle cx="15" cy="62" r="0.7" fill="#fff" opacity="0.8" />
                    <circle cx="25" cy="50" r="1" fill="#fff" opacity="0.9" />
                    <circle cx="20" cy="72" r="0.9" fill="#fff" opacity="0.7" />
                    <circle cx="18" cy="42" r="1.1" fill="#fff" opacity="0.85" />
                    <circle cx="28" cy="65" r="0.8" fill="#fff" opacity="0.6" />
                    {/* Glass Rim highlight */}
                    <path d="M 8,10 Q 22,13 36,10" stroke="rgba(255,255,255,0.6)" strokeWidth="0.8" fill="none" />
                    {/* Glass reflection shine */}
                    <path d="M 12,18 C 12,42 16,68 20,80" stroke="rgba(255,255,255,0.38)" strokeWidth="1.2" fill="none" />
                    {/* Stem */}
                    <line x1="22" y1="90" x2="22" y2="155" stroke="url(#glass-stem)" strokeWidth="2.5" />
                    {/* Base */}
                    <ellipse cx="22" cy="155" rx="18" ry="4" fill="url(#glass-base)" stroke="rgba(255,255,255,0.18)" strokeWidth="0.8" />
                  </g>
                </svg>
              </div>


              {/* CRYSTAL CHAMPAGNE FLUTE (Bottom Right Overlay) */}
              <div className="scene-champagne-glass" style={{
                position: 'absolute',
                bottom: '-4%',
                right: '4%',
                width: '80px',
                height: '280px',
                zIndex: 7,
                pointerEvents: 'none',
                transform: 'rotate(3deg)'
              }}>
                {/* Flute Bowl */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 'calc(50% - 21px)',
                  width: '42px',
                  height: '145px',
                  borderRadius: '20px 20px 7px 7px',
                  border: '1.2px solid rgba(255,255,255,0.25)',
                  background: 'linear-gradient(to bottom, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 40%, rgba(222, 195, 157, 0.1) 60%, rgba(222, 195, 157, 0.22) 100%)',
                  backdropFilter: 'blur(1px)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.22), inset 0 0 8px rgba(255,255,255,0.04)'
                }}>
                  {/* Liquid */}
                  <div style={{
                    position: 'absolute',
                    bottom: '6px',
                    left: '3px',
                    right: '3px',
                    height: '100px',
                    borderRadius: '7px 7px 5px 5px',
                    background: 'linear-gradient(to bottom, rgba(222, 195, 157, 0.42) 0%, rgba(200, 122, 144, 0.5) 100%)',
                    borderTop: '1px solid rgba(255,255,255,0.4)'
                  }}>
                    {/* Bubbles particle animation */}
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, top: 0, overflow: 'hidden' }}>
                      {Array.from({ length: 6 }).map((_, i) => (
                        <div
                          key={i}
                          style={{
                            position: 'absolute',
                            width: `${Math.random() * 2 + 1}px`,
                            height: `${Math.random() * 2 + 1}px`,
                            backgroundColor: 'rgba(255,255,255,0.75)',
                            borderRadius: '50%',
                            bottom: '5px',
                            left: `${Math.random() * 90}%`,
                            animation: `bubble-up-anim ${Math.random() * 1.8 + 1.8}s infinite linear`,
                            animationDelay: `${Math.random() * 1.5}s`
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Glass stem stem */}
                <div style={{
                  position: 'absolute',
                  top: '144px',
                  left: 'calc(50% - 2px)',
                  width: '4px',
                  height: '105px',
                  background: 'linear-gradient(to right, rgba(255,255,255,0.22), rgba(255,255,255,0.06), rgba(255,255,255,0.22))',
                }} />

                {/* Glass foot base */}
                <div style={{
                  position: 'absolute',
                  bottom: '22px',
                  left: 'calc(50% - 28px)',
                  width: '56px',
                  height: '10px',
                  borderRadius: '50%',
                  border: '1.2px solid rgba(255,255,255,0.2)',
                  background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.06) 0%, transparent 70%)',
                  boxShadow: '0 3px 8px rgba(0,0,0,0.25)'
                }} />
              </div>


              {/* BEAUTIFUL EMBELLISHMENT CURSIVE RIBBONS */}
              
              {/* Back Ribbon stream */}
              <svg className="ribbon-back-anim" style={{ position: 'absolute', width: '220px', height: '220px', top: '22%', left: '-12%', zIndex: 3, pointerEvents: 'none' }} fill="none" viewBox="0 0 100 100">
                <path d="M0,75 C25,90 15,35 45,45 C75,55 65,10 100,18" stroke="url(#ribbon-back-rose)" strokeWidth="1.2" strokeLinecap="round" />
                <defs>
                  <linearGradient id="ribbon-back-rose" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#c87a90" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#e5b3c0" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Front Ribbon stream */}
              <svg className="ribbon-front-anim" style={{ position: 'absolute', width: '250px', height: '250px', bottom: '-15%', right: '-12%', zIndex: 8, pointerEvents: 'none' }} fill="none" viewBox="0 0 100 100">
                <path d="M0,18 C35,8 25,75 55,55 C85,35 75,90 100,85" stroke="url(#ribbon-front-gold)" strokeWidth="1.2" strokeLinecap="round" />
                <defs>
                  <linearGradient id="ribbon-front-gold" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#dfc9a5" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#dec39d" stopOpacity="0.15" />
                  </linearGradient>
                </defs>
              </svg>


              {/* SPARKLING STAR EFFECTS & CONFETTI */}
              
              <div style={{ position: 'absolute', top: '12%', right: '12%', zIndex: 6 }}>
                <Sparkles size={20} color="#dec39d" className="sparkle-glow-slow" />
              </div>
              
              <div style={{ position: 'absolute', bottom: '15%', left: '8%', zIndex: 6 }}>
                <Sparkles size={16} color="#e5b3c0" className="sparkle-glow-fast" />
              </div>

              {/* Floating Sparkles in the background */}
              {heroSparklesData.map((sparkle, index) => (
                <div
                  key={`hero-sparkle-${index}`}
                  className="hero-sparkle-star"
                  style={{
                    position: 'absolute',
                    bottom: `${sparkle.bottom}%`,
                    left: `${sparkle.left}%`,
                    width: `${sparkle.size}px`,
                    height: `${sparkle.size}px`,
                    color: sparkle.color,
                    opacity: 0,
                    pointerEvents: 'none',
                    animation: `float-sparkle ${sparkle.duration}s infinite linear`,
                    animationDelay: `${sparkle.delay}s`,
                    zIndex: index % 2 === 0 ? 2 : 5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: `${sparkle.size + 4}px`,
                    filter: `drop-shadow(0 0 4px ${sparkle.color})`
                  }}
                >
                  ✦
                </div>
              ))}

              {/* Confetti Sparks (CSS shapes) */}
              <div className="spark-confetti" style={{ position: 'absolute', top: '40%', left: '2%', width: '6px', height: '6px', backgroundColor: '#dec39d', borderRadius: '50%', opacity: 0.6, animation: 'float-ball-1 9s infinite alternate' }} />
              <div className="spark-confetti" style={{ position: 'absolute', top: '20%', right: '4%', width: '4px', height: '4px', backgroundColor: '#e5b3c0', borderRadius: '50%', opacity: 0.7, animation: 'float-ball-2 11s infinite alternate' }} />
              <div className="spark-confetti" style={{ position: 'absolute', bottom: '25%', right: '15%', width: '5px', height: '5px', backgroundColor: '#c87a90', borderRadius: '50%', opacity: 0.5, animation: 'float-ball-3 7.5s infinite alternate' }} />

            </div>
          </div>

        </div>
      </div>

      {/* Embedded Styles for animations specific to the visual luxury scene */}
      <style>{`
        @keyframes logo-float {
          0%, 100% { transform: translateY(0) scale(1); filter: drop-shadow(0 0 15px rgba(255, 190, 170, 0.45)) drop-shadow(0 0 30px rgba(214, 138, 160, 0.2)); }
          50% { transform: translateY(-5px) scale(1.015); filter: drop-shadow(0 0 22px rgba(255, 190, 170, 0.6)) drop-shadow(0 0 40px rgba(214, 138, 160, 0.3)); }
        }
        .hero-logo-animated {
          animation: logo-float 8s infinite ease-in-out;
        }
        @keyframes logo-aura-pulse {
          0% { transform: scale(0.9) opacity: 0.7; }
          100% { transform: scale(1.15) opacity: 1; }
        }
        @keyframes logo-sparkle-twinkle {
          0%, 100% { opacity: 0.2; transform: scale(0.8) rotate(0deg); }
          50% { opacity: 0.95; transform: scale(1.25) rotate(45deg); filter: drop-shadow(0 0 5px currentColor); }
        }

        @keyframes bubble-up-anim {
          0% { transform: translateY(0) scale(0.6); opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.8; }
          100% { transform: translateY(-85px) scale(1.1); opacity: 0; }
        }
        @keyframes float-ball-1 {
          0%, 100% { transform: translateY(0) rotate(-10deg) translateX(0) rotateY(0deg); }
          50% { transform: translateY(-15px) rotate(-6deg) translateX(5px) rotateY(10deg); }
        }
        @keyframes float-ball-2 {
          0%, 100% { transform: translateY(0) rotate(6deg) translateX(0) rotateY(0deg); }
          50% { transform: translateY(-22px) rotate(2deg) translateX(-8px) rotateY(-12deg); }
        }
        @keyframes float-ball-3 {
          0%, 100% { transform: translateY(0) rotate(15deg) translateX(0) rotateY(0deg); }
          50% { transform: translateY(-12px) rotate(18deg) translateX(6px) rotateY(8deg); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .sparkle-glow-slow {
          animation: sparkle-glow-keyframes 5s infinite ease-in-out;
        }
        .sparkle-glow-fast {
          animation: sparkle-glow-keyframes 3.2s infinite ease-in-out;
          animation-delay: -1s;
        }
        @keyframes sparkle-glow-keyframes {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.5; }
          50% { transform: scale(1.2) rotate(30deg); opacity: 1; filter: drop-shadow(0 0 8px rgba(222,195,157,0.7)); }
        }

        /* Ambient pulsing glow keyframe */
        .champagne-ambient-glow {
          animation: ambient-pulse 16s infinite alternate ease-in-out;
        }
        @keyframes ambient-pulse {
          0% {
            transform: scale(1) translate(0, 0);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.15) translate(2%, 3%);
            opacity: 1;
            background: radial-gradient(circle, rgba(222, 195, 157, 0.25) 0%, rgba(200, 122, 144, 0.06) 65%, transparent 100%);
          }
          100% {
            transform: scale(0.9) translate(-1%, -2%);
            opacity: 0.7;
          }
        }

        /* Floating Sparkles keyframe */
        @keyframes float-sparkle {
          0% {
            transform: translateY(100px) rotate(0deg) scale(0.4);
            opacity: 0;
          }
          20% {
            opacity: 0.85;
          }
          80% {
            opacity: 0.85;
          }
          100% {
            transform: translateY(-400px) rotate(180deg) scale(1.2);
            opacity: 0;
          }
        }

        /* Ribbon swaying keyframes */
        .ribbon-back-anim {
          animation: ribbon-sway-back 12s infinite ease-in-out alternate;
          transform-origin: top right;
        }
        .ribbon-front-anim {
          animation: ribbon-sway-front 10s infinite ease-in-out alternate;
          transform-origin: bottom left;
        }
        @keyframes ribbon-sway-back {
          0% {
            transform: rotate(0deg) scale(1) translateY(0);
          }
          50% {
            transform: rotate(-4deg) scale(1.04) translateY(-6px);
          }
          100% {
            transform: rotate(3deg) scale(0.97) translateY(4px);
          }
        }
        @keyframes ribbon-sway-front {
          0% {
            transform: rotate(0deg) scale(1) translateY(0);
          }
          50% {
            transform: rotate(5deg) scale(1.02) translateY(6px);
          }
          100% {
            transform: rotate(-3deg) scale(0.95) translateY(-5px);
          }
        }

        /* Responsive styling for branding elements */
        @media (max-width: 480px) {
          .branding-divider {
            display: none !important;
          }
        }

        /* Drifting Gold Confetti Keyframes */
        @keyframes confetti-drift-0 {
          0% { transform: translateY(-50px) translateX(0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.8; }
          100% { transform: translateY(450px) translateX(25px) rotate(360deg); opacity: 0; }
        }
        @keyframes confetti-drift-1 {
          0% { transform: translateY(-50px) translateX(0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.8; }
          100% { transform: translateY(420px) translateX(-30px) rotate(-240deg); opacity: 0; }
        }
        @keyframes confetti-drift-2 {
          0% { transform: translateY(-50px) translateX(0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.8; }
          100% { transform: translateY(480px) translateX(15px) rotate(400deg); opacity: 0; }
        }

        /* Hover states for interactive luxury scene elements */
        .scene-invitation-card {
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .scene-invitation-card:hover {
          transform: rotate(4deg) translate(18px, -18px) scale(1.03) !important;
          box-shadow: 0 45px 90px rgba(200, 122, 144, 0.25), 0 20px 40px rgba(0,0,0,0.6) !important;
          border-color: #fff8f2 !important;
        }
        .scene-invitation-card:hover .card-reflection-sheen {
          animation: sheen-slide 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes sheen-slide {
          0% { left: -150%; }
          100% { left: 150%; }
        }

        @keyframes float-particle-card {
          0%, 100% { transform: translateY(0) scale(1) rotate(0deg); opacity: 0.4; }
          50% { transform: translateY(-10px) scale(1.15) rotate(15deg); opacity: 0.95; }
        }

        .scene-champagne-composition {
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .luxury-scene-wrapper:hover .scene-champagne-composition {
          transform: translateY(-8px) rotate(-2deg) scale(1.05) !important;
          filter: drop-shadow(0 20px 40px rgba(0,0,0,0.5));
        }

        .scene-champagne-glass {
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1) !important;
          position: relative;
        }
        .luxury-scene-wrapper:hover .scene-champagne-glass {
          transform: rotate(6deg) translate(5px, -5px) scale(1.02);
        }

        /* Golden glow reflection flare overlay on glass */
        .scene-champagne-glass::after {
          content: '';
          position: absolute;
          top: 30px;
          left: calc(50% - 15px);
          width: 30px;
          height: 30px;
          background: radial-gradient(circle, #fff 0%, rgba(222,195,157,0.8) 25%, transparent 70%);
          opacity: 0;
          transition: all 0.6s ease;
          pointer-events: none;
          z-index: 8;
        }
        .luxury-scene-wrapper:hover .scene-champagne-glass::after {
          opacity: 1;
          transform: scale(1.4);
        }

        /* Interactive Balloon sways on hover */
        @keyframes float-ball-1-sway {
          0%, 100% { transform: translateY(0) rotate(-10deg) translateX(0); }
          50% { transform: translateY(-20px) rotate(-4deg) translateX(-12px); }
        }
        @keyframes float-ball-2-sway {
          0%, 100% { transform: translateY(0) rotate(6deg) translateX(0); }
          50% { transform: translateY(-28px) rotate(0deg) translateX(15px); }
        }
        @keyframes float-ball-3-sway {
          0%, 100% { transform: translateY(0) rotate(15deg) translateX(0); }
          50% { transform: translateY(-18px) rotate(22deg) translateX(-10px); }
        }

        .luxury-scene-wrapper:hover .balloon-gold {
          animation: float-ball-1-sway 4s infinite alternate ease-in-out !important;
        }
        .luxury-scene-wrapper:hover .balloon-rose {
          animation: float-ball-2-sway 4.6s infinite alternate ease-in-out !important;
        }
        .luxury-scene-wrapper:hover .balloon-blush {
          animation: float-ball-3-sway 3.6s infinite alternate ease-in-out !important;
        }

        @media (min-width: 992px) {
          .hero-grid {
            grid-template-columns: 1.1fr 0.9fr !important;
          }
        }
        @media (max-width: 991px) {
          .hero-grid {
            text-align: center !important;
            justify-items: center;
            gap: 3rem !important;
          }
          .hero-grid > div:first-child {
            align-items: center !important;
            text-align: center !important;
          }
          .hero-grid p {
            margin: 0 auto 1.5rem auto !important;
          }
          .luxury-scene-wrapper {
            margin-top: 2rem;
            transform: scale(0.9);
          }
        }
        @media (max-width: 480px) {
          .luxury-scene-wrapper {
            transform: scale(0.75);
            height: 380px;
          }
        }
      `}</style>
    </section>
  );
}
