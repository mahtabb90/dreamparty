import { useState, type FormEvent } from 'react';
import { Send } from 'lucide-react';
import logoImg from '../assets/dreamparty-logo-cropped-dark.png';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 3000);
  };

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
          
          {/* Company Vibe Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
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
                  height: '44px',
                  width: 'auto',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 0 8px rgba(200, 122, 144, 0.4))',
                  display: 'block',
                  imageRendering: 'auto'
                }} 
              />
            </a>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6', maxWidth: '300px' }}>
              Create unforgettable celebrations. Beautifully bespoke templates, stellar themes, zodiac matching, and customized recommendations.
            </p>
            
            {/* Social Icons */}
            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
              <a href="#" className="social-icon-btn" style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>IG</a>
              <a href="#" className="social-icon-btn" style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>TW</a>
              <a href="#" className="social-icon-btn" style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>GH</a>
            </div>
          </div>

          {/* Links Columns */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }} className="footer-links-grid">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h5 style={{ fontSize: '0.9rem', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>Explore</h5>
              <ul style={{ listStyleType: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <li><a href="#features" className="footer-link">The Atelier</a></li>
                <li><a href="#how-it-works" className="footer-link">Our Process</a></li>
                <li><a href="#planner" className="footer-link">Celebration Studio</a></li>
                <li><a href="#showcase" className="footer-link">Design Gallery</a></li>
              </ul>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h5 style={{ fontSize: '0.9rem', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>Legal</h5>
              <ul style={{ listStyleType: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <li><a href="#" className="footer-link">About Us</a></li>
                <li><a href="#" className="footer-link">Privacy Policy</a></li>
                <li><a href="#" className="footer-link">Terms & Services</a></li>
                <li><a href="#" className="footer-link">Contact Support</a></li>
              </ul>
            </div>
          </div>

          {/* Newsletter Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} className="footer-newsletter">
            <h5 style={{ fontSize: '0.9rem', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>Stay Inspired</h5>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
              Subscribe to get curated aesthetics, signature cocktails, and seasonal planning updates directly in your inbox.
            </p>
            <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
              <input
                type="email"
                required
                placeholder="Enter email address"
                className="glass-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ flex: 1, borderTopRightRadius: '0', borderBottomRightRadius: '0' }}
              />
              <button 
                type="submit" 
                className="btn btn-primary"
                style={{
                  padding: '0 1.25rem',
                  borderTopLeftRadius: '0',
                  borderBottomLeftRadius: '0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {subscribed ? 'Sent' : <Send size={15} />}
              </button>
            </form>
            {subscribed && (
              <p style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                <span>✨ Successfully joined our newsletter!</span>
              </p>
            )}
          </div>

        </div>

        {/* Bottom copyright */}
        <div 
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            paddingTop: '2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.82rem',
            color: 'rgba(255, 255, 255, 0.4)'
          }}
          className="footer-bottom"
        >
          <span>© 2026 DreamParty Inc. All rights reserved.</span>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="#" className="footer-bottom-link">About</a>
            <a href="#" className="footer-bottom-link">Privacy</a>
            <a href="#" className="footer-bottom-link">Contact</a>
          </div>
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
        
        .footer-bottom-link {
          color: rgba(255, 255, 255, 0.4);
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .footer-bottom-link:hover {
          color: #fff;
        }

        .social-icon-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          color: #94a3b8;
          transition: all 0.3s ease;
          text-decoration: none;
        }
        .social-icon-btn:hover {
          background: rgba(200, 122, 144, 0.1);
          border-color: rgba(200, 122, 144, 0.3);
          color: white;
          transform: translateY(-2px);
        }

        @media (min-width: 768px) {
          .footer-grid {
            grid-template-columns: 1.2fr 1fr 1.2fr !important;
          }
        }
        @media (max-width: 767px) {
          .footer-links-grid {
            grid-template-columns: 1fr 1fr;
          }
          .footer-bottom {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </footer>
  );
}
