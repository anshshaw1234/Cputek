import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ArrowLeft, CheckCircle2, Briefcase, ArrowRight } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ScrollRevealAnimation from '@/components/ScrollRevealAnimation.jsx';
import GlowButton from '@/components/GlowButton.jsx';
import { hrServices } from '@/data/hrServices.js';

const HRServiceDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);

  useEffect(() => {
    const foundService = hrServices.find(s => s.slug === slug);
    if (foundService) {
      setService(foundService);
    } else {
      navigate('/services');
    }
  }, [slug, navigate]);

  if (!service) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{`${service.title} | CPUtek HR Services`}</title>
        <meta name="description" content={service.shortDescription} />
      </Helmet>

      <Header />

      <main className="flex-grow pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <ScrollRevealAnimation>
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center text-muted-foreground hover:text-primary smooth-transition mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 smooth-transition" />
              Back
            </button>

            <div className="glass-base p-8 md:p-12 rounded-3xl mb-12 border-primary/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              
              <div className="relative z-10">
                <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
                  Human Resources (HR) Services
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight">
                  {service.title}
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          </ScrollRevealAnimation>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              
              <ScrollRevealAnimation direction="up" delay={0.1}>
                <section>
                  <h2 className="text-3xl font-bold text-foreground mb-8 flex items-center gap-3">
                    <CheckCircle2 className="text-primary w-8 h-8" />
                    Key Features
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="glass-card p-6 rounded-2xl flex items-start gap-4">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <p className="text-foreground font-medium">{feature}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </ScrollRevealAnimation>

              <ScrollRevealAnimation direction="up" delay={0.2}>
                <section>
                  <h2 className="text-3xl font-bold text-foreground mb-8 flex items-center gap-3">
                    <Briefcase className="text-primary w-8 h-8" />
                    Business Benefits
                  </h2>
                  <div className="glass-base p-8 rounded-3xl">
                    <ul className="space-y-4">
                      {service.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-center gap-4 text-muted-foreground">
                          <CheckCircle2 className="w-5 h-5 text-primary/70 flex-shrink-0" />
                          <span className="text-lg">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>
              </ScrollRevealAnimation>

              {service.caseStudies && service.caseStudies.length > 0 && (
                <ScrollRevealAnimation direction="up" delay={0.3}>
                  <section>
                    <h2 className="text-3xl font-bold text-foreground mb-8">Case Studies & Impact</h2>
                    <div className="space-y-6">
                      {service.caseStudies.map((study, idx) => (
                        <div key={idx} className="glass-card p-8 rounded-3xl border-l-4 border-l-primary">
                          <h3 className="text-xl font-bold text-foreground mb-3">{study.title}</h3>
                          <p className="text-muted-foreground mb-4">{study.description}</p>
                          <div className="bg-primary/10 text-primary px-4 py-3 rounded-xl font-medium inline-block">
                            Result: {study.result}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                </ScrollRevealAnimation>
              )}
            </div>

            <div className="lg:col-span-1">
              <ScrollRevealAnimation direction="left" delay={0.4}>
                <div className="sticky top-32 space-y-8">
                  <div className="glass-base p-8 rounded-3xl text-center">
                    <h3 className="text-2xl font-bold text-foreground mb-4">Ready to optimize your HR?</h3>
                    <p className="text-muted-foreground mb-8">
                      Let's discuss how our Human Resources solutions can transform your organization.
                    </p>
                    <GlowButton variant="primary" className="w-full" onClick={() => navigate('/contact')}>
                      Consult an Expert
                    </GlowButton>
                  </div>

                  {service.relatedServices && service.relatedServices.length > 0 && (
                    <div className="glass-card p-8 rounded-3xl">
                      <h3 className="text-xl font-bold text-foreground mb-6">Related Services</h3>
                      <div className="space-y-4">
                        {service.relatedServices.map((relatedSlug, idx) => {
                          const related = hrServices.find(s => s.slug === relatedSlug);
                          if (!related) return null;
                          return (
                            <Link 
                              key={idx}
                              to={`/services/hr/${related.slug}`}
                              className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-primary/30 smooth-transition group"
                            >
                              <span className="font-medium text-sm text-foreground group-hover:text-primary smooth-transition">
                                {related.title}
                              </span>
                              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 smooth-transition" />
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </ScrollRevealAnimation>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HRServiceDetailPage;
