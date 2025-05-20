import React from 'react';
import { motion } from 'framer-motion';
import { Project } from '../data/resume';

interface ProjectsProps {
  projects: Project[];
}

const Projects: React.FC<ProjectsProps> = ({ projects }) => {
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
        Security Operations & Projects
      </motion.h2>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {projects.map((project, index) => (
          <motion.div 
            key={index} 
            className="cyber-card group"
            variants={item}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-cyan-400 flex items-center">
                <span className="mr-2">[</span>
                {project.name}
                <span className="ml-2">]</span>
              </h3>
              <div className="flex space-x-3">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cyber-link"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
                    </svg>
                  </a>
                )}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cyber-link"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}
              </div>
            </div>

            <div className="mb-4 text-sm inline-block px-2 py-1 rounded border border-cyan-500/30 bg-cyan-500/10">
              {project.type.toUpperCase()}
            </div>

            <p className="text-gray-300 mb-4">{project.description}</p>

            {project.securityFeatures && (
              <div className="mb-4">
                <h4 className="text-sm text-cyan-400 mb-2">Security Features:</h4>
                <ul className="list-none space-y-1">
                  {project.securityFeatures.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-300">
                      <span className="text-cyan-500 mr-2">→</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="cyber-tag"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Projects; 