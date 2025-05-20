import React from 'react';
import { motion } from 'framer-motion';
import { Experience as ExperienceType } from '../data/resume';

interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  description: string;
  highlights: string[];
  securityTools?: string[];
}

interface ExperienceProps {
  experience: Experience[];
}

const Experience: React.FC<ExperienceProps> = ({ experience }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-8 relative">
      <div className="cyber-grid absolute inset-0 opacity-20" />
      
      <motion.h2 
        className="cyber-heading cyber-glitch-text"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        Security Operations History
      </motion.h2>

      <motion.div
        className="space-y-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {experience.map((exp, index) => (
          <motion.div 
            key={index}
            className="cyber-card"
            variants={item}
          >
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-cyan-400 flex items-center">
                  <span className="mr-2">&gt;</span>
                  {exp.position}
                  <span className="ml-2">_</span>
                </h3>
                <div className="text-gray-400 mt-1">{exp.company}</div>
              </div>
              <div className="text-sm text-cyan-500 mt-2 md:mt-0 font-mono">
                {exp.startDate} → {exp.endDate || 'Present'}
              </div>
            </div>

            <p className="text-gray-300 mb-4">{exp.description}</p>

            <div className="space-y-4">
              {exp.highlights.length > 0 && (
                <div>
                  <h4 className="text-sm text-cyan-400 mb-2">Key Operations:</h4>
                  <ul className="list-none space-y-2">
                    {exp.highlights.map((highlight, idx) => (
                      <motion.li
                        key={idx}
                        className="flex items-start text-sm text-gray-300"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <span className="text-cyan-500 mr-2 mt-1">→</span>
                        {highlight}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}

              {exp.securityTools && exp.securityTools.length > 0 && (
                <div>
                  <h4 className="text-sm text-cyan-400 mb-2">Security Arsenal:</h4>
                  <div className="flex flex-wrap gap-2">
                    {exp.securityTools.map((tool, idx) => (
                      <motion.span
                        key={idx}
                        className="cyber-tag"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.05 }}
                      >
                        {tool}
                      </motion.span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Experience; 