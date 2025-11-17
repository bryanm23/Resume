import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheckIcon, LockClosedIcon, KeyIcon, EyeIcon, DocumentMagnifyingGlassIcon, ServerIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

const Security: React.FC = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as any).toString(),
      });

      if (response.ok) {
        setFormStatus('success');
        form.reset();
        setTimeout(() => setFormStatus('idle'), 5000);
      } else {
        setFormStatus('error');
        setTimeout(() => setFormStatus('idle'), 5000);
      }
    } catch (error) {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 5000);
    }
  };

  const services = [
    {
      icon: ShieldCheckIcon,
      title: 'Security Hardening',
      description: 'Strengthen systems, networks, and devices to reduce risk.',
      features: [
        'Windows hardening',
        'Router/WiFi security',
        'Password best practices',
        'MFA setup',
        'Device configuration reviews'
      ]
    },
    {
      icon: EyeIcon,
      title: 'Threat Detection & Analysis',
      description: "Identify suspicious behavior and understand what's happening under the hood.",
      features: [
        'Log analysis',
        'Event Viewer',
        'Sysinternals tools',
        'Basic malware behavior analysis',
        'Process investigation'
      ]
    },
    {
      icon: ServerIcon,
      title: 'Network Security',
      description: 'Protect and monitor small business and home networks.',
      features: [
        'Network segmentation',
        'WiFi security checks',
        'Basic firewall configuration',
        'Port scanning & network mapping',
        'Vulnerability identification'
      ]
    },
    {
      icon: LockClosedIcon,
      title: 'Cloud & Email Security',
      description: 'Secure modern small-business environments.',
      features: [
        'Google Workspace / M365 hardening',
        'MFA enforcement',
        'Phishing protection',
        'Shared drive access cleanup',
        'Email security policies'
      ]
    },
    {
      icon: KeyIcon,
      title: 'Incident Readiness',
      description: 'Help individuals and small businesses prepare for security issues.',
      features: [
        'Backup verification',
        'Recovery planning',
        'Password hygiene',
        'Ex-employee access audits',
        'Basic incident response steps'
      ]
    },
    {
      icon: DocumentMagnifyingGlassIcon,
      title: 'Small Business Security Checkups',
      description: 'Exactly the service you want to offer.',
      features: [
        'On-site device + WiFi assessment',
        'Router security inspection',
        'Laptop security review',
        'Physical security review',
        'PDF risk report'
      ]
    }
  ];

  return (
    <div className="min-h-screen ios-bg-light relative overflow-hidden">
      {/* Hero Section */}
      <motion.section 
        className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
        {...fadeIn}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 right-20 w-96 h-96 bg-purple-300/20 dark:bg-purple-500/10 rounded-full blur-3xl float-animation"></div>
          <div className="absolute bottom-10 left-20 w-80 h-80 bg-blue-300/20 dark:bg-blue-500/10 rounded-full blur-3xl float-animation" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-300/20 dark:bg-pink-500/10 rounded-full blur-3xl float-animation" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="inline-block p-6 ios-glass rounded-full mb-6">
              <ShieldCheckIcon className="h-24 w-24 mx-auto text-blue-700" />
            </div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold mb-6 text-gray-900"
          >
            Cybersecurity Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-800 max-w-3xl mx-auto mb-10"
          >
            Protecting your digital assets with expert security solutions
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="#contact"
              className="ios-button px-8 py-3.5 text-blue-700 font-semibold rounded-2xl relative overflow-hidden group"
            >
              <span className="relative z-10">Get Started</span>
              <span className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </a>
            <a
              href="#services"
              className="ios-button px-8 py-3.5 text-blue-700 font-semibold rounded-2xl relative overflow-hidden group"
            >
              <span className="relative z-10">View Services</span>
              <span className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </a>
          </motion.div>
        </div>
      </motion.section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Security Services
            </h2>
            <p className="text-xl text-gray-800 max-w-3xl mx-auto">
              Comprehensive cybersecurity solutions tailored to protect your business from evolving threats
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="ios-glass-card rounded-3xl p-8"
                >
                  <div className="flex items-center justify-center w-16 h-16 ios-glass rounded-2xl mb-6">
                    <Icon className="h-8 w-8 text-blue-700" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-800 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-gray-800">
                        <span className="text-blue-700 mr-3 font-semibold">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose Us
            </h2>
            <p className="text-xl text-gray-800 max-w-3xl mx-auto">
              Trusted expertise in cybersecurity with a proven track record
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Certified Security Professional',
                description: 'Certified security professional with experience in offensive and defensive security.'
              },
              {
                title: 'Proven Methodology',
                description: 'Industry-standard frameworks and tools to ensure comprehensive security assessments.'
              },
              {
                title: 'Actionable Results',
                description: 'Clear, prioritized recommendations with detailed remediation guidance for every finding.'
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="ios-glass-card rounded-3xl p-8 text-center"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-800 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Get Started Today
            </h2>
            <p className="text-xl text-gray-800">
              Ready to strengthen your security posture? Let's discuss your needs.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="ios-glass-card rounded-3xl p-8 md:p-12"
          >
            <form 
              name="security-contact" 
              method="POST" 
              data-netlify="true" 
              data-netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* Hidden field for Netlify form identification */}
              <input type="hidden" name="form-name" value="security-contact" />
              
              {/* Honeypot field for spam protection */}
              <div className="hidden">
                <label>
                  Don't fill this out if you're human: <input name="bot-field" />
                </label>
              </div>

              {/* Success/Error Messages */}
              {formStatus === 'success' && (
                <div className="flex items-center space-x-2 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-green-800 dark:text-green-200">
                  <CheckCircleIcon className="h-5 w-5" />
                  <span>Thank you! Your message has been sent successfully.</span>
                </div>
              )}

              {formStatus === 'error' && (
                <div className="flex items-center space-x-2 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-800 dark:text-red-200">
                  <XCircleIcon className="h-5 w-5" />
                  <span>There was an error sending your message. Please try again.</span>
                </div>
              )}

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-800 mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 ios-glass rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-800 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 ios-glass rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label htmlFor="service" className="block text-sm font-medium text-gray-800 mb-2">
                  Service Interest
                </label>
                <select
                  id="service"
                  name="service"
                  className="w-full px-4 py-3 ios-glass rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                >
                  <option value="">Select a service...</option>
                  {services.map((service) => (
                    <option key={service.title} value={service.title}>
                      {service.title}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-800 mb-2">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  className="w-full px-4 py-3 ios-glass rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                  placeholder="Tell us about your security needs..."
                />
              </div>
                  <button
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className="w-full ios-button px-8 py-3.5 text-blue-700 font-semibold rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 relative overflow-hidden group"
                  >
                    <span className="relative z-10">{formStatus === 'submitting' ? 'Sending...' : 'Send Message'}</span>
                    <span className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="ios-glass border-t border-gray-200 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-800">
            <p>&copy; {new Date().getFullYear()} Bryan Madewell. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Security;

