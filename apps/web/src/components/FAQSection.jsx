import React from 'react';
import { HelpCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion.jsx";
import ScrollRevealAnimation from '@/components/ScrollRevealAnimation.jsx';

const FAQSection = ({ faqs }) => {
  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="py-24 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollRevealAnimation>
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-6">
              <HelpCircle className="w-6 h-6" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to know about this service and how we work.
            </p>
          </div>
        </ScrollRevealAnimation>

        <ScrollRevealAnimation delay={0.2}>
          <div className="glass-card p-6 md:p-8 rounded-3xl">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="border border-white/10 bg-black/20 rounded-xl px-6 data-[state=open]:bg-white/5 data-[state=open]:border-primary/30 smooth-transition"
                >
                  <AccordionTrigger className="text-left text-base md:text-lg font-medium text-foreground hover:text-primary hover:no-underline py-6">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </ScrollRevealAnimation>
      </div>
    </section>
  );
};

export default FAQSection;