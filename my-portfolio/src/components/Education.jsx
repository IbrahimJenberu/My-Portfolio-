import React, { useEffect } from 'react';
import { motion, useAnimation, useMotionTemplate, useMotionValue, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { resume } from '../data/resume';

const Education = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
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
  
  // Mouse follow effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x);
    mouseY.set(y);
  };
  
  const maskImage = useMotionTemplate`radial-gradient(250px at ${mouseX}px ${mouseY}px, rgba(255, 255, 255, 0.15), transparent)`;
  
  // Text typing animation for title
  const titleText = "Education & Credentials";
  const titleWords = titleText.split(' ');
  
  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: i => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };
  
  const edgeGlow = useMotionTemplate`
    0 0 10px rgba(45, 112, 249, 0.1),
    0 0 30px rgba(45, 112, 249, ${inView ? 0.1 : 0})
  `;
  
  return (
    <section id="education" className="relative bg-gray-50 dark:bg-night-900 overflow-hidden py-24 sm:py-32">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-10 dark:opacity-10 pointer-events-none"></div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] rounded-full bg-gradient-to-b from-brand-500/5 to-transparent dark:from-brand-500/10 dark:to-transparent blur-3xl"
      ></motion.div>
      
      {/* Education cap icon in background */}
      <div className="absolute right-0 top-1/4 text-brand-100/10 dark:text-brand-900/10 transform rotate-12 opacity-30 dark:opacity-20 hidden lg:block">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-96 w-96" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 3L1 9L5 11.18V17.18L12 21L19 17.18V11.18L21 10.09V17H23V9L12 3M18.82 9L12 12.72L5.18 9L12 5.28L18.82 9M17 16L12 18.72L7 16V12.27L12 15L17 12.27V16Z" />
        </svg>
      </div>
      
      <div className="section-container relative z-10">
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="badge-primary inline-block mb-5 text-base px-4 py-1.5 border-2"
          >
            Academia
          </motion.span>
          
          <h2 className="flex justify-center items-baseline flex-wrap">
            {titleWords.map((word, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={wordVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mr-3 last:mr-0 tracking-tight section-title-gradient"
              >
                {word}
              </motion.span>
            ))}
          </h2>
          
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.7, ease: [0.165, 0.84, 0.44, 1] }}
            className="h-1 w-40 bg-gradient-to-r from-brand-500 to-teal-500 dark:from-brand-400 dark:to-teal-400 mx-auto mt-6 rounded-full"
          ></motion.div>
        </div>
        
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="max-w-4xl mx-auto"
          onMouseMove={handleMouseMove}
          style={{ boxShadow: edgeGlow }}
        >
          {resume.educationSection.education.map((edu, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="glass-card rounded-3xl p-10 mb-8 last:mb-0 relative overflow-hidden group border-2 border-white/20 dark:border-night-800/30 backdrop-blur-xl transition-all duration-500 hover:border-brand-300/50 dark:hover:border-brand-700/30"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              {/* Mouse follow spotlight effect */}
              <motion.div 
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ 
                  background: maskImage,
                  WebkitMask: "radial-gradient(50% 50% at 50% 50%, white 0%, transparent 80%)",
                }}
              />
              
              {/* Top decoration */}
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-40 h-10 bg-gradient-to-r from-brand-500 to-teal-500 opacity-20 dark:opacity-30 blur-xl rounded-full"></div>
              
              <div className="relative">
                <div className="flex flex-col lg:flex-row gap-10 items-start">
                  {/* Logo/degree badge */}
                  <div className="lg:w-1/3 flex flex-col items-center text-center">
                    <motion.div 
                      className="w-20 h-20 rounded-full bg-gradient-to-br from-brand-100 to-teal-100 dark:from-brand-900/40 dark:to-teal-900/40 flex items-center justify-center mb-4"
                      initial={{ scale: 0, rotate: -20 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ 
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                        delay: 0.5
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-brand-600 dark:text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                      </svg>
                    </motion.div>
                    
                    <div className="text-center">
                      <span className="text-sm uppercase tracking-wider text-night-500 dark:text-gray-400 font-medium">EXPECTED GRADUATION</span>
                      <div className="text-xl font-bold text-night-900 dark:text-white mt-1">{edu.period}</div>
                    </div>
                    
                    <div className="mt-6 w-32 h-32 rounded-full bg-gradient-to-br from-brand-50 to-teal-50 dark:from-brand-900/20 dark:to-teal-900/20 shadow-xl flex items-center justify-center p-1 border border-white/50 dark:border-night-700/50">
                      <div className="w-full h-full rounded-full bg-white dark:bg-night-800 flex flex-col items-center justify-center">
                        <span className="block text-3xl font-display font-bold gradient-text mb-1">{edu.gpa}</span>
                        <span className="text-xs text-night-500 dark:text-gray-400 uppercase tracking-wider font-medium">CGPA</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="lg:w-2/3 space-y-6">
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-display font-bold section-title-gradient mb-2">{edu.degree}</h3>
                      <div className="flex items-center text-xl text-night-800 dark:text-white mb-1 font-medium">
                        {edu.institution}
                      </div>
                      <div className="text-night-600 dark:text-gray-400 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {edu.location}
                      </div>
                    </div>
                    
                    <div className="space-y-4 pt-2">
                      <h4 className="text-sm uppercase tracking-wider text-night-500 dark:text-gray-400 font-medium">Academic Highlights</h4>
                      <div className="space-y-3">
                        {edu.details.map((detail, idx) => (
                          <motion.div 
                            key={idx} 
                            className="flex items-start"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.8 + idx * 0.2 }}
                          >
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center mt-0.5 mr-3">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-brand-600 dark:text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <span className="text-night-700 dark:text-gray-300 text-base">{detail}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Subtle decoration line */}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 1, delay: 1.2, ease: [0.165, 0.84, 0.44, 1] }}
                      className="h-px w-full bg-gradient-to-r from-brand-300/30 to-teal-300/30 dark:from-brand-700/30 dark:to-teal-700/30 my-6"
                    ></motion.div>
                    
                    {/* CTA Button */}
                    <motion.a
                      href="#contact"
                      className="inline-flex items-center text-brand-600 dark:text-brand-400 font-medium group"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      Connect for academic collaborations
                      <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </motion.a>
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

export default Education;