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
import { industriesData } from '@/data/industries.js';


const IndustryDetailPage = () => {
  const { industryId } = useParams();

  const navigate = useNavigate();

  const industry = industriesData.find(
    i => i.slug === industryId
  );

  if (!industry) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center glass-base p-12 rounded-3xl">
            <h1 className="text-4xl font-bold text-foreground mb-6">Industry not found</h1>
            <GlowButton variant="primary" onClick={() => navigate('/')}>
              Back to Home
            </GlowButton>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{`${industry.title} - Industries | CPUtek`}</title>
        <meta name="description" content={industry.description} />
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
                {industry.category}
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 tracking-tight">
                {industry.title}
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
                {industry.description}
              </p>
            </ScrollRevealAnimation>
          </div>
        </section>

        {/* Industry Overview Section */}
        {/* <section className="py-16 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollRevealAnimation>
              <h2 className="text-3xl font-bold text-foreground mb-10">Industry Overview</h2>
              <div className="glass-card p-8 rounded-2xl">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {industry.overview || industry.description}
                </p>
              </div>
            </ScrollRevealAnimation>
          </div>
        </section> */}

        {/* Key Features Section */}
        <section className="py-16 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollRevealAnimation>
              <h2 className="text-3xl font-bold text-foreground mb-10">Key Features & Benefits</h2>
            </ScrollRevealAnimation>

            <ScrollRevealAnimation stagger={true}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {industry.keyFeatures.map((feature, index) => (
                  <div key={index} className="glass-card p-6 rounded-2xl flex items-start gap-4 group hover:border-primary/30 smooth-transition">
                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5 group-hover:scale-110 smooth-transition" />
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-1">{feature.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollRevealAnimation>
          </div>
        </section>

        {/* Our Production Approach Section */}
        <section className="py-16 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollRevealAnimation>
              {/* <h2 className="text-3xl font-bold text-foreground mb-10">Our Production Approach</h2> */}
            </ScrollRevealAnimation>

            <ScrollRevealAnimation delay={0.1}>
              <ProductionApproachSection approach={industry.productionApproach} />
            </ScrollRevealAnimation>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollRevealAnimation>
              {/* <h2 className="text-3xl font-bold text-foreground mb-10">Frequently Asked Questions</h2> */}
            </ScrollRevealAnimation>

            <ScrollRevealAnimation delay={0.1}>
              <FAQSection faqs={industry.faqs} />
            </ScrollRevealAnimation>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <ScrollRevealAnimation>
              <div className="glass-base p-16 rounded-3xl border-primary/20 shadow-[0_0_50px_rgba(255,215,0,0.1)]">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
                  Ready to elevate your brand?
                </h2>
                <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
                  Let's discuss how our solutions for the {industry.title} industry can help your business achieve its goals.
                </p>
                <GlowButton variant="primary" onClick={() => navigate('/contact')}>
                  Get Started Today
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

export default IndustryDetailPage;