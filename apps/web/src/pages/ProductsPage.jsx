import React from 'react';
import { Helmet } from 'react-helmet';
import { Code, TrendingUp, Palette, MessageSquare, Target, PenTool } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ScrollRevealAnimation from '@/components/ScrollRevealAnimation.jsx';
import ProductCard from '@/components/ProductCard.jsx';
import GlowButton from '@/components/GlowButton.jsx';
import { useNavigate } from 'react-router-dom';

const ProductsPage = () => {
  const navigate = useNavigate();
  const products = [
    { id: 'ai-chatbot', title: 'Personalized AI Chatbot', description: 'Deploy intelligent chatbots that understand your business and provide 24/7 customer support with natural, human-like conversations.', icon: <MessageSquare className="w-8 h-8" /> },
    { id: 'lead-generator', title: 'Lead Generator Tool', description: 'Capture and qualify leads automatically with smart forms, optimized landing pages, and conversion-focused features.', icon: <Target className="w-8 h-8" /> },
    { id: 'ai-content-writer', title: 'AI Content Writer', description: 'Generate high-quality content at scale with AI-powered writing tools trained on your unique brand voice and style.', icon: <PenTool className="w-8 h-8" /> },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Our Products - CPUtek | AI-Powered SaaS Solutions</title>
        <meta name="description" content="Explore CPUtek's innovative SaaS products including AI chatbots, lead generation tools, and AI content writers designed to automate and optimize your business." />
      </Helmet>

      <Header />

      <main className="flex-grow pt-32">
        <section className="py-20 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollRevealAnimation>
              <div className="text-center mb-16">
                <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 tracking-tight">
                  Our <span className="text-gradient-primary">Products</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  Powerful SaaS solutions built to automate and optimize your business operations
                </p>
              </div>
            </ScrollRevealAnimation>
          </div>
        </section>

        <section className="py-12 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollRevealAnimation stagger={true}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {products.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
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
                  Want to see a demo?
                </h2>
                <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
                  Schedule a personalized demo to see how our products can transform your business operations.
                </p>
                <GlowButton variant="primary" onClick={() => navigate('/contact')}>
                  Request a Demo
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

export default ProductsPage;