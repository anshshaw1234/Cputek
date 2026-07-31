import React from 'react';
import { Helmet } from 'react-helmet';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, ArrowRight } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ScrollRevealAnimation from '@/components/ScrollRevealAnimation.jsx';
import GlowButton from '@/components/GlowButton.jsx';
import ProductionApproachSection from '@/components/ProductionApproachSection.jsx';
import FAQSection from '@/components/FAQSection.jsx';
import { servicesData } from '@/data/services.js';

const ServiceDetailPage = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();

  const service = servicesData.find(s => s.slug === serviceId);

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center glass-base p-12 rounded-3xl">
            <h1 className="text-4xl font-bold text-foreground mb-6">Service not found</h1>
            <GlowButton variant="primary" onClick={() => navigate('/')}>
              Back to Home
            </GlowButton>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const relatedServices = service.relatedServices
    ?.map(slug => servicesData.find(s => s.slug === slug))
    .filter(Boolean) || [];

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{`${service.title} - CPUtek Services`}</title>
        <meta name="description" content={service.description} />
      </Helmet>

      <Header />

      <main className="flex-grow pt-32">
        {/* Hero Section */}
        <section className="py-12 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollRevealAnimation>
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-muted-foreground hover:text-primary smooth-transition mb-8 glass-button px-4 py-2 rounded-full text-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
            </ScrollRevealAnimation>

            <ScrollRevealAnimation delay={0.1}>
              <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6 border border-primary/20">
                {service.category}
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 tracking-tight">
                {service.title}
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
                {service.description}
              </p>
            </ScrollRevealAnimation>
          </div>
        </section>

        {/* Key Features Section */}
        <section className="py-16 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollRevealAnimation>
              <h2 className="text-3xl font-bold text-foreground mb-10">Key Features & Benefits</h2>
            </ScrollRevealAnimation>
            
            <ScrollRevealAnimation stagger={true}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {service.keyFeatures.map((feature, index) => (
                  <div key={index} className="glass-card p-6 rounded-2xl flex items-start gap-4 group hover:border-primary/30 smooth-transition">
                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5 group-hover:scale-110 smooth-transition" />
                    <span className="text-lg text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </ScrollRevealAnimation>
          </div>
        </section>

        {/* Production Approach Section */}
        <ProductionApproachSection approach={service.productionApproach} />

        {/* Portfolio Section */}
        {/* {service.portfolioItems && service.portfolioItems.length > 0 && (
          <section className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <ScrollRevealAnimation>
                <h2 className="text-4xl font-bold text-foreground mb-12 text-center tracking-tight">
                  Sample Projects
                </h2>
              </ScrollRevealAnimation>

              <ScrollRevealAnimation stagger={true}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {service.portfolioItems.map((image, index) => (
                    <div key={index} className="group relative overflow-hidden rounded-3xl glass-card aspect-video">
                      <img
                        src={image}
                        alt={`${service.title} portfolio example ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 smooth-transition flex items-end p-8">
                        <span className="text-white font-medium text-lg translate-y-4 group-hover:translate-y-0 smooth-transition">View Project</span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollRevealAnimation>
            </div>
          </section>
        )} */}

        {/* FAQ Section */}
        <FAQSection faqs={service.faqs} />

        {/* CTA Section */}
        <section className="py-24 relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <ScrollRevealAnimation>
              <div className="glass-base p-16 rounded-3xl border-primary/20 shadow-[0_0_50px_rgba(255,215,0,0.1)]">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
                  Ready to elevate your brand?
                </h2>
                <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
                  Let's discuss how our {service.title} services can help your business achieve its goals.
                </p>
                <GlowButton variant="primary" onClick={() => navigate('/contact')}>
                  Get Started Today
                </GlowButton>
              </div>
            </ScrollRevealAnimation>
          </div>
        </section>

        {/* Related Services Section */}
        {relatedServices.length > 0 && (
          <section className="py-24 relative border-t border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollRevealAnimation>
                <h2 className="text-3xl font-bold text-foreground mb-12">Related Services</h2>
              </ScrollRevealAnimation>

              <ScrollRevealAnimation stagger={true}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {relatedServices.map((related, index) => (
                    <Link 
                      key={index} 
                      to={`/services/${related.slug}`}
                      className="glass-card p-8 rounded-2xl flex flex-col group hover:bg-white/10 hover:shadow-[0_10px_40px_-10px_rgba(255,215,0,0.15)] hover:border-primary/30 smooth-transition h-full"
                    >
                      <div className="inline-block px-3 py-1 rounded-full bg-white/5 text-primary text-xs font-medium mb-4 w-max border border-white/10">
                        {related.category}
                      </div>
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary smooth-transition mb-3">
                        {related.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">
                        {related.description}
                      </p>
                      <div className="flex items-center text-primary font-semibold text-sm group-hover:translate-x-2 smooth-transition mt-auto">
                        Explore service
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </div>
                    </Link>
                  ))}
                </div>
              </ScrollRevealAnimation>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ServiceDetailPage;