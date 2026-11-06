import React from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle2, ShieldCheck, Target, ArrowRight } from 'lucide-react';
import ScrollRevealAnimation from '@/components/ScrollRevealAnimation.jsx';

const ProductionApproachSection = ({ approach }) => {
  if (!approach) return null;

  return (
    <section className="py-24 relative border-t border-white/10 bg-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollRevealAnimation>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">
                Our Production Approach
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl">
                A proven, step-by-step methodology designed to deliver exceptional results on time and within budget.
              </p>
            </div>
            {approach.timeline && (
              <div className="flex items-center gap-3 bg-primary/10 border border-primary/20 px-6 py-3 rounded-2xl w-fit">
                <Clock className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-xs text-primary/80 font-medium uppercase tracking-wider">Estimated Timeline</p>
                  <p className="text-foreground font-semibold">{approach.timeline}</p>
                </div>
              </div>
            )}
          </div>
        </ScrollRevealAnimation>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Left Column: Steps Timeline */}
          <div className="lg:col-span-7">
            <ScrollRevealAnimation>
              <h3 className="text-xl font-semibold text-foreground mb-8 flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Process Steps
              </h3>
            </ScrollRevealAnimation>
            
            <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
              {approach.steps?.map((step, index) => (
                <ScrollRevealAnimation key={index} delay={index * 0.1}>
                  <div className="relative flex items-start justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    {/* Timeline Dot */}
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-primary/20 text-primary shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 group-hover:bg-primary group-hover:text-primary-foreground smooth-transition">
                      <span className="text-sm font-bold">{index + 1}</span>
                    </div>
                    
                    {/* Content Card */}
                    <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] glass-card p-6 rounded-2xl group-hover:border-primary/30 smooth-transition ml-4 md:ml-0">
                      <h4 className="text-lg font-bold text-foreground mb-2">{step.title}</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </ScrollRevealAnimation>
              ))}
            </div>
          </div>

          {/* Right Column: Deliverables & QA */}
          <div className="lg:col-span-5 space-y-8">
            {approach.deliverables && approach.deliverables.length > 0 && (
              <ScrollRevealAnimation delay={0.2}>
                <div className="glass-base p-8 rounded-3xl border-white/5">
                  <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    Key Deliverables
                  </h3>
                  <ul className="space-y-4">
                    {approach.deliverables.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <ArrowRight className="w-4 h-4 text-primary/70 mt-1 shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollRevealAnimation>
            )}

            {approach.qualityAssurance && approach.qualityAssurance.length > 0 && (
              <ScrollRevealAnimation delay={0.3}>
                <div className="glass-base p-8 rounded-3xl border-white/5 bg-primary/5">
                  <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                    Quality Assurance
                  </h3>
                  <ul className="space-y-4">
                    {approach.qualityAssurance.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollRevealAnimation>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductionApproachSection;