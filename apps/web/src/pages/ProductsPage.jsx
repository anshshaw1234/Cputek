import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ScrollRevealAnimation from '@/components/ScrollRevealAnimation.jsx';
import ProductCard from '@/components/ProductCard.jsx';
import GlowButton from '@/components/GlowButton.jsx';
import { productsData } from '@/data/products.js';

const ProductsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Our Products - CPUtek | AI Business Platforms</title>
        <meta
          name="description"
          content="Explore CPUtek's AI learning, website knowledge, and compliance intelligence products."
        />
      </Helmet>

      <Header />

      <main className="flex-grow pt-32">
        <section className="py-20 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollRevealAnimation>
              <div className="text-center mb-12">
                <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 tracking-tight">
                  Our <span className="text-gradient-primary">Products</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  Turn business knowledge into practical learning, helpful website experiences, and
                  clearer compliance operations.
                </p>
              </div>
            </ScrollRevealAnimation>
          </div>
        </section>

        <section className="pb-20 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollRevealAnimation stagger>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {productsData.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            </ScrollRevealAnimation>
          </div>
        </section>

        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent" />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <ScrollRevealAnimation>
              <div className="glass-base p-10 md:p-16 rounded-3xl border-primary/20 shadow-[0_0_50px_rgba(255,215,0,0.1)]">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
                  Want to see a demo?
                </h2>
                <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                  Talk with our team about the product that fits your organization.
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
