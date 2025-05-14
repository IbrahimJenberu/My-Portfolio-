import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { resume } from '../data/resume';

const Experience = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        type: "spring",
        damping: 15,
        stiffness: 150,
        duration: 0.6 
      }
    },
  };

  return (
    <section id="experience" className="relative bg-white dark:bg-night-950 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 top-0 w-1/3 h-1/3 bg-brand-50/40 dark:bg-brand-950/20 rounded-full blur-3xl opacity-60 dark:opacity-30 transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute right-0 bottom-0 w-1/3 h-1/3 bg-teal-50/40 dark:bg-teal-950/20 rounded-full blur-3xl opacity-60 dark:opacity-30 transform translate-x-1/2 translate-y-1/2"></div>
      </div>
      
      <div className="section-container relative z-10">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="badge-primary inline-block mb-4 text-base px-4 py-1.5"
          >
            Experience
          </motion.span>
          
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {resume.experienceSection.title}
          </motion.h2>
        </div>
        
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="relative max-w-4xl mx-auto"
        >
          {resume.experienceSection.experiences.map((experience, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="mb-12 last:mb-0 glass-card rounded-2xl p-8 hover:shadow-glow dark:hover:shadow-glow transition-all duration-300 border-t-4 border-brand-500 dark:border-brand-600"
            >
              <div className="flex flex-col md:flex-row gap-6">
                {/* Left column - Company & Period */}
                <div className="md:w-1/3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-brand-100/70 dark:bg-brand-900/30 text-brand-800 dark:text-brand-200 text-sm font-medium border border-brand-200/50 dark:border-brand-800/30 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {experience.period}
                  </span>
                  <h3 className="text-xl font-bold mb-1.5 text-night-900 dark:text-white">{experience.title}</h3>
                  <div className="flex items-center text-lg text-night-700 dark:text-gray-300 mb-4">
                    <span className="font-medium">{experience.company}</span>
                  </div>
                </div>
                
                {/* Right column - Description & Technologies */}
                <div className="md:w-2/3">
                  <p className="text-night-700 dark:text-gray-300 mb-6 text-lg">{experience.description}</p>
                  
                  {experience.achievements && (
                    <div className="mb-8">
                      <h4 className="text-sm uppercase text-night-500 dark:text-gray-400 font-semibold mb-3 tracking-wider">Key Achievements</h4>
                      <ul className="space-y-3">
                        {experience.achievements.map((achievement, idx) => (
                          <li key={idx} className="flex items-start">
                            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-brand-100 dark:bg-brand-900/40 flex items-center justify-center mt-1 mr-3">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-brand-600 dark:text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <span className="text-night-700 dark:text-gray-300">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <div className="flex flex-wrap gap-2.5">
                    {experience.technologies.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="badge-secondary text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;