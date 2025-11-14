import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { resumeData, ResumeData } from '../data/resumeData';
import ProjectEditor from '../components/ProjectEditor';

interface Project {
  name: string;
  description: string;
  technologies: string[];
  securityFeatures?: string[];
  github?: string;
  link?: string;
  type: 'offensive' | 'defensive' | 'research' | 'tool' | 'full-stack';
}

const Resume: React.FC = () => {
  const [data, setData] = useState<ResumeData>(resumeData);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingIndex, setEditingIndex] = useState<number>(-1);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const handleSaveProject = (editedProject: Project) => {
    const newData = { ...data };
    newData.projects[editingIndex] = editedProject;
    setData(newData);
    setEditingProject(null);
    setEditingIndex(-1);
  };

  const handleCancelEdit = () => {
    setEditingProject(null);
    setEditingIndex(-1);
  };

  if (editingProject) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <ProjectEditor 
            project={editingProject} 
            onSave={handleSaveProject} 
            onCancel={handleCancelEdit} 
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-primary-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <motion.header 
          className="text-center mb-16"
          {...fadeIn}
        >
          <div className="mb-8">
            <h1 className="text-6xl md:text-7xl font-bold gradient-text mb-4">
              {data.basics.name}
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300 mb-6">
              {data.basics.label}
            </h2>
          </div>
          <div className="flex flex-col items-center space-y-3 mb-8">
            <p className="text-lg text-gray-600 dark:text-gray-400">{data.basics.location}</p>
            <a 
              href={`mailto:${data.basics.email}`}
              className="text-lg text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
            >
              {data.basics.email}
            </a>
            <div className="flex justify-center space-x-6 pt-2">
              {data.basics.profiles.map((profile) => (
                <a
                  key={profile.network}
                  href={profile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors"
                >
                  {profile.network}
                </a>
              ))}
            </div>
          </div>
          <p className="mt-8 text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {data.basics.summary}
          </p>
        </motion.header>

        {/* Education Section */}
        <motion.section 
          className="mb-16"
          {...fadeIn}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 pb-2 border-b-2 border-primary-500 relative">
            <span className="relative z-10">Education</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-primary-300 group-hover:w-full transition-all duration-500"></span>
          </h2>
          <div className="space-y-8">
            {data.education.map((edu) => (
              <div 
                key={edu.school}
                className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg p-8 hover-lift border border-gray-200/50 dark:border-gray-700/50 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/0 via-primary-500/5 to-primary-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {edu.school}
                    </h3>
                    <h4 className="text-xl text-primary-600 dark:text-primary-400 font-medium">
                      {edu.degree} in {edu.field}
                    </h4>
                  </div>
                  <div className="text-lg text-gray-600 dark:text-gray-400 mt-2 sm:mt-0 sm:text-right w-full sm:w-auto font-medium">
                    Completed May 2025
                  </div>
                </div>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  {edu.description}
                </p>
                {edu.relevantCourses && (
                  <div>
                    <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-3">Relevant Courses:</h4>
                    <div className="flex flex-wrap gap-2">
                      {edu.relevantCourses.map((course, idx) => (
                        <span
                          key={idx}
                          className="px-4 py-2 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-lg text-sm font-medium border border-primary-200 dark:border-primary-800"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Projects Section */}
        <motion.section 
          className="mb-16"
          {...fadeIn}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 pb-2 border-b-2 border-primary-500 relative">
            <span className="relative z-10">Projects</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-primary-300 group-hover:w-full transition-all duration-500"></span>
          </h2>
          <div className="space-y-8">
            {data.projects.map((project, index) => (
              <div 
                key={project.name}
                className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg p-8 hover-lift glow-on-hover border border-gray-200/50 dark:border-gray-700/50 relative overflow-hidden group"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 via-primary-400 to-primary-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                    {project.name}
                    {project.github && project.github.trim() !== "" && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-3 text-gray-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                      >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
                        </svg>
                      </a>
                    )}
                  </h3>
                </div>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-lg text-sm font-medium border border-primary-200 dark:border-primary-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                {project.securityFeatures && (
                  <div className="mb-4">
                    <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-3">Security Features:</h4>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                      {project.securityFeatures.map((feature, idx) => (
                        <li key={idx} className="text-base">
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="mt-4">
                  <span className="inline-block px-4 py-2 bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 rounded-lg text-sm font-semibold border border-primary-300 dark:border-primary-700">
                    {project.type.charAt(0).toUpperCase() + project.type.slice(1)}
                  </span>
                </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Skills Section */}
        <motion.section 
          className="mb-16"
          {...fadeIn}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 pb-2 border-b-2 border-primary-500 relative">
            <span className="relative z-10">Skills</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-primary-300 group-hover:w-full transition-all duration-500"></span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.skills.map((skillGroup, index) => (
              <div 
                key={skillGroup.category}
                className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg p-6 hover-lift border border-gray-200/50 dark:border-gray-700/50 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 to-primary-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {skillGroup.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-lg text-sm font-medium border border-primary-200 dark:border-primary-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Activities Section */}
        <motion.section 
          className="mb-16"
          {...fadeIn}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 pb-2 border-b-2 border-primary-500 relative">
            <span className="relative z-10">Activities</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-primary-300 group-hover:w-full transition-all duration-500"></span>
          </h2>
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg p-8 hover-lift border border-gray-200/50 dark:border-gray-700/50">
            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg text-gray-700 dark:text-gray-300">NJIT Information & Cybersecurity Club</li>
              <li className="text-lg text-gray-700 dark:text-gray-300">Sigma Alpha Epsilon Fraternity President</li>
            </ul>
          </div>
        </motion.section>

        {/* Certifications Section */}
        <motion.section 
          {...fadeIn}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 pb-2 border-b-2 border-primary-500 relative">
            <span className="relative z-10">Certifications</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-primary-300 group-hover:w-full transition-all duration-500"></span>
          </h2>
          <div className="space-y-6">
            {data.basics.certifications.map((cert, index) => (
              <div 
                key={index}
                className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg p-8 hover-lift border border-gray-200/50 dark:border-gray-700/50 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/0 via-primary-500/5 to-primary-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {cert.name}
                    </h3>
                    <h4 className="text-lg text-primary-600 dark:text-primary-400 font-medium">
                      {cert.issuer}
                    </h4>
                  </div>
                  <div className="text-lg text-gray-600 dark:text-gray-400 font-medium">
                    {cert.date}
                  </div>
                </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-8 mt-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-600 dark:text-gray-400">
            <p>&copy; {new Date().getFullYear()} Bryan Madewell. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Resume; 