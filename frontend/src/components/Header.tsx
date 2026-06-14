import { useState, useEffect } from 'react';
import { Sparkles, Menu, X } from 'lucide-react';

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
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        background: isScrolled ? 'rgba(5, 5, 8, 0.75)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(20px)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid transparent',
        padding: isScrolled ? '0.8rem 0' : '1.5rem 0',
      }}
    >
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            textDecoration: 'none',
            fontSize: '1.5rem',
            fontWeight: 800,
            fontFamily: 'var(--font-display)',
            background: 'linear-gradient(135deg, #fff 0%, #a78bfa 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          <Sparkles size={24} color="#8b5cf6" style={{ filter: 'drop-shadow(0 0 8px rgba(139, 92, 246, 0.6))' }} />
          <span>DreamParty</span>
        </a>

        {/* Desktop Nav Links */}
        <nav style={{ display: 'none', gap: '2rem', alignItems: 'center' }} className="desktop-nav">
          <a href="#features" onClick={(e) => { e.preventDefault(); scrollToSection('features'); }} className="nav-link">Features</a>
          <a href="#how-it-works" onClick={(e) => { e.preventDefault(); scrollToSection('how-it-works'); }} className="nav-link">How It Works</a>
          <a href="#planner" onClick={(e) => { e.preventDefault(); scrollToSection('planner'); }} className="nav-link">Planner Suite</a>
          <a href="#showcase" onClick={(e) => { e.preventDefault(); scrollToSection('showcase'); }} className="nav-link">Showcase</a>
        </nav>

        {/* Desktop CTA */}
        <div style={{ display: 'none', alignItems: 'center' }} className="desktop-nav">
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
          <a href="#features" onClick={(e) => { e.preventDefault(); scrollToSection('features'); }} className="nav-link-mobile">Features</a>
          <a href="#how-it-works" onClick={(e) => { e.preventDefault(); scrollToSection('how-it-works'); }} className="nav-link-mobile">How It Works</a>
          <a href="#planner" onClick={(e) => { e.preventDefault(); scrollToSection('planner'); }} className="nav-link-mobile">Planner Suite</a>
          <a href="#showcase" onClick={(e) => { e.preventDefault(); scrollToSection('showcase'); }} className="nav-link-mobile">Showcase</a>
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
          font-size: 0.95rem;
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
