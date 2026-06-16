import React, { useState, useEffect } from 'react';
import { Wand2, Plus, Trash2, CheckCircle2, Copy, Sparkles, Download, RefreshCw, AlertTriangle } from 'lucide-react';
import { generatePartyIdea } from '../services/partyApi';
import type { PartyIdeaRequest, PartyIdeaResponse } from '../services/partyApi';

// Theme Presets for Invitation Card
const INVITATION_THEMES = [
  {
    id: 'midnight',
    name: 'Midnight Velvet',
    bg: 'linear-gradient(135deg, #09090b 0%, #1c1215 50%, #2e171d 100%)',
    textColor: '#f3e8ee',
    accentColor: '#c87a90',
    titleColor: '#e5b3c0',
    glowColor: 'rgba(200, 122, 144, 0.4)',
    fontFamily: "var(--font-serif)"
  },
  {
    id: 'gold',
    name: 'Champagne Elegance',
    bg: 'linear-gradient(135deg, #0f0e0f 0%, #221c17 100%)',
    textColor: '#dec39d',
    accentColor: '#e2c499',
    titleColor: '#dfc9a5',
    glowColor: 'rgba(222, 195, 157, 0.35)',
    fontFamily: "var(--font-serif)"
  },
  {
    id: 'cyberpunk',
    name: 'Romantic Blush',
    bg: 'linear-gradient(135deg, #120e10 0%, #2b1c20 100%)',
    textColor: '#e5b3c0',
    accentColor: '#dec39d',
    titleColor: '#ffffff',
    glowColor: 'rgba(229, 179, 192, 0.4)',
    fontFamily: "var(--font-display)",
    border: '1px solid rgba(229, 179, 192, 0.2)'
  },
  {
    id: 'sunset',
    name: 'Rose Quartz',
    bg: 'linear-gradient(135deg, #26161a 0%, #4a212a 50%, #632c38 100%)',
    textColor: '#fecdd3',
    accentColor: '#c87a90',
    titleColor: '#e5b3c0',
    glowColor: 'rgba(200, 122, 144, 0.4)',
    fontFamily: "var(--font-display)"
  }
];

// Theme Generator Vibes
const THEME_VIBES = [
  {
    id: 'cosmic',
    name: 'Rosewood Celestial',
    description: 'A stellar theme filled with warm candle outlines, dark rosewood setups, and glowing blush constellations. Perfect for romantic night stargazers.',
    colors: ['#0d080a', '#2d181e', '#c87a90', '#e5b3c0', '#dec39d'],
    colorNames: ['Rosewood Dark', 'Deep Mauve', 'Dusty Rose', 'Warm Blush', 'Champagne Gold'],
    decor: ['Rose gold candle arrays', 'Blush starry projection lights', 'Floating fairy lights', 'Champagne glassware'],
    music: 'Dreamy acoustic lofi, ambient soft piano, cinematic instrumentals'
  },
  {
    id: 'neon',
    name: 'Velvet Soirée',
    description: 'Rich velvet textures, warm amber candle outlines, gold details, and sophisticated acoustic sets. Recreates a high-end luxury cocktail lounge.',
    colors: ['#140b0d', '#421a24', '#a05c6e', '#dec39d', '#dfc9a5'],
    colorNames: ['Velvet Shadow', 'Deep Crimson', 'Muted Rose', 'Champagne', 'Warm Brass'],
    decor: ['Plush velvet curtains', 'Amber glowing lightbulbs', 'Brass bar cart setup', 'White rose garlands'],
    music: 'Chic lounge jazz, smooth acoustic covers, soft bossa beats'
  },
  {
    id: 'boho',
    name: 'Champagne Garden',
    description: 'Soft cream tones, rose gold highlights, champagne towers, and floor picnics. Sophisticated, organic, and relaxed.',
    colors: ['#1a1714', '#3d2e24', '#dec39d', '#e5b3c0', '#fff8f2'],
    colorNames: ['Toasted Oak', 'Shadow Ash', 'Champagne Gold', 'Warm Blush', 'Ivory Pearl'],
    decor: ['Dried pampas cloud decorations', 'Rose gold fairy lights', 'Rattan candle boxes', 'Floor silk cushions'],
    music: 'Acoustic indie folk, fingerstyle guitar covers, soft chill acoustic'
  },
  {
    id: 'cyber',
    name: 'Blush Silhouette',
    description: 'A minimal modern layout focusing on warm white glows, metallic brass accents, and glassmorphic designs. Highly artistic and creative.',
    colors: ['#0c0a0b', '#362227', '#c87a90', '#e5b3c0', '#dec39d'],
    colorNames: ['Obsidian Black', 'Burgundy Accent', 'Dusty Rose', 'Warm Blush', 'Champagne Gold'],
    decor: ['Blush LED custom backdrop', 'Holographic card placements', 'Blush silk ribbons', 'Glass candle holders'],
    music: 'Chill electronic, vocal organic house, soft synthesizer beats'
  },
  {
    id: 'garden',
    name: 'Gilded Greenhouse',
    description: 'Lush greenery, hanging ivy, magical fairy lights, wood accents, and warm botanical vibes. Feels like walking into a botanical wonderland.',
    colors: ['#07140f', '#19382c', '#c87a90', '#dec39d', '#ffffff'],
    colorNames: ['Greenhouse Ivy', 'Emerald Canopy', 'Dusty Rose Highlight', 'Champagne Sparkle', 'Pure White'],
    decor: ['Hanging eucalyptus drapes', 'Rose gold birdcages', 'Brass table stands', 'Greenery centerpieces'],
    music: 'Classical romantic strings, acoustic fantasy covers, soft ambient'
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
      theme: 'Gilded Crimson Sparks',
      vibe: 'Warm crimson lighting, champagne bubbles, glowing rose gold sparklers',
      drink: 'Spiced Pomegranate Margarita with a golden sugar rim',
      activity: 'Interactive wine tasting competition or custom trivia',
      description: 'As a passionate fire sign, your party needs dynamic warmth, golden glow highlights, and engaging activities.'
    },
    Taurus: {
      theme: 'Champagne Vineyard Picnic',
      vibe: 'Dusty rose linen, champagne towers, wood log plates, warm floor cushions',
      drink: 'Blush French 75 with lavender and honey syrup',
      activity: 'Gourmet cheese pairing class or live acoustic guitar lounge',
      description: 'You treasure organic luxury, beautiful textures, and comfortable dining. A champagne garden picnic is perfect.'
    },
    Gemini: {
      theme: 'Rose Gold Vinyl Soirée',
      vibe: 'Warm amber spotlights, copper highlights, customized cocktail lounges',
      drink: 'Rose water gin spritz with edible gold flakes',
      activity: 'Custom record session and interactive social mixer cards',
      description: 'Social and curious, you love mingling. A modern speakeasy vibe with curated records keeps guests engaged.'
    },
    Cancer: {
      theme: 'Moonlit Rose dinner',
      vibe: 'Intimate setting, glowing candles, dusty pink drapery, gold plates',
      drink: 'Elderflower & Pear mocktail served in vintage champagne coupés',
      activity: 'Heartfelt storytelling toasts round and polaroid photoshoot',
      description: 'You cherish close friends. A warm, candlelight dinner styled in soft rose gold fits your gentle character.'
    },
    Leo: {
      theme: 'Hollywood Champagne Gala',
      vibe: 'Rose gold backdrops, velvet red carpets, warm spotlights, glitter accents',
      drink: 'Champagne tower garnished with fresh strawberry slices',
      activity: 'Custom polaroid red carpet shoot and mini toast awards',
      description: 'Born to celebrate, your birthday needs a touch of premier gala styling. Let the champagne and spotlights shine.'
    },
    Virgo: {
      theme: 'Dusty Rose Greenhouse Lounge',
      vibe: 'Potted botanicals, brass geometric arches, rose gold lanterns, clean line setups',
      drink: 'Rosemary & Grapefruit Gin Cocktail with a copper straw',
      activity: 'Terrarium design workshop or botanical mocktail pairing',
      description: 'You appreciate nature, structure, and high detail. A greenhouse garden cocktail night meets your aesthetics.'
    },
    Libra: {
      theme: 'Art Deco Velvet Lounge',
      vibe: 'Symmetrical gold outlines, dark mahogany details, dusty pink velvet lounges',
      drink: 'Classic Espresso Martini dusted with gold cocoa powder',
      activity: 'Live saxophonist set and customized perfume design bar',
      description: 'Ruled by Venus, you seek visual symmetry, high art, and luxury. A vintage velvet lounge matches your vibe.'
    },
    Scorpio: {
      theme: 'Burgundy Masquerade Night',
      vibe: 'Deep burgundy velvet, dark roses, warm candle glow, copper outlines',
      drink: 'Spiced Blackberry Old Fashioned with orange peel twist',
      activity: 'Tarot constellation cards reading or custom mystery game',
      description: 'Intimate, mysterious, and deep. A masked night styled in rich burgundies and warm candlelight represents your energy.'
    },
    Sagittarius: {
      theme: 'Wanderlust Champagne Campfire',
      vibe: 'Glamping tents, rose gold fairy lights, massive warm bonfire, blankets',
      drink: 'Warm apple cider spiced with cinnamon and dark rum',
      activity: 'Stargazing session or fireside acoustic guitar storytelling',
      description: 'Free spirited and travel-loving. An upscale festival-style glamping night under the stars is ideal.'
    },
    Capricorn: {
      theme: 'Obsidian & Gold Speakeasy',
      vibe: 'Soft black leather, warm brass lights, vintage records, copper details',
      drink: 'Aged Single Malt Scotch with a smoked rosemary twig',
      activity: 'Professional mixology tutorial or custom pool shootout',
      description: 'You love timeless elegance. A private speakeasy vibe with dark mahogany and copper details suits your ambition.'
    },
    Aquarius: {
      theme: 'Blush Hologram Silhouette',
      vibe: 'Holographic cards, custom blush lighting grids, silver details, chill beats',
      drink: 'Blue Curacao Prosecco spritz topped with cotton candy',
      activity: 'Graffiti collaborative mural canvas and synth music beats',
      description: 'Futuristic yet community-oriented. A modern creative lounge with soft holographic blush tones fits your uniqueness.'
    },
    Pisces: {
      theme: 'Ocean Rose Sanctuary',
      vibe: 'Dreamy wave lights, floating candles, rose water fragrances, soft harp tracks',
      drink: 'Coconut milk prosecco punch with a rose petal garnish',
      activity: 'Intimate acoustic music circle or watercolor painting workshop',
      description: 'An imaginative dreamer. A soft water-inspired setup with floating candles and dusty rose details is perfect.'
    }
  };

  return {
    sign,
    icon,
    ...recommendations[sign]
  };
};


const getOrdinalSuffix = (ageStr: string) => {
  const num = parseInt(ageStr, 10);
  if (isNaN(num)) return '';
  const j = num % 10;
  const k = num % 100;
  if (j === 1 && k !== 11) return 'st';
  if (j === 2 && k !== 12) return 'nd';
  if (j === 3 && k !== 13) return 'rd';
  return 'th';
};
// Zodiac Preset details for interactive constellation map
const ZODIAC_PRESETS = [
  { sign: 'Aries', icon: '♈', date: '2001-04-05', range: 'Mar 21 - Apr 19' },
  { sign: 'Taurus', icon: '♉', date: '2001-05-05', range: 'Apr 20 - May 20' },
  { sign: 'Gemini', icon: '♊', date: '2001-06-05', range: 'May 21 - Jun 20' },
  { sign: 'Cancer', icon: '♋', date: '2001-07-05', range: 'Jun 21 - Jul 22' },
  { sign: 'Leo', icon: '♌', date: '2001-08-05', range: 'Jul 23 - Aug 22' },
  { sign: 'Virgo', icon: '♍', date: '2001-09-05', range: 'Aug 23 - Sep 22' },
  { sign: 'Libra', icon: '♎', date: '2001-10-05', range: 'Sep 23 - Oct 22' },
  { sign: 'Scorpio', icon: '♏', date: '2001-11-05', range: 'Oct 23 - Nov 21' },
  { sign: 'Sagittarius', icon: '♐', date: '2001-12-05', range: 'Nov 22 - Dec 21' },
  { sign: 'Capricorn', icon: '♑', date: '2001-01-05', range: 'Dec 22 - Jan 19' },
  { sign: 'Aquarius', icon: '♒', date: '2001-02-05', range: 'Jan 20 - Feb 18' },
  { sign: 'Pisces', icon: '♓', date: '2001-03-05', range: 'Feb 19 - Mar 20' }
];

// Predefined Dream Atmosphere presets for AI generator
const AI_PRESET_CARDS = [
  {
    title: 'Cozy Glamping Campfire',
    emoji: '🍂',
    prompt: 'Cozy outdoor stargazing bonfire for a birthday with warm blankets and hot toddies.',
    bg: 'linear-gradient(135deg, rgba(222,195,157,0.06), rgba(200,122,144,0.03))',
    glow: 'rgba(222, 195, 157, 0.25)'
  },
  {
    title: 'Velvet Jazz Lounge',
    emoji: '🎷',
    prompt: 'An upscale cocktail soirée in a luxury jazz bar with amber lights and rich velvet aesthetics.',
    bg: 'linear-gradient(135deg, rgba(200,122,144,0.06), rgba(170,91,113,0.03))',
    glow: 'rgba(200, 122, 144, 0.25)'
  },
  {
    title: 'Blush Sunset Oasis',
    emoji: '🌊',
    prompt: 'A beachside sunset birthday celebration with gold decorations, champagne towers, and tropical lofi.',
    bg: 'linear-gradient(135deg, rgba(229,179,192,0.06), rgba(222,195,157,0.03))',
    glow: 'rgba(229, 179, 192, 0.25)'
  }
];

export default function PlannerSuite() {
  const [activeTab, setActiveTab] = useState('invitation');

  // Invitation State
  const [invTheme, setInvTheme] = useState(INVITATION_THEMES[0]);
  const [invName, setInvName] = useState('AURELIA');
  const [invAge, setInvAge] = useState('25');
  const [isAgeFocused, setIsAgeFocused] = useState(false);
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
  const [newTask, setNewTask] = useState('');

  // AI Curation Form State
  const [aiName, setAiName] = useState('Aurelia');
  const [aiAge, setAiAge] = useState<string | number>('30');
  const [aiBirthdate, setAiBirthdate] = useState('2026-08-15');
  const [aiZodiac, setAiZodiac] = useState('Leo');
  const [aiStyle, setAiStyle] = useState('Luxury Rose Gold');
  const [aiInterests, setAiInterests] = useState('champagne, flowers, live jazz');
  const [aiCity, setAiCity] = useState('Stockholm');
  const [aiBudget, setAiBudget] = useState('15000 SEK');
  const [aiGuestCount, setAiGuestCount] = useState<string | number>('18');
  const [apiError, setApiError] = useState<string | null>(null);

  // AI State
  const [aiOutput, setAiOutput] = useState<PartyIdeaResponse | null>(null);
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
  const handleAddTask = () => {
    const trimmed = newTask.trim();
    if (!trimmed) return;
    setChecklist([
      ...checklist,
      { id: Date.now(), text: trimmed, completed: false }
    ]);
    setNewTask('');
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

  // Run API Generation
  const handleAIGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!aiName.trim() || !aiCity.trim() || !aiStyle.trim()) {
      setApiError('Please fill out the Name, City, and Party Style fields.');
      return;
    }

    setAiLoading(true);
    setAiOutput(null);
    setApiError(null);

    // Prepare interests as string list
    const parsedInterests = aiInterests
      ? aiInterests.split(',').map((interest) => interest.trim()).filter(Boolean)
      : ['celebration'];

    const requestPayload: PartyIdeaRequest = {
      name: aiName,
      age: Number(aiAge) || 0,
      birthday_date: aiBirthdate || new Date().toISOString().split('T')[0],
      zodiac_sign: aiZodiac || 'Leo',
      party_style: aiStyle,
      interests: parsedInterests,
      city: aiCity,
      budget: aiBudget || 'Custom',
      guest_count: Number(aiGuestCount) || 10,
    };

    try {
      const response = await generatePartyIdea(requestPayload);
      setAiOutput(response);
    } catch (err: any) {
      console.error('API connection error:', err);
      setApiError(err.message || 'Unable to connect to the backend server. Please make sure the service is running on http://127.0.0.1:8001.');
    } finally {
      setAiLoading(false);
    }
  };

  // Pre-fill form from presets
  const handleAIPresetClick = (card: typeof AI_PRESET_CARDS[0]) => {
    if (card.title === 'Cozy Glamping Campfire') {
      setAiStyle('Sunset Garden & Alfresco Soirée');
      setAiInterests('stargazing, glamping, bonfire, cozy blankets');
      setAiBudget('4000 SEK');
    } else if (card.title === 'Velvet Jazz Lounge') {
      setAiStyle('Luxury Rose Gold Soirée');
      setAiInterests('jazz, velvet, candlelight, cocktails');
      setAiBudget('5000 SEK');
    } else {
      setAiStyle('Elegant Atelier & Watercolor Salon');
      setAiInterests('sunset, beachside, champagne towers, tropical lofi');
      setAiBudget('4500 SEK');
    }
    setAiName('Maja');
    setAiAge(30);
    setAiBirthdate('2026-06-25');
    setAiZodiac('Gemini');
    setAiCity('Stockholm');
    setAiGuestCount(20);
    setApiError(null);
    setAiOutput(null);
  };

  // Handle Zodiac Constellation Click
  const handleZodiacSelect = (preset: typeof ZODIAC_PRESETS[0]) => {
    setBirthdate(preset.date);
    setZodiacResult(getZodiacDetails(preset.date));
  };

  // Trigger Save Invitation animation
  const handleSaveInvite = () => {
    setInviteSaved(true);
    setTimeout(() => setInviteSaved(false), 3000);
  };

  // Save & Download PNG using HTML5 Canvas
  const handleDownloadPNG = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 1125;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 1. Draw Background Gradient matching current theme
    const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
    if (invTheme.id === 'midnight') {
      grad.addColorStop(0, '#09090b');
      grad.addColorStop(0.5, '#1c1215');
      grad.addColorStop(1, '#2e171d');
    } else if (invTheme.id === 'gold') {
      grad.addColorStop(0, '#0f0e0f');
      grad.addColorStop(1, '#221c17');
    } else if (invTheme.id === 'cyberpunk') {
      grad.addColorStop(0, '#120e10');
      grad.addColorStop(1, '#2b1c20');
    } else { // sunset / rose quartz
      grad.addColorStop(0, '#26161a');
      grad.addColorStop(0.5, '#4a212a');
      grad.addColorStop(1, '#632c38');
    }
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 2. Draw Soft Radial Ambient Glow
    const glowColor = invTheme.glowColor || 'rgba(200, 122, 144, 0.3)';
    const radialGlow = ctx.createRadialGradient(canvas.width / 2, 450, 100, canvas.width / 2, 450, 450);
    radialGlow.addColorStop(0, glowColor);
    radialGlow.addColorStop(1, 'transparent');
    ctx.fillStyle = radialGlow;
    ctx.beginPath();
    ctx.arc(canvas.width / 2, 450, 450, 0, Math.PI * 2);
    ctx.fill();

    // 3. Elegant Double Border Frame (Rose Gold / Champagne Gold tones)
    ctx.strokeStyle = invTheme.accentColor;
    ctx.lineWidth = 4;
    ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    ctx.strokeRect(50, 50, canvas.width - 100, canvas.height - 100);

    // Decorative corner diamonds/crosses
    const drawCornerCross = (cx: number, cy: number, size: number) => {
      ctx.strokeStyle = invTheme.accentColor;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(cx - size, cy);
      ctx.lineTo(cx + size, cy);
      ctx.moveTo(cx, cy - size);
      ctx.lineTo(cx, cy + size);
      ctx.stroke();
    };
    drawCornerCross(40, 40, 10);
    drawCornerCross(canvas.width - 40, 40, 10);
    drawCornerCross(40, canvas.height - 40, 10);
    drawCornerCross(canvas.width - 40, canvas.height - 40, 10);

    // 4. Text Content Rendering
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const fontSerif = 'Playfair Display, Georgia, Times New Roman, serif';
    const fontSans = 'Montserrat, Arial, sans-serif';

    // Header "YOU'RE INVITED"
    ctx.fillStyle = invTheme.accentColor;
    ctx.font = 'bold 22px ' + fontSerif;
    if ('letterSpacing' in ctx) {
      (ctx as any).letterSpacing = '6px';
    }
    ctx.fillText("YOU'RE INVITED TO CELEBRATE", canvas.width / 2, 180);
    if ('letterSpacing' in ctx) {
      (ctx as any).letterSpacing = 'normal';
    }

    // Name
    ctx.fillStyle = invTheme.titleColor;
    ctx.font = '700 56px ' + fontSerif;
    ctx.fillText(invName || 'AURELIA', canvas.width / 2, 280);

    // "Celebrating Their" / "Celebrating This"
    ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
    ctx.font = 'italic 18px Georgia, serif';
    const celebrationHeader = isNaN(parseInt(invAge, 10)) ? "Celebrating This" : "Celebrating Their";
    ctx.fillText(celebrationHeader.toUpperCase(), canvas.width / 2, 380);

    // Age
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 135px ' + fontSans;
    const ageVal = invAge || '00';
    ctx.fillText(ageVal, canvas.width / 2 - 20, 490);

    // Dynamic Suffix next to Age
    const suffix = getOrdinalSuffix(ageVal);
    if (suffix) {
      ctx.fillStyle = invTheme.accentColor;
      ctx.font = '700 38px ' + fontSans;
      const ageWidth = ctx.measureText(ageVal).width;
      ctx.fillText(suffix, canvas.width / 2 + (ageWidth / 2) - 10, 435);
    }

    // "Milestone" / "Birthday"
    ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
    ctx.font = 'italic 18px Georgia, serif';
    const celebrationFooter = isNaN(parseInt(invAge, 10)) ? "MILESTONE" : "BIRTHDAY";
    ctx.fillText(celebrationFooter, canvas.width / 2, 600);

    // Divider Line
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2 - 120, 640);
    ctx.lineTo(canvas.width / 2 + 120, 640);
    ctx.stroke();

    // Vibe Quote wrapping helper
    const wrapText = (textStr: string, xPos: number, yPos: number, maxW: number, lineH: number) => {
      const words = textStr.split(' ');
      let currentLine = '';
      let currentY = yPos;
      for (let n = 0; n < words.length; n++) {
        const testLine = currentLine + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;
        if (testWidth > maxW && n > 0) {
          ctx.fillText(currentLine, xPos, currentY);
          currentLine = words[n] + ' ';
          currentY += lineH;
        } else {
          currentLine = testLine;
        }
      }
      ctx.fillText(currentLine, xPos, currentY);
    };

    // Vibe Quote wrapping
    ctx.fillStyle = '#ffffff';
    ctx.font = 'italic 26px Georgia, serif';
    const quote = `"${invVibe || 'Midnight Stars & Golden Bubbles'}"`;
    wrapText(quote, canvas.width / 2, 700, 620, 40);

    // Divider Line
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2 - 120, 810);
    ctx.lineTo(canvas.width / 2 + 120, 810);
    ctx.stroke();

    // Date
    ctx.fillStyle = invTheme.accentColor;
    ctx.font = '700 24px ' + fontSerif;
    ctx.fillText(invDate || 'Saturday, Oct 12th • 9:00 PM', canvas.width / 2, 870);

    // Venue Location
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.font = '19px ' + fontSans;
    ctx.fillText(invVenue || 'The Obsidian Lounge, NYC', canvas.width / 2, 925);

    // Custom Atelier signature watermark
    ctx.fillStyle = invTheme.accentColor;
    ctx.font = 'italic 16px Georgia, serif';
    if ('letterSpacing' in ctx) {
      (ctx as any).letterSpacing = '3px';
    }
    ctx.fillText("✦ DREAM PARTY CELEBRATION ✦", canvas.width / 2, 1040);
    if ('letterSpacing' in ctx) {
      (ctx as any).letterSpacing = 'normal';
    }

    // Trigger Save & Download
    try {
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `${invName.toLowerCase().replace(/\s+/g, '_')}_birthday_invitation.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to generate and download PNG image:", err);
    }

    // Trigger visual state saved feedback
    handleSaveInvite();
  };

  // Copy hex color to clipboard
  const handleCopyColor = (color: string) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(color);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const ageLabel = invAge ? `${invAge}${getOrdinalSuffix(invAge)}` : 'AGE';

  return (
    <section id="planner" className="section" style={{ position: 'relative', overflow: 'hidden' }}>
      
      {/* Ambient glow areas */}
      <div 
        style={{
          position: 'absolute',
          top: '30%',
          right: '-12%',
          width: '550px',
          height: '550px',
          background: 'radial-gradient(circle, rgba(222, 195, 157, 0.07) 0%, transparent 70%)',
          filter: 'blur(100px)',
          zIndex: -1,
          pointerEvents: 'none'
        }}
      />
      <div 
        style={{
          position: 'absolute',
          bottom: '15%',
          left: '-8%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(200, 122, 144, 0.08) 0%, transparent 70%)',
          filter: 'blur(95px)',
          zIndex: -1,
          pointerEvents: 'none'
        }}
      />

      <div className="container">
        
        {/* Header Text */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
          <div 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              backgroundColor: 'rgba(200, 122, 144, 0.08)',
              border: '1px solid rgba(200, 122, 144, 0.2)',
              color: 'var(--color-primary)',
              fontSize: '0.8rem',
              fontWeight: 600,
              padding: '0.35rem 1rem',
              borderRadius: '50px',
              fontFamily: 'var(--font-display)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
          >
            <Sparkles size={12} />
            <span>Atelier Workshop</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 800 }}>
            Celebration <span className="text-gradient-primary">Planner Suite</span>
          </h2>
          <p style={{ maxWidth: '600px', color: 'var(--text-muted)', fontSize: '1.02rem' }}>
            Bring your birthday ideas to life. Use our interactive canvas, theme explorers, zodiac charts, checklists, and generative AI tools.
          </p>
        </div>

        {/* Dashboard Shell */}
        <div className="glass-card planner-dashboard-shell" style={{ padding: '0', borderRadius: '24px', display: 'flex', flexDirection: 'column', border: '1px solid rgba(255, 255, 255, 0.08)', boxShadow: '0 30px 60px rgba(0,0,0,0.5)', overflow: 'hidden' }}>
          
          {/* Curation Atelier Top Navigation */}
          <div className="planner-sidebar" style={{ width: '100%', background: 'rgba(20, 16, 18, 0.3)', borderBottom: '1px solid rgba(222, 195, 157, 0.08)', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: '1.25rem', gap: '1rem', flexWrap: 'wrap' }}>
            <button 
              onClick={() => setActiveTab('invitation')} 
              className={`atelier-tab-btn ${activeTab === 'invitation' ? 'active' : ''}`}
            >
              <span>Invitation Atelier</span>
            </button>
            
            <button 
              onClick={() => setActiveTab('theme')} 
              className={`atelier-tab-btn ${activeTab === 'theme' ? 'active' : ''}`}
            >
              <span>Theme Curator</span>
            </button>
            
            <button 
              onClick={() => setActiveTab('zodiac')} 
              className={`atelier-tab-btn ${activeTab === 'zodiac' ? 'active' : ''}`}
            >
              <span>Celestial Inspiration</span>
            </button>
            
            <button 
              onClick={() => setActiveTab('planner')} 
              className={`atelier-tab-btn ${activeTab === 'planner' ? 'active' : ''}`}
            >
              <span>Celebration Planner</span>
            </button>
            
            <button 
              onClick={() => setActiveTab('ai')} 
              className={`atelier-tab-btn ${activeTab === 'ai' ? 'active' : ''}`}
            >
              <span>Party Magic</span>
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
                            border: invTheme.id === theme.id ? '1px solid var(--color-primary)' : '1px solid rgba(255,255,255,0.08)',
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

                  {/* Cursive Natural Language Fill-in-the-Blanks */}
                  <div 
                    style={{ 
                      padding: '2rem 1.5rem', 
                      borderRadius: '16px', 
                      background: 'rgba(222, 195, 157, 0.02)', 
                      border: '1px solid rgba(222, 195, 157, 0.12)', 
                      lineHeight: '2.5', 
                      fontFamily: 'var(--font-serif)', 
                      fontSize: '1.25rem', 
                      color: '#f3e8ee',
                      textAlign: 'left',
                      boxShadow: 'inset 0 0 20px rgba(222,195,157,0.02)',
                    }}
                    className="cursive-letterpress-editor"
                  >
                    <span>You are cordially invited to celebrate the birthday of </span>
                    <input 
                      type="text" 
                      placeholder="STAR'S NAME" 
                      value={invName} 
                      onChange={(e) => setInvName(e.target.value.toUpperCase())} 
                      maxLength={20} 
                      style={{
                        background: 'transparent',
                        border: 'none',
                        borderBottom: '1.5px solid rgba(222, 195, 157, 0.45)',
                        color: 'var(--color-primary)',
                        fontFamily: 'var(--font-display)',
                        fontWeight: 700,
                        fontSize: '1.2rem',
                        textAlign: 'center',
                        padding: '0 0.5rem',
                        width: '180px',
                        outline: 'none',
                      }}
                    />
                    <span> as they celebrate {isNaN(parseInt(invAge, 10)) ? 'this' : 'their'} </span>
                    <input 
                      type="text" 
                      placeholder="AGE" 
                      value={isAgeFocused ? invAge : ageLabel} 
                      onChange={(e) => {
                        const val = e.target.value;
                        const cleanVal = val.replace(/(st|nd|rd|th)$/i, '');
                        setInvAge(cleanVal);
                      }} 
                      onFocus={() => setIsAgeFocused(true)}
                      onBlur={() => setIsAgeFocused(false)}
                      maxLength={10} 
                      style={{
                        background: 'transparent',
                        border: 'none',
                        borderBottom: '1.5px solid rgba(222, 195, 157, 0.45)',
                        color: 'var(--color-primary)',
                        fontFamily: 'var(--font-display)',
                        fontWeight: 700,
                        fontSize: '1.2rem',
                        textAlign: 'center',
                        padding: '0 0.2rem',
                        width: '75px',
                        outline: 'none',
                      }}
                    />
                    <span> birthday. Let's gather under a vibe of </span>
                    <input 
                      type="text" 
                      placeholder="Midnight Stars & Golden Bubbles" 
                      value={invVibe} 
                      onChange={(e) => setInvVibe(e.target.value)} 
                      maxLength={50} 
                      style={{
                        background: 'transparent',
                        border: 'none',
                        borderBottom: '1.5px solid rgba(222, 195, 157, 0.45)',
                        color: 'var(--color-primary)',
                        fontFamily: 'var(--font-display)',
                        fontWeight: 700,
                        fontSize: '1.2rem',
                        textAlign: 'center',
                        padding: '0 0.5rem',
                        width: '280px',
                        outline: 'none',
                      }}
                    />
                    <span>. We shall assemble at </span>
                    <input 
                      type="text" 
                      placeholder="THE OBSIDIAN LOUNGE, NYC" 
                      value={invVenue} 
                      onChange={(e) => setInvVenue(e.target.value)} 
                      style={{
                        background: 'transparent',
                        border: 'none',
                        borderBottom: '1.5px solid rgba(222, 195, 157, 0.45)',
                        color: 'var(--color-primary)',
                        fontFamily: 'var(--font-display)',
                        fontWeight: 700,
                        fontSize: '1.2rem',
                        textAlign: 'center',
                        padding: '0 0.5rem',
                        width: '260px',
                        outline: 'none',
                      }}
                    />
                    <span> on </span>
                    <input 
                      type="text" 
                      placeholder="SATURDAY, OCT 12TH • 9:00 PM" 
                      value={invDate} 
                      onChange={(e) => setInvDate(e.target.value)} 
                      style={{
                        background: 'transparent',
                        border: 'none',
                        borderBottom: '1.5px solid rgba(222, 195, 157, 0.45)',
                        color: 'var(--color-primary)',
                        fontFamily: 'var(--font-display)',
                        fontWeight: 700,
                        fontSize: '1.2rem',
                        textAlign: 'center',
                        padding: '0 0.5rem',
                        width: '280px',
                        outline: 'none',
                      }}
                    />
                    <span> to raise our glasses.</span>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                    <button onClick={handleDownloadPNG} className="btn btn-primary" style={{ padding: '0.7rem 1.5rem', fontSize: '0.88rem' }}>
                      {inviteSaved ? <CheckCircle2 size={16} /> : <Download size={16} />}
                      <span>{inviteSaved ? 'Saved & Downloaded!' : 'Save & Download'}</span>
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
                          {invAge && !isNaN(parseInt(invAge, 10)) && (
                            <span style={{ fontSize: '1.5rem', verticalAlign: 'super', fontWeight: 700 }}>
                              {getOrdinalSuffix(invAge)}
                            </span>
                          )}
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
                        background: selectedVibe.id === vibe.id ? 'rgba(200, 122, 144, 0.12)' : 'rgba(255,255,255,0.02)',
                        border: selectedVibe.id === vibe.id ? '1px solid rgba(200, 122, 144, 0.4)' : '1px solid rgba(255,255,255,0.08)',
                        color: selectedVibe.id === vibe.id ? 'var(--color-primary)' : '#94a3b8',
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
                        <p style={{ fontSize: '0.75rem', color: '#dec39d', fontWeight: 600, marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
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
                            <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--color-primary)' }} />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="glass-card" style={{ padding: '1.25rem', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <h5 style={{ fontSize: '0.9rem', color: '#e2e8f0', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.5rem', marginBottom: '0.75rem', fontWeight: 600 }}>Music & Soundscapes</h5>
                      <p style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: '1.5' }}>{selectedVibe.music}</p>
                      <div style={{ marginTop: '1rem', display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.7rem', color: 'var(--color-primary)', background: 'rgba(200, 122, 144, 0.1)', padding: '0.2rem 0.6rem', borderRadius: '4px', fontWeight: 600 }}>
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
                  
                  {/* Date Input & Constellation Selector */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    
                    <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#dec39d', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--font-display)', display: 'block' }}>
                      Explore Golden Constellations
                    </span>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem' }} className="constellation-wheel">
                      {ZODIAC_PRESETS.map((preset) => (
                        <button
                          key={preset.sign}
                          onClick={() => handleZodiacSelect(preset)}
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '0.75rem 0.4rem',
                            borderRadius: '12px',
                            background: zodiacResult?.sign === preset.sign ? 'rgba(200, 122, 144, 0.12)' : 'rgba(255,255,255,0.02)',
                            border: zodiacResult?.sign === preset.sign ? '1px solid var(--color-primary)' : '1px solid rgba(222, 195, 157, 0.12)',
                            cursor: 'pointer',
                            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                            boxShadow: zodiacResult?.sign === preset.sign ? '0 0 15px rgba(200, 122, 144, 0.2)' : 'none',
                          }}
                          className="constellation-button"
                        >
                          <span style={{ fontSize: '1.4rem', color: zodiacResult?.sign === preset.sign ? 'var(--color-primary)' : '#f3e8ee' }}>{preset.icon}</span>
                          <span style={{ fontSize: '0.68rem', fontWeight: 600, color: zodiacResult?.sign === preset.sign ? 'var(--color-primary)' : '#94a3b8', marginTop: '0.15rem' }}>{preset.sign}</span>
                          <span style={{ fontSize: '0.52rem', color: '#64748b' }}>{preset.range.split(' - ')[0]}</span>
                        </button>
                      ))}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', margin: '0.25rem 0' }}>
                      <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.06)' }} />
                      <span style={{ fontSize: '0.65rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Or Align by Calendar Date</span>
                      <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.06)' }} />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxWidth: '300px' }}>
                      <input 
                        type="date" 
                        className="glass-input" 
                        value={birthdate} 
                        onChange={handleDateChange} 
                        style={{ colorScheme: 'dark', fontSize: '0.85rem' }} 
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
                          border: '1px solid rgba(200, 122, 144, 0.2)',
                          boxShadow: '0 10px 30px rgba(200, 122, 144, 0.05)'
                        }}
                      >
                        <div style={{ position: 'absolute', top: 0, right: 0, width: '120px', height: '120px', background: 'radial-gradient(circle, rgba(222, 195, 157, 0.08) 0%, transparent 70%)', filter: 'blur(10px)' }} />
                        <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span style={{ color: '#dec39d' }}>Celestial Theme Proposal:</span>
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
                        boxShadow: '0 0 10px rgba(200, 122, 144, 0.4)'
                      }}
                    />
                  </div>
                </div>

                {/* Form to Add Checklist Item */}
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleAddTask();
                  }} 
                  style={{ display: 'flex', gap: '0.6rem' }}
                >
                  <input
                    type="text"
                    placeholder="Describe a bespoke detail to register..."
                    className="glass-input"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    style={{ 
                      flex: 1, 
                      background: 'transparent', 
                      border: 'none', 
                      borderBottom: '1.5px solid rgba(222, 195, 157, 0.4)',
                      borderRadius: '0',
                      fontFamily: 'var(--font-serif)',
                      fontStyle: 'italic',
                      fontSize: '1.05rem',
                      padding: '0.6rem 0'
                    }}
                  />
                  <button type="submit" className="btn btn-secondary" style={{ padding: '0 1.5rem', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span>Register Task</span>
                    <Plus size={16} />
                  </button>
                </form>

                {/* Checklist list styled as Master Registry Ledger */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '280px', overflowY: 'auto', paddingRight: '0.2rem' }}>
                  {checklist.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.85rem 1.25rem',
                        background: item.completed ? 'rgba(255,255,255,0.01)' : 'rgba(222, 195, 157, 0.02)',
                        border: '1px solid rgba(222, 195, 157, 0.08)',
                        borderLeft: item.completed ? '3px solid var(--color-primary)' : '3px solid rgba(222, 195, 157, 0.35)',
                        borderRadius: '8px',
                        transition: 'all 0.3s ease'
                      }}
                      className="checklist-item-row"
                    >
                      <div 
                        onClick={() => toggleCheck(item.id)}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', cursor: 'pointer', flex: 1 }}
                      >
                        <div 
                          style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            border: '1.5px solid #dec39d',
                            backgroundColor: item.completed ? 'rgba(200, 122, 144, 0.12)' : 'transparent',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.25s',
                            boxShadow: item.completed ? '0 0 8px rgba(222, 195, 157, 0.3)' : 'none'
                          }}
                        >
                          {item.completed && <span style={{ fontSize: '11px', color: '#dec39d', fontWeight: 'bold' }}>✔</span>}
                        </div>
                        <span 
                          style={{
                            fontSize: '0.95rem',
                            fontFamily: 'var(--font-serif)',
                            fontStyle: item.completed ? 'normal' : 'italic',
                            color: item.completed ? '#64748b' : '#f3e8ee',
                            textDecoration: item.completed ? 'line-through' : 'none',
                            transition: 'color 0.25s'
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
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Describe your honoree profile to generate a customized, luxury celebration plan directly from the DreamParty AI engine.</p>
                </div>

                {/* Predefined Atmosphere presets */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#dec39d', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'var(--font-display)' }}>One-Click Dream Atmospheres</span>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }} className="atmosphere-grid">
                    {AI_PRESET_CARDS.map((card) => (
                      <button
                        key={card.title}
                        onClick={() => handleAIPresetClick(card)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          padding: '1rem',
                          borderRadius: '16px',
                          background: card.bg,
                          border: '1.5px solid rgba(222, 195, 157, 0.12)',
                          boxShadow: `0 8px 25px ${card.glow}`,
                          cursor: 'pointer',
                          textAlign: 'left',
                          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                        }}
                        className="atmosphere-card"
                      >
                        <span style={{ fontSize: '1.8rem' }}>{card.emoji}</span>
                        <div>
                          <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#fff', marginBottom: '0.15rem' }}>{card.title}</h4>
                          <span style={{ fontSize: '0.7rem', color: '#dec39d' }}>Tap to Pre-fill</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Form fields */}
                <form onSubmit={handleAIGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }} className="bespoke-form-grid">
                    
                    {/* Name */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#94a3b8' }}>Honoree Name</label>
                      <input 
                        type="text" 
                        className="glass-input" 
                        value={aiName} 
                        onChange={(e) => setAiName(e.target.value)} 
                        placeholder="e.g. Maja" 
                        required
                      />
                    </div>

                    {/* Age */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#94a3b8' }}>Age</label>
                      <input 
                        type="number" 
                        className="glass-input" 
                        value={aiAge} 
                        onChange={(e) => setAiAge(e.target.value)} 
                        placeholder="e.g. 30" 
                        min="0"
                        required
                      />
                    </div>

                    {/* Celebration Date */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#94a3b8' }}>Celebration Date</label>
                      <input 
                        type="date" 
                        className="glass-input" 
                        value={aiBirthdate} 
                        onChange={(e) => setAiBirthdate(e.target.value)} 
                        style={{ colorScheme: 'dark' }}
                        required
                      />
                    </div>

                    {/* Zodiac Sign */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#94a3b8' }}>Zodiac Sign</label>
                      <input 
                        type="text" 
                        className="glass-input" 
                        value={aiZodiac} 
                        onChange={(e) => setAiZodiac(e.target.value)} 
                        placeholder="e.g. Gemini" 
                        required
                      />
                    </div>

                    {/* Party Style */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#94a3b8' }}>Party Style</label>
                      <input 
                        type="text" 
                        className="glass-input" 
                        value={aiStyle} 
                        onChange={(e) => setAiStyle(e.target.value)} 
                        placeholder="e.g. Luxury Rose Gold" 
                        required
                      />
                    </div>

                    {/* City */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#94a3b8' }}>Location (City)</label>
                      <input 
                        type="text" 
                        className="glass-input" 
                        value={aiCity} 
                        onChange={(e) => setAiCity(e.target.value)} 
                        placeholder="e.g. Stockholm" 
                        required
                      />
                    </div>

                    {/* Budget */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#94a3b8' }}>Budget</label>
                      <input 
                        type="text" 
                        className="glass-input" 
                        value={aiBudget} 
                        onChange={(e) => setAiBudget(e.target.value)} 
                        placeholder="e.g. 5000 SEK" 
                        required
                      />
                    </div>

                    {/* Guest Count */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#94a3b8' }}>Guest Count</label>
                      <input 
                        type="number" 
                        className="glass-input" 
                        value={aiGuestCount} 
                        onChange={(e) => setAiGuestCount(e.target.value)} 
                        placeholder="e.g. 20" 
                        min="1"
                        required
                      />
                    </div>

                    {/* Interests */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', gridColumn: '1 / -1' }} className="col-span-full">
                      <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#94a3b8' }}>Interests & Hobbies (Comma separated)</label>
                      <input 
                        type="text" 
                        className="glass-input" 
                        value={aiInterests} 
                        onChange={(e) => setAiInterests(e.target.value)} 
                        placeholder="e.g. champagne, flowers, jazz, fine dining" 
                        required
                      />
                    </div>

                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                    <button
                      type="submit"
                      disabled={aiLoading}
                      className="btn btn-primary"
                      style={{ padding: '0.75rem 2rem', fontSize: '0.9rem', gap: '0.5rem', display: 'flex', alignItems: 'center' }}
                    >
                      {aiLoading ? (
                        <>
                          <RefreshCw className="animate-spin" size={16} />
                          <span>Generating Plan...</span>
                        </>
                      ) : (
                        <>
                          <Wand2 size={16} />
                          <span>Generate Celebration Plan</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>

                {/* Error Banner */}
                {apiError && (
                  <div 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '1rem 1.25rem',
                      background: 'rgba(239, 68, 68, 0.08)',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      borderRadius: '12px',
                      color: '#f87171',
                      fontSize: '0.9rem',
                    }}
                  >
                    <AlertTriangle size={18} style={{ flexShrink: 0 }} />
                    <span>{apiError}</span>
                  </div>
                )}

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
                      className="glass-card animate-fade-in ai-output-container" 
                      style={{
                        border: '1px solid rgba(222, 195, 157, 0.25)',
                        backgroundColor: 'rgba(22, 16, 18, 0.45)',
                        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.65)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2rem'
                      }}
                    >
                      {/* Header */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(222, 195, 157, 0.15)', paddingBottom: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                          <Wand2 size={20} color="var(--color-primary)" />
                          <h4 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--color-secondary)', fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>
                            {aiOutput.celebration_title}
                          </h4>
                        </div>
                        <span style={{ fontSize: '0.72rem', color: '#dec39d', backgroundColor: 'rgba(222, 195, 157, 0.12)', border: '1px solid rgba(222, 195, 157, 0.25)', padding: '0.25rem 0.75rem', borderRadius: '4px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          Bespoke Plan Ready
                        </span>
                      </div>

                      {/* Content Grid */}
                      <div className="ai-results-grid">
                        
                        {/* Left column: Theme details, swatches, summary */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', minWidth: 0 }} className="ai-results-col">
                          
                          {/* Theme Idea */}
                          <div>
                            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.35rem' }}>The Concept</span>
                            <p style={{ fontSize: '0.92rem', color: '#e2e8f0', lineHeight: '1.6' }}>{aiOutput.theme_idea}</p>
                          </div>

                          {/* Color Palette Chips */}
                          <div>
                            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.6rem' }}>Aesthetic Color Palette</span>
                            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                              {aiOutput.color_palette.map((colorName, idx) => {
                                const map: Record<string, string> = {
                                  'blush rose': '#e5b3c0',
                                  'champagne gold': '#dec39d',
                                  'soft dusty pink': '#d4a3b0',
                                  'warm sand': '#e5ddcf',
                                  'sage green': '#8fbc8f',
                                  'rose gold': '#b76e79',
                                  'warm champagne': '#f0e6d2',
                                  'soft peach': '#ffdab9',
                                  'ivory': '#fffff0',
                                  'dusty pink': '#d4a3b0',
                                };
                                const colorHex = map[colorName.toLowerCase().trim()] || '#dec39d';
                                return (
                                  <div 
                                    key={idx} 
                                    style={{ 
                                      display: 'flex', 
                                      alignItems: 'center', 
                                      gap: '0.4rem', 
                                      backgroundColor: 'rgba(255,255,255,0.03)', 
                                      border: '1px solid rgba(255,255,255,0.08)',
                                      padding: '0.3rem 0.7rem', 
                                      borderRadius: '30px',
                                      fontSize: '0.78rem',
                                      color: '#f8f9fa'
                                    }}
                                  >
                                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: colorHex, display: 'inline-block' }} />
                                    <span>{colorName}</span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          {/* AI Summary */}
                          <div style={{ backgroundColor: 'rgba(222, 195, 157, 0.02)', border: '1px solid rgba(222, 195, 157, 0.12)', padding: '1.25rem', borderRadius: '14px' }}>
                            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.35rem' }}>AI Curation Summary</span>
                            <p style={{ fontSize: '0.88rem', color: '#cbd5e1', lineHeight: '1.5', margin: 0 }}>{aiOutput.ai_summary}</p>
                          </div>

                        </div>

                        {/* Right column: Invitation, decor, food, music, timeline */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', minWidth: 0 }} className="ai-results-col">
                          
                          {/* Invitation Card */}
                          <div 
                            className="invitation-text-card"
                            style={{ 
                              backgroundColor: 'rgba(255,255,255,0.02)', 
                              border: '1px solid rgba(255,255,255,0.05)', 
                              padding: '1.25rem', 
                              borderRadius: '14px', 
                              position: 'relative',
                              minWidth: 0
                            }}
                          >
                            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.5rem' }}>Elegant Invitation Text</span>
                            <p style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: '1.6', margin: 0, fontStyle: 'italic', paddingRight: '2rem', overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                              "{aiOutput.invitation_text}"
                            </p>
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(aiOutput.invitation_text);
                                alert('Invitation text copied to clipboard!');
                              }}
                              style={{
                                position: 'absolute',
                                top: '1.25rem',
                                right: '1.25rem',
                                background: 'none',
                                border: 'none',
                                color: '#dec39d',
                                cursor: 'pointer',
                                opacity: 0.7,
                                transition: 'opacity 0.2s'
                              }}
                              onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                              onMouseLeave={(e) => e.currentTarget.style.opacity = '0.7'}
                              title="Copy to Clipboard"
                            >
                              <Copy size={16} />
                            </button>
                          </div>

                          {/* Decor & Catering split */}
                          <div className="split-details-grid">
                            
                            <div style={{ backgroundColor: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.05)', padding: '1.15rem', borderRadius: '12px', minWidth: 0 }}>
                              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.5rem' }}>Decor Plan</span>
                              <ul style={{ listStyleType: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem', paddingLeft: 0, margin: 0 }}>
                                {aiOutput.decoration_ideas.map((idea, i) => (
                                  <li key={i} style={{ fontSize: '0.82rem', color: '#cbd5e1', display: 'flex', alignItems: 'flex-start', gap: '0.4rem' }}>
                                    <span style={{ color: 'var(--color-primary)', fontSize: '0.6rem', marginTop: '0.2rem' }}>✦</span>
                                    <span>{idea}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div style={{ backgroundColor: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.05)', padding: '1.15rem', borderRadius: '12px', minWidth: 0 }}>
                              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.5rem' }}>Catering Menu</span>
                              <ul style={{ listStyleType: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem', paddingLeft: 0, margin: 0 }}>
                                {aiOutput.food_and_drink_ideas.map((item, i) => (
                                  <li key={i} style={{ fontSize: '0.82rem', color: '#cbd5e1', display: 'flex', alignItems: 'flex-start', gap: '0.4rem' }}>
                                    <span style={{ color: '#dec39d', fontSize: '0.68rem' }}>🥂</span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                          </div>

                          {/* Music & Personal Touch */}
                          <div className="split-details-grid">
                            
                            <div style={{ backgroundColor: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.05)', padding: '1.15rem', borderRadius: '12px', minWidth: 0 }}>
                              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.35rem' }}>Music Vibe</span>
                              <p style={{ fontSize: '0.82rem', color: '#cbd5e1', margin: 0, lineHeight: '1.4' }}>{aiOutput.music_vibe}</p>
                            </div>

                            <div style={{ backgroundColor: 'rgba(222, 195, 157, 0.01)', border: '1px dashed rgba(222, 195, 157, 0.25)', padding: '1.15rem', borderRadius: '12px', minWidth: 0 }}>
                              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.35rem' }}>Signature Highlight</span>
                              <p style={{ fontSize: '0.82rem', color: '#cbd5e1', margin: 0, lineHeight: '1.4' }}>{aiOutput.personal_touch}</p>
                            </div>

                          </div>

                          {/* Timeline Schedule */}
                          <div className="soiree-timeline-card" style={{ backgroundColor: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.05)', padding: '1.25rem', borderRadius: '14px' }}>
                            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.75rem' }}>Soirée Timeline</span>
                            <div className="soiree-timeline-list" style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                              {aiOutput.party_schedule.map((slot, i) => {
                                const match = slot.match(/^((?:\d{1,2}:\d{2}(?:\s?[APap][Mm])?\s*-\s*)?\d{1,2}:\d{2}(?:\s?[APap][Mm])?)(?:\s*[:-]\s*)(.*)$/);
                                const parts = match ? [match[1], match[2]] : ['', slot];
                                return (
                                  <div key={i} className="soiree-timeline-item" style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                                    {parts[0] && (
                                      <div className="soiree-timeline-time" style={{ minWidth: '60px', fontWeight: 700, color: 'var(--color-primary)', fontSize: '0.82rem' }}>
                                        {parts[0]}
                                      </div>
                                    )}
                                    <div className="soiree-timeline-detail" style={{ fontSize: '0.82rem', color: '#cbd5e1', flex: 1 }}>
                                      {parts[1]}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                        </div>

                      </div>

                      {/* Action buttons */}
                      <div style={{ display: 'flex', gap: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '1.25rem' }}>
                        <button
                          onClick={() => {
                            setInvName(aiName.toUpperCase());
                            setInvAge(String(aiAge));
                            setInvVibe(`${aiOutput.celebration_title}`);
                            setInvVenue(`${aiCity} Atelier`);
                            setInvDate(aiBirthdate);
                            setActiveTab('invitation');
                          }}
                          className="btn btn-secondary"
                          style={{ padding: '0.6rem 1.5rem', fontSize: '0.85rem', borderRadius: '8px' }}
                        >
                          Send to Invitation Atelier
                        </button>
                      </div>

                    </div>
                  )}

                  {!aiLoading && !aiOutput && (
                    <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', border: '1px dashed rgba(255,255,255,0.08)', borderRadius: '16px', padding: '3.5rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                      Submit your celebration requirements above to curate your premium birthday plan.
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

      <style>{`
        /* Atelier Top Navigation Bar Styles */
        .atelier-tab-btn {
          background: none;
          border: none;
          color: #b5a2ab;
          font-family: var(--font-serif);
          font-weight: 500;
          font-size: 1.15rem;
          letter-spacing: 0.03em;
          cursor: pointer;
          padding: 0.6rem 1.2rem;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
        }
        .atelier-tab-btn:hover {
          color: #fcfafb;
          transform: translateY(-1px);
        }
        .atelier-tab-btn::after {
          content: '';
          position: absolute;
          width: 0;
          height: 1.5px;
          bottom: -2px;
          left: 50%;
          background-color: var(--color-secondary);
          transition: all 0.3s ease;
        }
        .atelier-tab-btn.active {
          color: var(--color-secondary);
          font-weight: 600;
        }
        .atelier-tab-btn.active::after {
          width: 60%;
          left: 20%;
        }

        /* Color Bubble Hover */
        .color-bubble:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.5);
        }
        .color-bubble:hover .copy-icon {
          opacity: 1 !important;
        }

        /* Constellation Button Hover */
        .constellation-button {
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .constellation-button:hover {
          transform: translateY(-2px);
          border-color: var(--color-primary) !important;
          box-shadow: 0 8px 20px rgba(200, 122, 144, 0.2) !important;
        }

        /* AI Dream Atmosphere Card Hover */
        .atmosphere-card {
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .atmosphere-card:hover {
          transform: translateY(-3px) scale(1.02);
          border-color: var(--color-primary) !important;
          box-shadow: 0 12px 30px rgba(200, 122, 144, 0.25) !important;
        }

        /* Checklist Row hover to show delete button */
        .checklist-item-row:hover .delete-item-btn {
          opacity: 1 !important;
        }

        /* Responsive Breakpoints for Dashboard */
        @media (max-width: 991px) {
          .planner-sidebar {
            padding: 1rem !important;
            gap: 0.5rem !important;
          }
          .atelier-tab-btn {
            padding: 0.4rem 0.8rem !important;
            font-size: 0.95rem !important;
          }
          .planner-main-panel {
            padding: 1.5rem !important;
          }
        }

        .ai-output-container {
          padding: 2rem;
        }
        .ai-results-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }
        .split-details-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
        }

        /* Soirée Timeline Styles */
        .soiree-timeline-card {
          min-width: 0 !important;
          width: 100% !important;
          overflow: hidden !important;
        }
        .soiree-timeline-list {
          width: 100% !important;
          min-width: 0 !important;
        }
        .soiree-timeline-item {
          display: flex !important;
          gap: 0.75rem !important;
          align-items: flex-start !important;
          width: 100% !important;
          min-width: 0 !important;
        }
        .soiree-timeline-time {
          min-width: 70px !important;
          flex-shrink: 0 !important;
          font-weight: 700 !important;
          color: var(--color-primary) !important;
          font-size: 0.82rem !important;
          overflow-wrap: break-word !important;
          white-space: normal !important;
        }
        .soiree-timeline-detail {
          font-size: 0.82rem !important;
          color: #cbd5e1 !important;
          flex: 1 1 0% !important;
          min-width: 0 !important;
          overflow-wrap: break-word !important;
          word-break: break-word !important;
          white-space: normal !important;
        }

        /* Responsive timeline stacking for tablet & mobile */
        @media (max-width: 900px) {
          .soiree-timeline-item {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 0.25rem !important;
          }
          .soiree-timeline-time {
            min-width: 0 !important;
            width: 100% !important;
          }
          .soiree-timeline-detail {
            width: 100% !important;
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
          .atmosphere-grid {
            grid-template-columns: 1fr !important;
          }
          .constellation-wheel {
            grid-template-columns: repeat(3, 1fr) !important;
          }
          .ai-results-grid {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
          .split-details-grid {
            grid-template-columns: 1fr !important;
          }
          .ai-output-container {
            padding: 1.25rem !important;
            gap: 1.5rem !important;
          }
        }
        @media (max-width: 480px) {
          .constellation-wheel {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .planner-main-panel {
            padding: 0.75rem !important;
          }
          .ai-output-container {
            padding: 0.85rem !important;
            gap: 1.25rem !important;
          }
          .split-details-grid {
            gap: 0.85rem !important;
          }
        }
      `}</style>
    </section>
  );
}
