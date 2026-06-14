import { useState } from 'react';
import { Download, Edit3, Sparkles } from 'lucide-react';

interface TemplateCard {
  id: string;
  themeId: string;
  name: string;
  age: string;
  vibe: string;
  date: string;
  venue: string;
  bgGradient: string;
  accentColor: string;
  titleColor: string;
  fontFamily: string;
}

export default function Showcase() {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const templates: TemplateCard[] = [
    {
      id: 'template-1',
      themeId: 'midnight',
      name: 'ELARA',
      age: '18',
      vibe: 'Under the stars, we dance until dawn',
      date: 'Friday, Nov 15th • 8:00 PM',
      venue: 'The Stellar Pavilion, LA',
      bgGradient: 'linear-gradient(135deg, #09090b 0%, #1c1215 50%, #2e171d 100%)',
      accentColor: '#c87a90',
      titleColor: '#e5b3c0',
      fontFamily: 'var(--font-serif)'
    },
    {
      id: 'template-2',
      themeId: 'cyberpunk',
      name: 'KAI',
      age: '21',
      vibe: 'Rose gold grids, warm lights and copper glows',
      date: 'Saturday, Dec 21st • 10:00 PM',
      venue: 'Pixel Arcade Loft, SF',
      bgGradient: 'linear-gradient(135deg, #120e10 0%, #2b1c20 100%)',
      accentColor: '#dec39d',
      titleColor: '#ffffff',
      fontFamily: 'var(--font-display)'
    },
    {
      id: 'template-3',
      themeId: 'gold',
      name: 'VICTORIA',
      age: '30',
      vibe: 'Champagne towers & black tie gala',
      date: 'Saturday, Sep 7th • 7:00 PM',
      venue: 'The Ritz Ballroom, NYC',
      bgGradient: 'linear-gradient(135deg, #0f0e0f 0%, #221c17 100%)',
      accentColor: '#e2c499',
      titleColor: '#dfc9a5',
      fontFamily: 'var(--font-serif)'
    },
    {
      id: 'template-4',
      themeId: 'sunset',
      name: 'MILA',
      age: '22',
      vibe: 'Warm summer twilight & rose acoustic guitar vibes',
      date: 'Friday, Jun 28th • 6:30 PM',
      venue: 'Highland Beach Cove, Miami',
      bgGradient: 'linear-gradient(135deg, #26161a 0%, #4a212a 50%, #632c38 100%)',
      accentColor: '#c87a90',
      titleColor: '#e5b3c0',
      fontFamily: 'var(--font-display)'
    }
  ];

  const handleLoadTemplate = (template: TemplateCard) => {
    // Scroll to the planner section
    const plannerSec = document.getElementById('planner');
    if (plannerSec) {
      plannerSec.scrollIntoView({ behavior: 'smooth' });
    }
    // Fire event to load invitation template parameters
    const event = new CustomEvent('load-invitation-template', {
      detail: {
        themeId: template.themeId,
        name: template.name,
        age: template.age,
        vibe: template.vibe,
        date: template.date,
        venue: template.venue
      }
    });
    window.dispatchEvent(event);
  };

  const handleDownload = (id: string) => {
    setDownloadingId(id);
    setTimeout(() => {
      setDownloadingId(null);
    }, 2000);
  };

  return (
    <section id="showcase" className="section" style={{ position: 'relative', overflow: 'hidden' }}>
      
      {/* Ambient glow areas */}
      <div 
        style={{
          position: 'absolute',
          top: '20%',
          right: '-10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(229, 179, 192, 0.08) 0%, transparent 70%)',
          filter: 'blur(95px)',
          zIndex: -1,
          pointerEvents: 'none'
        }}
      />
      <div 
        style={{
          position: 'absolute',
          bottom: '5%',
          left: '-5%',
          width: '450px',
          height: '450px',
          background: 'radial-gradient(circle, rgba(222, 195, 157, 0.06) 0%, transparent 70%)',
          filter: 'blur(90px)',
          zIndex: -1,
          pointerEvents: 'none'
        }}
      />

      <div className="container">
        
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '4rem', display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 800 }}>
            Premium <span className="text-gradient-primary">Design Showcase</span>
          </h2>
          <p style={{ maxWidth: '600px', color: 'var(--text-muted)', fontSize: '1.02rem', lineHeight: '1.6' }}>
            Browse through stellar sample layouts custom-tailored for luxurious celebrations. Click to load one directly into the editor and make it yours.
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="showcase-grid">
          {templates.map((template) => (
            <div 
              key={template.id} 
              className="showcase-card-wrapper animate-fade-in"
              style={{
                position: 'relative',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 15px 35px rgba(0,0,0,0.5)',
                aspectRatio: '3 / 4',
                cursor: 'pointer',
                border: '1px solid rgba(255,255,255,0.06)'
              }}
            >
              {/* Actual Invitation Design */}
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  background: template.bgGradient,
                  padding: '2.5rem 1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  textAlign: 'center',
                  fontFamily: template.fontFamily,
                  color: template.themeId === 'midnight' ? '#fff' : '#e2e8f0',
                  transition: 'transform 0.5s ease'
                }}
                className="invitation-visual"
              >
                <p style={{ textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.7rem', color: template.accentColor, fontWeight: 700 }}>You're Invited</p>
                
                <div>
                  <h4 style={{ fontSize: '1.45rem', letterSpacing: '0.05em', color: template.titleColor, fontFamily: template.fontFamily, fontStyle: template.fontFamily === 'var(--font-serif)' ? 'italic' : 'normal', fontWeight: template.fontFamily === 'var(--font-serif)' ? 500 : 700 }}>{template.name}</h4>
                  <p style={{ fontSize: '0.7rem', textTransform: 'uppercase', opacity: 0.6, margin: '0.2rem 0' }}>Celebrating Their</p>
                  <h2 style={{ fontSize: '3.2rem', fontWeight: 900, color: '#fff', lineHeight: 1, letterSpacing: '-0.02em', fontFamily: template.fontFamily === 'var(--font-serif)' ? 'var(--font-serif)' : 'var(--font-display)' }}>
                    {template.age}
                    <span style={{ fontSize: '1.3rem', verticalAlign: 'super', fontWeight: 700 }}>th</span>
                  </h2>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', width: '100%', alignItems: 'center' }}>
                  <p style={{ fontSize: '0.8rem', fontStyle: 'italic', maxWidth: '200px', opacity: 0.9 }}>
                    "{template.vibe}"
                  </p>
                  <div style={{ width: '30px', height: '1.5px', backgroundColor: 'rgba(255,255,255,0.15)' }} />
                  <div>
                    <p style={{ fontSize: '0.75rem', fontWeight: 700, color: template.accentColor }}>{template.date}</p>
                    <p style={{ fontSize: '0.7rem', opacity: 0.6, marginTop: '0.2rem' }}>{template.venue}</p>
                  </div>
                </div>
              </div>

              {/* Hover Overlay */}
              <div 
                className="card-overlay"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'rgba(5, 5, 8, 0.82)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '1rem',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                  padding: '1.5rem',
                  zIndex: 3
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: 'rgba(200, 122, 144, 0.15)',
                  border: '1px solid rgba(200, 122, 144, 0.3)',
                  color: '#e5b3c0',
                  marginBottom: '0.5rem'
                }}>
                  <Sparkles size={20} />
                </div>

                <h4 style={{ fontSize: '1.1rem', color: '#fff', fontWeight: 600 }}>{template.name}'s Party Vibe</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center', maxWidth: '200px', marginBottom: '0.5rem' }}>
                  Click below to open this design in the custom interactive editor.
                </p>

                <button 
                  onClick={() => handleLoadTemplate(template)}
                  className="btn btn-primary"
                  style={{
                    padding: '0.6rem 1.25rem',
                    fontSize: '0.85rem',
                    width: '180px',
                    borderRadius: '10px'
                  }}
                >
                  <Edit3 size={15} />
                  <span>Customize Template</span>
                </button>

                <button 
                  onClick={() => handleDownload(template.id)}
                  disabled={downloadingId === template.id}
                  className="btn btn-secondary"
                  style={{
                    padding: '0.6rem 1.25rem',
                    fontSize: '0.85rem',
                    width: '180px',
                    borderRadius: '10px'
                  }}
                >
                  <Download size={15} />
                  <span>{downloadingId === template.id ? 'Downloading...' : 'Download Template'}</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      <style>{`
        .showcase-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
        }
        .showcase-card-wrapper:hover .invitation-visual {
          transform: scale(1.05);
        }
        .showcase-card-wrapper:hover .card-overlay {
          opacity: 1 !important;
        }
        @media (max-width: 991px) {
          .showcase-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 480px) {
          .showcase-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
