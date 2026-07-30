import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Video, Megaphone, Briefcase, Wand2, PenTool, Film, Layers, FileText, UserCircle, Clapperboard, Mic, Presentation, MonitorPlay, PlayCircle, Target, Palette, Globe, Award, Cpu, Layout, Smartphone, TrendingUp, Share2, Image, Users, MessageSquare, Zap, BarChart, Search, Settings, Edit3, Link as LinkIcon, MapPin, LineChart, MousePointer2, UserPlus, Code, BookOpen, MessageCircle, ArrowRight, KeyRound as UsersRound, GraduationCap, HeartHandshake, ShieldCheck, Bot, UserCheck, Route, MonitorSmartphone, Wrench } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { hrServices } from '@/data/hrServices.js';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
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
    setExpandedMobileCategory(null);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setIsServicesOpen(false);
        setIsProductsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Map HR services to the format expected by the menu
  const hrServiceItems = hrServices.map(service => {
    let icon;
    switch(service.id) {
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
      name: 'Video Services',
      items: [
        { name: 'Explainer Videos', icon: <Video className="w-4 h-4" />, path: '/services/explainer-videos' },
        { name: 'Promotional & Marketing Videos', icon: <Megaphone className="w-4 h-4" />, path: '/services/promotional-marketing-videos' },
        { name: 'Corporate Videos & Company Profiles', icon: <Briefcase className="w-4 h-4" />, path: '/services/corporate-videos-company-profiles' },
        { name: 'Motion Graphics & VFX', icon: <Wand2 className="w-4 h-4" />, path: '/services/motion-graphics-vfx' },
        { name: 'Storyboarding & Script-to-Video', icon: <PenTool className="w-4 h-4" />, path: '/services/storyboarding-script-to-video' },
        { name: 'Custom Animation & Specialized Videos', icon: <Film className="w-4 h-4" />, path: '/services/custom-animation-specialized-videos' },
        { name: '2D & 3D Story Videos', icon: <Layers className="w-4 h-4" />, path: '/services/2d-3d-story-videos' },
      ]
    },
    {
      id: 'ai-video-audio',
      name: 'AI-Powered Video & Audio',
      items: [
        { name: 'Text-to-Video Generation', icon: <FileText className="w-4 h-4" />, path: '/services/text-to-video-generation' },
        { name: 'AI Avatar & Presenter Videos', icon: <UserCircle className="w-4 h-4" />, path: '/services/ai-avatar-presenter-videos' },
        { name: 'AI Cinematic & 3D Video', icon: <Clapperboard className="w-4 h-4" />, path: '/services/ai-cinematic-3d-video' },
        { name: 'AI Voiceover & Audio', icon: <Mic className="w-4 h-4" />, path: '/services/ai-voiceover-audio' },
      ]
    },
    {
      id: 'elearning-training',
      name: 'eLearning & Training',
      items: [
        { name: 'Instructor-Led / Talking Head', icon: <Presentation className="w-4 h-4" />, path: '/services/instructor-led-talking-head' },
        { name: 'Screencast & Software Training', icon: <MonitorPlay className="w-4 h-4" />, path: '/services/screencast-software-training' },
        { name: 'Animated eLearning Explainers', icon: <PlayCircle className="w-4 h-4" />, path: '/services/animated-elearning-explainers' },
      ]
    },
    {
      id: 'digital-marketing',
      name: 'Digital Marketing',
      items: [
        { name: 'Brand Strategy & Identity', icon: <Target className="w-4 h-4" />, path: '/services/brand-strategy-identity' },
        { name: 'Visual Branding & Design', icon: <Palette className="w-4 h-4" />, path: '/services/visual-branding-design' },
        { name: 'Digital Branding & Social Presence', icon: <Globe className="w-4 h-4" />, path: '/services/digital-branding-social-presence' },
        { name: 'Employer & Corporate Branding', icon: <Award className="w-4 h-4" />, path: '/services/employer-corporate-branding' },
        { name: 'AI-Powered Branding', icon: <Cpu className="w-4 h-4" />, path: '/services/ai-powered-branding' },
        { name: 'Corporate & Business Websites', icon: <Layout className="w-4 h-4" />, path: '/services/corporate-business-websites' },
        { name: 'UI/UX Design & Prototyping', icon: <Smartphone className="w-4 h-4" />, path: '/services/ui-ux-design-prototyping' },
        { name: 'Landing Pages & Conversion Funnels', icon: <TrendingUp className="w-4 h-4" />, path: '/services/landing-pages-conversion-funnels' },
      ]
    },
    {
      id: 'digital-media',
      name: 'Digital Media',
      items: [
        { name: 'Social Media Management', icon: <Share2 className="w-4 h-4" />, path: '/services/social-media-management' },
        { name: 'Social Media Creatives & Content Production', icon: <Image className="w-4 h-4" />, path: '/services/social-media-creatives-content-production' },
        { name: 'Influencer & Creator Marketing', icon: <Users className="w-4 h-4" />, path: '/services/influencer-creator-marketing' },
        { name: 'Content Strategy & Brand Communication', icon: <MessageSquare className="w-4 h-4" />, path: '/services/content-strategy-brand-communication' },
        { name: 'AI-Driven Digital Marketing', icon: <Zap className="w-4 h-4" />, path: '/services/ai-driven-digital-marketing' },
        { name: 'ROI Driver Marketing', icon: <BarChart className="w-4 h-4" />, path: '/services/roi-driver-marketing' },
      ]
    },
    {
      id: 'seo-strategy',
      name: 'SEO Strategy & Keyword Research',
      items: [
        { name: 'On-Page SEO Optimization', icon: <Search className="w-4 h-4" />, path: '/services/on-page-seo-optimization' },
        { name: 'Technical SEO', icon: <Settings className="w-4 h-4" />, path: '/services/technical-seo' },
        { name: 'Content SEO & Blogging', icon: <Edit3 className="w-4 h-4" />, path: '/services/content-seo-blogging' },
        { name: 'Off-Page SEO & Link Building', icon: <LinkIcon className="w-4 h-4" />, path: '/services/off-page-seo-link-building' },
        { name: 'Local SEO', icon: <MapPin className="w-4 h-4" />, path: '/services/local-seo' },
        { name: 'SEO Analytics & Reporting', icon: <LineChart className="w-4 h-4" />, path: '/services/seo-analytics-reporting' },
        { name: 'AI-Powered SEO', icon: <Cpu className="w-4 h-4" />, path: '/services/ai-powered-seo' },
        { name: 'Performance Marketing & Paid Ads', icon: <MousePointer2 className="w-4 h-4" />, path: '/services/performance-marketing-paid-ads' },
      ]
    },
    {
      id: 'manpower-outsourcing',
      name: 'Manpower Outsourcing',
      items: [
        { name: 'Dedicated Resource Hiring', icon: <UserPlus className="w-4 h-4" />, path: '/services/dedicated-resource-hiring' },
        { name: 'Video Production & Animation Resources', icon: <Video className="w-4 h-4" />, path: '/services/video-production-animation-resources' },
        { name: 'Web & App Development Resources', icon: <Code className="w-4 h-4" />, path: '/services/web-app-development-resources' },
        { name: 'Digital Marketing & SEO Experts', icon: <TrendingUp className="w-4 h-4" />, path: '/services/digital-marketing-seo-experts' },
        { name: 'eLearning & Instructional Design Experts', icon: <BookOpen className="w-4 h-4" />, path: '/services/elearning-instructional-design-experts' },
        { name: 'AI & Automation Specialists', icon: <Cpu className="w-4 h-4" />, path: '/services/ai-automation-specialists' },
        { name: 'Branding & Creative Team', icon: <Palette className="w-4 h-4" />, path: '/services/branding-creative-team' },
      ]
    },
    {
      id: 'hr-services',
      name: 'Human Resources (HR) Services',
      items: hrServiceItems
    }
  ];

  const productsData = [
    {
      id: 'chatbot',
      title: 'Personalized AI Chatbot',
      description: 'Deploy intelligent chatbots that understand your business and provide 24/7 support.',
      icon: <MessageCircle className="w-8 h-8" />,
      path: '/products/personalized-ai-chatbot'
    },
    {
      id: 'lead-gen',
      title: 'Lead Generator Tool',
      description: 'Capture and qualify leads automatically with smart forms and conversion optimization.',
      icon: <Zap className="w-8 h-8" />,
      path: '/products/lead-generator-tool'
    },
    {
      id: 'content-writer',
      title: 'AI Content Writer',
      description: 'Generate high-quality content at scale with AI-powered writing tools trained on your brand.',
      icon: <PenTool className="w-8 h-8" />,
      path: '/products/ai-content-writer'
    }
  ];

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/');

  const toggleMobileCategory = (id) => {
    setExpandedMobileCategory(expandedMobileCategory === id ? null : id);
  };

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-[100] smooth-transition ${
        isScrolled || isServicesOpen || isProductsOpen || isMobileMenuOpen ? 'glass-base shadow-lg' : 'bg-transparent'
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

            <div 
              className="relative py-4"
              onMouseEnter={() => { setIsServicesOpen(true); setIsProductsOpen(false); }}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <button 
                className={`flex items-center gap-1 text-sm font-medium smooth-transition ${isServicesOpen || isActive('/services') ? 'text-primary' : 'text-foreground hover:text-primary'}`}
              >
                Services
                <ChevronDown className={`w-4 h-4 smooth-transition ${isServicesOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>

            <div 
              className="relative py-4"
              onMouseEnter={() => { setIsProductsOpen(true); setIsServicesOpen(false); }}
              onMouseLeave={() => setIsProductsOpen(false)}
            >
              <button 
                className={`flex items-center gap-1 text-sm font-medium smooth-transition ${isProductsOpen || isActive('/products') ? 'text-primary' : 'text-foreground hover:text-primary'}`}
              >
                Products
                <ChevronDown className={`w-4 h-4 smooth-transition ${isProductsOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>

            <Link to="/careers" className={`text-sm font-medium smooth-transition ${isActive('/careers') ? 'text-primary' : 'text-foreground hover:text-primary'}`}>
              Careers
            </Link>
            

            <Link
  to="/blogs"
  className={`text-sm font-medium smooth-transition ${
    isActive('/blogs')
      ? 'text-primary'
      : 'text-foreground hover:text-primary'
  }`}
>
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

      {/* Desktop Mega Menu Overlay - Services */}
      <div className="hidden lg:block">
        <AnimatePresence>
          {isServicesOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute top-full left-0 w-full bg-black/80 backdrop-blur-2xl border-b border-white/20 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] max-h-[calc(100vh-6rem)] overflow-y-auto"
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

      {/* Desktop Mega Menu Overlay - Products */}
      <div className="hidden lg:block">
        <AnimatePresence>
          {isProductsOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute top-full left-0 w-full bg-black/80 backdrop-blur-2xl border-b border-white/20 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] max-h-[calc(100vh-6rem)] overflow-y-auto"
              onMouseEnter={() => setIsProductsOpen(true)}
              onMouseLeave={() => setIsProductsOpen(false)}
            >
              <div className="max-w-[1400px] mx-auto px-6 py-8 lg:px-8 lg:py-10">
                <div className="mb-10 max-w-3xl">
                  <h2 className="text-3xl font-bold text-foreground mb-3">Our Products</h2>
                  <p className="text-muted-foreground text-lg">Powerful SaaS solutions built to automate and optimize your business operations.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  {productsData.map((product) => (
                    <Link
                      key={product.id}
                      to={product.path}
                      className="glass-card bg-white/5 border-white/10 p-6 lg:p-8 rounded-2xl flex flex-col h-full group hover:bg-white/10 hover:border-primary/30 hover:shadow-[0_10px_40px_-10px_rgba(255,215,0,0.15)] hover:-translate-y-1 transition-all duration-300"
                      onClick={() => setIsProductsOpen(false)}
                    >
                      <div className="text-primary mb-6 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(255,215,0,0.5)] transition-all duration-300 origin-left">
                        {product.icon}
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                        {product.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-8 flex-grow">
                        {product.description}
                      </p>
                      <div className="flex items-center text-primary font-semibold text-sm group-hover:translate-x-2 transition-transform mt-auto">
                        Explore product
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
                  onClick={() => { setIsServicesOpen(!isServicesOpen); setIsProductsOpen(false); }}
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

              {/* Products Mobile Accordion */}
              <div className="space-y-1">
                <button 
                  onClick={() => { setIsProductsOpen(!isProductsOpen); setIsServicesOpen(false); }}
                  className="w-full flex items-center justify-between px-4 py-3 text-lg font-medium text-foreground hover:text-primary hover:bg-white/5 rounded-xl smooth-transition min-h-[44px]"
                >
                  Products
                  <ChevronDown className={`w-5 h-5 smooth-transition ${isProductsOpen ? 'rotate-180 text-primary' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {isProductsOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-4 pr-2 py-4 space-y-4 border-l-2 border-white/10 ml-6 my-2">
                        <div className="mb-4 pr-4">
                          <p className="text-sm text-muted-foreground">Powerful SaaS solutions built to automate and optimize your business operations.</p>
                        </div>
                        {productsData.map((product) => (
                          <Link
                            key={product.id}
                            to={product.path}
                            className="flex flex-col gap-2 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/30 smooth-transition"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <div className="flex items-center gap-3">
                              <div className="text-primary">
                                {React.cloneElement(product.icon, { className: "w-5 h-5" })}
                              </div>
                              <span className="font-bold text-foreground">{product.title}</span>
                            </div>
                            <p className="text-xs text-muted-foreground pl-8">{product.description}</p>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

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