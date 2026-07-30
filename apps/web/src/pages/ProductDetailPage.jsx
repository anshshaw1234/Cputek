import React from 'react';
import { Helmet } from 'react-helmet';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Zap, Shield, BarChart3 } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ScrollRevealAnimation from '@/components/ScrollRevealAnimation.jsx';
import GlowButton from '@/components/GlowButton.jsx';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const productsData = {
    'ai-chatbot': {
      title: 'Personalized AI Chatbot for Companies',
      description: 'Transform customer support with intelligent AI chatbots that understand context and provide human-like assistance.',
      longDescription: 'Our AI Chatbot solution uses advanced natural language processing to understand customer queries and provide accurate, helpful responses 24/7. Train the chatbot on your company data, FAQs, and knowledge base to create a truly personalized experience.',
      features: [
        { icon: <Zap className="w-6 h-6" />, title: 'Instant Responses', description: 'Answer customer queries in real-time, reducing wait times to zero' },
        { icon: <Shield className="w-6 h-6" />, title: 'Secure & Compliant', description: 'Enterprise-grade security with GDPR and data privacy compliance' },
        { icon: <BarChart3 className="w-6 h-6" />, title: 'Analytics Dashboard', description: 'Track conversations, satisfaction scores, and performance metrics' },
      ],
      benefits: ['Reduce support costs by up to 67%', 'Handle unlimited conversations simultaneously', 'Improve customer satisfaction scores', 'Free up human agents for complex issues', 'Provide 24/7 multilingual support', 'Integrate with existing CRM and tools'],
      useCases: ['Customer support automation', 'Lead qualification and routing', 'Product recommendations', 'Order tracking and updates', 'FAQ and knowledge base access', 'Appointment scheduling'],
      pricing: {
        starter: { price: '$49', features: ['Up to 1,000 conversations/month', 'Basic analytics', 'Email support'] },
        professional: { price: '$149', features: ['Up to 10,000 conversations/month', 'Advanced analytics', 'Priority support', 'Custom branding'] },
        enterprise: { price: 'Custom', features: ['Unlimited conversations', 'Dedicated account manager', 'Custom integrations', 'SLA guarantee'] },
      },
    },
    'lead-generator': {
      title: 'Lead Generator Tool',
      description: 'Capture, qualify, and convert more leads with intelligent forms and landing pages optimized for conversions.',
      longDescription: 'Our Lead Generator Tool helps businesses capture high-quality leads through smart forms, optimized landing pages, and automated qualification workflows. Integrate with your CRM and marketing automation tools for seamless lead management.',
      features: [
        { icon: <Zap className="w-6 h-6" />, title: 'Smart Forms', description: 'Dynamic forms that adapt based on user responses' },
        { icon: <Shield className="w-6 h-6" />, title: 'Lead Scoring', description: 'Automatically qualify and prioritize leads based on behavior' },
        { icon: <BarChart3 className="w-6 h-6" />, title: 'A/B Testing', description: 'Test different variations to maximize conversion rates' },
      ],
      benefits: ['Increase lead capture rates by 240%', 'Reduce cost per lead significantly', 'Qualify leads automatically', 'Integrate with popular CRMs', 'Track ROI on marketing campaigns', 'Build unlimited landing pages'],
      useCases: ['Event registration and webinars', 'Product demo requests', 'Newsletter subscriptions', 'Free trial signups', 'Contact form submissions', 'Quote requests'],
      pricing: {
        starter: { price: '$79', features: ['5 landing pages', 'Up to 500 leads/month', 'Basic integrations'] },
        professional: { price: '$199', features: ['Unlimited landing pages', 'Up to 5,000 leads/month', 'Advanced integrations', 'A/B testing'] },
        enterprise: { price: 'Custom', features: ['Unlimited everything', 'White-label options', 'Dedicated support', 'Custom development'] },
      },
    },
    'ai-content-writer': {
      title: 'AI Content Writer',
      description: 'Generate high-quality, SEO-optimized content at scale with AI trained on your brand voice and industry expertise.',
      longDescription: 'Our AI Content Writer helps businesses create blog posts, social media content, product descriptions, and marketing copy in minutes. Train the AI on your existing content to maintain consistent brand voice and style.',
      features: [
        { icon: <Zap className="w-6 h-6" />, title: 'Multiple Content Types', description: 'Blog posts, social media, emails, product descriptions, and more' },
        { icon: <Shield className="w-6 h-6" />, title: 'SEO Optimization', description: 'Built-in SEO suggestions and keyword optimization' },
        { icon: <BarChart3 className="w-6 h-6" />, title: 'Brand Voice Training', description: 'Train AI on your existing content for consistent tone' },
      ],
      benefits: ['Create content 10x faster', 'Maintain consistent brand voice', 'Improve SEO rankings', 'Reduce content creation costs', 'Scale content production', 'Generate ideas and outlines'],
      useCases: ['Blog post writing', 'Social media content', 'Email marketing campaigns', 'Product descriptions', 'Ad copy creation', 'Content ideation'],
      pricing: {
        starter: { price: '$39', features: ['50,000 words/month', 'Basic templates', 'Email support'] },
        professional: { price: '$99', features: ['200,000 words/month', 'Advanced templates', 'SEO tools', 'Priority support'] },
        enterprise: { price: 'Custom', features: ['Unlimited words', 'Custom templates', 'API access', 'Dedicated account manager'] },
      },
    },
  };

  const product = productsData[productId];

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center glass-base p-12 rounded-3xl">
            <h1 className="text-4xl font-bold text-foreground mb-6">Product not found</h1>
            <GlowButton variant="primary" onClick={() => navigate('/products')}>
              Back to Products
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
        <title>{`${product.title} - CPUtek Products`}</title>
        <meta name="description" content={product.description} />
      </Helmet>

      <Header />

      <main className="flex-grow pt-32">
        <section className="py-12 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollRevealAnimation>
              <button
                onClick={() => navigate('/products')}
                className="flex items-center gap-2 text-muted-foreground hover:text-primary smooth-transition mb-8 glass-button px-4 py-2 rounded-full text-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Products
              </button>
            </ScrollRevealAnimation>

            <ScrollRevealAnimation delay={0.1}>
              <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 tracking-tight">
                {product.title}
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
                {product.description}
              </p>
            </ScrollRevealAnimation>
          </div>
        </section>

        <section className="py-12 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollRevealAnimation>
              <div className="glass-base p-12 rounded-3xl mb-16">
                <p className="text-lg text-foreground leading-relaxed">
                  {product.longDescription}
                </p>
              </div>
            </ScrollRevealAnimation>

            <ScrollRevealAnimation delay={0.1}>
              <h2 className="text-4xl font-bold text-foreground mb-12 text-center tracking-tight">
                Key Features
              </h2>
            </ScrollRevealAnimation>

            <ScrollRevealAnimation stagger={true}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                {product.features.map((feature, index) => (
                  <div key={index} className="glass-card p-8 rounded-3xl group hover:border-primary/30 smooth-transition">
                    <div className="inline-flex p-4 rounded-xl glass-button text-primary mb-6 group-hover:scale-110 smooth-transition">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                ))}
              </div>
            </ScrollRevealAnimation>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <ScrollRevealAnimation direction="left">
                <div className="glass-card p-10 rounded-3xl h-full">
                  <h2 className="text-3xl font-bold text-foreground mb-8">Benefits</h2>
                  <ul className="space-y-5">
                    {product.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-4">
                        <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground text-lg">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollRevealAnimation>

              <ScrollRevealAnimation direction="right">
                <div className="glass-card p-10 rounded-3xl h-full">
                  <h2 className="text-3xl font-bold text-foreground mb-8">Use Cases</h2>
                  <ul className="space-y-5">
                    {product.useCases.map((useCase, index) => (
                      <li key={index} className="flex items-start gap-4">
                        <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground text-lg">{useCase}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollRevealAnimation>
            </div>
          </div>
        </section>

        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <ScrollRevealAnimation>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-12 text-center tracking-tight">
                Pricing Plans
              </h2>
            </ScrollRevealAnimation>

            <ScrollRevealAnimation stagger={true}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="glass-card p-10 rounded-3xl flex flex-col">
                  <h3 className="text-2xl font-bold text-foreground mb-2">Starter</h3>
                  <div className="text-4xl font-bold text-primary mb-8">{product.pricing.starter.price}<span className="text-lg text-muted-foreground font-normal">/mo</span></div>
                  <ul className="space-y-4 mb-10 flex-grow">
                    {product.pricing.starter.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3 text-muted-foreground">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <GlowButton variant="secondary" className="w-full" onClick={() => navigate('/contact')}>
                    Get Started
                  </GlowButton>
                </div>

                <div className="glass-base p-10 rounded-3xl border-primary/40 shadow-[0_0_40px_rgba(255,215,0,0.15)] scale-105 flex flex-col relative overflow-hidden">
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
                  <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6 w-max border border-primary/20">
                    Recommended
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">Professional</h3>
                  <div className="text-4xl font-bold text-primary mb-8">{product.pricing.professional.price}<span className="text-lg text-muted-foreground font-normal">/mo</span></div>
                  <ul className="space-y-4 mb-10 flex-grow">
                    {product.pricing.professional.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3 text-muted-foreground">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <GlowButton variant="primary" className="w-full" onClick={() => navigate('/contact')}>
                    Get Started
                  </GlowButton>
                </div>

                <div className="glass-card p-10 rounded-3xl flex flex-col">
                  <h3 className="text-2xl font-bold text-foreground mb-2">Enterprise</h3>
                  <div className="text-4xl font-bold text-primary mb-8">{product.pricing.enterprise.price}</div>
                  <ul className="space-y-4 mb-10 flex-grow">
                    {product.pricing.enterprise.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3 text-muted-foreground">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <GlowButton variant="secondary" className="w-full" onClick={() => navigate('/contact')}>
                    Contact Sales
                  </GlowButton>
                </div>
              </div>
            </ScrollRevealAnimation>
          </div>
        </section>

        <section className="py-32 relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <ScrollRevealAnimation>
              <div className="glass-base p-16 rounded-3xl border-primary/20 shadow-[0_0_50px_rgba(255,215,0,0.1)]">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
                  Ready to get started?
                </h2>
                <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
                  Request a demo to see how {product.title} can transform your business.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <GlowButton variant="primary" onClick={() => navigate('/contact')}>
                    Request Demo
                  </GlowButton>
                  <GlowButton variant="secondary" onClick={() => navigate('/contact')}>
                    Contact Sales
                  </GlowButton>
                </div>
              </div>
            </ScrollRevealAnimation>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetailPage;