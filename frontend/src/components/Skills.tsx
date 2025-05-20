import React from 'react';
import { motion } from 'framer-motion';
import { Skill } from '../data/resume';

interface SkillsProps {
  skills: Skill[];
}

const Skills: React.FC<SkillsProps> = ({ skills }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
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
        Security Capabilities Matrix
      </motion.h2>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {skills.map((skillGroup, index) => (
          <motion.div 
            key={index}
            className="cyber-card"
            variants={item}
          >
            <h3 className="text-lg font-semibold text-cyan-400 mb-4 flex items-center">
              <span className="mr-2">&gt;</span>
              {skillGroup.category}
              <span className="ml-2">_</span>
            </h3>

            {skillGroup.proficiencyLevel && (
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Proficiency Level</span>
                  <span className="text-cyan-400">{skillGroup.proficiencyLevel}/5</span>
                </div>
                <div className="cyber-progress">
                  <motion.div 
                    className="cyber-progress-bar"
                    initial={{ width: 0 }}
                    animate={{ width: `${(skillGroup.proficiencyLevel / 5) * 100}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-2">
              {skillGroup.items.map((skill, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-center text-sm"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <span className="text-cyan-500 mr-2">→</span>
                  <span className="text-gray-300">{skill}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Skills; 