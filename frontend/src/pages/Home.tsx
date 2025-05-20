import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Hero section */}
      <div className="relative pt-6 pb-16 sm:pb-24">
        <main className="mt-16 mx-auto max-w-7xl px-4 sm:mt-24">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl"
            >
              <span className="block">Hi, I'm</span>
              <span className="block text-primary-600">Your Name</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl"
            >
              Full-stack Developer | Open Source Enthusiast | Tech Writer
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8"
            >
              <div className="rounded-md shadow">
                <Link
                  to="/projects"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 md:py-4 md:text-lg md:px-10"
                >
                  View My Work
                </Link>
              </div>
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <Link
                  to="/contact"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:text-primary-400 dark:hover:bg-gray-700 md:py-4 md:text-lg md:px-10"
                >
                  Contact Me
                </Link>
              </div>
            </motion.div>
          </div>
        </main>
      </div>

      {/* Featured section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="relative bg-gray-50 dark:bg-gray-800 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8"
      >
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Featured Skills
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300 sm:mt-4">
              Here are some of the technologies I work with
            </p>
          </div>
          <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
            {[
              { name: 'Frontend', skills: ['React', 'TypeScript', 'Tailwind CSS'] },
              { name: 'Backend', skills: ['Node.js', 'Spring Boot', 'PostgreSQL'] },
              { name: 'Tools', skills: ['Docker', 'Git', 'AWS'] },
            ].map((category) => (
              <div
                key={category.name}
                className="flex flex-col rounded-lg shadow-lg overflow-hidden bg-white dark:bg-gray-700"
              >
                <div className="flex-1 p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {category.name}
                  </h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Home; 