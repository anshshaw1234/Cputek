import React from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
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
        {product.contentSections ? (
          <>
            <section className="relative overflow-hidden py-12 md:py-20">
              <div className="pointer-events-none absolute -left-36 top-8 h-96 w-96 rounded-full bg-primary/10 blur-[120px]" />
              <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-sky-400/10 blur-[120px]" />
              <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8">
                <ScrollRevealAnimation>
                  <Link
                    to="/products"
                    className="mb-10 inline-flex items-center gap-2 rounded-full glass-button px-4 py-2 text-sm text-muted-foreground hover:text-primary smooth-transition"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    All Products
                  </Link>
                  <div className="mb-6 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                    <span className="rounded-xl glass-button p-3">
                      <ProductIcon className="h-6 w-6" />
                    </span>
                    {product.heroEyebrow}
                  </div>
                  <h1 className="max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-7xl">
                    {product.title}
                  </h1>
                  <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground md:text-xl">
                    {product.description}
                  </p>
                  <div className="mt-9 flex flex-wrap items-center gap-4">
                    <GlowButton variant="primary" onClick={() => navigate('/contact')}>
                      Request a Demo
                    </GlowButton>
                    <a href="#how-it-works" className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary smooth-transition">
                      Explore the platform <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </ScrollRevealAnimation>

                <ScrollRevealAnimation direction="right">
                  <div className="relative mx-auto w-full max-w-lg">
                    <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-primary/20 via-transparent to-sky-400/20 blur-2xl" />
                    <div className="relative rounded-[2rem] border border-white/15 bg-[#111113]/90 p-5 shadow-2xl backdrop-blur-xl sm:p-7">
                      <div className="mb-7 flex items-center justify-between border-b border-white/10 pb-5">
                        <div>
                          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{product.heroPanelEyebrow}</p>
                          <h2 className="mt-1 text-xl font-bold text-foreground">{product.heroPanelTitle}</h2>
                        </div>
                        <span className="rounded-xl bg-primary/10 p-3 text-primary"><Sparkles className="h-5 w-5" /></span>
                      </div>
                      <div className="space-y-3">
                        {product.heroHighlights.map(({ icon: ItemIcon, title, detail }, index) => (
                          <div key={title} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                            <span className={`rounded-xl p-3 ${index === 0 ? 'bg-primary/10 text-primary' : 'bg-white/[0.06] text-muted-foreground'}`}>
                              <ItemIcon className="h-5 w-5" />
                            </span>
                            <span>
                              <span className="block font-semibold text-foreground">{title}</span>
                              <span className="mt-1 block text-sm leading-5 text-muted-foreground">{detail}</span>
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </ScrollRevealAnimation>
              </div>
            </section>

            <section id="how-it-works" className="scroll-mt-28 py-10 md:py-16">
              <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                <ScrollRevealAnimation>
                  <div className="mb-14 max-w-2xl">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">{product.sectionEyebrow}</p>
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{product.sectionHeading}</h2>
                    <div className="mt-4 space-y-4">
                      {product.overview.split(/\n{2,}/).map((paragraph) => (
                        <p key={paragraph} className="text-lg leading-8 text-muted-foreground">{paragraph}</p>
                      ))}
                    </div>
                  </div>
                </ScrollRevealAnimation>

                <div className="space-y-6">
                  {product.contentSections.map((section, index) => (
                    <ScrollRevealAnimation key={section.title} delay={index * 0.06}>
                      <article className="grid gap-6 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.025] p-6 sm:p-9 md:grid-cols-[200px_1fr] md:gap-10">
                        <div>
                          <p className="text-sm font-semibold tracking-[0.18em] text-primary">0{index + 1} / 0{product.contentSections.length}</p>
                          <h3 className="mt-3 text-2xl font-bold leading-tight text-foreground">{section.title}</h3>
                        </div>
                        <div className="space-y-5">
                          {section.paragraphs.map((paragraph) => (
                            <p key={paragraph} className="text-base leading-8 text-muted-foreground md:text-lg">
                              {paragraph}
                            </p>
                          ))}
                          {section.capabilities && (
                            <ul className="space-y-3 pt-2">
                              {section.capabilities.map((capability) => (
                                <li key={capability} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-6 text-muted-foreground sm:text-base">
                                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                                  <span>{capability}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </article>
                    </ScrollRevealAnimation>
                  ))}
                </div>
              </div>
            </section>

            <section className="py-16 md:py-24">
              <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                <ScrollRevealAnimation>
                  <div className="relative overflow-hidden rounded-[2rem] border border-primary/20 bg-gradient-to-br from-primary/10 via-white/[0.05] to-sky-400/10 p-8 shadow-[0_0_60px_rgba(255,215,0,0.08)] sm:p-14">
                    <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
                    <p className="relative mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary">{product.ctaEyebrow}</p>
                    <h2 className="relative text-3xl font-bold tracking-tight text-foreground sm:text-5xl">{product.ctaTitle}</h2>
                    <p className="relative mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
                      {product.ctaDescription}
                    </p>
                    <div className="relative mt-8">
                      <GlowButton variant="primary" onClick={() => navigate('/contact')}>
                        Request a Demo
                      </GlowButton>
                    </div>
                  </div>
                </ScrollRevealAnimation>
              </div>
            </section>
          </>
        ) : (
          <>
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
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetailPage;
