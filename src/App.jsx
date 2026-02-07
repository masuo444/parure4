import React, { useState, useEffect, useRef } from 'react';
import {
  Menu, X, ArrowRight, Mail, Star, Globe, ChevronRight,
  ChevronDown, Diamond, Sparkles, Award, Package, Clock,
  MapPin, Phone, Instagram, Send
} from 'lucide-react';
import './App.css';

/* ═══════════════════════════════════════════════════════════════════════════
   FOMUS PARURE - Ultra-Luxury Multi-page Website
   Theme: Architectural Minimalism meets Japanese Craftsmanship
   Inspired by: Van Cleef & Arpels, Hermès, Japanese Zen Aesthetics
   ═══════════════════════════════════════════════════════════════════════════ */

// ─────────────────────────────────────────────────────────────────────────────
// HOOKS
// ─────────────────────────────────────────────────────────────────────────────

const useInView = (options = {}) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        if (!options.triggerOnce === false) {
          observer.unobserve(entry.target);
        }
      } else if (options.triggerOnce === false) {
        setIsInView(false);
      }
    }, { threshold: options.threshold || 0.1, ...options });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [options.threshold, options.triggerOnce]);

  return [ref, isInView];
};

// ─────────────────────────────────────────────────────────────────────────────
// UI COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

const GoldDivider = ({ className = '' }) => (
  <div className={`w-24 h-px mx-auto bg-gradient-to-r from-transparent via-[#C9A86C] to-transparent ${className}`} />
);

const SectionLabel = ({ children, light = false }) => (
  <span className={`inline-block text-[10px] md:text-xs font-medium tracking-[0.3em] uppercase mb-6 ${light ? 'text-[#C9A86C]' : 'text-[#C9A86C]'}`}>
    {children}
  </span>
);

const AnimatedSection = ({ children, className = '', delay = 0 }) => {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${className}`}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0)' : 'translateY(40px)',
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  );
};

const LuxuryButton = ({ children, onClick, variant = 'primary', className = '' }) => {
  const baseStyles = 'relative overflow-hidden px-10 py-4 text-xs tracking-[0.2em] uppercase transition-all duration-500 group';
  const variants = {
    primary: 'bg-[#1A1A1A] text-white hover:bg-[#C9A86C]',
    outline: 'border border-[#C9A86C]/30 text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white hover:border-[#1A1A1A]',
    outlineLight: 'border border-white/30 text-white hover:bg-white hover:text-[#1A1A1A]',
    gold: 'bg-[#C9A86C] text-white hover:bg-[#A68B5B]'
  };

  return (
    <button onClick={onClick} className={`${baseStyles} ${variants[variant]} ${className}`}>
      <span className="relative z-10 flex items-center justify-center gap-3">
        {children}
        <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </button>
  );
};

// 3D Cube Component for Product Display
const HinokiCube = ({ size = 120, className = '', variant = 'natural' }) => {
  const colors = {
    natural: { face: '#F5E6D3', shadow: '#E8D5C0', highlight: '#FAF1E6' },
    aged: { face: '#E8D5C0', shadow: '#C4A882', highlight: '#F5E6D3' },
    dark: { face: '#1A1A1A', shadow: '#0A0A0A', highlight: '#2A2A2A' }
  };
  const c = colors[variant];

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size, perspective: '600px' }}>
      <div className="absolute inset-0 animate-float" style={{ transformStyle: 'preserve-3d', transform: 'rotateX(-15deg) rotateY(25deg)' }}>
        {/* Top */}
        <div
          className="absolute"
          style={{
            width: size * 0.7,
            height: size * 0.4,
            background: `linear-gradient(135deg, ${c.highlight} 0%, ${c.face} 100%)`,
            transform: `translateZ(${size * 0.35}px) rotateX(90deg)`,
            transformOrigin: 'bottom',
            top: 0,
            left: size * 0.15,
            boxShadow: 'inset 0 0 30px rgba(255,255,255,0.3)'
          }}
        />
        {/* Front */}
        <div
          className="absolute flex items-center justify-center"
          style={{
            width: size * 0.7,
            height: size * 0.7,
            background: `linear-gradient(180deg, ${c.face} 0%, ${c.shadow} 100%)`,
            transform: `translateZ(${size * 0.35}px)`,
            top: size * 0.15,
            left: size * 0.15,
            boxShadow: 'inset 0 0 40px rgba(0,0,0,0.05), 0 20px 60px rgba(0,0,0,0.15)'
          }}
        >
          <span className="text-[#C9A86C]/30 text-2xl font-serif">枡</span>
        </div>
        {/* Right */}
        <div
          className="absolute"
          style={{
            width: size * 0.4,
            height: size * 0.7,
            background: `linear-gradient(90deg, ${c.shadow} 0%, ${c.face} 100%)`,
            transform: `translateX(${size * 0.35}px) rotateY(90deg)`,
            transformOrigin: 'left',
            top: size * 0.15,
            left: size * 0.5,
            boxShadow: 'inset 0 0 30px rgba(0,0,0,0.1)'
          }}
        />
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// NAVIGATION
// ─────────────────────────────────────────────────────────────────────────────

const Navigation = ({ activePage, navigate, isScrolled, isMenuOpen, setIsMenuOpen }) => {
  const isHome = activePage === 'home';
  const showDark = isScrolled || !isHome;

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-700 ease-out ${
        showDark
          ? 'bg-white/95 backdrop-blur-md py-4 shadow-[0_1px_0_0_rgba(0,0,0,0.05)]'
          : 'bg-transparent py-6 md:py-8'
      }`}>
        <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className={`lg:hidden transition-colors duration-300 ${showDark ? 'text-[#1A1A1A]' : 'text-white'}`}
            aria-label="Open menu"
          >
            <Menu size={22} strokeWidth={1} />
          </button>

          {/* Logo */}
          <div
            className="text-center flex-1 lg:flex-none cursor-pointer group"
            onClick={() => navigate('home')}
          >
            <div className="relative inline-block">
              <h1 className={`font-serif tracking-[0.25em] transition-all duration-500 ${
                showDark ? 'text-lg md:text-xl text-[#1A1A1A]' : 'text-xl md:text-2xl text-white'
              }`}>
                FOMUS PARURE
              </h1>
              <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-px bg-[#C9A86C] transition-all duration-500 group-hover:w-full`} />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className={`hidden lg:flex items-center gap-12 text-[11px] tracking-[0.2em] font-light ${
            showDark ? 'text-[#1A1A1A]' : 'text-white'
          }`}>
            {[
              { key: 'maison', label: 'MAISON' },
              { key: 'collection', label: 'COLLECTION' },
              { key: 'crafts', label: 'SAVOIR-FAIRE' },
              { key: 'bespoke', label: 'BESPOKE' }
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => navigate(key)}
                className={`relative py-2 transition-all duration-300 hover:opacity-60 ${
                  activePage === key ? 'opacity-100' : ''
                }`}
              >
                {label}
                <span className={`absolute bottom-0 left-0 w-full h-px bg-[#C9A86C] transform origin-left transition-transform duration-300 ${
                  activePage === key ? 'scale-x-100' : 'scale-x-0'
                }`} />
              </button>
            ))}
          </div>

          {/* Right Side */}
          <div className={`hidden lg:flex items-center gap-8 ${showDark ? 'text-[#1A1A1A]' : 'text-white'}`}>
            <button className="text-[11px] tracking-[0.2em] hover:opacity-60 transition-opacity duration-300">
              JP / EN
            </button>
            <button
              onClick={() => navigate('contact')}
              className="hover:opacity-60 transition-opacity duration-300"
              aria-label="Contact"
            >
              <Mail size={18} strokeWidth={1} />
            </button>
          </div>

          {/* Mobile Right */}
          <button
            onClick={() => navigate('contact')}
            className={`lg:hidden transition-colors duration-300 ${showDark ? 'text-[#1A1A1A]' : 'text-white'}`}
            aria-label="Contact"
          >
            <Mail size={20} strokeWidth={1} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-[#FAF9F7] z-[60] transform transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
      }`}>
        <div className="h-full flex flex-col">
          <div className="p-6 flex justify-between items-center">
            <span className="text-sm tracking-[0.3em] font-serif text-[#C9A86C]">MENU</span>
            <button onClick={() => setIsMenuOpen(false)} className="p-2">
              <X size={24} strokeWidth={1} />
            </button>
          </div>

          <nav className="flex-1 flex flex-col justify-center px-8 space-y-8">
            {[
              { key: 'home', label: 'HOME', jp: 'ホーム' },
              { key: 'maison', label: 'MAISON', jp: 'メゾン' },
              { key: 'collection', label: 'COLLECTION', jp: 'コレクション' },
              { key: 'crafts', label: 'SAVOIR-FAIRE', jp: '匠の技' },
              { key: 'bespoke', label: 'BESPOKE', jp: 'ビスポーク' },
              { key: 'contact', label: 'CONTACT', jp: 'お問い合わせ' }
            ].map(({ key, label, jp }, idx) => (
              <button
                key={key}
                onClick={() => { navigate(key); setIsMenuOpen(false); }}
                className="text-left group"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <span className="block text-2xl md:text-3xl tracking-[0.15em] font-serif text-[#1A1A1A] group-hover:text-[#C9A86C] transition-colors duration-300">
                  {label}
                </span>
                <span className="block text-xs tracking-[0.2em] text-gray-400 mt-1 jp-text">
                  {jp}
                </span>
              </button>
            ))}
          </nav>

          <div className="p-8 border-t border-gray-100">
            <p className="text-xs tracking-[0.2em] text-gray-400 text-center">
              KYOTO, JAPAN
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────────────────────────────────────

const Footer = ({ navigate }) => (
  <footer className="bg-[#0A0A0A] text-white relative overflow-hidden">
    {/* Decorative Line */}
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A86C]/30 to-transparent" />

    <div className="container mx-auto px-6 lg:px-12 py-20 lg:py-32">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
        {/* Brand Column */}
        <div className="lg:col-span-4">
          <h2
            className="text-2xl font-serif tracking-[0.25em] mb-6 cursor-pointer hover:text-[#C9A86C] transition-colors duration-300"
            onClick={() => navigate('home')}
          >
            FOMUS PARURE
          </h2>
          <p className="text-sm text-gray-500 leading-relaxed mb-8 max-w-xs">
            The Micro-Architecture of Japanese Craftsmanship.<br />
            14mm of Timeless Elegance.
          </p>
          <div className="flex gap-6 text-gray-500">
            <a href="#" className="hover:text-[#C9A86C] transition-colors duration-300">
              <Instagram size={18} strokeWidth={1} />
            </a>
            <a href="#" className="hover:text-[#C9A86C] transition-colors duration-300">
              <Globe size={18} strokeWidth={1} />
            </a>
            <a href="#" className="hover:text-[#C9A86C] transition-colors duration-300">
              <Mail size={18} strokeWidth={1} />
            </a>
          </div>
        </div>

        {/* Links */}
        <div className="lg:col-span-2">
          <h4 className="text-[10px] tracking-[0.3em] text-[#C9A86C] mb-8 uppercase">Discover</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li>
              <button onClick={() => navigate('maison')} className="hover:text-white transition-colors duration-300">
                Philosophy
              </button>
            </li>
            <li>
              <button onClick={() => navigate('collection')} className="hover:text-white transition-colors duration-300">
                Collection
              </button>
            </li>
            <li>
              <button onClick={() => navigate('crafts')} className="hover:text-white transition-colors duration-300">
                Savoir-Faire
              </button>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h4 className="text-[10px] tracking-[0.3em] text-[#C9A86C] mb-8 uppercase">Services</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li>
              <button onClick={() => navigate('bespoke')} className="hover:text-white transition-colors duration-300">
                Bespoke
              </button>
            </li>
            <li>
              <button onClick={() => navigate('contact')} className="hover:text-white transition-colors duration-300">
                Contact
              </button>
            </li>
            <li>
              <span className="text-gray-600">Shipping & Returns</span>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-4">
          <h4 className="text-[10px] tracking-[0.3em] text-[#C9A86C] mb-8 uppercase">Global Service</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li className="flex items-center gap-3">
              <Diamond size={14} className="text-[#C9A86C]" />
              <span>Worldwide Shipping via FedEx</span>
            </li>
            <li className="flex items-center gap-3">
              <Award size={14} className="text-[#C9A86C]" />
              <span>Certificate of Authenticity</span>
            </li>
            <li className="flex items-center gap-3">
              <Package size={14} className="text-[#C9A86C]" />
              <span>Luxury Gift Packaging</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600 tracking-wider">
        <p>&copy; {new Date().getFullYear()} FOMUS PARURE. All Rights Reserved.</p>
        <p className="flex items-center gap-2">
          <MapPin size={12} />
          Kyoto, Japan
        </p>
      </div>
    </div>
  </footer>
);

// ─────────────────────────────────────────────────────────────────────────────
// HOME PAGE
// ─────────────────────────────────────────────────────────────────────────────

const HomePage = ({ navigate }) => (
  <div className="animate-fade-in">
    {/* HERO SECTION */}
    <header className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-[#0A0A0A]">
      {/* Background Gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#0f0f0f] to-[#0A0A0A]" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#C9A86C]/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#C9A86C]/5 rounded-full blur-[80px]" />
        </div>
      </div>

      {/* Floating Cube */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20">
        <HinokiCube size={300} variant="natural" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto text-white">
        <p className="text-[10px] md:text-xs tracking-[0.4em] uppercase mb-10 text-[#C9A86C] opacity-0 animate-fade-in-up">
          The Micro-Architecture
        </p>

        <h2 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-wider mb-10 font-serif opacity-0 animate-fade-in-up delay-200 jp-text">
          静寂を、身に纏う。
        </h2>

        <p className="text-sm md:text-base tracking-[0.15em] font-light opacity-80 leading-relaxed mb-16 opacity-0 animate-fade-in-up delay-300">
          1300年の技術を、14mmの建築へ。<br className="hidden md:block" />
          Minimal Sanctuary.
        </p>

        <div className="opacity-0 animate-fade-in-up delay-400">
          <LuxuryButton onClick={() => navigate('collection')} variant="outlineLight">
            Discover Collection
          </LuxuryButton>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-white/50">
        <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent" />
      </div>
    </header>

    {/* PHILOSOPHY TEASER */}
    <section className="py-32 md:py-48 px-6 bg-[#FAF9F7] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      <div className="container mx-auto max-w-4xl text-center">
        <AnimatedSection>
          <SectionLabel>The Philosophy</SectionLabel>
          <h3 className="text-3xl md:text-5xl font-serif mb-12 text-[#1A1A1A] leading-tight jp-text">
            最小単位の「建築」。<br />
            世界最小の「聖域」。
          </h3>
          <GoldDivider className="mb-12" />
          <p className="text-sm md:text-base leading-loose text-gray-600 font-light tracking-wide mb-16 max-w-2xl mx-auto">
            FOMUS PARUREは、日本産ヒノキをわずか14mmの立方体に凝縮したアートピースです。
            過度な装飾を排し、素材そのものの美しさを追求した造形は、
            ジュエリーであると同時に、持ち主を守る静寂な空間でもあります。
          </p>
          <button
            onClick={() => navigate('maison')}
            className="inline-flex items-center gap-3 text-xs tracking-[0.2em] uppercase text-[#1A1A1A] hover:text-[#C9A86C] transition-colors duration-300 group"
          >
            Discover Our Story
            <ChevronRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </AnimatedSection>
      </div>
    </section>

    {/* SIGNATURE COLLECTION PREVIEW */}
    <section className="py-32 md:py-40 px-6 bg-white">
      <div className="container mx-auto">
        <AnimatedSection className="text-center mb-20">
          <SectionLabel>Signature Collection</SectionLabel>
          <h3 className="text-3xl md:text-5xl font-serif text-[#1A1A1A]">The Origin</h3>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {[
            {
              name: "Hinoki Necklace",
              type: "K18 Gold Chain",
              price: "¥68,000",
              desc: "胸元に、一滴の日本を。"
            },
            {
              name: "Hinoki Earrings",
              type: "Pair",
              price: "¥58,000",
              desc: "風に揺れる、木の宝石。"
            },
            {
              name: "Hinoki Kanzashi",
              type: "Hair / Scarf Pin",
              price: "¥78,000",
              desc: "結い上げる、伝統の精神。"
            }
          ].map((item, i) => (
            <AnimatedSection key={i} delay={i * 150}>
              <div className="group cursor-pointer">
                <div className="relative aspect-[4/5] bg-[#F5F4F2] mb-8 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5" />
                  <HinokiCube size={100} className="transform group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 border border-[#C9A86C]/0 group-hover:border-[#C9A86C]/20 transition-all duration-500" />
                </div>
                <div className="text-center">
                  <h4 className="text-lg font-serif tracking-wide mb-2 text-[#1A1A1A]">{item.name}</h4>
                  <p className="text-[10px] text-[#C9A86C] uppercase tracking-[0.2em] mb-3">{item.type}</p>
                  <p className="text-xs text-gray-500 mb-4 jp-text">{item.desc}</p>
                  <p className="text-sm font-medium tracking-wider text-[#1A1A1A]">{item.price}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={500} className="text-center mt-16">
          <LuxuryButton onClick={() => navigate('collection')} variant="outline">
            View Full Collection
          </LuxuryButton>
        </AnimatedSection>
      </div>
    </section>

    {/* MÉTIERS D'ART */}
    <section className="py-32 md:py-48 px-6 bg-[#0A0A0A] text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-gradient-radial from-[#1a237e]/30 to-transparent rounded-full blur-[100px] -translate-y-1/2" />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-gradient-radial from-[#b8860b]/20 to-transparent rounded-full blur-[80px] -translate-y-1/2" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          <AnimatedSection className="lg:w-1/2">
            <div className="relative">
              <div className="aspect-square bg-[#111] border border-white/5 flex items-center justify-center overflow-hidden">
                {/* Artistic Representation */}
                <div className="relative w-full h-full">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-48 h-48 border-[12px] border-[#F5E6D3] relative">
                      <div className="absolute inset-4 bg-gradient-to-br from-[#1a237e] to-[#0d1453] opacity-80" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Sparkles className="text-[#C9A86C] opacity-60" size={32} />
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-8 right-8 text-right">
                    <span className="text-6xl font-serif text-white/10">京七宝</span>
                  </div>
                </div>
              </div>
              {/* Decorative Frame */}
              <div className="absolute -inset-4 border border-[#C9A86C]/20 pointer-events-none" />
            </div>
          </AnimatedSection>

          <AnimatedSection className="lg:w-1/2" delay={200}>
            <SectionLabel light>Métiers d'Art</SectionLabel>
            <h3 className="text-3xl md:text-5xl font-serif mb-8 leading-tight">
              Hidden Treasures
            </h3>
            <p className="text-gray-400 font-light tracking-wide leading-loose mb-10 text-sm md:text-base">
              特別ラインでは、京都の歴史が育んだ「京七宝（Kyoto Cloisonné）」を、
              枡の底に封じ込めました。白木のミニマリズムと、京七宝の透明感ある色彩。
              二つの伝統工芸が、静寂の中で対話します。
            </p>
            <LuxuryButton onClick={() => navigate('collection')} variant="gold">
              Discover the Collection
            </LuxuryButton>
          </AnimatedSection>
        </div>
      </div>
    </section>

    {/* CRAFTSMANSHIP PREVIEW */}
    <section className="py-32 md:py-40 px-6 bg-[#FAF9F7]">
      <div className="container mx-auto max-w-6xl">
        <AnimatedSection className="text-center mb-20">
          <SectionLabel>Savoir-Faire</SectionLabel>
          <h3 className="text-3xl md:text-4xl font-serif text-[#1A1A1A]">The Art of Precision</h3>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:divide-x divide-gray-200">
          {[
            { num: "01", title: "Selection", sub: "素材の選定", icon: <Star size={20} /> },
            { num: "02", title: "Precision", sub: "精緻な組手", icon: <Diamond size={20} /> },
            { num: "03", title: "Finish", sub: "白木の美学", icon: <Sparkles size={20} /> }
          ].map((item, idx) => (
            <AnimatedSection key={idx} delay={idx * 150}>
              <div className="p-8 md:p-12 text-center group cursor-default">
                <div className="w-16 h-16 mx-auto mb-6 border border-[#C9A86C]/30 rounded-full flex items-center justify-center text-[#C9A86C] group-hover:bg-[#C9A86C] group-hover:text-white transition-all duration-500">
                  {item.icon}
                </div>
                <span className="block text-3xl font-serif text-gray-200 mb-4">{item.num}</span>
                <h4 className="text-lg font-serif mb-2 tracking-wider text-[#1A1A1A]">{item.title}</h4>
                <span className="text-xs text-[#C9A86C] uppercase tracking-[0.2em] jp-text">{item.sub}</span>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={500} className="text-center mt-12">
          <button
            onClick={() => navigate('crafts')}
            className="inline-flex items-center gap-3 text-xs tracking-[0.2em] uppercase text-[#1A1A1A] hover:text-[#C9A86C] transition-colors duration-300 group"
          >
            Explore Our Craft
            <ChevronRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </AnimatedSection>
      </div>
    </section>

    {/* BESPOKE CTA */}
    <section className="py-32 md:py-40 px-6 bg-[#1A1A1A] text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.05) 35px, rgba(255,255,255,.05) 70px)'
        }} />
      </div>

      <div className="container mx-auto max-w-3xl text-center relative z-10">
        <AnimatedSection>
          <SectionLabel light>Bespoke Service</SectionLabel>
          <h3 className="text-3xl md:text-5xl font-serif mb-8">
            For Your Special Story
          </h3>
          <GoldDivider className="mb-8" />
          <p className="text-gray-400 font-light tracking-wide leading-loose mb-12 text-sm md:text-base">
            大切な方への贈り物、あるいはご自身への誓いとして。
            京七宝の色、宝石のあしらい、木目の選定。
            専任のコンシェルジュが、あなただけのPARUREをお仕立てします。
          </p>
          <LuxuryButton onClick={() => navigate('bespoke')} variant="gold">
            Begin Your Journey
          </LuxuryButton>
        </AnimatedSection>
      </div>
    </section>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// MAISON PAGE
// ─────────────────────────────────────────────────────────────────────────────

const MaisonPage = () => (
  <div className="pt-24 md:pt-32 animate-fade-in bg-[#FAF9F7] min-h-screen">
    {/* Hero */}
    <div className="py-20 md:py-32 px-6 text-center">
      <SectionLabel>The Maison</SectionLabel>
      <h2 className="text-4xl md:text-6xl font-serif text-[#1A1A1A] mb-8">Philosophy</h2>
      <GoldDivider />
    </div>

    {/* Content Sections */}
    <div className="container mx-auto px-6 max-w-6xl pb-32">
      {/* Section 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-32 lg:mb-48">
        <AnimatedSection>
          <div className="relative">
            <div className="aspect-[4/5] bg-white shadow-luxury-lg flex items-center justify-center">
              <div className="text-center">
                <span className="text-8xl font-serif text-gray-100 block mb-4">檜</span>
                <span className="text-xs tracking-[0.3em] uppercase text-[#C9A86C]">Japanese Hinoki</span>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border border-[#C9A86C]/20" />
          </div>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <h3 className="text-2xl md:text-3xl font-serif text-[#1A1A1A] mb-8">14mmの静寂</h3>
          <div className="space-y-6 text-sm leading-loose text-gray-600 font-light tracking-wide">
            <p>
              古来より、日本では「神の木」として尊ばれてきた日本産ヒノキ。
              その清らかな芳香と、絹のような木肌は、決して金属や宝石では
              表現できない「温もり」を持っています。
            </p>
            <p>
              FOMUS PARUREは、この素材をわずか14mmの立方体に凝縮しました。
              それは最小単位の建築であり、あなたを守る聖域です。
            </p>
          </div>
        </AnimatedSection>
      </div>

      {/* Section 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-32 lg:mb-48">
        <AnimatedSection delay={200} className="order-2 lg:order-1">
          <h3 className="text-2xl md:text-3xl font-serif text-[#1A1A1A] mb-8">経年変化という美</h3>
          <div className="space-y-6 text-sm leading-loose text-gray-600 font-light tracking-wide">
            <p>
              白木の美しさは、完成した瞬間がピークではありません。
              身につけ、空気に触れ、時を重ねるごとに、
              色は深く艶やかな「飴色（Amber）」へと変化します。
            </p>
            <p>
              傷さえも歴史として刻まれる。
              それは、持ち主と共に生きた時間の証明（Patina）です。
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection className="order-1 lg:order-2">
          <div className="relative">
            <div className="aspect-[4/5] bg-white shadow-luxury-lg flex items-center justify-center">
              <div className="text-center">
                <span className="text-8xl font-serif text-gray-100 block mb-4">時</span>
                <span className="text-xs tracking-[0.3em] uppercase text-[#C9A86C]">Timeless Beauty</span>
              </div>
            </div>
            <div className="absolute -top-6 -left-6 w-32 h-32 border border-[#C9A86C]/20" />
          </div>
        </AnimatedSection>
      </div>

      {/* Quote */}
      <AnimatedSection>
        <div className="max-w-3xl mx-auto text-center py-16 border-t border-b border-gray-200">
          <blockquote className="text-2xl md:text-3xl font-serif text-[#1A1A1A] leading-relaxed mb-8 jp-text">
            「削ぎ落とすことで、本質が現れる。」
          </blockquote>
          <p className="text-xs tracking-[0.3em] text-[#C9A86C] uppercase">
            — The FOMUS Philosophy
          </p>
        </div>
      </AnimatedSection>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// COLLECTION PAGE
// ─────────────────────────────────────────────────────────────────────────────

const CollectionPage = ({ navigate }) => (
  <div className="pt-24 md:pt-32 animate-fade-in bg-white min-h-screen">
    {/* SIGNATURE COLLECTION */}
    <section className="py-20 md:py-32 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-20">
          <SectionLabel>Signature Collection</SectionLabel>
          <h3 className="text-4xl md:text-5xl font-serif text-[#1A1A1A] mb-4">The Origin</h3>
          <p className="mt-4 text-sm tracking-widest text-gray-500 jp-text">
            飾らない美学。白木の肌触りと、幾何学の調和。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 max-w-6xl mx-auto">
          {[
            {
              name: "Hinoki Necklace",
              type: "K18 Gold Chain",
              price: "¥68,000",
              desc: "胸元に、一滴の日本を。繊細な18金チェーンが、14mmのヒノキ枡を優雅に包み込みます。",
              details: ["Chain: K18 Gold", "Length: 45cm", "Cube: 14mm"]
            },
            {
              name: "Hinoki Earrings",
              type: "Pair / K18 Gold",
              price: "¥58,000",
              desc: "風に揺れる、木の宝石。軽やかなヒノキの立方体が、耳元で静かに踊ります。",
              details: ["Post: K18 Gold", "Cube: 12mm", "Weight: 1.2g each"]
            },
            {
              name: "Hinoki Kanzashi",
              type: "Hair / Scarf Pin",
              price: "¥78,000",
              desc: "結い上げる、伝統の精神。髪飾りとしても、スカーフピンとしても。",
              details: ["Pin: K18 Gold", "Length: 80mm", "Cube: 14mm"]
            },
            {
              name: "Hinoki Ring",
              type: "K18 Gold Band",
              price: "¥88,000",
              desc: "指先に宿る、木の温もり。シグネチャーキューブが静かに主張します。",
              details: ["Band: K18 Gold", "Sizes: 5-13", "Cube: 10mm"]
            },
            {
              name: "Hinoki Brooch",
              type: "Pin / K18 Gold",
              price: "¥72,000",
              desc: "襟元を彩る、禅の美学。ミニマルなデザインが洗練された印象を与えます。",
              details: ["Pin: K18 Gold", "Cube: 14mm", "Clasp: Safety Pin"]
            },
            {
              name: "Hinoki Cufflinks",
              type: "Pair / K18 Gold",
              price: "¥98,000",
              desc: "袖口に込める、日本の美意識。ビジネスシーンに品格を添えます。",
              details: ["Base: K18 Gold", "Cube: 12mm", "Toggle: Whale Back"]
            }
          ].map((item, i) => (
            <AnimatedSection key={i} delay={i * 100}>
              <div className="group cursor-pointer">
                <div className="relative aspect-[4/5] bg-[#F5F4F2] mb-8 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/5" />
                  <HinokiCube size={90} className="transform group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 border border-transparent group-hover:border-[#C9A86C]/30 transition-all duration-500" />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-[#1A1A1A]/90 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center p-8">
                    <div className="text-center text-white">
                      <p className="text-xs leading-relaxed mb-6">{item.desc}</p>
                      <div className="space-y-1">
                        {item.details.map((detail, idx) => (
                          <p key={idx} className="text-[10px] text-gray-400">{detail}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <h4 className="text-lg font-serif tracking-wide mb-2 text-[#1A1A1A] group-hover:text-[#C9A86C] transition-colors duration-300">
                    {item.name}
                  </h4>
                  <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] mb-3">{item.type}</p>
                  <p className="text-sm font-medium tracking-wider text-[#1A1A1A]">{item.price}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>

    {/* MÉTIERS D'ART COLLECTION */}
    <section className="py-32 md:py-40 px-6 bg-[#0A0A0A] text-white">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-end justify-between mb-20 pb-8 border-b border-white/10">
          <div>
            <SectionLabel light>Métiers d'Art</SectionLabel>
            <h3 className="text-4xl md:text-5xl font-serif text-white">Hidden Treasures</h3>
          </div>
          <p className="text-gray-400 text-sm tracking-widest mt-6 lg:mt-0 max-w-md lg:text-right jp-text">
            京七宝（Kyoto Cloisonné）との対話。<br />
            光と影が織りなす、小宇宙。
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {[
            {
              name: "Midnight Blue",
              sub: "夜の静寂",
              price: "¥220,000",
              gradient: "from-blue-900 via-indigo-900 to-[#0a0a0a]",
              desc: "深淵な藍色は、夜空の静けさを表現。尾張七宝の技法で生み出される、透明感のある青。"
            },
            {
              name: "Sunrise Gold",
              sub: "繁栄の光",
              price: "¥220,000",
              gradient: "from-yellow-600 via-amber-700 to-[#0a0a0a]",
              desc: "朝焼けの黄金色は、繁栄と幸福の象徴。温かみのある輝きが、内側から溢れ出します。"
            },
            {
              name: "Jade Green",
              sub: "永遠の生命",
              price: "¥220,000",
              gradient: "from-emerald-800 via-green-900 to-[#0a0a0a]",
              desc: "翡翠を思わせる深緑は、永遠の生命と再生の象徴。自然の力強さを内に秘めています。"
            },
            {
              name: "Sakura Pink",
              sub: "儚き美",
              price: "¥220,000",
              gradient: "from-pink-300 via-rose-400 to-[#0a0a0a]",
              desc: "桜の花弁を思わせる淡いピンク。日本の美意識「もののあわれ」を体現した色彩。"
            }
          ].map((item, i) => (
            <AnimatedSection key={i} delay={i * 150}>
              <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-center group cursor-pointer">
                <div className="w-full md:w-1/2 aspect-square bg-[#111] border border-white/5 relative overflow-hidden">
                  {/* Enamel Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-60`} />
                  <div className="absolute inset-8 border-[10px] border-[#F5E6D3] bg-black/30" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="text-[#C9A86C] opacity-40" size={24} />
                  </div>
                  {/* Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>
                <div className="w-full md:w-1/2 text-left">
                  <h4 className="text-2xl md:text-3xl font-serif text-[#C9A86C] mb-2">{item.name}</h4>
                  <p className="text-sm text-gray-400 mb-6 jp-text">{item.sub}</p>
                  <p className="text-xs text-gray-500 leading-loose mb-8">
                    {item.desc}
                  </p>
                  <div className="flex items-center justify-between pt-6 border-t border-white/10">
                    <span className="text-lg font-serif">{item.price}</span>
                    <button
                      onClick={() => navigate('bespoke')}
                      className="text-xs tracking-[0.2em] uppercase text-white hover:text-[#C9A86C] transition-colors duration-300 flex items-center gap-2"
                    >
                      Inquire <ChevronRight size={12} />
                    </button>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-20 md:py-32 px-6 bg-[#FAF9F7]">
      <AnimatedSection className="container mx-auto max-w-2xl text-center">
        <h4 className="text-2xl md:text-3xl font-serif mb-6 text-[#1A1A1A]">
          Seeking Something Unique?
        </h4>
        <p className="text-sm text-gray-500 leading-loose mb-10 jp-text">
          あなただけのPARUREを。<br />
          ビスポークサービスで、世界にひとつの作品をお仕立てします。
        </p>
        <LuxuryButton onClick={() => navigate('bespoke')} variant="primary">
          Discover Bespoke
        </LuxuryButton>
      </AnimatedSection>
    </section>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// CRAFTS PAGE
// ─────────────────────────────────────────────────────────────────────────────

const CraftsPage = () => (
  <div className="pt-24 md:pt-32 animate-fade-in bg-white min-h-screen">
    {/* Hero */}
    <div className="py-20 md:py-32 px-6 text-center bg-[#FAF9F7]">
      <SectionLabel>Savoir-Faire</SectionLabel>
      <h2 className="text-4xl md:text-5xl font-serif text-[#1A1A1A] mb-4">The Art of Precision</h2>
      <p className="text-sm tracking-widest text-gray-500 font-light jp-text">
        指先の感覚が、完全な調和を生む。
      </p>
    </div>

    {/* Process */}
    <div className="container mx-auto px-6 py-32 max-w-5xl">
      <div className="space-y-32">
        {[
          {
            num: "01",
            title: "Selection",
            sub: "素材の選定",
            desc: "日本産ヒノキの中でも、節がなく、木目が美しい最高品質の部位のみを選び抜いて使用しています。神社仏閣の建築に使用されるグレードと同等の素材。その神聖な白さは、自然が生み出した芸術です。",
            details: ["産地: 岐阜・長野・奈良", "選別率: 約3%", "乾燥期間: 3年以上"]
          },
          {
            num: "02",
            title: "Precision",
            sub: "精緻な組手",
            desc: "木と木を摩擦で接合する伝統技法「組手」。微細な調整を繰り返し、吸い付くような精度で組み上げます。そこには、わずかな隙間も接着剤も存在しません。1300年の技術が、14mmの中に凝縮されています。",
            details: ["公差: 0.05mm以下", "接合: 釘・接着剤不使用", "技法: 三方組手"]
          },
          {
            num: "03",
            title: "Finish",
            sub: "白木の美学",
            desc: "塗装で覆うのではなく、カンナで磨き上げることで生まれる光沢。木が持つ本来の香りと、シルクのような手触りを残します。この仕上げこそが、FOMUS PARUREの真髄です。",
            details: ["工程: 8段階の研磨", "道具: 伝統的なカンナ", "仕上げ: 無塗装白木"]
          }
        ].map((item, idx) => (
          <AnimatedSection key={idx}>
            <div className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-24 items-center`}>
              <div className="lg:w-1/2">
                <div className="aspect-square bg-[#F5F4F2] flex items-center justify-center relative overflow-hidden group">
                  <span className="text-[180px] font-serif text-gray-100 group-hover:text-gray-200 transition-colors duration-500">
                    {item.num}
                  </span>
                  <div className="absolute bottom-8 left-8">
                    <span className="text-4xl font-serif text-[#C9A86C]/20 jp-text">{item.sub}</span>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-[#C9A86C] text-sm tracking-[0.3em]">{item.num}</span>
                  <div className="w-12 h-px bg-[#C9A86C]/30" />
                </div>
                <h3 className="text-2xl md:text-3xl font-serif text-[#1A1A1A] mb-2">{item.title}</h3>
                <span className="text-xs text-[#C9A86C] uppercase tracking-[0.2em] block mb-8 jp-text">{item.sub}</span>
                <p className="text-sm text-gray-600 leading-loose font-light mb-8">
                  {item.desc}
                </p>
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-100">
                  {item.details.map((detail, i) => (
                    <div key={i} className="text-center">
                      <p className="text-[10px] text-gray-400 tracking-wider">{detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>

    {/* Quote */}
    <div className="py-32 px-6 bg-[#0A0A0A] text-white">
      <AnimatedSection className="container mx-auto max-w-3xl text-center">
        <blockquote className="text-2xl md:text-4xl font-serif leading-relaxed mb-8 jp-text">
          「見えない部分にこそ、<br />職人の魂が宿る。」
        </blockquote>
        <p className="text-xs tracking-[0.3em] text-[#C9A86C] uppercase">
          — Master Craftsman Philosophy
        </p>
      </AnimatedSection>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// BESPOKE PAGE
// ─────────────────────────────────────────────────────────────────────────────

const BespokePage = ({ navigate }) => (
  <div className="pt-24 md:pt-32 animate-fade-in bg-[#FAF9F7] min-h-screen">
    {/* Hero */}
    <div className="py-20 md:py-32 px-6 text-center">
      <SectionLabel>Bespoke Service</SectionLabel>
      <h2 className="text-4xl md:text-5xl font-serif text-[#1A1A1A] mb-4">For Your Special Story</h2>
      <GoldDivider className="mt-8" />
    </div>

    {/* Main Card */}
    <div className="container mx-auto px-6 max-w-4xl pb-32">
      <AnimatedSection>
        <div className="bg-white p-12 md:p-20 shadow-luxury-lg relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C9A86C] to-transparent" />
          <div className="absolute top-8 right-8 w-24 h-24 border border-[#C9A86C]/10" />
          <div className="absolute bottom-8 left-8 w-16 h-16 border border-[#C9A86C]/10" />

          <div className="text-center relative z-10">
            <p className="text-gray-600 font-light tracking-wide leading-loose mb-16 text-sm md:text-base max-w-2xl mx-auto">
              大切な方への贈り物、あるいはご自身への誓いとして。<br />
              京七宝の色、宝石のあしらい、木目の選定。<br />
              専任のコンシェルジュが、あなただけのPARUREをお仕立てします。
            </p>

            {/* Process Steps */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-16 py-12 border-t border-b border-gray-100">
              {[
                { num: "01", title: "Hearing", desc: "ご用途、込めたい想い、贈る相手についてお伺いします。" },
                { num: "02", title: "Design", desc: "想いを「色」や「文様」に変換し、デザインをご提案します。" },
                { num: "03", title: "Crafting", desc: "制作期間中、職人の手元を記録したレポートをお届けします。" }
              ].map((step, i) => (
                <div key={i} className="text-center group">
                  <span className="text-3xl font-serif text-[#C9A86C]/30 block mb-4 group-hover:text-[#C9A86C] transition-colors duration-300">
                    {step.num}
                  </span>
                  <h4 className="font-serif text-lg mb-3 text-[#1A1A1A]">{step.title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>

            {/* Options */}
            <div className="mb-16">
              <h4 className="text-lg font-serif mb-8 text-[#1A1A1A]">Customization Options</h4>
              <div className="flex flex-wrap justify-center gap-4 text-xs tracking-[0.15em] text-gray-500">
                {["Enamel Color", "Gemstone Setting", "Chain Length", "Engraving", "Wood Selection", "Box Design"].map((option, i) => (
                  <span key={i} className="px-4 py-2 border border-gray-200 hover:border-[#C9A86C] hover:text-[#C9A86C] transition-all duration-300 cursor-default">
                    {option}
                  </span>
                ))}
              </div>
            </div>

            <LuxuryButton onClick={() => navigate('contact')} variant="primary" className="inline-flex">
              <Mail size={14} />
              Contact Concierge
            </LuxuryButton>
          </div>
        </div>
      </AnimatedSection>

      {/* Gifting Context */}
      <AnimatedSection delay={300}>
        <div className="text-center max-w-2xl mx-auto mt-20">
          <h4 className="text-xl md:text-2xl font-serif mb-6 text-[#1A1A1A]">A Gift of Prosperity</h4>
          <p className="text-sm text-gray-500 leading-loose font-light jp-text">
            「枡（MASU）」という言葉には、「増す」「益す」という響きがあります。<br />
            それは、福が増し、商売が益々栄えることへの祈り。<br />
            ビジネスの節目や、リーダーへの敬意を表す「縁起の良い贈り物」として選ばれています。
          </p>
        </div>
      </AnimatedSection>

      {/* Timeline */}
      <AnimatedSection delay={400}>
        <div className="mt-20 p-8 md:p-12 bg-[#1A1A1A] text-white">
          <h4 className="text-center text-lg font-serif mb-8">Bespoke Timeline</h4>
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-center">
            {[
              { icon: <Mail size={16} />, label: "Initial Consultation", time: "Week 1" },
              { icon: <Diamond size={16} />, label: "Design Proposal", time: "Week 2-3" },
              { icon: <Clock size={16} />, label: "Crafting Period", time: "Week 4-8" },
              { icon: <Package size={16} />, label: "Delivery", time: "Week 9" }
            ].map((step, i) => (
              <div key={i} className="flex-1">
                <div className="w-12 h-12 mx-auto mb-4 border border-[#C9A86C]/30 rounded-full flex items-center justify-center text-[#C9A86C]">
                  {step.icon}
                </div>
                <p className="text-xs tracking-wider mb-1">{step.label}</p>
                <p className="text-[10px] text-gray-500">{step.time}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// CONTACT PAGE
// ─────────────────────────────────────────────────────────────────────────────

const ContactPage = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: 'Order Inquiry',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formState);
  };

  return (
    <div className="pt-24 md:pt-32 animate-fade-in bg-white min-h-screen">
      <div className="container mx-auto px-6 py-20 md:py-32 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Column - Info */}
          <AnimatedSection>
            <div>
              <SectionLabel>Contact Us</SectionLabel>
              <h2 className="text-3xl md:text-4xl font-serif text-[#1A1A1A] mb-8">Get in Touch</h2>
              <p className="text-sm text-gray-500 leading-loose mb-12">
                ご質問、ご相談、ビスポークのお問い合わせなど、<br />
                お気軽にご連絡ください。<br />
                専任のコンシェルジュが丁寧にご対応いたします。
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-[#C9A86C]/30 rounded-full flex items-center justify-center text-[#C9A86C] shrink-0">
                    <Mail size={16} />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-1">Email</h4>
                    <p className="text-xs text-gray-500">contact@fomus-parure.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-[#C9A86C]/30 rounded-full flex items-center justify-center text-[#C9A86C] shrink-0">
                    <Phone size={16} />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-1">Phone</h4>
                    <p className="text-xs text-gray-500">+81 75-XXX-XXXX</p>
                    <p className="text-[10px] text-gray-400 mt-1">Mon-Fri 10:00-18:00 JST</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-[#C9A86C]/30 rounded-full flex items-center justify-center text-[#C9A86C] shrink-0">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-1">Atelier</h4>
                    <p className="text-xs text-gray-500">Kyoto, Japan</p>
                    <p className="text-[10px] text-gray-400 mt-1">By appointment only</p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Right Column - Form */}
          <AnimatedSection delay={200}>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-gray-400">Name *</label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({...formState, name: e.target.value})}
                    className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-[#C9A86C] transition-colors duration-300 bg-transparent text-sm"
                    placeholder="Your Name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-gray-400">Email *</label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({...formState, email: e.target.value})}
                    className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-[#C9A86C] transition-colors duration-300 bg-transparent text-sm"
                    placeholder="email@address.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-gray-400">Subject</label>
                <select
                  value={formState.subject}
                  onChange={(e) => setFormState({...formState, subject: e.target.value})}
                  className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-[#C9A86C] transition-colors duration-300 bg-transparent text-sm appearance-none cursor-pointer"
                >
                  <option>Order Inquiry</option>
                  <option>Bespoke / Commission</option>
                  <option>Press / Partnership</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-gray-400">Message *</label>
                <textarea
                  required
                  value={formState.message}
                  onChange={(e) => setFormState({...formState, message: e.target.value})}
                  className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-[#C9A86C] transition-colors duration-300 bg-transparent text-sm h-32 resize-none"
                  placeholder="How can we help you?"
                />
              </div>

              <div className="pt-8">
                <button
                  type="submit"
                  className="w-full md:w-auto bg-[#1A1A1A] text-white px-16 py-4 text-xs tracking-[0.2em] uppercase hover:bg-[#C9A86C] transition-colors duration-500 flex items-center justify-center gap-3"
                >
                  <Send size={14} />
                  Send Message
                </button>
              </div>
            </form>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MAIN APP
// ─────────────────────────────────────────────────────────────────────────────

const App = () => {
  const [activePage, setActivePage] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  const navigate = (page) => {
    setActivePage(page);
    setIsMenuOpen(false);
  };

  const renderPage = () => {
    switch (activePage) {
      case 'home': return <HomePage navigate={navigate} />;
      case 'maison': return <MaisonPage />;
      case 'collection': return <CollectionPage navigate={navigate} />;
      case 'crafts': return <CraftsPage />;
      case 'bespoke': return <BespokePage navigate={navigate} />;
      case 'contact': return <ContactPage />;
      default: return <HomePage navigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation
        activePage={activePage}
        navigate={navigate}
        isScrolled={isScrolled}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      <main className="flex-grow">
        {renderPage()}
      </main>

      <Footer navigate={navigate} />
    </div>
  );
};

export default App;
