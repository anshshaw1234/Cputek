import React from 'react';
import { Helmet } from 'react-helmet';
import { Video, TrendingUp, Palette, Code, Film, Share2 } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ScrollRevealAnimation from '@/components/ScrollRevealAnimation.jsx';
import ServiceCard from '@/components/ServiceCard.jsx';
import GlowButton from '@/components/GlowButton.jsx';
import { useNavigate } from 'react-router-dom';

const ServicesPage = () => {
  const navigate = useNavigate();
  const services = [
    { id: 'elearning', title: 'E-Learning: Video & Animation', description: 'Create engaging educational content with professional video production and animation services that captivate learners and improve knowledge retention.', icon: <Video className="w-8 h-8" /> },
    { id: 'digital-marketing', title: 'Digital Marketing', description: 'Drive growth with data-driven marketing strategies across social media, SEO, PPC, and content marketing to reach your target audience effectively.', icon: <TrendingUp className="w-8 h-8" /> },
    { id: 'graphics-design', title: 'Graphics Design', description: 'Transform your brand with stunning visual designs including logos, branding materials, marketing collateral, and digital assets that resonate with your audience.', icon: <Palette className="w-8 h-8" /> },
    { id: 'software-development', title: 'Software Development', description: 'Build scalable, robust applications tailored to your business needs using modern technologies, agile methodologies, and industry best practices.', icon: <Code className="w-8 h-8" /> },
    { id: 'animation', title: 'Animation', description: 'Bring your ideas to life with captivating 2D and 3D animations, motion graphics, and explainer videos that tell compelling stories and engage viewers.', icon: <Film className="w-8 h-8" /> },
    { id: 'social-media', title: 'Social Media Management', description: 'Build and engage your community with strategic content planning, consistent posting, community management, and detailed analytics across all major platforms.', icon: <Share2 className="w-8 h-8" /> },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Our Services - CPUtek | Digital Solutions & Creative Services</title>
        <meta name="description" content="Explore CPUtek's comprehensive digital services including e-learning, digital marketing, graphics design, software development, animation, and social media management." />
      </Helmet>

      <Header />

      <main className="flex-grow pt-32">
        <section className="py-20 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollRevealAnimation>
              <div className="text-center mb-16">
                <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 tracking-tight">
                  Our <span className="text-gradient-primary">Services</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  Comprehensive digital solutions designed to help your business grow and succeed in the modern marketplace
                </p>
              </div>
            </ScrollRevealAnimation>
          </div>
        </section>

        <section className="py-12 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollRevealAnimation stagger={true}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service, index) => (
                  <ServiceCard key={service.id} service={service} index={index} />
                ))}
              </div>
            </ScrollRevealAnimation>
          </div>
        </section>

        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent" />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <ScrollRevealAnimation>
              <div className="glass-base p-16 rounded-3xl border-primary/20 shadow-[0_0_50px_rgba(255,215,0,0.1)]">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
                  Need a custom solution?
                </h2>
                <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
                  We understand that every business is unique. Let's discuss how we can tailor our services to meet your specific needs and goals.
                </p>
                <GlowButton variant="primary" onClick={() => navigate('/contact')}>
                  Get in Touch
                </GlowButton>
              </div>
            </ScrollRevealAnimation>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ServicesPage;