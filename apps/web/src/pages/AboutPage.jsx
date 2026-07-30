import React from 'react';
import { Helmet } from 'react-helmet';
import { Target, Eye, Award, Users } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ScrollRevealAnimation from '@/components/ScrollRevealAnimation.jsx';
import TeamMemberCard from '@/components/TeamMemberCard.jsx';

const AboutPage = () => {
  const team = [
    { name: 'Rajesh Kumar', role: 'Chief Executive Officer', initials: 'RK', bio: 'Visionary leader with 15 years of experience in digital transformation.' },
    { name: 'Ananya Singh', role: 'Creative Director', initials: 'AS', bio: 'Award-winning designer passionate about creating memorable brand experiences.' },
    { name: 'Vikram Patel', role: 'Head of Technology', initials: 'VP', bio: 'Tech innovator specializing in scalable software architecture.' },
    { name: 'Meera Reddy', role: 'Marketing Strategist', initials: 'MR', bio: 'Data-driven marketer focused on delivering measurable ROI.' },
  ];

  const values = [
    { icon: <Target className="w-8 h-8" />, title: 'Innovation First', description: 'We stay ahead of industry trends and continuously explore new technologies to deliver cutting-edge solutions.' },
    { icon: <Users className="w-8 h-8" />, title: 'Client-Centric', description: 'Your success is our success. We build lasting partnerships through transparent communication and exceptional service.' },
    { icon: <Award className="w-8 h-8" />, title: 'Quality Excellence', description: 'We maintain the highest standards in every project, ensuring deliverables that exceed expectations.' },
    { icon: <Eye className="w-8 h-8" />, title: 'Strategic Vision', description: 'We think long-term, creating solutions that scale with your business and adapt to changing market needs.' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>About CPUtek - Our Story, Mission & Team</title>
        <meta name="description" content="Learn about CPUtek's mission to transform businesses through innovative digital solutions. Meet our expert team and discover our values." />
      </Helmet>

      <Header />

      <main className="flex-grow pt-32">
        <section className="py-20 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollRevealAnimation>
              <div className="text-center mb-16">
                <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 tracking-tight">
                  About <span className="text-gradient-primary">CPUtek</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  Building digital excellence since 2018
                </p>
              </div>
            </ScrollRevealAnimation>

            <ScrollRevealAnimation delay={0.2}>
              <div className="glass-base p-12 md:p-16 rounded-3xl">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div>
                    <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                    <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                      CPUtek Private Limited is a creative design agency committed to transforming ideas into digital reality. Founded in 2018, we've grown from a small team of passionate creators into a full-service digital agency serving clients across industries.
                    </p>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      Our approach combines strategic thinking, creative excellence, and technical expertise to deliver solutions that drive real business results. We believe in building long-term partnerships with our clients, understanding their unique challenges, and crafting tailored solutions that help them thrive in the digital age.
                    </p>
                  </div>
                  <div className="glass-card rounded-2xl aspect-square flex items-center justify-center bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
                    <img src="https://horizons-cdn.hostinger.com/b8bf1ebc-3a80-4638-bfc9-11e4faae84fe/a9594cf29cb58dea0157717bd1ad142a.png" alt="CPUtek Logo Large" className="w-1/2 opacity-80 drop-shadow-[0_0_30px_rgba(255,215,0,0.3)]" />
                  </div>
                </div>
              </div>
            </ScrollRevealAnimation>
          </div>
        </section>

        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <ScrollRevealAnimation direction="left">
                <div className="glass-card p-12 rounded-3xl h-full">
                  <div className="inline-flex p-4 rounded-2xl glass-button text-primary mb-8">
                    <Target className="w-10 h-10" />
                  </div>
                  <h2 className="text-3xl font-bold text-foreground mb-6">Our Mission</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    To empower businesses with innovative digital solutions that drive growth, enhance customer experiences, and create lasting value. We strive to be the trusted partner that helps organizations navigate the complexities of digital transformation with confidence.
                  </p>
                </div>
              </ScrollRevealAnimation>

              <ScrollRevealAnimation direction="right">
                <div className="glass-card p-12 rounded-3xl h-full">
                  <div className="inline-flex p-4 rounded-2xl glass-button text-primary mb-8">
                    <Eye className="w-10 h-10" />
                  </div>
                  <h2 className="text-3xl font-bold text-foreground mb-6">Our Vision</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    To become the leading creative agency in India, recognized for our innovative approach, exceptional quality, and measurable impact on our clients' success. We envision a future where every business, regardless of size, has access to world-class digital solutions.
                  </p>
                </div>
              </ScrollRevealAnimation>
            </div>
          </div>
        </section>

        <section className="py-24 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollRevealAnimation>
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
                  Why choose CPUtek
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  Our core values guide everything we do
                </p>
              </div>
            </ScrollRevealAnimation>

            <ScrollRevealAnimation stagger={true}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {values.map((value, index) => (
                  <div key={index} className="glass-card p-10 rounded-3xl group hover:border-primary/30 smooth-transition">
                    <div className="inline-flex p-4 rounded-xl glass-button text-primary mb-6 group-hover:scale-110 smooth-transition">
                      {value.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">{value.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{value.description}</p>
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
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
                  Meet our team
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  Talented professionals dedicated to your success
                </p>
              </div>
            </ScrollRevealAnimation>

            <ScrollRevealAnimation stagger={true}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {team.map((member, index) => (
                  <TeamMemberCard key={index} member={member} index={index} />
                ))}
              </div>
            </ScrollRevealAnimation>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;