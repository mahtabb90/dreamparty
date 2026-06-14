import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`navbar-container ${isScrolled ? 'navbar-scrolled' : ''}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        height: isScrolled ? '70px' : '82px',
        display: 'flex',
        alignItems: 'center',
        background: isScrolled 
          ? 'linear-gradient(180deg, #160a0e 0%, #15090d 100%)' 
          : 'linear-gradient(180deg, rgba(22, 10, 14, 0.96) 0%, rgba(22, 10, 14, 0.96) 100%)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
    >
      <div 
        className="container" 
        style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          width: '100%',
          paddingLeft: '2.5rem',
          paddingRight: '2.5rem',
          maxWidth: '1440px',
          position: 'relative'
        }}
      >
        {/* Left Column: Brand Live Text only */}
        <div style={{ flex: '1 1 0%', minWidth: '200px', display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            style={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
            }}
          >
            {/* Live Text "DreamParty" */}
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: '22px',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #dec39d 0%, #c87a90 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.02em',
              lineHeight: 1
            }}>
              DreamParty
            </span>
          </a>
        </div>

        {/* Center Column: Navigation Links */}
        <nav style={{ display: 'none', gap: 'clamp(1rem, 2vw, 2rem)', alignItems: 'center', justifyContent: 'center' }} className="desktop-nav">
          <a href="#features" onClick={(e) => { e.preventDefault(); scrollToSection('features'); }} className="nav-link">The Atelier</a>
          <a href="#how-it-works" onClick={(e) => { e.preventDefault(); scrollToSection('how-it-works'); }} className="nav-link">Our Process</a>
          <a href="#planner" onClick={(e) => { e.preventDefault(); scrollToSection('planner'); }} className="nav-link">Celebration Studio</a>
          <a href="#showcase" onClick={(e) => { e.preventDefault(); scrollToSection('showcase'); }} className="nav-link">Design Gallery</a>
        </nav>

        {/* Right Column: CTA */}
        <div style={{ display: 'none', flex: '1 1 0%', minWidth: '200px', justifyContent: 'flex-end', alignItems: 'center' }} className="desktop-nav">
          <button 
            onClick={() => scrollToSection('planner')}
            className="btn btn-secondary" 
            style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem', borderRadius: '10px' }}
          >
            Start Planning
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{
            background: 'none',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            display: 'block',
          }}
          className="mobile-toggle"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Luxury Gradient Divider */}
      <div 
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(200, 122, 144, 0.35) 20%, rgba(222, 195, 157, 0.45) 50%, rgba(200, 122, 144, 0.35) 80%, transparent)',
          zIndex: 10
        }}
      />

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div
          className="animate-fade-in"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'rgba(10, 10, 15, 0.95)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            padding: '2rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            zIndex: 99,
          }}
        >
          <a href="#features" onClick={(e) => { e.preventDefault(); scrollToSection('features'); }} className="nav-link-mobile">The Atelier</a>
          <a href="#how-it-works" onClick={(e) => { e.preventDefault(); scrollToSection('how-it-works'); }} className="nav-link-mobile">Our Process</a>
          <a href="#planner" onClick={(e) => { e.preventDefault(); scrollToSection('planner'); }} className="nav-link-mobile">Celebration Studio</a>
          <a href="#showcase" onClick={(e) => { e.preventDefault(); scrollToSection('showcase'); }} className="nav-link-mobile">Design Gallery</a>
          <button 
            onClick={() => scrollToSection('planner')}
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '0.5rem' }}
          >
            Start Planning
          </button>
        </div>
      )}

      {/* Embedded CSS rules specific to Nav bar */}
      <style>{`
        @media (min-width: 768px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-toggle {
            display: none !important;
          }
        }
        .nav-link {
          color: #94a3b8;
          font-family: var(--font-display);
          font-weight: 500;
          font-size: 1.08rem;
          letter-spacing: 0.5px;
          text-decoration: none;
          transition: color 0.2s ease;
          position: relative;
          padding: 0.2rem 0;
        }
        .nav-link:hover {
          color: white;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          width: 0;
          height: 1.5px;
          bottom: 0;
          left: 0;
          background-color: var(--color-primary);
          transition: width 0.3s ease;
        }
        .nav-link:hover::after {
          width: 100%;
        }
        .nav-link-mobile {
          color: #94a3b8;
          font-family: var(--font-display);
          font-weight: 500;
          font-size: 1.1rem;
          text-decoration: none;
          padding: 0.5rem 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.03);
          transition: color 0.2s ease;
        }
        .nav-link-mobile:hover {
          color: white;
        }
      `}</style>
    </header>
  );
}
