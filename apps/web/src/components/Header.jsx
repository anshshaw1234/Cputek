import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Video, Megaphone, Briefcase, Wand2, PenTool, Film, Layers, FileText, UserCircle, Clapperboard, Mic, Presentation, MonitorPlay, PlayCircle, Target, Palette, Globe, Award, Cpu, Layout, Smartphone, TrendingUp, Share2, Image, Users, MessageSquare, Zap, BarChart, Search, Settings, Edit3, Link as LinkIcon, MapPin, LineChart, MousePointer2, UserPlus, Code, BookOpen, MessageCircle, ArrowRight, KeyRound as UsersRound, GraduationCap, HeartHandshake, ShieldCheck, Bot, UserCheck, Route, MonitorSmartphone, Wrench } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { hrServices } from '@/data/hrServices.js';
import { industriesData } from "@/data/industries";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isIndustriesOpen, setIsIndustriesOpen] = useState(false);
  const [expandedMobileCategory, setExpandedMobileCategory] = useState(null);
  const location = useLocation();
  const headerRef = useRef(null);


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsServicesOpen(false);
    setIsProductsOpen(false);
    setIsIndustriesOpen(false);
    setExpandedMobileCategory(null);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setIsServicesOpen(false);
        setIsProductsOpen(false);
        setIsIndustriesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Map HR services to the format expected by the menu
  const hrServiceItems = hrServices.map(service => {
    let icon;
    switch (service.id) {
      case 'hr-ops-payroll': icon = <UsersRound className="w-4 h-4" />; break;
      case 'learning-development': icon = <GraduationCap className="w-4 h-4" />; break;
      case 'employee-engagement': icon = <HeartHandshake className="w-4 h-4" />; break;
      case 'hr-compliance': icon = <ShieldCheck className="w-4 h-4" />; break;
      case 'hr-tech-ai': icon = <Bot className="w-4 h-4" />; break;
      case 'pre-onboarding': icon = <UserCheck className="w-4 h-4" />; break;
      case 'structured-onboarding': icon = <Route className="w-4 h-4" />; break;
      case 'elearning-onboarding': icon = <MonitorSmartphone className="w-4 h-4" />; break;
      case 'tool-process-training': icon = <Wrench className="w-4 h-4" />; break;
      default: icon = <Users className="w-4 h-4" />;
    }
    return {
      name: service.title,
      icon,
      path: `/services/hr/${service.slug}`,
      description: service.shortDescription
    };
  });

  const serviceCategories = [
    {
      id: 'video-services',
      name: 'AI Solutions & Enterprise Automation',
      items: [
        { name: 'Explore', icon: <Video className="w-4 h-4" />, path: '/services/Explore' },
      ]
    },
    {
      id: 'ai-video-audio',
      name: 'eLearning & Corporate Training',
      items: [
        { name: 'Explore', icon: <FileText className="w-4 h-4" />, path: '/services/text-to-video-generation' },
      ]
    },
    {
      id: 'elearning-training',
      name: 'Animation & Explainer Videos',
      items: [
        { name: 'Explore', icon: <Presentation className="w-4 h-4" />, path: '/services/instructor-led-talking-head' },
      ]
    },
    {
      id: 'digital-marketing',
      name: 'Enterprise Software Development',
      items: [
        { name: 'Explore', icon: <Target className="w-4 h-4" />, path: '/services/brand-strategy-identity' },
      ]
    },
    {
      id: 'digital-media',
      name: 'Creative Design & Brand Communication',
      items: [
        { name: 'Explore', icon: <Share2 className="w-4 h-4" />, path: '/services/social-media-management' },
      ]
    },
    {
      id: 'seo-strategy',
      name: 'Human Resources ad Compliance',
      items: [
        { name: 'Explore', icon: <Search className="w-4 h-4" />, path: '/services/on-page-seo-optimization' },
      ]
    },
  ];

  // Flat list used directly by the Industries dropdown (single category, so no need for a grid layout)
  const industryItems = industriesData.map((industry) => ({
    name: industry.title,
    icon: <Briefcase className="w-4 h-4" />,
    path: `/industries/${industry.slug}`,
    description: industry.description,
  }));

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/');

  const toggleMobileCategory = (id) => {
    setExpandedMobileCategory(expandedMobileCategory === id ? null : id);
  };

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-[100] smooth-transition ${
        isScrolled || isServicesOpen || isIndustriesOpen || isProductsOpen || isMobileMenuOpen
          ? 'glass-base shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
            <img
              src="https://horizons-cdn.hostinger.com/b8bf1ebc-3a80-4638-bfc9-11e4faae84fe/a9594cf29cb58dea0157717bd1ad142a.png"
              alt="CPUtek Logo"
              className="h-10 md:h-12 w-auto group-hover:scale-105 group-hover:drop-shadow-[0_0_15px_rgba(255,215,0,0.5)] smooth-transition"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center justify-center gap-8 flex-grow px-4">
            <Link to="/" className={`text-sm font-medium smooth-transition ${isActive('/') && location.pathname === '/' ? 'text-primary' : 'text-foreground hover:text-primary'}`}>
              Home
            </Link>
            <Link to="/about" className={`text-sm font-medium smooth-transition ${isActive('/about') ? 'text-primary' : 'text-foreground hover:text-primary'}`}>
              About
            </Link>

            {/* Services — full-width mega menu (6 categories, fills the grid nicely) */}
            <div
              className="relative py-4"
              onMouseEnter={() => { setIsServicesOpen(true); setIsProductsOpen(false); setIsIndustriesOpen(false); }}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <button
                className={`flex items-center gap-1 text-sm font-medium smooth-transition ${isServicesOpen || isActive('/services') ? 'text-primary' : 'text-foreground hover:text-primary'}`}
              >
                Services
                <ChevronDown className={`w-4 h-4 smooth-transition ${isServicesOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Desktop Mega Menu Overlay - Services (full width, anchored below header) */}
              <div className="hidden lg:block">
                <AnimatePresence>
                  {isServicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="fixed left-0 top-24 w-full bg-black/80 backdrop-blur-2xl border-b border-white/20 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] max-h-[calc(100vh-6rem)] overflow-y-auto"
                      onMouseEnter={() => setIsServicesOpen(true)}
                      onMouseLeave={() => setIsServicesOpen(false)}
                    >
                      <div className="max-w-[1400px] mx-auto px-6 py-8 lg:px-8 lg:py-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 lg:gap-8">
                          {serviceCategories.map((category) => (
                            <div key={category.id} className="glass-card bg-white/5 border-white/10 p-6 rounded-2xl flex flex-col h-full hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                              <h3 className="text-lg font-bold text-primary mb-5 pb-3 border-b border-white/10">
                                {category.name}
                              </h3>
                              <div className="flex flex-col gap-2 flex-grow">
                                {category.items.map((item, idx) => (
                                  <Link
                                    key={idx}
                                    to={item.path}
                                    className="flex flex-col gap-1 p-3 rounded-lg group hover:bg-white/10 hover:shadow-[0_2px_10px_rgba(255,215,0,0.1)] smooth-transition"
                                    onClick={() => setIsServicesOpen(false)}
                                  >
                                    <div className="flex items-center gap-3">
                                      <div className="text-primary/70 group-hover:text-primary group-hover:scale-110 smooth-transition flex-shrink-0">
                                        {item.icon}
                                      </div>
                                      <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground smooth-transition leading-tight">
                                        {item.name}
                                      </span>
                                    </div>
                                    {item.description && (
                                      <span className="text-xs text-muted-foreground/70 pl-7 line-clamp-2">
                                        {item.description}
                                      </span>
                                    )}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Industries — compact dropdown, anchored directly below THIS button (not the whole header) */}
            <div
              className="relative py-4"
              onMouseEnter={() => {
                setIsIndustriesOpen(true);
                setIsServicesOpen(false);
                setIsProductsOpen(false);
              }}
              onMouseLeave={() => setIsIndustriesOpen(false)}
            >
              <button
                className={`flex items-center gap-1 text-sm font-medium smooth-transition ${
                  isIndustriesOpen || isActive('/industries') ? 'text-primary' : 'text-foreground hover:text-primary'
                }`}
              >
                Industries
                <ChevronDown className={`w-4 h-4 smooth-transition ${isIndustriesOpen ? 'rotate-180' : ''}`} />
              </button>

              <div className="hidden lg:block">
                <AnimatePresence>
                  {isIndustriesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="absolute top-full right-0 mt-1 w-[420px] max-h-[70vh] overflow-y-auto bg-black/85 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] p-6"
                      onMouseEnter={() => setIsIndustriesOpen(true)}
                      onMouseLeave={() => setIsIndustriesOpen(false)}
                    >
                      <h3 className="text-lg font-bold text-primary mb-4 pb-3 border-b border-white/10">
                        Industries
                      </h3>
                      <div className="flex flex-col gap-2">
                        {industryItems.map((item, idx) => (
                          <Link
                            key={idx}
                            to={item.path}
                            className="flex flex-col gap-1 p-3 rounded-lg group hover:bg-white/10 hover:shadow-[0_2px_10px_rgba(255,215,0,0.1)] smooth-transition"
                            onClick={() => setIsIndustriesOpen(false)}
                          >
                            <div className="flex items-center gap-3">
                              <div className="text-primary/70 group-hover:text-primary group-hover:scale-110 smooth-transition flex-shrink-0">
                                {item.icon}
                              </div>
                              <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground smooth-transition leading-tight">
                                {item.name}
                              </span>
                            </div>
                            {item.description && (
                              <span className="text-xs text-muted-foreground/70 pl-7 line-clamp-2">
                                {item.description}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <Link to="/careers" className={`text-sm font-medium smooth-transition ${isActive('/careers') ? 'text-primary' : 'text-foreground hover:text-primary'}`}>
              Careers
            </Link>

            <Link to="/blogs" className={`text-sm font-medium smooth-transition ${isActive('/blogs') ? 'text-primary' : 'text-foreground hover:text-primary'}`}>
              Blogs
            </Link>

            <Link to="/contact" className={`text-sm font-medium smooth-transition ${isActive('/contact') ? 'text-primary' : 'text-foreground hover:text-primary'}`}>
              Contact
            </Link>
          </nav>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-foreground hover:text-primary smooth-transition flex-shrink-0 min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'calc(100vh - 6rem)' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-black/90 backdrop-blur-2xl border-t border-b border-white/20 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] overflow-y-auto w-full absolute top-full left-0"
          >
            <div className="px-4 py-8 space-y-2 max-w-full">
              <Link to="/" className="block px-4 py-3 text-lg font-medium text-foreground hover:text-primary hover:bg-white/5 rounded-xl smooth-transition min-h-[44px]" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
              <Link to="/about" className="block px-4 py-3 text-lg font-medium text-foreground hover:text-primary hover:bg-white/5 rounded-xl smooth-transition min-h-[44px]" onClick={() => setIsMobileMenuOpen(false)}>About</Link>

              {/* Services Mobile Accordion */}
              <div className="space-y-1">
                <button
                  onClick={() => { setIsServicesOpen(!isServicesOpen); setIsProductsOpen(false); setIsIndustriesOpen(false); }}
                  className="w-full flex items-center justify-between px-4 py-3 text-lg font-medium text-foreground hover:text-primary hover:bg-white/5 rounded-xl smooth-transition min-h-[44px]"
                >
                  Services
                  <ChevronDown className={`w-5 h-5 smooth-transition ${isServicesOpen ? 'rotate-180 text-primary' : ''}`} />
                </button>

                <AnimatePresence>
                  {isServicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-4 pr-2 py-4 space-y-6 border-l-2 border-white/10 ml-6 my-2">
                        {serviceCategories.map((category) => (
                          <div key={category.id} className="space-y-1">
                            <button
                              onClick={() => toggleMobileCategory(category.id)}
                              className="w-full flex items-center justify-between py-2 text-base font-medium text-foreground hover:text-primary smooth-transition min-h-[44px]"
                            >
                              {category.name}
                              <ChevronDown className={`w-4 h-4 smooth-transition ${expandedMobileCategory === category.id ? 'rotate-180 text-primary' : ''}`} />
                            </button>

                            <AnimatePresence>
                              {expandedMobileCategory === category.id && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="overflow-hidden"
                                >
                                  <div className="pl-2 py-2 space-y-2 border-l border-white/10 ml-2 mt-2">
                                    {category.items.map((item, idx) => (
                                      <Link
                                        key={idx}
                                        to={item.path}
                                        className="flex flex-col gap-1 px-3 py-2.5 text-sm text-muted-foreground hover:text-primary hover:bg-white/5 rounded-lg smooth-transition min-h-[44px]"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                      >
                                        <div className="flex items-center gap-3">
                                          <span className="text-primary/70">{item.icon}</span>
                                          <span className="leading-tight font-medium">{item.name}</span>
                                        </div>
                                        {item.description && (
                                          <span className="text-xs text-muted-foreground/70 pl-7 line-clamp-2">
                                            {item.description}
                                          </span>
                                        )}
                                      </Link>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Industries Mobile Accordion */}
              <div className="space-y-1">
                <button
                  onClick={() => { setIsIndustriesOpen(!isIndustriesOpen); setIsProductsOpen(false); setIsServicesOpen(false); }}
                  className="w-full flex items-center justify-between px-4 py-3 text-lg font-medium text-foreground hover:text-primary hover:bg-white/5 rounded-xl smooth-transition min-h-[44px]"
                >
                  Industries
                  <ChevronDown className={`w-5 h-5 smooth-transition ${isIndustriesOpen ? 'rotate-180 text-primary' : ''}`} />
                </button>

                <AnimatePresence>
                  {isIndustriesOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-4 pr-2 py-4 space-y-2 border-l-2 border-white/10 ml-6 my-2">
                        {industryItems.map((item, idx) => (
                          <Link
                            key={idx}
                            to={item.path}
                            className="flex flex-col gap-1 px-3 py-2.5 text-sm text-muted-foreground hover:text-primary hover:bg-white/5 rounded-lg smooth-transition min-h-[44px]"
                            onClick={() => {
                              setIsMobileMenuOpen(false);
                              setIsIndustriesOpen(false);
                            }}
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-primary/70">{item.icon}</span>
                              <span className="leading-tight font-medium">{item.name}</span>
                            </div>
                            {item.description && (
                              <span className="text-xs text-muted-foreground/70 pl-7 line-clamp-2">
                                {item.description}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div> */}

              <Link
                to="/blogs"
                className="block px-4 py-3 text-lg font-medium text-foreground hover:text-primary hover:bg-white/5 rounded-xl smooth-transition min-h-[44px]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Blogs
              </Link>

              <Link
                to="/careers"
                className="block px-4 py-3 text-lg font-medium text-foreground hover:text-primary hover:bg-white/5 rounded-xl smooth-transition min-h-[44px]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Careers
              </Link>

              <Link
                to="/contact"
                className="block px-4 py-3 text-lg font-medium text-foreground hover:text-primary hover:bg-white/5 rounded-xl smooth-transition min-h-[44px]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;