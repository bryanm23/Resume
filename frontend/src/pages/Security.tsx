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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <motion.section 
        className="relative animated-gradient text-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
        {...fadeIn}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl float-animation"></div>
          <div className="absolute bottom-10 left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl float-animation" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="inline-block p-6 bg-white/20 backdrop-blur-sm rounded-full mb-6">
              <ShieldCheckIcon className="h-24 w-24 mx-auto text-white" />
            </div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg"
          >
            Cybersecurity Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-10"
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
              className="px-8 py-3 bg-white text-primary-700 font-semibold rounded-lg hover:bg-gray-100 transition-all shadow-lg hover-lift hover:shadow-xl"
            >
              Get Started
            </a>
            <a
              href="#services"
              className="px-8 py-3 bg-white/10 backdrop-blur-sm border-2 border-white/50 text-white font-semibold rounded-lg hover:bg-white/20 transition-all hover:border-white"
            >
              View Services
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
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Our Security Services
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Comprehensive cybersecurity solutions tailored to protect your business from evolving threats
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg p-8 hover-lift glow-on-hover border border-gray-200/50 dark:border-gray-700/50 relative overflow-hidden group"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 via-primary-400 to-primary-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                  <div className="relative z-10">
                  <div className="flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-lg mb-6">
                    <Icon className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-gray-700 dark:text-gray-300">
                        <span className="text-primary-600 dark:text-primary-400 mr-3 font-semibold">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Us
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Trusted expertise in cybersecurity with a proven track record
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                className="bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-xl p-8 text-center border border-gray-200/50 dark:border-gray-600/50 hover-lift relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 to-primary-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {item.description}
                </p>
                </div>
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
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Get Started Today
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Ready to strengthen your security posture? Let's discuss your needs.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg p-8 md:p-12 border border-gray-200/50 dark:border-gray-700/50 hover-lift"
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
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label htmlFor="service" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Service Interest
                </label>
                <select
                  id="service"
                  name="service"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Tell us about your security needs..."
                />
              </div>
              <button
                type="submit"
                disabled={formStatus === 'submitting'}
                className="w-full px-8 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-all shadow-lg hover:shadow-xl hover-lift disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
              >
                <span className="relative z-10">{formStatus === 'submitting' ? 'Sending...' : 'Send Message'}</span>
                <span className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-600 dark:text-gray-400">
            <p>&copy; {new Date().getFullYear()} Bryan Madewell. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Security;

