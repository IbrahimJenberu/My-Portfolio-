import React, { useEffect, useState, useRef } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { resume } from '../data/resume';

const About = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hoveredStat, setHoveredStat] = useState(null);
  const [hoveredContact, setHoveredContact] = useState(null);
  const contentRef = useRef(null);
  const imageContainerRef = useRef(null);
  
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);
  
  // Effect to match photo height with content
  useEffect(() => {
    const matchHeight = () => {
      if (contentRef.current && imageContainerRef.current && window.innerWidth >= 1024) {
        // Get the height of the content
        const contentHeight = contentRef.current.offsetHeight;
        
        // Set the image container to match the content height
        imageContainerRef.current.style.height = `${contentHeight}px`;
      } else if (imageContainerRef.current) {
        // Reset height on mobile
        imageContainerRef.current.style.height = 'auto';
      }
    };
    
    // Run once after image loads
    if (imageLoaded) {
      setTimeout(matchHeight, 200); // Slight delay to ensure DOM is updated
    }
    
    // Add resize listener
    window.addEventListener('resize', matchHeight);
    return () => window.removeEventListener('resize', matchHeight);
  }, [imageLoaded]);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.1,
      },
    },
  };
  
  const childVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        type: "spring",
        damping: 15,
        stiffness: 200,
        duration: 0.6 
      }
    },
  };
  
  const imageVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.95,
      y: 20 
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 150,
        duration: 0.8
      }
    }
  };
  
  const textRevealVariants = {
    hidden: { 
      clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" 
    },
    visible: { 
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.2
      }
    }
  };
  
  const statVariants = {
    initial: { y: 0, boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)" },
    hover: { 
      y: -8, 
      boxShadow: "0px 20px 40px rgba(45, 112, 249, 0.2)", 
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 15 
      } 
    }
  };
  
  const badgeVariants = {
    initial: { 
      y: 0, 
      backgroundColor: "rgba(255, 255, 255, 0.7)",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.05)"
    },
    hover: { 
      y: -3, 
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      boxShadow: "0px 10px 20px rgba(45, 112, 249, 0.15)", 
      transition: { 
        type: "spring", 
        stiffness: 500, 
        damping: 15 
      } 
    }
  };
  
  return (
    <section id="about" className="relative py-16 sm:py-20 md:py-24 overflow-hidden">
      {/* Dynamic background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-indigo-50/50 to-white dark:from-[#161E35] dark:via-[#0F172A]/80 dark:to-[#0F172A] z-0"></div>
      
      {/* Mesh gradient overlay */}
      <div className="absolute inset-0 opacity-40 dark:opacity-20 bg-[radial-gradient(ellipse_at_top_right,#0adeca,transparent_70%),radial-gradient(ellipse_at_bottom_left,#2d70f9,transparent_70%)]"></div>
      
      {/* Ambient particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div 
            key={i}
            initial={{ 
              x: `${Math.random() * 100}%`, 
              y: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.3 + 0.1,
              scale: Math.random() * 0.8 + 0.2
            }}
            animate={{ 
              y: [null, `${Math.random() * 10 - 5}%`, null],
              x: [null, `${Math.random() * 10 - 5}%`, null],
              opacity: [null, Math.random() * 0.3 + 0.2, null]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: Math.random() * 20 + 15,
              ease: "easeInOut"
            }}
            className="absolute rounded-full"
            style={{ 
              width: `${Math.random() * 400 + 100}px`, 
              height: `${Math.random() * 400 + 100}px`, 
              background: `radial-gradient(circle, ${i % 2 === 0 ? '#2d70f950' : '#0adeca50'}, transparent 70%)`,
              filter: "blur(50px)"
            }}
          ></motion.div>
        ))}
      </div>
      
      <div className="section-container relative z-10 px-4 sm:px-6">
        <div className="text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex mb-4"
          >
            <span className="px-4 py-1.5 rounded-full bg-white/80 dark:bg-night-900/80 backdrop-blur-md shadow-lg text-night-900 dark:text-white border border-brand-300/30 dark:border-brand-500/30 text-sm font-medium">
              <span className="mr-2 inline-block w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>
              About Me
            </span>
          </motion.div>
          
          <motion.div 
            className="relative overflow-hidden inline-block"
            initial="hidden"
            animate="visible"
            variants={textRevealVariants}
          >
            <motion.h2 
              className="font-display text-4xl md:text-5xl font-bold text-night-900 dark:text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              {resume.aboutSection.title}
            </motion.h2>
          </motion.div>
        </div>
        
        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start"
        >
          {/* Profile image section - With exact height matching */}
          <motion.div 
            variants={imageVariants}
            className="relative order-2 lg:order-1"
          >
            <div 
              ref={imageContainerRef}
              className="relative z-10 bg-white/70 dark:bg-night-900/70 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl border border-gray-100/50 dark:border-night-700/50 h-full"
            >
              <motion.div 
                className="relative w-full h-full group"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ 
                  opacity: imageLoaded ? 1 : 0,
                  scale: imageLoaded ? 1 : 0.95
                }}
                transition={{ 
                  type: "spring",
                  stiffness: 150,
                  damping: 20
                }}
                whileHover={{ 
                  boxShadow: "0 30px 60px -10px rgba(0, 0, 0, 0.3), 0 18px 36px -18px rgba(0, 0, 0, 0.33)" 
                }}
              >
                {/* Premium border glow effect */}
                <motion.div 
                  className="absolute -inset-0.5 z-[-1] opacity-0 group-hover:opacity-100"
                  animate={{ 
                    background: ["linear-gradient(90deg, #2d70f9, #0adeca, #FF6F61, #2d70f9)"],
                    backgroundPosition: ["0% center", "100% center"]
                  }}
                  transition={{ duration: 3, repeat: Infinity, repeatType: "mirror" }}
                  style={{ filter: "blur(8px)" }}
                ></motion.div>
                
                <img 
                  src={resume.aboutSection.profileImage}
                  alt={resume.name}
                  className="object-cover w-full h-full transform transition-all duration-1000 group-hover:scale-[1.03] group-hover:filter group-hover:brightness-110"
                  loading="lazy"
                  onLoad={() => setImageLoaded(true)}
                  style={{ opacity: imageLoaded ? 1 : 0 }}
                />
                
                {/* Overlay with gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-night-950/80 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700"></div>
                
                {/* Frame decoration */}
                <div className="absolute inset-[2px] border-2 border-white/20 dark:border-white/10 pointer-events-none transform scale-[0.99] transition-transform duration-500 group-hover:scale-[1]"></div>
                
                {/* Image shine effect */}
                <motion.div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
                  style={{
                    background: "linear-gradient(45deg, transparent 40%, rgba(255, 255, 255, 0.1) 45%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.1) 55%, transparent 60%)",
                    backgroundSize: "200% 200%",
                  }}
                  animate={{ backgroundPosition: ["200% 200%", "0% 0%"] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
                ></motion.div>
                
                {/* Stats badges - repositioned */}
                <motion.div 
                  className="absolute bottom-6 right-6 bg-white dark:bg-night-800/90 rounded-2xl shadow-2xl backdrop-blur-md p-4 border border-gray-100 dark:border-night-700/50"
                  variants={childVariants}
                  initial="hidden"
                  animate={controls}
                  whileHover={{ 
                    y: -5, 
                    boxShadow: "0 25px 50px -12px rgba(45, 112, 249, 0.35)" 
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <div className="grid grid-cols-2 gap-4">
                    {resume.aboutSection.stats.slice(0, 2).map((stat, index) => (
                      <div key={index} className="text-center">
                        <motion.div 
                          className="text-xl font-bold mb-1"
                          style={{
                            background: "linear-gradient(90deg, #2d70f9, #0adeca)",
                            WebkitBackgroundClip: "text",
                            backgroundClip: "text",
                            WebkitTextFillColor: "transparent"
                          }}
                          initial={{ backgroundPosition: "0% 50%" }}
                          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                          transition={{ duration: 4, repeat: Infinity, repeatDelay: 3 }}
                        >
                          {stat.value}
                        </motion.div>
                        <div className="text-xs text-night-500 dark:text-gray-400 font-medium">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
                
                {/* Floating Badge - repositioned */}
                <motion.div 
                  className="absolute top-6 left-6 bg-white dark:bg-night-800/90 rounded-2xl shadow-xl px-3 py-2 backdrop-blur-md border border-gray-100 dark:border-night-700/50"
                  initial={{ opacity: 0, x: -20, y: -20 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5, type: "spring" }}
                  whileHover={{ 
                    y: -5, 
                    boxShadow: "0 25px 50px -12px rgba(45, 112, 249, 0.35)" 
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-brand-100 dark:bg-brand-900/50 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-brand-600 dark:text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-night-500 dark:text-gray-400 font-medium">CGPA</p>
                      <p className="text-sm font-bold text-night-900 dark:text-white">{resume.aboutSection.stats[3].value}</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
            
            {/* Background decorations */}
            <div className="absolute top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full bg-gradient-to-tr from-brand-200/30 via-sapphire-200/20 to-teal-200/30 dark:from-brand-900/20 dark:via-sapphire-900/10 dark:to-teal-900/20 blur-3xl -z-10"></div>
            <div className="absolute top-1/2 right-1/2 transform translate-x-1/3 -translate-y-1/3 w-[50%] h-[50%] rounded-full bg-teal-200/40 dark:bg-teal-900/20 blur-3xl -z-10"></div>
          </motion.div>
          
          {/* Content section - Reference for height matching */}
          <motion.div 
            ref={contentRef}
            variants={childVariants}
            className="bg-white/70 dark:bg-night-900/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-gray-100/50 dark:border-night-700/50 order-1 lg:order-2"
          >
            <div className="relative mb-6">
              <motion.h3 
                className="font-display text-3xl md:text-4xl font-bold mb-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <span 
                  className="relative inline-block"
                  style={{
                    background: "linear-gradient(90deg, #2d70f9, #0adeca, #FF6F61)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundSize: "200% 100%"
                  }}
                >
                  {resume.aboutSection.subtitle}
                </span>
              </motion.h3>
              <motion.div
                className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-brand-500 to-teal-400"
                initial={{ width: 0 }}
                animate={{ width: "60%" }}
                transition={{ duration: 0.8, delay: 0.5 }}
              ></motion.div>
            </div>
            
            <div className="space-y-4 mb-8">
              {resume.aboutSection.paragraphs.map((paragraph, index) => (
                <motion.p 
                  key={index}
                  variants={childVariants} 
                  className="text-night-700 dark:text-gray-300 leading-relaxed text-lg"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
            
            {/* Stats */}
            <motion.div variants={childVariants} className="mb-8">
              <div className="grid grid-cols-2 gap-5">
                {resume.aboutSection.stats.slice(2, 4).map((stat, index) => (
                  <motion.div 
                    key={index} 
                    className="rounded-2xl p-5 text-center bg-white dark:bg-night-800/90 backdrop-blur-md border border-gray-100 dark:border-night-700/50 shadow-lg relative overflow-hidden"
                    variants={statVariants}
                    initial="initial"
                    whileHover="hover"
                    onHoverStart={() => setHoveredStat(index)}
                    onHoverEnd={() => setHoveredStat(null)}
                  >
                    <motion.div 
                      className="text-2xl font-bold mb-2"
                      style={{
                        background: "linear-gradient(90deg, #2d70f9, #0adeca)",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        WebkitTextFillColor: "transparent"
                      }}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-sm text-night-600 dark:text-gray-300 font-medium">{stat.label}</div>
                    
                    {/* Hover effect background */}
                    <AnimatePresence>
                      {hoveredStat === index && (
                        <motion.div
                          className="absolute inset-0 pointer-events-none"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 0.05 }}
                          exit={{ opacity: 0 }}
                          style={{
                            background: "radial-gradient(circle at center, #2d70f9, transparent 70%)",
                            zIndex: -1
                          }}
                        />
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* Contact Info */}
            <motion.div variants={childVariants} className="mb-8">
              <div className="space-y-3">
                {resume.aboutSection.contactInfo && resume.aboutSection.contactInfo.map((info, index) => (
                  <motion.div 
                    key={index}
                    className="relative"
                    onHoverStart={() => setHoveredContact(index)}
                    onHoverEnd={() => setHoveredContact(null)}
                  >
                    <motion.div 
                      className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 ${
                        hoveredContact === index ? 
                        'bg-gradient-to-r from-brand-50/70 to-transparent dark:from-brand-900/20 dark:to-transparent' : 
                        'bg-transparent'
                      }`}
                      whileHover={{ x: 3 }}
                    >
                      <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                        hoveredContact === index ? 
                        'bg-brand-100 dark:bg-brand-900/30' : 
                        'bg-transparent'
                      }`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-brand-500 dark:text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={info.icon} />
                        </svg>
                      </div>
                      <span className={`font-medium ${
                        index === 0 || index === 1 ? 
                        'text-night-700 dark:text-brand-300 dark:font-semibold' : 
                        'text-night-700 dark:text-gray-200'
                      }`}>
                        {info.text}
                      </span>
                    </motion.div>
                    
                    {/* Hover indicator line */}
                    <AnimatePresence>
                      {hoveredContact === index && (
                        <motion.div 
                          className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-brand-500 to-teal-500 rounded-full"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: '100%', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* Badges */}
            <motion.div variants={childVariants} className="mb-6">
              <div className="flex flex-wrap gap-3">
                {resume.aboutSection.badges.map((badge, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white/80 dark:bg-night-800/80 backdrop-blur-sm border border-gray-100 dark:border-night-700/50 shadow-md"
                    variants={badgeVariants}
                    initial="initial"
                    whileHover="hover"
                  >
                    <div className="text-brand-500 dark:text-brand-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={badge.icon} />
                      </svg>
                    </div>
                    <span className="text-night-700 dark:text-white font-medium">{badge.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* CTA link */}
            <motion.a 
              href="#contact" 
              className="inline-flex items-center text-base relative font-medium group overflow-hidden py-2"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <motion.span 
                className="relative z-10 bg-gradient-to-r from-brand-500 via-teal-500 to-brand-500 bg-clip-text text-transparent bg-size-200"
                animate={{ backgroundPosition: ["0% center", "100% center"] }}
                transition={{ duration: 3, repeat: Infinity, repeatType: "mirror" }}
              >
                Let's work together
              </motion.span>
              <span className="relative z-10 ml-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-brand-500 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              
              {/* Animated underline */}
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-brand-500 to-teal-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              
              {/* Animated glow effect */}
              <motion.span 
                className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-brand-500 to-teal-500"
                initial={{ opacity: 0, filter: "blur(3px)" }}
                whileHover={{ opacity: 0.7, filter: "blur(3px)" }}
                transition={{ duration: 0.3 }}
              ></motion.span>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;