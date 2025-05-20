import React from 'react';
import { motion } from 'framer-motion';
import { Education as EducationType } from '../data/resume';

interface Education {
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description: string;
  relevantCourses?: string[];
}

interface EducationProps {
  education: Education[];
}

const Education: React.FC<EducationProps> = ({ education }) => {
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
        Security Training & Education
      </motion.h2>

      <motion.div
        className="space-y-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {education.map((edu, index) => (
          <motion.div 
            key={index}
            className="cyber-card"
            variants={item}
          >
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-cyan-400 flex items-center">
                  <span className="mr-2">&gt;</span>
                  {edu.degree} in {edu.field}
                  <span className="ml-2">_</span>
                </h3>
                <div className="text-gray-400 mt-1">{edu.school}</div>
              </div>
              <div className="text-sm text-cyan-500 mt-2 md:mt-0 font-mono">
                {edu.startDate} → {edu.endDate}
              </div>
            </div>

            <p className="text-gray-300 mb-4">{edu.description}</p>

            {edu.relevantCourses && edu.relevantCourses.length > 0 && (
              <div>
                <h4 className="text-sm text-cyan-400 mb-2">Advanced Security Training:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {edu.relevantCourses.map((course, idx) => (
                    <motion.div
                      key={idx}
                      className="flex items-center text-sm text-gray-300"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <span className="text-cyan-500 mr-2">→</span>
                      {course}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Education; 