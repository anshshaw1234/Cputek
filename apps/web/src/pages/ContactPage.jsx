import React, { useState } from 'react';

import { Helmet } from 'react-helmet';
import { MapPin, Mail, Phone, Facebook, Linkedin, Youtube } from 'lucide-react';
import { toast } from 'sonner';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ScrollRevealAnimation from '@/components/ScrollRevealAnimation.jsx';
import GlowButton from '@/components/GlowButton.jsx';
import apiServerClient from '@/lib/apiServerClient.js';

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
const [isSent, setIsSent] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (isSubmitting) return;
  
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }
  
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }
  
    // Save the current form data before clearing it
    const submittedData = { ...formData };
  
    // Immediately update UI
    setIsSubmitting(true);
    setIsSent(true);
  
    // Clear the form immediately
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  
    // Show Sent briefly
    setTimeout(() => {
      setIsSent(false);
      setIsSubmitting(false);
    }, 1000);
  
    // Send to backend without waiting for the email process
    try {
      await apiServerClient.fetch("/contact/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submittedData),
      });
    } catch (error) {
      console.error("Background contact error:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Contact CPUtek - Get in Touch</title>
        <meta name="description" content="Contact CPUtek for inquiries about our services, products, or career opportunities. We're here to help transform your digital presence." />
      </Helmet>

      <Header />

      <main className="flex-grow pt-32">
        <section className="py-20 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollRevealAnimation>
              <div className="text-center mb-16">
                <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 tracking-tight">
                  Get in <span className="text-gradient-primary">Touch</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  Have a question or want to work together? We'd love to hear from you.
                </p>
              </div>
            </ScrollRevealAnimation>
          </div>
        </section>

        <section className="py-12 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <ScrollRevealAnimation direction="left">
                <div className="space-y-8 h-full">
                  <div className="glass-base p-10 rounded-3xl h-full">
                    <h2 className="text-3xl font-bold text-foreground mb-10">Contact Information</h2>
                    
                    <div className="space-y-8">
                      <div className="flex items-start gap-5 group">
                        <div className="p-4 rounded-2xl glass-button text-primary group-hover:bg-primary group-hover:text-primary-foreground smooth-transition">
                          <MapPin className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-2 text-lg">Address</h3>
                          <p className="text-muted-foreground leading-relaxed">
                            CPUTEK PRIVATE LIMITED<br />
                            80, Vidyasagar Sarani<br />
                            Purba Barisha, Kolkata – 700008
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-5 group">
                        <div className="p-4 rounded-2xl glass-button text-primary group-hover:bg-primary group-hover:text-primary-foreground smooth-transition">
                          <Mail className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-2 text-lg">Email</h3>
                          <a href="mailto:info@cputek.in" className="text-muted-foreground hover:text-primary smooth-transition">
                            info@cputek.in
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-5 group">
                        <div className="p-4 rounded-2xl glass-button text-primary group-hover:bg-primary group-hover:text-primary-foreground smooth-transition">
                          <Phone className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-2 text-lg">Phone</h3>
                          <a href="tel:8013920772" className="text-muted-foreground hover:text-primary smooth-transition">
                            8013920772
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="mt-12 pt-10 border-t border-white/10">
                      <h3 className="text-xl font-bold text-foreground mb-6">Follow Us</h3>
                      <div className="flex gap-4">
                        <a href="https://www.facebook.com/cputekofficial" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl glass-button flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:shadow-[0_0_15px_rgba(255,215,0,0.3)] smooth-transition">
                          <Facebook className="w-5 h-5" />
                        </a>
                        <a href="https://www.linkedin.com/company/cputek-pvt-ltd/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl glass-button flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:shadow-[0_0_15px_rgba(255,215,0,0.3)] smooth-transition">
                          <Linkedin className="w-5 h-5" />
                        </a>
                        <a href="https://www.youtube.com/channel/UC7hYS5V5hWQVe03XBBdnciw" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl glass-button flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:shadow-[0_0_15px_rgba(255,215,0,0.3)] smooth-transition">
                          <Youtube className="w-5 h-5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollRevealAnimation>

              <ScrollRevealAnimation direction="right">
                <div className="glass-base p-10 rounded-3xl h-full">
                  <h2 className="text-3xl font-bold text-foreground mb-8">Send us a message</h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="text-foreground mb-2 block font-medium">Name *</label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl glass-button text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary smooth-transition"
                          placeholder="Your name"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="text-foreground mb-2 block font-medium">Email *</label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl glass-button text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary smooth-transition"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="phone" className="text-foreground mb-2 block font-medium">Phone</label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl glass-button text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary smooth-transition"
                          placeholder="Your phone number"
                        />
                      </div>

                      <div>
                        <label htmlFor="subject" className="text-foreground mb-2 block font-medium">Subject</label>
                        <input
                          id="subject"
                          name="subject"
                          type="text"
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl glass-button text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary smooth-transition"
                          placeholder="How can we help?"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="text-foreground mb-2 block font-medium">Message *</label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 rounded-xl glass-button text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary smooth-transition resize-none"
                        placeholder="Tell us about your project or inquiry..."
                      />
                    </div>

                    <GlowButton
  type="submit"
  disabled={isSubmitting}
  className="w-full"
>
  {isSent ? "Sent" : "Send Message"}
</GlowButton>
                  </form>
                </div>
              </ScrollRevealAnimation>
            </div>
          </div>
        </section>

        <section className="py-24 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollRevealAnimation>
              <div className="glass-base rounded-3xl overflow-hidden h-96 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent flex items-center justify-center">
                  <p className="text-muted-foreground font-medium">Map placeholder - Kolkata, India</p>
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

export default ContactPage;