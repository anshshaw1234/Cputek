import React from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ScrollRevealAnimation from '@/components/ScrollRevealAnimation.jsx';
import GlowButton from '@/components/GlowButton.jsx';
import { productsData } from '@/data/products.js';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const product = productsData.find((item) => item.id === productId);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center px-4 pt-24">
          <div className="text-center glass-base p-12 rounded-3xl">
            <h1 className="text-4xl font-bold text-foreground mb-6">Product not found</h1>
            <GlowButton variant="primary" onClick={() => navigate('/products')}>
              Browse Products
            </GlowButton>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const ProductIcon = product.icon;

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
              <Link
                to="/products"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary smooth-transition mb-8 glass-button px-4 py-2 rounded-full text-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                All Products
              </Link>
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 rounded-xl glass-button text-primary">
                  <ProductIcon className="w-8 h-8" />
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-foreground tracking-tight">
                  {product.title}
                </h1>
              </div>
              <p className="text-xl text-muted-foreground max-w-4xl leading-relaxed">
                {product.description}
              </p>
            </ScrollRevealAnimation>
          </div>
        </section>

        <section className="py-10 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollRevealAnimation>
              <div className="glass-base p-8 md:p-12 rounded-3xl">
                <h2 className="text-3xl font-bold text-foreground mb-5">Product Overview</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">{product.overview}</p>
              </div>
            </ScrollRevealAnimation>

            <ScrollRevealAnimation delay={0.1}>
              <h2 className="text-4xl font-bold text-foreground mt-20 mb-10 text-center tracking-tight">
                Key Features
              </h2>
            </ScrollRevealAnimation>

            <ScrollRevealAnimation stagger>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {product.features.map((feature) => (
                  <div
                    key={feature.title}
                    className="glass-card p-7 rounded-3xl group hover:border-primary/30 smooth-transition"
                  >
                    <div className="inline-flex p-3 rounded-xl glass-button text-primary mb-5 group-hover:scale-110 smooth-transition">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                ))}
              </div>
            </ScrollRevealAnimation>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
              <ScrollRevealAnimation direction="left">
                <div className="glass-card p-8 md:p-10 rounded-3xl h-full">
                  <h2 className="text-3xl font-bold text-foreground mb-7">Benefits</h2>
                  <ul className="space-y-5">
                    {product.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-4">
                        <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground leading-relaxed">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollRevealAnimation>

              <ScrollRevealAnimation direction="right">
                <div className="glass-card p-8 md:p-10 rounded-3xl h-full">
                  <h2 className="text-3xl font-bold text-foreground mb-7">Use Cases</h2>
                  <ul className="space-y-5">
                    {product.useCases.map((useCase) => (
                      <li key={useCase} className="flex items-start gap-4">
                        <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground leading-relaxed">{useCase}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollRevealAnimation>
            </div>
          </div>
        </section>

        <section className="py-24 relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <ScrollRevealAnimation>
              <div className="glass-base p-10 md:p-16 rounded-3xl border-primary/20 shadow-[0_0_50px_rgba(255,215,0,0.1)]">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
                  Ready to learn more?
                </h2>
                <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                  Contact our team to discuss how {product.title} can support your organization.
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

export default ProductDetailPage;
