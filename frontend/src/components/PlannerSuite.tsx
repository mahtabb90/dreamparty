import React, { useState, useEffect } from 'react';
import { Mail, Palette, Moon, ClipboardList, Wand2, Plus, Trash2, CheckCircle2, Copy, Sparkles, Download, RefreshCw } from 'lucide-react';

// Theme Presets for Invitation Card
const INVITATION_THEMES = [
  {
    id: 'midnight',
    name: 'Midnight Cosmic',
    bg: 'linear-gradient(135deg, #090915 0%, #1e1b4b 50%, #311042 100%)',
    textColor: '#ffffff',
    accentColor: '#c084fc',
    titleColor: '#e9d5ff',
    glowColor: 'rgba(167, 139, 250, 0.4)',
    fontFamily: "'Outfit', sans-serif"
  },
  {
    id: 'gold',
    name: 'Royal Gold',
    bg: 'linear-gradient(135deg, #0f172a 0%, #1c1917 100%)',
    textColor: '#e2e8f0',
    accentColor: '#f59e0b',
    titleColor: '#fbbf24',
    glowColor: 'rgba(245, 158, 11, 0.4)',
    fontFamily: "'Playfair Display', Georgia, serif"
  },
  {
    id: 'cyberpunk',
    name: 'Neon Cyberpunk',
    bg: 'linear-gradient(135deg, #020617 0%, #0f172a 100%)',
    textColor: '#e2e8f0',
    accentColor: '#06b6d4',
    titleColor: '#22d3ee',
    glowColor: 'rgba(6, 182, 212, 0.5)',
    fontFamily: "'Courier New', Courier, monospace",
    border: '2px solid #06b6d4'
  },
  {
    id: 'sunset',
    name: 'Peach Sunset',
    bg: 'linear-gradient(135deg, #2e1022 0%, #701a34 50%, #991b1b 100%)',
    textColor: '#fecdd3',
    accentColor: '#f43f5e',
    titleColor: '#fda4af',
    glowColor: 'rgba(244, 63, 94, 0.4)',
    fontFamily: "'Outfit', sans-serif"
  }
];

// Theme Generator Vibes
const THEME_VIBES = [
  {
    id: 'cosmic',
    name: 'Midnight Cosmic',
    description: 'A stellar theme filled with dark celestial details, glowing ambient lights, and holographic table settings. Perfect for night owls and astronomy lovers.',
    colors: ['#0b0d19', '#1e1b4b', '#8b5cf6', '#d946ef', '#fbbf24'],
    colorNames: ['Deep Space', 'Midnight', 'Violet Nebula', 'Cosmic Pink', 'Starlight Gold'],
    decor: ['Starry projector lights', 'Holographic table runners', 'Glow-in-the-dark cocktails', 'Galaxy cupcakes'],
    music: 'Dreamy synthwave, ambient electronica, spacey lofi'
  },
  {
    id: 'neon',
    name: 'Neon Retro 80s',
    description: 'High energy, glowing neon accents, grid patterns, and retro synth beats. Transport your guests straight into a vintage arcade or synthwave paradise.',
    colors: ['#0f051d', '#f72585', '#7209b7', '#3f37c9', '#4cc9f0'],
    colorNames: ['Vapor Black', 'Hot Pink', 'Purple Grid', 'Laser Blue', 'Cyan Glow'],
    decor: ['LED neon tube lights', 'Retro cassette placeholders', 'UV-reactive tableware', 'Arcade cabinets setup'],
    music: '80s Synthwave, disco house, retro electronic beats'
  },
  {
    id: 'boho',
    name: 'Boho Dreamland',
    description: 'Earthy tones, soft textiles, pampas grass, warm fairy lights, and intimate floor seating. Offers a relaxed, chic, and organic celebration vibe.',
    colors: ['#fdf6e2', '#f5ebe0', '#e3d5ca', '#d5bdaf', '#a3b18a'],
    colorNames: ['Sand Shell', 'Warm Cream', 'Toasted Taupe', 'Earth Clay', 'Sage Olive'],
    decor: ['Pampas grass arrangements', 'Macrame backdrops', 'Rattan lanterns', 'Floor pillows and low tables'],
    music: 'Acoustic indie folk, chill jazz, soft guitar instrumentals'
  },
  {
    id: 'cyber',
    name: 'Cyberpunk Rave',
    description: 'Dark obsidian backdrops, electric cyan and magenta lasers, techno aesthetics, and glitch effects. Highly futuristic and electronic.',
    colors: ['#020205', '#00f0ff', '#ff007f', '#12003c', '#7fffd4'],
    colorNames: ['Null Black', 'Cyber Cyan', 'Glitch Pink', 'Grid Violet', 'Matrix Mint'],
    decor: ['Holographic banners', 'Laser projector setups', 'Cyberpunk eyewear for guests', 'LED light cocktails'],
    music: 'Cyberpunk industrial, techno, deep minimal house'
  },
  {
    id: 'garden',
    name: 'Enchanted Forest',
    description: 'Lush greenery, hanging ivy, magical fairy lights, wood accents, and warm botanical vibes. Feels like walking into a fairy tale.',
    colors: ['#02120b', '#064e3b', '#10b981', '#fbbf24', '#fef3c7'],
    colorNames: ['Shadow Green', 'Pine Green', 'Emerald Ivy', 'Warm Amber', 'Petal Cream'],
    decor: ['Hanging ivy and moss', 'Micro fairy light arrays', 'Wood log platters', 'Fresh botanical garlands'],
    music: 'Classical fantasy tracks, acoustic ambient, soft acoustic covers'
  }
];

// Zodiac Sign Details Calculator
const getZodiacDetails = (dateStr: string) => {
  if (!dateStr) return null;
  const date = new Date(dateStr);
  const month = date.getMonth() + 1;
  const day = date.getDate();

  let sign = '';
  let icon = '✨';

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) { sign = 'Aries'; icon = '♈'; }
  else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) { sign = 'Taurus'; icon = '♉'; }
  else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) { sign = 'Gemini'; icon = '♊'; }
  else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) { sign = 'Cancer'; icon = '♋'; }
  else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) { sign = 'Leo'; icon = '♌'; }
  else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) { sign = 'Virgo'; icon = '♍'; }
  else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) { sign = 'Libra'; icon = '♎'; }
  else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) { sign = 'Scorpio'; icon = '♏'; }
  else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) { sign = 'Sagittarius'; icon = '♐'; }
  else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) { sign = 'Capricorn'; icon = '♑'; }
  else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) { sign = 'Aquarius'; icon = '♒'; }
  else { sign = 'Pisces'; icon = '♓'; }

  const recommendations: Record<string, { theme: string; vibe: string; drink: string; activity: string; description: string }> = {
    Aries: {
      theme: 'Adrenaline Neon Lasers',
      vibe: 'High energy, vibrant pinks/cyans, electric atmosphere',
      drink: 'Spicy Mezcal Margarita with a chili rim',
      activity: 'Karaoke tournament or high-octane laser tag session',
      description: 'As a passionate fire sign, your party needs to be dynamic, active, and filled with competitive fun.'
    },
    Taurus: {
      theme: 'Luxury Vineyard Picnic',
      vibe: 'Earth tones, premium charcuterie, silk blankets, warm fairy lights',
      drink: 'Aged Cabernet Sauvignon or a Lavender French 75',
      activity: 'Artisan chocolate tasting or live acoustic lounge performance',
      description: 'You love indulgence, comfort, and the finer things in life. A gourmet picnic feeds your earthy luxury soul.'
    },
    Gemini: {
      theme: 'Retro Arcade Mixer',
      vibe: 'Glitch effects, dynamic social setups, neon lighting, diverse soundscapes',
      drink: 'A color-changing butterfly pea flower gin sour',
      activity: 'Retro arcade challenge with custom trivia game questions',
      description: 'Social and intellectually curious, your ideal party has multiple areas to mingle and plenty of conversation starters.'
    },
    Cancer: {
      theme: 'Moonlit Garden Dinner',
      vibe: 'Intimate setting, hanging candles, silver decor, cozy blankets',
      drink: 'Elderflower & Pear mocktail or premium Rosé Champagne',
      activity: 'Heartfelt toast round and a vintage retro photo booth',
      description: 'You treasure close relationships. A sentimental, beautifully lit dinner under the stars is perfect for you.'
    },
    Leo: {
      theme: 'Hollywood Glamour Gala',
      vibe: 'Gold backdrops, velvet red carpets, flashing photo walls, glitter highlights',
      drink: 'Gold-leaf infused French 75 or dry Champagne tower',
      activity: 'A mini awards ceremony celebrating all the guests',
      description: 'Born to stand out, your celebration should feel like a premier night. Let the spotlight shine on your special day.'
    },
    Virgo: {
      theme: 'Botanical Greenhouse Cocktail',
      vibe: 'Potted plants, structured geometric brass frames, clean linen, neat botanicals',
      drink: 'Fresh Botanical Gin & Tonic with rosemary and cucumber slices',
      activity: 'Terrarium building workshop or mixology masterclass',
      description: 'You love order, details, and nature. A clean, premium botanical experience matches your thoughtful personality.'
    },
    Libra: {
      theme: 'Art Deco Velvet Lounge',
      vibe: 'Symmetrical brass lines, plush velvet couches, jazz music, soft amber lights',
      drink: 'Classic Espresso Martini or a sparkling Prosecco punch',
      activity: 'Live jazz saxophonist performance and a custom perfume bar',
      description: 'Ruled by Venus, you seek beauty, symmetry, and high-class aesthetics. Your party should be visually balanced and chic.'
    },
    Scorpio: {
      theme: 'Masquerade Mystique Night',
      vibe: 'Burgundy velvet, lace masks, dark crimson roses, candlelit tables',
      drink: 'Spiced Pomegranate Old Fashioned or dark Blackberry Negroni',
      activity: 'Interactive murder mystery game or tarot reading booth',
      description: 'Mysterious, passionate, and deep. A masked night filled with hidden secrets and rich colors suits you.'
    },
    Sagittarius: {
      theme: 'Wanderlust Glamping Fest',
      vibe: 'Festival flags, colorful kilim rugs, massive bonfire, stargazing deck',
      drink: 'Spiced hot apple cider or a dynamic passionfruit mojito',
      activity: 'Stargazing with telescopes or storytelling around a fire',
      description: 'An adventurer at heart. Your party should feel like an outdoor festival, filled with free-spirited storytelling.'
    },
    Capricorn: {
      theme: 'Obsidian Speakeasy Lounge',
      vibe: 'Dark leather, brass bar carts, vintage vinyl records, warm jazz',
      drink: 'Premium Single Malt Scotch or classic Manhattan',
      activity: 'Whiskey tasting class or pool table shootout tournament',
      description: 'Classic, ambitious, and elegant. A high-end speakeasy vibe is the ultimate understated flexing of quality.'
    },
    Aquarius: {
      theme: 'Cyber Glow Rave',
      vibe: 'Holographic accents, neon face paints, industrial silver decor, synthesizer lofi',
      drink: 'Electric Blue Lagoon cocktail with flashing ice cubes',
      activity: 'Collaborative glowing canvas graffiti wall',
      description: 'Futuristic, eccentric, and community-minded. A techno-glow party lets your unique character express itself.'
    },
    Pisces: {
      theme: 'Under-the-Stars Ocean Sanctuary',
      vibe: 'Soft teal and lavender lights, wave projectors, floating candles, dreamy harp beats',
      drink: 'Blue Curacao Prosecco Spritz or Coconut Milk Punch',
      activity: 'Intimate acoustic music session or group watercolor painting',
      description: 'A deeply creative dreamer. A mystical, water-themed visual paradise matches your imaginative soul.'
    }
  };

  return {
    sign,
    icon,
    ...recommendations[sign]
  };
};

// Simulated AI Prompt database responses
const getMockAIRecommendation = (prompt: string) => {
  const normalized = prompt.toLowerCase();
  
  if (normalized.includes('beach') || normalized.includes('ocean') || normalized.includes('sand')) {
    return {
      title: 'Tiki Sunset Oasis',
      vibe: 'Casual beach luxury, tropical colors, warm bamboo structures, and soft fire torches.',
      decor: 'Hanging paper lanterns, bamboo torches, natural jute carpets, pineapple centerpieces, driftwood bar.',
      food: 'Coconut prawns, mango lime skewers, teriyaki chicken slides, grilled pineapple cubes.',
      drink: 'Spiced Rum Painkiller garnished with freshly grated nutmeg and a slice of toasted coconut.',
      music: 'Tropical house remix, steel drum acoustic, soft reggae vibes.'
    };
  }
  
  if (normalized.includes('cyber') || normalized.includes('neon') || normalized.includes('arcade') || normalized.includes('synthwave')) {
    return {
      title: 'Vaporwave Grid 88',
      vibe: 'Cyberpunk aesthetics, violet/hot pink lighting grids, retro arcade machines, and industrial silver accents.',
      decor: 'LED wall panels showing pixel art, glowing neon cocktail tables, metallic silver streamers, wire grid frames.',
      food: 'Glazed pork belly buns, wasabi shrimp, neon colored macarons, black charcoal slider buns.',
      drink: 'The "Laser Sour" - Gin, blue curacao, lime juice, topped with popping candy.',
      music: 'Heavy retro synthwave, cyber-techno, Daft Punk-style EDM.'
    };
  }

  if (normalized.includes('cozy') || normalized.includes('stargaze') || normalized.includes('forest') || normalized.includes('wood')) {
    return {
      title: 'Glamping & Nebula Night',
      vibe: 'Cozy boho cabin meets deep stellar vibes, featuring heavy wood elements, wool blankets, and stargazing telescopes.',
      decor: 'Geodesic dome canvas tents, warm sheepskin rugs, vintage lanterns, massive firepit setup, projection of starry constellations.',
      food: 'Gourmet Smores station (flavored marshmallows, dark chocolates), rustic wood-fired flatbreads, warm butternut squash soup cups.',
      drink: 'Warm Bourbon Maple Toddy served in toasted copper mugs.',
      music: 'Acoustic indie folk (Bon Iver, Fleet Foxes vibe), ambient soft acoustic instrumentals.'
    };
  }

  // Fallback
  return {
    title: 'Ethereal Sparkle Lounge',
    vibe: 'A high-end modern layout focusing on warm white glows, metallic brass accents, and glassmorphic aesthetics.',
    decor: 'Hanging geometric lights, white flower arrangements with brass vases, glowing crystal displays, soft linen drapes.',
    food: 'Truffle mushroom flatbreads, smoked salmon blinis, white chocolate raspberry tartlets, artisan cheese wheels.',
    drink: 'The "Dream Sparkler" - French champagne, elderflower liqueur, garnished with an edible pansy petal.',
    music: 'Upbeat organic house, chic lounge jazz, contemporary chill covers.'
  };
};

export default function PlannerSuite() {
  const [activeTab, setActiveTab] = useState('invitation');

  // Invitation State
  const [invTheme, setInvTheme] = useState(INVITATION_THEMES[0]);
  const [invName, setInvName] = useState('AURELIA');
  const [invAge, setInvAge] = useState('25');
  const [invVibe, setInvVibe] = useState('Midnight Stars & Golden Bubbles');
  const [invDate, setInvDate] = useState('Saturday, Oct 12th • 9:00 PM');
  const [invVenue, setInvVenue] = useState('The Obsidian Lounge, NYC');
  const [inviteSaved, setInviteSaved] = useState(false);

  // Theme Generator State
  const [selectedVibe, setSelectedVibe] = useState(THEME_VIBES[0]);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  // Zodiac State
  const [birthdate, setBirthdate] = useState('2001-10-12');
  const [zodiacResult, setZodiacResult] = useState<any>(getZodiacDetails('2001-10-12'));

  // Party Planner Checklist State
  const [checklist, setChecklist] = useState([
    { id: 1, text: 'Select party theme and style', completed: true },
    { id: 2, text: 'Create invitation in Creator tab', completed: true },
    { id: 3, text: 'Finalize guestlist', completed: false },
    { id: 4, text: 'Book venue / reserve backyard lounge', completed: false },
    { id: 5, text: 'Send digital invitation links', completed: false },
    { id: 6, text: 'Curate party music playlist', completed: false },
    { id: 7, text: 'Order food, appetizers and drinks', completed: false }
  ]);
  const [newCheckItem, setNewCheckItem] = useState('');

  // AI State
  const [aiPrompt, setAiPrompt] = useState('Cozy outdoor stargazing bonfire for a birthday with warm blankets and hot toddies.');
  const [aiOutput, setAiOutput] = useState<any>(null);
  const [aiLoading, setAiLoading] = useState(false);

  // Custom event listener for external tab selection and template loading
  useEffect(() => {
    const handleTabChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail) {
        setActiveTab(customEvent.detail);
      }
    };

    const handleTemplateLoad = (e: Event) => {
      const customEvent = e as CustomEvent;
      const data = customEvent.detail;
      if (data) {
        if (data.themeId) {
          const matchedTheme = INVITATION_THEMES.find(t => t.id === data.themeId);
          if (matchedTheme) setInvTheme(matchedTheme);
        }
        if (data.name) setInvName(data.name);
        if (data.age) setInvAge(data.age);
        if (data.vibe) setInvVibe(data.vibe);
        if (data.date) setInvDate(data.date);
        if (data.venue) setInvVenue(data.venue);
        setActiveTab('invitation');
      }
    };

    window.addEventListener('select-planner-tab', handleTabChange);
    window.addEventListener('load-invitation-template', handleTemplateLoad);
    return () => {
      window.removeEventListener('select-planner-tab', handleTabChange);
      window.removeEventListener('load-invitation-template', handleTemplateLoad);
    };
  }, []);

  // Update Zodiac instantly when date changes
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setBirthdate(val);
    if (val) {
      setZodiacResult(getZodiacDetails(val));
    }
  };

  // Add Item to Checklist
  const addCheckItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCheckItem.trim()) return;
    setChecklist([
      ...checklist,
      { id: Date.now(), text: newCheckItem.trim(), completed: false }
    ]);
    setNewCheckItem('');
  };

  // Toggle checklist
  const toggleCheck = (id: number) => {
    setChecklist(
      checklist.map(item => item.id === id ? { ...item, completed: !item.completed } : item)
    );
  };

  // Delete checklist item
  const deleteCheckItem = (id: number) => {
    setChecklist(checklist.filter(item => item.id !== id));
  };

  // Reset checklist
  const resetChecklist = () => {
    setChecklist(checklist.map(item => ({ ...item, completed: false })));
  };

  // Checklist Progress percentage
  const completedCount = checklist.filter(item => item.completed).length;
  const progressPercent = checklist.length > 0 ? Math.round((completedCount / checklist.length) * 100) : 0;

  // Run AI Mock Generation
  const handleAIGenerate = () => {
    setAiLoading(true);
    setAiOutput(null);
    setTimeout(() => {
      const res = getMockAIRecommendation(aiPrompt);
      setAiOutput(res);
      setAiLoading(false);
    }, 1500);
  };

  // Trigger Save Invitation animation
  const handleSaveInvite = () => {
    setInviteSaved(true);
    setTimeout(() => setInviteSaved(false), 3000);
  };

  // Copy hex color to clipboard
  const handleCopyColor = (color: string) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(color);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  return (
    <section id="planner" className="section" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="container">
        
        {/* Header Text */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
          <div 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              backgroundColor: 'rgba(6, 182, 212, 0.1)',
              border: '1px solid rgba(6, 182, 212, 0.25)',
              color: '#22d3ee',
              fontSize: '0.8rem',
              fontWeight: 700,
              padding: '0.35rem 0.9rem',
              borderRadius: '50px',
              fontFamily: 'var(--font-display)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
          >
            <Sparkles size={12} />
            <span>Interactive Workshop</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 800 }}>
            Celebration <span className="text-gradient-primary">Planner Suite</span>
          </h2>
          <p style={{ maxWidth: '600px', color: 'var(--text-muted)', fontSize: '1.02rem' }}>
            Bring your birthday ideas to life. Use our interactive canvas, theme explorers, zodiac charts, checklists, and generative AI tools.
          </p>
        </div>

        {/* Dashboard Shell */}
        <div className="glass-card planner-dashboard-shell" style={{ padding: '0', borderRadius: '24px', display: 'flex', border: '1px solid rgba(255, 255, 255, 0.08)', boxShadow: '0 30px 60px rgba(0,0,0,0.5)', overflow: 'hidden' }}>
          
          {/* Dashboard Left Sidebar Tabs */}
          <div className="planner-sidebar" style={{ width: '260px', background: 'rgba(10, 10, 15, 0.6)', borderRight: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', flexDirection: 'column', padding: '1.5rem 1rem', gap: '0.4rem' }}>
            <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', paddingLeft: '0.75rem', marginBottom: '0.75rem' }}>Planning Console</p>
            
            <button 
              onClick={() => setActiveTab('invitation')} 
              className={`tab-btn ${activeTab === 'invitation' ? 'active' : ''}`}
            >
              <Mail size={18} />
              <span>Invitation Creator</span>
            </button>
            
            <button 
              onClick={() => setActiveTab('theme')} 
              className={`tab-btn ${activeTab === 'theme' ? 'active' : ''}`}
            >
              <Palette size={18} />
              <span>Theme Generator</span>
            </button>
            
            <button 
              onClick={() => setActiveTab('zodiac')} 
              className={`tab-btn ${activeTab === 'zodiac' ? 'active' : ''}`}
            >
              <Moon size={18} />
              <span>Zodiac Inspiration</span>
            </button>
            
            <button 
              onClick={() => setActiveTab('planner')} 
              className={`tab-btn ${activeTab === 'planner' ? 'active' : ''}`}
            >
              <ClipboardList size={18} />
              <span>Party Planner</span>
            </button>
            
            <button 
              onClick={() => setActiveTab('ai')} 
              className={`tab-btn ${activeTab === 'ai' ? 'active' : ''}`}
            >
              <Wand2 size={18} />
              <span>AI Recommendations</span>
            </button>
          </div>

          {/* Dashboard Right Main Panel */}
          <div className="planner-main-panel" style={{ flex: 1, padding: '2.5rem', background: 'rgba(15, 15, 22, 0.25)', minHeight: '520px' }}>
            
            {/* TAB 1: INVITATION CREATOR */}
            {activeTab === 'invitation' && (
              <div className="tab-pane-content" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} className="invitation-editor-wrapper">
                  <div>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.4rem' }}>Design Your Invitation</h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Type details below and watch the invitation card update in real-time. Pick an elegant theme palette.</p>
                  </div>
                  
                  {/* Theme Select */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#94a3b8' }}>Theme Style</span>
                    <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                      {INVITATION_THEMES.map((theme) => (
                        <button
                          key={theme.id}
                          onClick={() => setInvTheme(theme)}
                          style={{
                            padding: '0.5rem 1rem',
                            borderRadius: '8px',
                            background: invTheme.id === theme.id ? 'var(--color-primary)' : 'rgba(255,255,255,0.03)',
                            border: invTheme.id === theme.id ? '1px solid #c084fc' : '1px solid rgba(255,255,255,0.08)',
                            color: 'white',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                          }}
                        >
                          {theme.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Form Inputs */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="invitation-form-fields">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#94a3b8' }}>Birthday Star's Name</label>
                      <input type="text" className="glass-input" value={invName} onChange={(e) => setInvName(e.target.value.toUpperCase())} maxLength={20} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#94a3b8' }}>Age Celebrating</label>
                      <input type="text" className="glass-input" value={invAge} onChange={(e) => setInvAge(e.target.value)} maxLength={3} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', gridColumn: 'span 2' }} className="col-span-full">
                      <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#94a3b8' }}>Tagline / Party Vibe</label>
                      <input type="text" className="glass-input" value={invVibe} onChange={(e) => setInvVibe(e.target.value)} maxLength={50} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#94a3b8' }}>Date and Time</label>
                      <input type="text" className="glass-input" value={invDate} onChange={(e) => setInvDate(e.target.value)} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#94a3b8' }}>Venue Location</label>
                      <input type="text" className="glass-input" value={invVenue} onChange={(e) => setInvVenue(e.target.value)} />
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                    <button onClick={handleSaveInvite} className="btn btn-primary" style={{ padding: '0.7rem 1.5rem', fontSize: '0.88rem' }}>
                      {inviteSaved ? <CheckCircle2 size={16} /> : <Download size={16} />}
                      <span>{inviteSaved ? 'Saved to Templates!' : 'Save & Download'}</span>
                    </button>
                  </div>
                </div>

                {/* Preview Canvas */}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="invitation-preview-container">
                  <div 
                    style={{
                      width: '100%',
                      maxWidth: '320px',
                      height: '450px',
                      background: invTheme.bg,
                      borderRadius: '20px',
                      padding: '2rem 1.5rem',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                      position: 'relative',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
                      border: invTheme.border || '1px solid rgba(255,255,255,0.06)',
                      transition: 'all 0.5s ease',
                      fontFamily: invTheme.fontFamily,
                      color: invTheme.textColor
                    }}
                  >
                    {/* Pulsing light behind */}
                    <div 
                      style={{ 
                        position: 'absolute', 
                        top: '10%', 
                        width: '180px', 
                        height: '180px', 
                        borderRadius: '50%', 
                        background: invTheme.glowColor, 
                        filter: 'blur(35px)',
                        zIndex: 0,
                        pointerEvents: 'none'
                      }} 
                    />

                    <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'space-between' }}>
                      <p style={{ textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.75rem', color: invTheme.accentColor, fontWeight: 700 }}>You're Invited</p>
                      
                      <div style={{ margin: '1rem 0' }}>
                        <h4 style={{ fontSize: '1.4rem', letterSpacing: '0.05em', color: invTheme.titleColor, fontFamily: invTheme.fontFamily }}>{invName || 'NAME'}</h4>
                        <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', opacity: 0.6, margin: '0.2rem 0' }}>Celebrating Their</p>
                        <h2 style={{ fontSize: '3.6rem', fontWeight: 900, color: '#fff', lineHeight: 1, letterSpacing: '-0.02em', filter: 'drop-shadow(0 0 12px rgba(255,255,255,0.1))' }}>
                          {invAge || '00'}
                          <span style={{ fontSize: '1.5rem', verticalAlign: 'super', fontWeight: 700 }}>th</span>
                        </h2>
                      </div>
                      
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%', alignItems: 'center' }}>
                        <p style={{ fontSize: '0.85rem', color: '#fff', fontStyle: 'italic', maxWidth: '230px', margin: '0 auto', opacity: 0.9 }}>
                          "{invVibe || 'Vibe description goes here...'}"
                        </p>
                        
                        <div style={{ width: '40px', height: '1px', backgroundColor: 'rgba(255,255,255,0.15)' }} />
                        
                        <div>
                          <p style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.05em', color: invTheme.accentColor }}>{invDate || 'DATE & TIME'}</p>
                          <p style={{ fontSize: '0.75rem', opacity: 0.6, marginTop: '0.2rem', maxWidth: '220px' }}>{invVenue || 'VENUE LOCATION'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: THEME GENERATOR */}
            {activeTab === 'theme' && (
              <div className="tab-pane-content" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '0.4rem' }}>Aesthetic Theme Studio</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Explore curated luxury palettes, decor guides, and acoustic concepts. Click a color bubble to copy its hex code.</p>
                </div>

                {/* Vibe Selection Bubbles */}
                <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                  {THEME_VIBES.map((vibe) => (
                    <button
                      key={vibe.id}
                      onClick={() => setSelectedVibe(vibe)}
                      style={{
                        padding: '0.6rem 1.25rem',
                        borderRadius: '30px',
                        background: selectedVibe.id === vibe.id ? 'rgba(236,72,153,0.12)' : 'rgba(255,255,255,0.03)',
                        border: selectedVibe.id === vibe.id ? '1px solid rgba(236,72,153,0.4)' : '1px solid rgba(255,255,255,0.08)',
                        color: selectedVibe.id === vibe.id ? '#f472b6' : '#94a3b8',
                        fontSize: '0.88rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem'
                      }}
                    >
                      <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: vibe.colors[2] }} />
                      <span>{vibe.name}</span>
                    </button>
                  ))}
                </div>

                {/* Theme Breakdown Sheet */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }} className="theme-breakdown-grid">
                  
                  {/* Info and Color Palette */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                      <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#fff' }}>{selectedVibe.name}</h4>
                      <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>{selectedVibe.description}</p>
                    </div>

                    {/* Color Swatch Panel */}
                    <div>
                      <p style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Aesthetic Color Swatches</p>
                      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        {selectedVibe.colors.map((color, cIdx) => (
                          <div
                            key={cIdx}
                            onClick={() => handleCopyColor(color)}
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              gap: '0.4rem',
                              cursor: 'pointer',
                              width: '74px'
                            }}
                          >
                            <div 
                              style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '10px',
                                backgroundColor: color,
                                border: '1px solid rgba(255,255,255,0.1)',
                                boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.2s ease'
                              }}
                              className="color-bubble"
                            >
                              <span className="copy-icon" style={{ opacity: 0, color: '#fff', transition: 'opacity 0.2s' }}><Copy size={12} /></span>
                            </div>
                            <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#f8f9fa', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: '100%', textAlign: 'center', overflow: 'hidden' }}>{selectedVibe.colorNames[cIdx]}</span>
                            <span style={{ fontSize: '0.65rem', color: '#64748b' }}>{color}</span>
                          </div>
                        ))}
                      </div>
                      {copiedColor && (
                        <p style={{ fontSize: '0.75rem', color: '#22d3ee', fontWeight: 600, marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                          <Sparkles size={12} />
                          <span>Copied hex code {copiedColor} to clipboard!</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Decor, Lighting and Music Cards */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }} className="theme-cards-grid">
                    <div className="glass-card" style={{ padding: '1.25rem', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <h5 style={{ fontSize: '0.9rem', color: '#e2e8f0', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.5rem', marginBottom: '0.75rem', fontWeight: 600 }}>Suggested Decor</h5>
                      <ul style={{ listStyleType: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        {selectedVibe.decor.map((item, idx) => (
                          <li key={idx} style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#ec4899' }} />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="glass-card" style={{ padding: '1.25rem', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <h5 style={{ fontSize: '0.9rem', color: '#e2e8f0', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.5rem', marginBottom: '0.75rem', fontWeight: 600 }}>Music & Soundscapes</h5>
                      <p style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: '1.5' }}>{selectedVibe.music}</p>
                      <div style={{ marginTop: '1rem', display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.7rem', color: '#8b5cf6', background: 'rgba(139,92,246,0.1)', padding: '0.2rem 0.6rem', borderRadius: '4px', fontWeight: 600 }}>
                        <span>Curated Playlist</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* TAB 3: ZODIAC INSPIRATION */}
            {activeTab === 'zodiac' && (
              <div className="tab-pane-content" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '0.4rem' }}>Stellar Zodiac Alignment</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Enter the birthday date to calculate the zodiac constellation and reveal personalized, magical celebration parameters.</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }} className="zodiac-grid">
                  
                  {/* Date Input */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', justifyContent: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxWidth: '300px' }}>
                      <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#94a3b8' }}>Select Birthday Date</label>
                      <input 
                        type="date" 
                        className="glass-input" 
                        value={birthdate} 
                        onChange={handleDateChange} 
                        style={{ colorScheme: 'dark' }} 
                      />
                    </div>

                    {zodiacResult && (
                      <div 
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1rem',
                          background: 'rgba(255,255,255,0.03)',
                          border: '1px solid rgba(255,255,255,0.08)',
                          borderRadius: '16px',
                          padding: '1.25rem 1.5rem',
                          maxWidth: '300px'
                        }}
                      >
                        <span style={{ fontSize: '3rem' }}>{zodiacResult.icon}</span>
                        <div>
                          <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Zodiac Sign</p>
                          <h4 style={{ fontSize: '1.5rem', fontWeight: 700 }}>{zodiacResult.sign}</h4>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Zodiac Suggestions Panel */}
                  <div style={{ flex: 1 }}>
                    {zodiacResult ? (
                      <div 
                        className="glass-card" 
                        style={{
                          height: '100%',
                          border: '1px solid rgba(139, 92, 246, 0.2)',
                          boxShadow: '0 10px 30px rgba(139, 92, 246, 0.05)'
                        }}
                      >
                        <div style={{ position: 'absolute', top: 0, right: 0, width: '120px', height: '120px', background: 'radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)', filter: 'blur(10px)' }} />
                        <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span style={{ color: '#06b6d4' }}>Celestial Theme Proposal:</span>
                          <span style={{ color: '#fff' }}>{zodiacResult.theme}</span>
                        </h4>
                        
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '1.5rem' }}>{zodiacResult.description}</p>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }} className="zodiac-details-grid">
                          <div>
                            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', display: 'block', marginBottom: '0.2rem' }}>Aesthetic Vibe</span>
                            <p style={{ fontSize: '0.85rem', color: '#e2e8f0' }}>{zodiacResult.vibe}</p>
                          </div>
                          <div>
                            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', display: 'block', marginBottom: '0.2rem' }}>Signature Cocktail</span>
                            <p style={{ fontSize: '0.85rem', color: '#e2e8f0' }}>{zodiacResult.drink}</p>
                          </div>
                          <div style={{ gridColumn: 'span 2' }} className="col-span-full">
                            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', display: 'block', marginBottom: '0.2rem' }}>Key Celebration Activity</span>
                            <p style={{ fontSize: '0.85rem', color: '#e2e8f0' }}>{zodiacResult.activity}</p>
                          </div>
                        </div>

                        <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.8rem' }}>
                          <button
                            onClick={() => {
                              // Load the theme name into the invitation name field (or subtitle)
                              setInvVibe(`${zodiacResult.sign} Theme: ${zodiacResult.theme}`);
                              setActiveTab('invitation');
                            }}
                            className="btn btn-secondary"
                            style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', borderRadius: '8px' }}
                          >
                            Use in Invitation Creator
                          </button>
                        </div>

                      </div>
                    ) : (
                      <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', border: '1px dashed rgba(255,255,255,0.08)', borderRadius: '16px', padding: '3rem', color: 'var(--text-muted)' }}>
                        Select a date to unlock recommendations
                      </div>
                    )}
                  </div>

                </div>
              </div>
            )}

            {/* TAB 4: PARTY PLANNER */}
            {activeTab === 'planner' && (
              <div className="tab-pane-content" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.4rem' }}>Checklist Party Planner</h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Check off steps as you finalize your event. Add custom tasks below.</p>
                  </div>
                  <button 
                    onClick={resetChecklist} 
                    className="btn btn-secondary animate-pulse" 
                    style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.3rem', borderRadius: '6px' }}
                  >
                    <RefreshCw size={12} />
                    <span>Reset Progress</span>
                  </button>
                </div>

                {/* Progress bar */}
                <div 
                  className="glass-card" 
                  style={{ 
                    padding: '1.25rem', 
                    backgroundColor: 'rgba(255,255,255,0.02)', 
                    border: '1px solid rgba(255,255,255,0.05)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.6rem'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#f8f9fa' }}>Planning Progress</span>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-primary)' }}>{progressPercent}% Done</span>
                  </div>
                  <div style={{ height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden', position: 'relative' }}>
                    <div 
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        height: '100%',
                        width: `${progressPercent}%`,
                        background: 'linear-gradient(to right, var(--color-primary), var(--color-secondary))',
                        borderRadius: '10px',
                        transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                        boxShadow: '0 0 10px rgba(139,92,246,0.5)'
                      }}
                    />
                  </div>
                </div>

                {/* Form to Add Checklist Item */}
                <form onSubmit={addCheckItem} style={{ display: 'flex', gap: '0.6rem' }}>
                  <input
                    type="text"
                    placeholder="e.g., Book catering company..."
                    className="glass-input"
                    value={newCheckItem}
                    onChange={(e) => setNewCheckItem(e.target.value)}
                    style={{ flex: 1 }}
                  />
                  <button type="submit" className="btn btn-primary" style={{ padding: '0 1.25rem', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Plus size={18} />
                  </button>
                </form>

                {/* Checklist list */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', maxHeight: '250px', overflowY: 'auto', paddingRight: '0.2rem' }}>
                  {checklist.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.75rem 1rem',
                        background: 'rgba(255,255,255,0.02)',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        borderRadius: '10px',
                        transition: 'all 0.2s ease'
                      }}
                      className="checklist-item-row"
                    >
                      <div 
                        onClick={() => toggleCheck(item.id)}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', flex: 1 }}
                      >
                        <div 
                          style={{
                            width: '18px',
                            height: '18px',
                            borderRadius: '4px',
                            border: item.completed ? '1.5px solid var(--color-primary)' : '1.5px solid rgba(255,255,255,0.25)',
                            backgroundColor: item.completed ? 'rgba(139,92,246,0.15)' : 'transparent',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.2s'
                          }}
                        >
                          {item.completed && <div style={{ width: '8px', height: '8px', backgroundColor: 'var(--color-primary)', borderRadius: '2px' }} />}
                        </div>
                        <span 
                          style={{
                            fontSize: '0.88rem',
                            color: item.completed ? '#64748b' : '#f1f5f9',
                            textDecoration: item.completed ? 'line-through' : 'none',
                            transition: 'color 0.2s'
                          }}
                        >
                          {item.text}
                        </span>
                      </div>
                      <button
                        onClick={() => deleteCheckItem(item.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#64748b',
                          cursor: 'pointer',
                          opacity: 0,
                          transition: 'opacity 0.2s, color 0.2s'
                        }}
                        className="delete-item-btn"
                        onMouseEnter={(e) => (e.currentTarget.style.color = '#ef4444')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = '#64748b')}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>

              </div>
            )}

            {/* TAB 5: AI RECOMMENDATIONS */}
            {activeTab === 'ai' && (
              <div className="tab-pane-content" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '0.4rem' }}>AI Celebration Proposal</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Describe your dream party and prompt the mockup AI. Try incorporating keywords like 'beach', 'stargaze', or 'neon'.</p>
                </div>

                {/* Prompt box */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  <textarea
                    rows={3}
                    placeholder="e.g., I want to plan a 30th birthday campfire celebration under the pine trees with cozy stargazing chairs, warm cider cocktails, and acoustic guitars..."
                    className="glass-input"
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    style={{ resize: 'none', padding: '1rem', lineHeight: '1.5' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Includes food, cocktail & music suggestion presets</span>
                    <button
                      onClick={handleAIGenerate}
                      disabled={aiLoading}
                      className="btn btn-primary"
                      style={{ padding: '0.6rem 1.5rem', fontSize: '0.88rem', gap: '0.5rem', display: 'flex', alignItems: 'center' }}
                    >
                      {aiLoading ? (
                        <>
                          <RefreshCw className="animate-spin" size={16} />
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <Wand2 size={16} />
                          <span>Generate Proposal</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* AI Outputs Panel */}
                <div>
                  {aiLoading && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div className="shimmer" style={{ height: '80px', borderRadius: '12px' }} />
                      <div className="shimmer" style={{ height: '150px', borderRadius: '12px' }} />
                    </div>
                  )}

                  {!aiLoading && aiOutput && (
                    <div 
                      className="glass-card animate-fade-in" 
                      style={{
                        padding: '1.75rem',
                        border: '1px solid rgba(16, 185, 129, 0.25)',
                        backgroundColor: 'rgba(16, 185, 129, 0.02)',
                        boxShadow: '0 10px 30px rgba(16, 185, 129, 0.05)'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '0.75rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <Wand2 size={18} color="#10b981" />
                          <h4 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#10b981' }}>{aiOutput.title}</h4>
                        </div>
                        <span style={{ fontSize: '0.7rem', color: '#10b981', backgroundColor: 'rgba(16, 185, 129, 0.1)', padding: '0.2rem 0.6rem', borderRadius: '4px', fontWeight: 600 }}>Proposal Ready</span>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        <div>
                          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', display: 'block', marginBottom: '0.2rem' }}>Aesthetic Vibe</span>
                          <p style={{ fontSize: '0.88rem', color: '#e2e8f0', lineHeight: '1.5' }}>{aiOutput.vibe}</p>
                        </div>
                        
                        <div>
                          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', display: 'block', marginBottom: '0.2rem' }}>Decor Plan</span>
                          <p style={{ fontSize: '0.88rem', color: '#cbd5e1', lineHeight: '1.5' }}>{aiOutput.decor}</p>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="ai-split-grid">
                          <div>
                            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', display: 'block', marginBottom: '0.2rem' }}>Catering Menu</span>
                            <p style={{ fontSize: '0.85rem', color: '#e2e8f0' }}>{aiOutput.food}</p>
                          </div>
                          <div>
                            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', display: 'block', marginBottom: '0.2rem' }}>Signature Cocktail</span>
                            <p style={{ fontSize: '0.85rem', color: '#e2e8f0' }}>{aiOutput.drink}</p>
                          </div>
                          <div style={{ gridColumn: 'span 2' }} className="col-span-full">
                            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', display: 'block', marginBottom: '0.2rem' }}>Playlist Recommendation</span>
                            <p style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>{aiOutput.music}</p>
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '0.8rem', marginTop: '1.5rem' }}>
                        <button
                          onClick={() => {
                            setInvVibe(`${aiOutput.title} theme concept`);
                            setActiveTab('invitation');
                          }}
                          className="btn btn-secondary"
                          style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', borderRadius: '8px' }}
                        >
                          Use in Invitation Creator
                        </button>
                      </div>
                    </div>
                  )}

                  {!aiLoading && !aiOutput && (
                    <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', border: '1px dashed rgba(255,255,255,0.08)', borderRadius: '16px', padding: '3.5rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                      Submit a concept query above to generate an custom celebration plan.
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

      <style>{`
        /* Sidebar Tab Styles */
        .tab-btn {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          padding: 0.8rem 1rem;
          background: none;
          border: none;
          color: #94a3b8;
          font-family: var(--font-display);
          font-weight: 500;
          font-size: 0.92rem;
          border-radius: 10px;
          cursor: pointer;
          width: 100%;
          text-align: left;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .tab-btn:hover {
          color: white;
          background: rgba(255, 255, 255, 0.03);
        }
        .tab-btn.active {
          color: white;
          background: rgba(139, 92, 246, 0.12);
          border: 1px solid rgba(139, 92, 246, 0.2);
          font-weight: 600;
        }

        /* Color Bubble Hover */
        .color-bubble:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.5);
        }
        .color-bubble:hover .copy-icon {
          opacity: 1 !important;
        }

        /* Checklist Row hover to show delete button */
        .checklist-item-row:hover .delete-item-btn {
          opacity: 1 !important;
        }

        /* Responsive Breakpoints for Dashboard */
        @media (max-width: 991px) {
          .planner-dashboard-shell {
            flex-direction: column !important;
          }
          .planner-sidebar {
            width: 100% !important;
            border-right: none !important;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            flex-direction: row !important;
            flex-wrap: wrap;
            padding: 1.25rem !important;
          }
          .planner-sidebar p {
            display: none !important; /* Hide Sidebar category */
          }
          .tab-btn {
            width: auto !important;
            padding: 0.6rem 1rem !important;
            font-size: 0.85rem !important;
          }
          .planner-main-panel {
            padding: 1.5rem !important;
          }
        }

        @media (min-width: 768px) {
          .invitation-editor-wrapper {
            grid-column: span 1;
          }
          .invitation-preview-container {
            grid-column: span 1;
          }
          .tab-pane-content[style*="gridTemplateColumns"] {
            grid-template-columns: 1.2fr 0.8fr !important;
          }
          .theme-breakdown-grid {
            grid-template-columns: 1.2fr 0.8fr !important;
          }
          .zodiac-grid {
            grid-template-columns: 0.8fr 1.2fr !important;
          }
        }

        @media (max-width: 767px) {
          .invitation-form-fields {
            grid-template-columns: 1fr !important;
          }
          .col-span-full {
            grid-column: span 1 !important;
          }
          .theme-cards-grid {
            grid-template-columns: 1fr !important;
          }
          .zodiac-details-grid {
            grid-template-columns: 1fr !important;
          }
          .ai-split-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
