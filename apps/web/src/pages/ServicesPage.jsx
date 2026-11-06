import React from 'react';
import { Helmet } from 'react-helmet';
import { Bot, GraduationCap, Film, Code, Palette, Users } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ScrollRevealAnimation from '@/components/ScrollRevealAnimation.jsx';
import ServiceCard from '@/components/ServiceCard.jsx';
import GlowButton from '@/components/GlowButton.jsx';
import { useNavigate } from 'react-router-dom';
import { servicesData } from '@/data/services.js';

const serviceIcons = [
  <Bot key="ai" className="w-8 h-8" />,
  <GraduationCap key="training" className="w-8 h-8" />,
  <Film key="animation" className="w-8 h-8" />,
  <Code key="software" className="w-8 h-8" />,
  <Palette key="design" className="w-8 h-8" />,
  <Users key="hr" className="w-8 h-8" />,
];

const ServicesPage = () => {
  const navigate = useNavigate();
  const services = servicesData.map((service, index) => ({
    id: service.slug,
    title: service.title,
    description: service.description,
    icon: serviceIcons[index],
  }));

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Our Services - CPUTEK | Digital Solutions & Creative Services</title>
        <meta
          name="description"
          content="Explore CPUTEK services including enterprise AI automation, eLearning, animation, enterprise software, creative design, and HR compliance."
        />
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
                  Comprehensive digital, creative, training, and enterprise solutions designed around your organization's needs.
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
              <div className="glass-base p-8 md:p-16 rounded-3xl border-primary/20 shadow-[0_0_50px_rgba(255,215,0,0.1)]">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
                  Need a custom solution?
                </h2>
                <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
                  Tell us about your goals and we'll help shape the right service plan for your team.
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
