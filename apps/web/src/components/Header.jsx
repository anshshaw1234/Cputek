import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { industriesData } from "@/data/industries";
import { productsData } from '@/data/products.js';
import { servicesData } from '@/data/services.js';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isIndustriesOpen, setIsIndustriesOpen] = useState(false);
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

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/');

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
              src="/images/cputek-logo.jpg"
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

            {/* Products dropdown */}
            <div
              className="relative py-4"
              onMouseEnter={() => { setIsProductsOpen(true); setIsServicesOpen(false); setIsIndustriesOpen(false); }}
              onMouseLeave={() => setIsProductsOpen(false)}
            >
              <button
                type="button"
                aria-expanded={isProductsOpen}
                aria-haspopup="true"
                onClick={() => setIsProductsOpen(!isProductsOpen)}
                className={`flex items-center gap-1 text-sm font-medium smooth-transition ${isProductsOpen || isActive('/products') ? 'text-primary' : 'text-foreground hover:text-primary'}`}
              >
                Products
                <ChevronDown className={`w-4 h-4 smooth-transition ${isProductsOpen ? 'rotate-180' : ''}`} />
              </button>

              <div className="hidden lg:block">
                <AnimatePresence>
                  {isProductsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2, ease: 'easeInOut' }}
                      className="absolute top-full left-0 mt-1 w-[420px] max-h-[70vh] overflow-y-auto bg-black/85 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] p-5"
                    >
                      <h3 className="text-lg font-bold text-primary mb-3 pb-3 border-b border-white/10">
                        Products
                      </h3>
                      <div className="flex flex-col gap-1">
                        {productsData.map((product) => (
                          <div key={product.id} className="flex items-center justify-between gap-4 rounded-lg p-3 hover:bg-white/10 smooth-transition">
                            <span className="text-sm font-medium text-foreground">{product.title}</span>
                            <Link
                              to={`/products/${product.id}`}
                              className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-primary hover:text-primary/80"
                              onClick={() => setIsProductsOpen(false)}
                            >
                              Explore <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                          </div>
                        ))}
                      </div>
                      <Link
                        to="/products"
                        className="mt-3 block border-t border-white/10 pt-4 px-3 text-sm font-semibold text-primary hover:text-primary/80 smooth-transition"
                        onClick={() => setIsProductsOpen(false)}
                      >
                        Explore all products
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Services dropdown */}
            <div
              className="relative py-4"
              onMouseEnter={() => { setIsServicesOpen(true); setIsProductsOpen(false); setIsIndustriesOpen(false); }}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <button
                type="button"
                aria-expanded={isServicesOpen}
                aria-haspopup="true"
                onClick={() => setIsServicesOpen(!isServicesOpen)}
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
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className="absolute top-full left-0 mt-1 w-[420px] max-h-[70vh] overflow-y-auto bg-black/85 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] p-5"
                    >
                      <h3 className="text-lg font-bold text-primary mb-3 pb-3 border-b border-white/10">
                        Services
                      </h3>
                      <div className="flex flex-col gap-1">
                        {servicesData.map((service) => (
                          <div key={service.slug} className="flex items-center justify-between gap-4 rounded-lg p-3 hover:bg-white/10 smooth-transition">
                            <span className="text-sm font-medium text-foreground">{service.title}</span>
                            <Link
                              to={`/services/${service.slug}`}
                              className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-primary hover:text-primary/80"
                              onClick={() => setIsServicesOpen(false)}
                            >
                              Explore <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                          </div>
                        ))}
                      </div>
                      <Link
                        to="/services"
                        className="mt-3 block border-t border-white/10 pt-4 px-3 text-sm font-semibold text-primary hover:text-primary/80 smooth-transition"
                        onClick={() => setIsServicesOpen(false)}
                      >
                        Explore all services
                      </Link>
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
                type="button"
                aria-expanded={isIndustriesOpen}
                aria-haspopup="true"
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
                        {industriesData.map((industry) => (
                          <div key={industry.slug} className="flex items-center justify-between gap-4 rounded-lg p-3 hover:bg-white/10 smooth-transition">
                            <span className="text-sm font-medium text-foreground">{industry.title}</span>
                            <Link
                              to={`/industries/${industry.slug}`}
                              className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-primary hover:text-primary/80"
                              onClick={() => setIsIndustriesOpen(false)}
                            >
                              Explore <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                          </div>
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

              {/* Products Mobile Accordion */}
              <div className="space-y-1">
                <button
                  type="button"
                  aria-expanded={isProductsOpen}
                  onClick={() => { setIsProductsOpen(!isProductsOpen); setIsServicesOpen(false); setIsIndustriesOpen(false); }}
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
                      <div className="pl-4 pr-2 py-3 space-y-1 border-l-2 border-white/10 ml-6 my-2">
                        {productsData.map((product) => (
                          <div key={product.id} className="flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 hover:bg-white/5">
                            <span className="text-sm font-medium text-foreground">{product.title}</span>
                            <Link
                              to={`/products/${product.id}`}
                              className="inline-flex min-h-[44px] shrink-0 items-center gap-1 text-xs font-semibold text-primary"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              Explore <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                          </div>
                        ))}
                        <Link
                          to="/products"
                          className="block px-3 py-2.5 text-sm font-semibold text-primary hover:bg-white/5 rounded-lg smooth-transition min-h-[44px]"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Explore all products
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Services Mobile Accordion */}
              <div className="space-y-1">
                <button
                  type="button"
                  aria-expanded={isServicesOpen}
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
                      <div className="pl-4 pr-2 py-3 space-y-1 border-l-2 border-white/10 ml-6 my-2">
                        {servicesData.map((service) => (
                          <div key={service.slug} className="flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 hover:bg-white/5">
                            <span className="text-sm font-medium text-foreground">{service.title}</span>
                            <Link
                              to={`/services/${service.slug}`}
                              className="inline-flex min-h-[44px] shrink-0 items-center gap-1 text-xs font-semibold text-primary"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              Explore <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                          </div>
                        ))}
                        <Link
                          to="/services"
                          className="block px-3 py-2.5 text-sm font-semibold text-primary hover:bg-white/5 rounded-lg smooth-transition min-h-[44px]"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Explore all services
                        </Link>
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
                        {industriesData.map((industry) => (
                          <div key={industry.slug} className="flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 hover:bg-white/5">
                            <span className="text-sm font-medium text-foreground">{industry.title}</span>
                            <Link
                              to={`/industries/${industry.slug}`}
                              className="inline-flex min-h-[44px] shrink-0 items-center gap-1 text-xs font-semibold text-primary"
                              onClick={() => {
                                setIsMobileMenuOpen(false);
                                setIsIndustriesOpen(false);
                              }}
                            >
                              Explore <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                          </div>
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
