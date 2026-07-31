import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Linkedin, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative glass-base border-t border-white/10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          <div className="space-y-6">
            <Link to="/" className="inline-block">
              <img 
                src="https://horizons-cdn.hostinger.com/b8bf1ebc-3a80-4638-bfc9-11e4faae84fe/a9594cf29cb58dea0157717bd1ad142a.png" 
                alt="CPUtek Logo" 
                className="h-12 w-auto hover:scale-105 smooth-transition"
              />
            </Link>
            <p className="text-muted-foreground leading-relaxed">
              Transforming ideas into digital reality with innovative solutions and creative excellence.
            </p>
            <div className="flex gap-4 pt-2">
              <a
                href="https://www.facebook.com/cputekofficial"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl glass-button flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:shadow-[0_0_15px_rgba(255,215,0,0.3)] smooth-transition"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/cputek-pvt-ltd/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl glass-button flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:shadow-[0_0_15px_rgba(255,215,0,0.3)] smooth-transition"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://www.youtube.com/channel/UC7hYS5V5hWQVe03XBBdnciw"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl glass-button flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:shadow-[0_0_15px_rgba(255,215,0,0.3)] smooth-transition"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-6 tracking-wide">Quick Links</h3>
            <ul className="space-y-4">
              {['Home', 'About', 'Services',  'Careers', 'Contact'].map((item) => (
                <li key={item}>
                  <Link 
                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} 
                    className="text-muted-foreground hover:text-primary hover:translate-x-1 inline-block smooth-transition"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-6 tracking-wide">Services</h3>
            <ul className="space-y-4">
              {[
                { name: 'AI Solutions & Enterprise Automation', path: '/services/Explore' },
                {name: 'eLearning & Corporate Training', path: '/services/text-to-video-generation' },
                {name: 'Animation & Explainer Videos', path: '/services/ai-avatar-presenter-videos' },
                {name: 'Enterprise Software Development', path: '/services/instructor-led-talking-head' },
                {name: 'Creative Design & Brand Communication', path: '/services/brand-strategy-identity' },
                {name: 'Human Resources ad Compliance', path: '/services/social-media-management' },
                {/* { name: 'Manpower Outsourcing', path: '/services/on-page-seo-optimization' },
                { name: 'Human Resources (HR) Services', path: '/services/dedicated-resource-hiring' } */}
              ].map((item) => (
                <li key={item.name}>
                  <Link 
                    to={item.path} 
                    className="text-muted-foreground hover:text-primary hover:translate-x-1 inline-block smooth-transition"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-6 tracking-wide">Contact Info</h3>
            <ul className="space-y-5">
              <li className="flex items-start gap-4 group">
                <div className="p-2 rounded-lg glass-button text-primary group-hover:bg-primary group-hover:text-primary-foreground smooth-transition">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="text-muted-foreground leading-relaxed pt-1">
                  CPUTEK PRIVATE LIMITED<br />
                  80, Vidyasagar Sarani<br />
                  Purba Barisha, Kolkata – 700008
                </span>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="p-2 rounded-lg glass-button text-primary group-hover:bg-primary group-hover:text-primary-foreground smooth-transition">
                  <Mail className="w-5 h-5" />
                </div>
                <a href="mailto:info@cputek.in" className="text-muted-foreground hover:text-primary smooth-transition">
                  info@cputek.in
                </a>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="p-2 rounded-lg glass-button text-primary group-hover:bg-primary group-hover:text-primary-foreground smooth-transition">
                  <Phone className="w-5 h-5" />
                </div>
                <a href="tel:8013920772" className="text-muted-foreground hover:text-primary smooth-transition">
                  8013920772
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">
              © {currentYear} CPUtek Private Limited. All rights reserved.
            </p>
            <div className="flex gap-8">
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary smooth-transition">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary smooth-transition">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;