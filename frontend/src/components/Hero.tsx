import { ArrowRight, Sparkles, Calendar, Heart } from 'lucide-react';
import logoImg from '../assets/dreamparty-logo.png';

export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="section" style={{ minHeight: '92vh', display: 'flex', alignItems: 'center', paddingTop: '8rem', overflow: 'hidden', position: 'relative' }}>
      
      {/* Large Soft Blush Glow behind Hero Section */}
      <div 
        style={{
          position: 'absolute',
          top: '15%',
          left: '10%',
          width: '50vw',
          height: '50vw',
          background: 'radial-gradient(circle, rgba(229, 179, 192, 0.22) 0%, rgba(200, 122, 144, 0.04) 70%, transparent 100%)',
          filter: 'blur(120px)',
          zIndex: -1,
          pointerEvents: 'none'
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '5rem', alignItems: 'center' }} className="hero-grid">
          
          {/* Hero Content (Left Side) */}
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', textAlign: 'left' }}>
            
            {/* Centerpiece Brand Crest & Tagline */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div className="brand-crest" style={{
                position: 'relative',
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                border: '1px solid rgba(222, 195, 157, 0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'radial-gradient(circle, rgba(200, 122, 144, 0.15) 0%, transparent 80%)',
                boxShadow: '0 0 20px rgba(222, 195, 157, 0.12)',
                overflow: 'hidden'
              }}>
                {/* Outer spinning dashed ring */}
                <div style={{
                  position: 'absolute',
                  top: '-4px', left: '-4px', right: '-4px', bottom: '-4px',
                  border: '1px dashed rgba(222, 195, 157, 0.2)',
                  borderRadius: '50%',
                  animation: 'spin 30s linear infinite'
                }} />
                
                {/* Image Cropping Wrapper */}
                <div style={{
                  position: 'relative',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                }}>
                  <img 
                    src={logoImg} 
                    alt="DreamParty Logo Emblem" 
                    style={{
                      position: 'absolute',
                      top: '-24px',
                      left: '-24px',
                      height: '84px',
                      width: 'auto',
                      maxWidth: 'none',
                      filter: 'drop-shadow(0 0 6px rgba(200, 122, 144, 0.65))',
                      display: 'block'
                    }} 
                  />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  letterSpacing: '0.22em',
                  color: 'var(--color-primary)',
                  textTransform: 'uppercase',
                }}>
                  DreamParty
                </span>
                <span style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '0.75rem',
                  fontStyle: 'italic',
                  color: '#dec39d',
                  letterSpacing: '0.05em'
                }}>
                  Atelier de Célébration
                </span>
              </div>
            </div>

            {/* Large Luxury Headline */}
            <h1 style={{ 
              fontSize: 'clamp(2.5rem, 5.2vw, 4.4rem)', 
              fontWeight: 400, 
              lineHeight: 1.15,
              color: '#fff',
              margin: '0.5rem 0'
            }}>
              <span className="text-gradient-primary" style={{ fontFamily: 'var(--font-display)', fontWeight: 800 }}>Where </span>
              <br />
              <span className="text-gradient-magic" style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 500, marginRight: '0.5rem' }}>Celebrations</span>
              <br />
              <span className="text-gradient-primary" style={{ fontFamily: 'var(--font-display)', fontWeight: 800 }}>Become </span>
              <span className="text-gradient-magic" style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 500 }}>Memories.</span>
            </h1>

            {/* Subtitle / Elegant Description */}
            <p style={{ 
              fontSize: 'clamp(1.05rem, 1.8vw, 1.22rem)', 
              color: '#f3e8ee', 
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              lineHeight: '1.6', 
              maxWidth: '520px',
              opacity: 0.9
            }}>
              Bespoke invitation suites, curated aesthetics, celestial alignment insights, and signature celebration checkbooks created for the sophisticated host.
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
              <button onClick={() => scrollToSection('planner')} className="btn btn-primary" style={{ padding: '1.05rem 2.5rem' }}>
                <span>Enter the Atelier</span>
                <ArrowRight size={16} />
              </button>
              <button onClick={() => scrollToSection('features')} className="btn btn-secondary" style={{ padding: '1.05rem 2.5rem' }}>
                Explore Gallery
              </button>
            </div>

            {/* Trust details */}
            <div style={{ display: 'flex', gap: '1.75rem', marginTop: '1.5rem', flexWrap: 'wrap', borderTop: '1px solid rgba(222, 195, 157, 0.08)', paddingTop: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#dec39d', fontSize: '0.82rem', fontFamily: 'var(--font-display)', fontWeight: 500, letterSpacing: '0.03em' }}>
                <Sparkles size={14} color="#c87a90" />
                <span>Bespoke Design</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#dec39d', fontSize: '0.82rem', fontFamily: 'var(--font-display)', fontWeight: 500, letterSpacing: '0.03em' }}>
                <Calendar size={14} color="#c87a90" />
                <span>Seamless RSVPs</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#dec39d', fontSize: '0.82rem', fontFamily: 'var(--font-display)', fontWeight: 500, letterSpacing: '0.03em' }}>
                <Heart size={14} color="#c87a90" />
                <span>No Invitation Fees</span>
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
                    Aurelia's
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
                    “Champagne towers & velvet nights under stargazing lights”
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


              {/* VELVET GIFT BOX (Bottom Left Overlay) */}
              <div className="scene-gift-box" style={{
                position: 'absolute',
                bottom: '-2%',
                left: '2%',
                width: '120px',
                height: '120px',
                background: 'linear-gradient(135deg, #351d22 0%, #211215 100%)',
                borderRadius: '10px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.65), inset 0 0 8px rgba(255,255,255,0.02)',
                border: '1px solid rgba(200, 122, 144, 0.12)',
                zIndex: 6,
                transform: 'rotate(-5deg)'
              }}>
                {/* Gift lid */}
                <div style={{
                  position: 'absolute',
                  top: 0, left: '-2%', width: '104%', height: '26px',
                  background: 'linear-gradient(135deg, #44262c 0%, #2b171c 100%)',
                  borderRadius: '12px 12px 3px 3px',
                  boxShadow: '0 3px 8px rgba(0,0,0,0.35)',
                  borderBottom: '1px solid rgba(255,255,255,0.04)'
                }} />

                {/* Champagne Gold Ribbon Wrapping */}
                <div style={{
                  position: 'absolute',
                  left: 'calc(50% - 8px)',
                  top: 0, width: '16px', height: '100%',
                  background: 'linear-gradient(to right, #dfc9a5, #dec39d, #b69162)',
                }} />
                <div style={{
                  position: 'absolute',
                  top: 'calc(50% - 8px)',
                  left: 0, width: '100%', height: '16px',
                  background: 'linear-gradient(to bottom, #dfc9a5, #dec39d, #b69162)',
                }} />

                {/* Bow Tie structure */}
                <div style={{
                  position: 'absolute',
                  top: '-13px',
                  left: 'calc(50% - 18px)',
                  width: '36px',
                  height: '26px',
                  zIndex: 7
                }}>
                  {/* Left bow Loop */}
                  <div style={{
                    position: 'absolute',
                    left: 0, top: '3px', width: '20px', height: '16px',
                    border: '2px.5 solid #dfc9a5',
                    borderRadius: '50% 50% 0 50%',
                    transform: 'rotate(-25deg)',
                    background: 'rgba(222, 195, 157, 0.2)'
                  }} />
                  {/* Right bow Loop */}
                  <div style={{
                    position: 'absolute',
                    right: 0, top: '3px', width: '20px', height: '16px',
                    border: '2px.5 solid #dfc9a5',
                    borderRadius: '50% 50% 50% 0',
                    transform: 'rotate(25deg)',
                    background: 'rgba(222, 195, 157, 0.2)'
                  }} />
                  {/* Bow node */}
                  <div style={{
                    position: 'absolute',
                    left: 'calc(50% - 6px)',
                    top: '8px',
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #dfc9a5 0%, #b69162 100%)',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
                  }} />
                </div>
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
              <svg style={{ position: 'absolute', width: '220px', height: '220px', top: '22%', left: '-12%', zIndex: 3, pointerEvents: 'none' }} fill="none" viewBox="0 0 100 100">
                <path d="M0,75 C25,90 15,35 45,45 C75,55 65,10 100,18" stroke="url(#ribbon-back-rose)" strokeWidth="1.2" strokeLinecap="round" />
                <defs>
                  <linearGradient id="ribbon-back-rose" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#c87a90" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#e5b3c0" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Front Ribbon stream */}
              <svg style={{ position: 'absolute', width: '250px', height: '250px', bottom: '-15%', right: '-12%', zIndex: 8, pointerEvents: 'none' }} fill="none" viewBox="0 0 100 100">
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
        @keyframes bubble-up-anim {
          0% { transform: translateY(0) scale(0.6); opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.8; }
          100% { transform: translateY(-85px) scale(1.1); opacity: 0; }
        }
        @keyframes float-ball-1 {
          0%, 100% { transform: translateY(0) rotate(-10deg); }
          50% { transform: translateY(-10px) rotate(-8deg); }
        }
        @keyframes float-ball-2 {
          0%, 100% { transform: translateY(0) rotate(6deg); }
          50% { transform: translateY(-14px) rotate(4deg); }
        }
        @keyframes float-ball-3 {
          0%, 100% { transform: translateY(0) rotate(15deg); }
          50% { transform: translateY(-8px) rotate(17deg); }
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

        .scene-gift-box {
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .scene-gift-box:hover {
          transform: rotate(-9deg) scale(1.06) translateY(-5px) !important;
          box-shadow: 0 30px 65px rgba(0,0,0,0.85) !important;
          border-color: rgba(222, 195, 157, 0.4) !important;
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
          50% { transform: translateY(-16px) rotate(-6deg) translateX(-10px); }
        }
        @keyframes float-ball-2-sway {
          0%, 100% { transform: translateY(0) rotate(6deg) translateX(0); }
          50% { transform: translateY(-20px) rotate(2deg) translateX(12px); }
        }
        @keyframes float-ball-3-sway {
          0%, 100% { transform: translateY(0) rotate(15deg) translateX(0); }
          50% { transform: translateY(-14px) rotate(20deg) translateX(-8px); }
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
