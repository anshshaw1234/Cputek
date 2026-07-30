import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { Users, TrendingUp, Award, Heart } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ScrollRevealAnimation from '@/components/ScrollRevealAnimation.jsx';
import GlowButton from '@/components/GlowButton.jsx';

const CareersPage = () => {
  const navigate = useNavigate();

  const benefits = [
    { icon: <Users className="w-8 h-8" />, title: 'Collaborative Culture', description: 'Work with talented professionals in a supportive, inclusive environment where ideas are valued.' },
    { icon: <TrendingUp className="w-8 h-8" />, title: 'Growth Opportunities', description: 'Continuous learning programs, mentorship, and clear career progression paths.' },
    { icon: <Award className="w-8 h-8" />, title: 'Competitive Benefits', description: 'Attractive compensation, health insurance, and performance bonuses.' },
    { icon: <Heart className="w-8 h-8" />, title: 'Work-Life Balance', description: 'Flexible working hours, remote work options, and generous time off policies.' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Careers at CPUtek - Join Our Team</title>
        <meta name="description" content="Join CPUtek's talented team and build your career in a dynamic, innovative environment. Explore opportunities in design, development, marketing, and more." />
      </Helmet>

      <Header />

      <main className="flex-grow pt-32">
        <section className="py-20 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollRevealAnimation>
              <div className="text-center mb-16">
                <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 tracking-tight">
                  Join our <span className="text-gradient-primary">Team</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  Build your career with a company that values innovation, creativity, and personal growth
                </p>
              </div>
            </ScrollRevealAnimation>
          </div>
        </section>

        <section className="py-12 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollRevealAnimation>
              <div className="glass-base p-12 md:p-16 rounded-3xl mb-16">
                <h2 className="text-3xl font-bold text-foreground mb-6">Why work at CPUtek?</h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  At CPUtek, we believe that our people are our greatest asset. We've built a culture that encourages creativity, rewards innovation, and supports professional development at every stage of your career.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Whether you're a designer, developer, marketer, or strategist, you'll find opportunities to work on exciting projects, collaborate with talented colleagues, and make a real impact on businesses around the world.
                </p>
              </div>
            </ScrollRevealAnimation>

            <ScrollRevealAnimation stagger={true}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="glass-card p-10 rounded-3xl group hover:border-primary/30 smooth-transition">
                    <div className="inline-flex p-4 rounded-xl glass-button text-primary mb-6 group-hover:scale-110 smooth-transition">
                      {benefit.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">{benefit.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </ScrollRevealAnimation>
          </div>
        </section>

        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <ScrollRevealAnimation>
              <div className="glass-base p-12 md:p-16 rounded-3xl">
                <h2 className="text-3xl font-bold text-foreground mb-8">Our work culture</h2>
                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    We foster an environment where creativity thrives and innovation is encouraged. Our team members are empowered to take ownership of their projects, experiment with new ideas, and push the boundaries of what's possible.
                  </p>
                  <p>
                    Collaboration is at the heart of everything we do. We believe that the best solutions come from diverse perspectives working together, and we've built our processes and workspace to facilitate seamless teamwork.
                  </p>
                  <p>
                    Professional development is a priority. We invest in our team through training programs, conference attendance, skill-building workshops, and mentorship opportunities that help you grow your career.
                  </p>
                  <p>
                    Work-life balance matters. We understand that our team members have lives outside of work, and we support that through flexible schedules, remote work options, and a culture that respects personal time.
                  </p>
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
                  Ready to join us?
                </h2>
                <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
                  We're always looking for talented individuals who are passionate about creating exceptional digital experiences. Send us your resume and let's start a conversation.
                </p>
                <GlowButton variant="primary" onClick={() => navigate('/contact')}>
                  Send Your Resume
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

export default CareersPage;