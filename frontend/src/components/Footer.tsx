import logoImg from '../assets/dreamparty-logo-cropped-dark.png';

export default function Footer() {
  return (
    <footer 
      style={{
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        background: 'rgba(2, 2, 3, 0.9)',
        padding: '5rem 0 3rem 0',
        position: 'relative',
        zIndex: 10
      }}
    >
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem', marginBottom: '4rem' }} className="footer-grid">
          
          {/* Brand/Vibe Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
              }}
            >
              <img 
                src={logoImg} 
                alt="DreamParty Logo" 
                style={{
                  height: '40px',
                  width: 'auto',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 0 8px rgba(200, 122, 144, 0.3))',
                  display: 'block',
                }} 
              />
            </a>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6', maxWidth: '300px' }}>
              Premium AI celebration planning experience.
            </p>
          </div>

          {/* Explore Links Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h5 style={{ fontSize: '0.9rem', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>Explore</h5>
            <ul style={{ listStyleType: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', padding: 0, margin: 0 }}>
              <li><a href="#features" className="footer-link">The Atelier</a></li>
              <li><a href="#planner" className="footer-link">Celebration Studio</a></li>
              <li><a href="#showcase" className="footer-link">Design Gallery</a></li>
            </ul>
          </div>

          {/* Project Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h5 style={{ fontSize: '0.9rem', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>Project</h5>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>
              AI-powered fullstack portfolio project.
            </p>
            <span style={{ fontSize: '0.82rem', color: 'var(--color-primary)', fontWeight: 500 }}>
              Built with React, FastAPI and Gemini AI
            </span>
          </div>

        </div>

        {/* Bottom copyright */}
        <div 
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            paddingTop: '2rem',
            textAlign: 'center',
            fontSize: '0.82rem',
            color: 'rgba(255, 255, 255, 0.35)'
          }}
          className="footer-bottom"
        >
          <span>© 2026 DreamParty — Portfolio project by Mahtab Nezam.</span>
        </div>

      </div>

      <style>{`
        .footer-link {
          color: #94a3b8;
          font-size: 0.88rem;
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .footer-link:hover {
          color: white;
        }

        @media (min-width: 768px) {
          .footer-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 767px) {
          .footer-bottom {
            text-align: left !important;
          }
        }
      `}</style>
    </footer>
  );
}
