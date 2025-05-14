import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { resume } from '../data/resume';

const SkillBar = ({ skill, index }) => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });
  
  const barVariants = {
    hidden: { width: 0 },
    visible: { 
      width: `${skill.level}%`,
      transition: { 
        duration: 1.5, 
        ease: [0.165, 0.84, 0.44, 1],
        delay: index * 0.1
      }
    }
  };
  
  const textVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut",
        delay: 0.2 + index * 0.1
      }
    }
  };

  return (
    <motion.div 
      ref={ref}
      className="mb-6 last:mb-0"
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        variants={textVariants}
        className="flex justify-between items-center mb-2"
      >
        <h4 className="font-display text-base lg:text-lg font-medium text-night-900 dark:text-white">{skill.name}</h4>
        <span className="text-sm font-medium text-brand-600 dark:text-brand-400 tabular-nums">{skill.level}%</span>
      </motion.div>
      
      <div className="h-2.5 w-full bg-gray-100 dark:bg-night-800 rounded-full overflow-hidden backdrop-blur-lg relative">
        {/* Background gradient animation */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-brand-300/30 to-teal-300/30 dark:from-brand-900/30 dark:to-teal-900/30 animate-pulse-slow"></div>
        
        {/* Skill level bar */}
        <motion.div
          variants={barVariants}
          className="h-full rounded-full bg-gradient-to-r from-brand-500 to-teal-500 dark:from-brand-600 dark:to-teal-600 relative"
        >
          {/* Glowing effect */}
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-brand-400 to-teal-400 dark:from-brand-500 dark:to-teal-500 blur-sm opacity-50"></div>
          
          {/* Shimmer effect */}
          <div className="absolute inset-0 w-full h-full">
            <div className="absolute inset-0 animate-shimmer">
              <div className="absolute inset-[-10px_0] bg-gradient-to-r from-transparent via-white/30 dark:via-white/10 to-transparent skew-x-[-20deg] w-[50%]"></div>
            </div>
          </div>
        </motion.div>
        
        {/* Inner shadow */}
        <div className="absolute inset-0 rounded-full shadow-inner pointer-events-none border border-black/5 dark:border-white/5"></div>
      </div>
      
      <p className="mt-2 text-xs lg:text-sm text-night-600 dark:text-gray-400">{skill.description}</p>
    </motion.div>
  );
};

const TechStack = ({ skills }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  
  return (
    <motion.div 
      ref={containerRef}
      className="flex flex-wrap justify-center gap-3 relative"
      style={{ y }}
    >
      {skills.map((skill, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 0.5, 
            delay: index * 0.03,
            ease: [0.19, 1, 0.22, 1]
          }}
          whileHover={{ 
            scale: 1.05, 
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
            y: -5
          }}
          className="relative group"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-brand-400 to-teal-400 dark:from-brand-600 dark:to-teal-600 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10"></div>
          <div className="px-5 py-2.5 rounded-full glass-card backdrop-blur-md border-2 border-white/20 dark:border-night-800/50 flex items-center transition-all duration-300 group-hover:border-brand-300/50 dark:group-hover:border-brand-700/50">
            <span className="text-night-800 dark:text-gray-200 font-medium text-sm">{skill}</span>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

const AdditionalTechContainer = ({ title, icon, children }) => {
  return (
    <div className="glass-card p-6 md:p-8 rounded-2xl backdrop-blur-xl border-2 border-white/20 dark:border-night-800/50 relative overflow-hidden group hover:border-brand-300/50 dark:hover:border-brand-700/50 transition-all duration-500">
      {/* Card inner glow effect */}
      <div className="absolute -inset-[50px] bg-gradient-to-r from-teal-500/20 to-brand-500/20 dark:from-teal-400/10 dark:to-brand-400/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -z-10"></div>
      
      <h3 className="font-display text-xl font-bold text-night-900 dark:text-white mb-6 flex items-center">
        <div className="w-8 h-8 bg-teal-100 dark:bg-teal-900/50 rounded-full flex items-center justify-center mr-3 text-teal-600 dark:text-teal-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {icon}
          </svg>
        </div>
        {title}
      </h3>
      
      {children}
    </div>
  );
};

const Skills = () => {
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
  
  // Letter by letter animation for title
  const titleText = "Technical Expertise";
  const titleChars = Array.from(titleText);
  
  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: i => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };
  
  // Split skills for more balanced layout
  const coreSkills = resume.skillsSection.primarySkills.slice(0, Math.ceil(resume.skillsSection.primarySkills.length / 2));
  const secondarySkills = resume.skillsSection.primarySkills.slice(Math.ceil(resume.skillsSection.primarySkills.length / 2));
  
  // Split other skills into two groups
  const techSkills = resume.skillsSection.otherSkills.slice(0, Math.ceil(resume.skillsSection.otherSkills.length / 2));
  const additionalTechSkills = resume.skillsSection.otherSkills.slice(Math.ceil(resume.skillsSection.otherSkills.length / 2));
  
  return (
    <section id="skills" className="relative bg-white dark:bg-night-950 overflow-hidden py-24 sm:py-32">
      {/* Ambient background */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-10 dark:opacity-10 pointer-events-none"></div>
      
      {/* Decorative elements */}
      <div className="absolute w-[800px] h-[800px] -top-[400px] -left-[400px] bg-teal-500/10 dark:bg-teal-800/10 rounded-full blur-3xl"></div>
      <div className="absolute w-[600px] h-[600px] -bottom-[300px] -right-[300px] bg-brand-500/10 dark:bg-brand-800/10 rounded-full blur-3xl"></div>
      
      {/* DNA helix decoration - representing tech/health */}
      <div className="absolute h-full right-0 top-0 w-40 overflow-hidden opacity-10 dark:opacity-5 pointer-events-none hidden lg:block">
        <div className="absolute h-[200%] w-1 bg-gradient-to-b from-brand-300/50 via-teal-300/50 to-brand-300/50 left-12 animate-dna-move"></div>
        <div className="absolute h-[200%] w-1 bg-gradient-to-b from-teal-300/50 via-brand-300/50 to-teal-300/50 left-24 animate-dna-move-delay"></div>
        {Array.from({ length: 20 }).map((_, i) => (
          <React.Fragment key={i}>
            <div className="absolute w-16 h-0.5 bg-brand-300/50 transform -rotate-45 animate-dna-fade"
               style={{ top: `${(i * 10) + 5}%`, left: '4px' }}></div>
            <div className="absolute w-16 h-0.5 bg-teal-300/50 transform rotate-45 animate-dna-fade-delay"
               style={{ top: `${(i * 10) + 10}%`, left: '20px' }}></div>
          </React.Fragment>
        ))}
      </div>
      
      <div className="section-container relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex mb-5"
          >
            <span className="px-4 py-1.5 rounded-full bg-white/80 dark:bg-night-900/80 backdrop-blur-md shadow-lg text-night-900 dark:text-white border border-brand-300/30 dark:border-brand-500/30 text-sm font-medium">
              <span className="mr-2 inline-block w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>
              Expertise
            </span>
          </motion.div>
          
          <h2 className="flex justify-center items-baseline flex-wrap">
            {titleChars.map((char, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className={`font-display text-3xl sm:text-4xl lg:text-5xl font-bold ${char === ' ' ? 'mr-2' : 'tracking-tight'} text-night-900 dark:text-white`}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </h2>
          
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.165, 0.84, 0.44, 1] }}
            className="h-1 w-40 bg-gradient-to-r from-brand-500 to-teal-500 dark:from-brand-400 dark:to-teal-400 mx-auto mt-6 rounded-full"
          ></motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="text-night-700 dark:text-gray-300 max-w-2xl mx-auto text-lg mt-8"
          >
            {resume.skillsSection.subtitle}
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left column - Core skills */}
          <div className="space-y-8">
            <div className="glass-card p-6 md:p-8 rounded-2xl backdrop-blur-xl border-2 border-white/20 dark:border-night-800/50 relative overflow-hidden group hover:border-brand-300/50 dark:hover:border-brand-700/50 transition-all duration-500">
              {/* Card inner glow effect */}
              <div className="absolute -inset-[50px] bg-gradient-to-r from-brand-500/20 to-teal-500/20 dark:from-brand-400/10 dark:to-teal-400/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -z-10"></div>
              
              <h3 className="font-display text-xl font-bold text-night-900 dark:text-white mb-6 flex items-center">
                <div className="w-8 h-8 bg-brand-100 dark:bg-brand-900/50 rounded-full flex items-center justify-center mr-3 text-brand-600 dark:text-brand-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                Primary Skills
              </h3>
              
              <div>
                {coreSkills.map((skill, index) => (
                  <SkillBar key={index} skill={skill} index={index} />
                ))}
              </div>
            </div>
            
            <AdditionalTechContainer 
              title="Tools & Frameworks" 
              icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />}
            >
              <TechStack skills={techSkills} />
            </AdditionalTechContainer>
          </div>
          
          {/* Right column - Secondary skills & Ecosystem */}
          <div className="space-y-8">
            <div className="glass-card p-6 md:p-8 rounded-2xl backdrop-blur-xl border-2 border-white/20 dark:border-night-800/50 relative overflow-hidden group hover:border-brand-300/50 dark:hover:border-brand-700/50 transition-all duration-500">
              {/* Card inner glow effect */}
              <div className="absolute -inset-[50px] bg-gradient-to-r from-teal-500/20 to-brand-500/20 dark:from-teal-400/10 dark:to-brand-400/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -z-10"></div>
              
              <h3 className="font-display text-xl font-bold text-night-900 dark:text-white mb-6 flex items-center">
                <div className="w-8 h-8 bg-teal-100 dark:bg-teal-900/50 rounded-full flex items-center justify-center mr-3 text-teal-600 dark:text-teal-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                Advanced Capabilities
              </h3>
              
              <div>
                {secondarySkills.map((skill, index) => (
                  <SkillBar key={index} skill={skill} index={index} />
                ))}
              </div>
            </div>
            
            <AdditionalTechContainer 
              title="Technology Ecosystem" 
              icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />}
            >
              <TechStack skills={additionalTechSkills} />
            </AdditionalTechContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;