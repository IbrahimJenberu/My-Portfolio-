import React, { useEffect, useState, useRef } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { resume } from '../data/resume';

const ProjectCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const cardRef = useRef(null);
  
  // Simplified tilt effect
  const [tiltValues, setTiltValues] = useState({ x: 0, y: 0 });
  
  // Handle mouse movement for premium 3D effect
  const handleMouseMove = (e) => {
    if (!cardRef.current || !isHovered) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Calculate rotation (with reduced intensity for subtlety)
    const rotY = ((mouseX - width / 2) / width) * 3; // Max 3 degrees
    const rotX = ((height / 2 - mouseY) / height) * 3; // Max 3 degrees
    
    setTiltValues({ x: rotX, y: rotY });
  };
  
  // Reset rotations when mouse leaves
  const handleMouseLeave = () => {
    setIsHovered(false);
    setTiltValues({ x: 0, y: 0 });
  };
  
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        damping: 15,
        stiffness: 150,
        duration: 0.6,
        delay: index * 0.1 
      }
    }
  };
  
  const imageVariants = {
    initial: { scale: 1, filter: "brightness(0.95)" },
    hover: { 
      scale: 1.03,
      filter: "brightness(1.05)",
      transition: { duration: 0.7, ease: [0.19, 1, 0.22, 1] }
    }
  };
  
  const overlayVariants = {
    initial: { 
      background: "linear-gradient(to top, rgba(10, 10, 30, 0.9) 0%, rgba(10, 10, 30, 0.7) 30%, rgba(10, 10, 30, 0.3) 60%, rgba(10, 10, 30, 0) 100%)",
      opacity: 0.9
    },
    hover: { 
      background: "linear-gradient(to top, rgba(10, 10, 30, 0.95) 0%, rgba(10, 10, 30, 0.85) 40%, rgba(10, 10, 30, 0.5) 70%, rgba(10, 10, 30, 0.3) 100%)",
      opacity: 1,
      transition: { duration: 0.5, ease: [0.19, 1, 0.22, 1] }
    }
  };
  
  const contentVariants = {
    initial: {
      y: 20,
      opacity: 0,
    },
    hover: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.19, 1, 0.22, 1] }
    }
  };
  
  const titleVariants = {
    initial: { y: 0 },
    hover: { 
      y: -8,
      transition: { duration: 0.5, ease: [0.19, 1, 0.22, 1] }
    }
  };
  
  const categoryVariants = {
    initial: { y: 0 },
    hover: { 
      y: -10,
      transition: { duration: 0.5, ease: [0.19, 1, 0.22, 1] }
    }
  };
  
  const buttonVariants = {
    initial: { 
      scale: 0.95,
      opacity: 0,
      y: 20
    },
    hover: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.5, 
        ease: [0.19, 1, 0.22, 1],
        delay: 0.1
      }
    }
  };

  return (
    <>
      <motion.div
        ref={cardRef}
        variants={cardVariants}
        className="group relative rounded-2xl overflow-hidden shadow-xl dark:shadow-2xl transition-all duration-500 bg-white/60 dark:bg-night-800/60 backdrop-blur-sm border border-gray-200/70 dark:border-night-700/70"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={handleMouseLeave}
        onClick={() => setShowModal(true)}
        onMouseMove={handleMouseMove}
        style={{ 
          cursor: 'pointer',
          transform: isHovered 
            ? `perspective(1000px) rotateX(${tiltValues.x}deg) rotateY(${tiltValues.y}deg)` 
            : 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
          transition: 'transform 0.3s ease'
        }}
        whileHover={{ 
          y: -8,
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
          transition: {
            y: { type: "spring", stiffness: 300, damping: 20 },
            boxShadow: { duration: 0.3 }
          }
        }}
      >
        {/* Ambient glow effect */}
        <motion.div 
          className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none z-0 transition-opacity duration-700"
          style={{
            background: "radial-gradient(circle at center, rgba(45, 112, 249, 0.15) 0%, transparent 70%)",
            filter: "blur(20px)"
          }}
        />
        
        {/* Project Image */}
        <div className="aspect-w-16 aspect-h-9 w-full overflow-hidden">
          <motion.img
            src={project.image}
            alt={project.title}
            className="object-cover w-full h-full"
            variants={imageVariants}
            initial="initial"
            animate={isHovered ? "hover" : "initial"}
            loading="lazy"
          />
        </div>
        
        {/* Premium border */}
        <motion.div
          className="absolute inset-0 z-20 rounded-2xl pointer-events-none"
          animate={{
            boxShadow: isHovered 
              ? 'inset 0 0 0 1px rgba(255, 255, 255, 0.15)' 
              : 'inset 0 0 0 0px rgba(255, 255, 255, 0)'
          }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Colored accent line at top */}
        <motion.div 
          className="absolute top-0 left-0 right-0 h-[2px] z-20 overflow-hidden"
          animate={{
            scaleX: isHovered ? 1 : 0,
            opacity: isHovered ? 1 : 0
          }}
          transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
          style={{
            background: "linear-gradient(to right, #2d70f9, #0adeca, #FF6F61)",
            transformOrigin: "center"
          }}
        />
        
        {/* Overlay Content */}
        <motion.div 
          className="absolute inset-0 flex flex-col justify-end p-6 z-10"
          variants={overlayVariants}
          initial="initial"
          animate={isHovered ? "hover" : "initial"}
        >
          {/* Category tag */}
          <motion.div 
            className="mb-3"
            variants={categoryVariants}
            initial="initial"
            animate={isHovered ? "hover" : "initial"}
          >
            <span className="px-3 py-1.5 bg-brand-500/60 backdrop-blur-md text-white text-xs font-medium rounded-full inline-flex items-center space-x-1 border border-white/10 shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {project.technologies[0]}
            </span>
          </motion.div>
          
          {/* Title */}
          <motion.h3 
            className="text-2xl font-display font-bold text-white mb-3 drop-shadow-md"
            variants={titleVariants}
            initial="initial"
            animate={isHovered ? "hover" : "initial"}
          >
            {project.title}
          </motion.h3>
          
          {/* Content */}
          <motion.div 
            variants={contentVariants}
            initial="initial"
            animate={isHovered ? "hover" : "initial"}
            className="space-y-4"
          >
            <p className="text-gray-200 text-sm line-clamp-3 leading-relaxed">
              {project.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.slice(1, 4).map((tech, techIndex) => (
                <span 
                  key={techIndex} 
                  className="px-2.5 py-1 bg-white/10 backdrop-blur-sm text-white text-xs rounded-full border border-white/5 transition-all group-hover:bg-white/15"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 4 && (
                <span className="px-2.5 py-1 bg-white/10 backdrop-blur-sm text-white text-xs rounded-full border border-white/5 transition-all group-hover:bg-white/15">
                  +{project.technologies.length - 4} more
                </span>
              )}
            </div>
            
            {/* Buttons */}
            <div className="flex gap-3">
              {project.liveUrl && (
                <motion.a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="px-4 py-2 bg-gradient-to-r from-brand-500 to-brand-600 text-white text-sm font-medium rounded-lg flex items-center border border-white/10 shadow-md relative overflow-hidden group/btn"
                  variants={buttonVariants}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0px 5px 15px rgba(45, 112, 249, 0.4)",
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Button shimmer effect */}
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg] translate-x-[-120%] group-hover/btn:translate-x-[120%] transition-all duration-700"></span>
                  
                  <span className="relative z-10 flex items-center">
                    Live Demo
                    <svg xmlns="http://www.w3.org/2000/svg" className="ml-1.5 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </span>
                </motion.a>
              )}
              
              {project.codeUrl && (
                <motion.a
                  href={project.codeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white text-sm font-medium rounded-lg flex items-center border border-white/10 backdrop-blur-sm transition-colors duration-300 relative overflow-hidden group/code"
                  variants={buttonVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10 flex items-center">
                    View Code
                    <svg xmlns="http://www.w3.org/2000/svg" className="ml-1.5 h-4 w-4 transition-transform duration-300 group-hover/code:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </span>
                </motion.a>
              )}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
      
      {/* Project Detail Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
          >
            {/* Background overlay with gradient */}
            <motion.div 
              className="absolute inset-0 bg-night-950/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            
            <motion.div 
              className="relative w-full max-w-5xl max-h-[90vh] bg-white dark:bg-night-900 rounded-2xl overflow-hidden shadow-2xl border border-white/10 dark:border-night-700/30"
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 30, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Ambient highlight */}
              <div className="absolute -top-80 -right-40 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute -bottom-80 -left-40 w-96 h-96 bg-[#FF6F61]/20 rounded-full blur-3xl pointer-events-none"></div>
              
              {/* Close button with hover animation */}
              <motion.button 
                className="absolute right-4 top-4 z-10 p-2 rounded-full bg-night-950/20 text-white hover:bg-night-950/40 transition-colors duration-200"
                onClick={() => setShowModal(false)}
                whileHover={{ rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
              
              {/* Image header with overlay */}
              <div className="relative aspect-w-16 aspect-h-9 w-full">
                <motion.img 
                  src={project.image} 
                  alt={project.title}
                  className="object-cover w-full h-full"
                  initial={{ scale: 1.05, filter: "brightness(0.9)" }}
                  animate={{ scale: 1, filter: "brightness(1)" }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-night-950 via-night-950/50 to-transparent opacity-70"></div>
                
                {/* Colored accent line at top */}
                <motion.div 
                  className="absolute top-0 left-0 right-0 h-[3px] z-10"
                  style={{
                    background: "linear-gradient(to right, #2d70f9, #0adeca, #FF6F61)",
                  }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                />
                
                {/* Project title overlay on image */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <motion.h2 
                    className="font-display text-3xl md:text-4xl font-bold text-white mb-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                  >
                    {project.title}
                  </motion.h2>
                  
                  <motion.div 
                    className="flex flex-wrap gap-2 mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <motion.span 
                        key={techIndex} 
                        className="px-3 py-1 bg-white/10 backdrop-blur-sm text-white text-xs font-medium rounded-full border border-white/5"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.3 + (techIndex * 0.1) }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </motion.div>
                </div>
              </div>
              
              <div className="p-8 overflow-y-auto max-h-[50vh] scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-night-700 scrollbar-track-transparent">
                <motion.p 
                  className="text-night-700 dark:text-gray-300 mb-8 text-lg leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  {project.description}
                </motion.p>
                
                <motion.div 
                  className="mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <h3 className="text-lg font-display font-bold text-night-900 dark:text-white mb-4 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-brand-500 dark:text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                    Technology Stack
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {project.technologies.map((tech, index) => (
                      <motion.span 
                        key={index}
                        className="px-4 py-2 bg-gray-100 dark:bg-night-800 text-night-700 dark:text-gray-300 rounded-lg text-sm font-medium border border-gray-200 dark:border-night-700 hover:border-brand-300 dark:hover:border-brand-700 transition-colors duration-300"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.5 + (index * 0.05) }}
                        whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex flex-wrap gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  {project.liveUrl && (
                    <motion.a 
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-gradient-to-r from-brand-500 to-brand-600 text-white font-medium rounded-xl flex items-center border border-white/10 shadow-md relative overflow-hidden group"
                      whileHover={{ 
                        y: -5, 
                        boxShadow: "0 20px 40px -15px rgba(45, 112, 249, 0.4)" 
                      }}
                      whileTap={{ y: -2 }}
                    >
                      {/* Button shine effect */}
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg] translate-x-[-120%] group-hover:translate-x-[120%] transition-all duration-700"></span>
                      
                      <span className="relative z-10 flex items-center">
                        View Live Demo
                        <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </span>
                    </motion.a>
                  )}
                  
                  {project.codeUrl && (
                    <motion.a 
                      href={project.codeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-white dark:bg-night-800 text-night-900 dark:text-white font-medium rounded-xl flex items-center border border-gray-200 dark:border-night-700 relative overflow-hidden group shadow-md"
                      whileHover={{ 
                        y: -5, 
                        boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.1)" 
                      }}
                      whileTap={{ y: -2 }}
                    >
                      <span className="relative z-10 flex items-center">
                        Source Code
                        <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                      </span>
                    </motion.a>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Projects = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  
  // Add refs for mouse parallax effect
  const parallaxRef = useRef(null);
  
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
        staggerChildren: 0.1,
      },
    },
  };

  // Text typing animation for title
  const titleText = "Innovative Projects";
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
  
  return (
    <section id="projects" className="relative overflow-hidden py-24 sm:py-32" ref={parallaxRef}>
      {/* Premium Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-white dark:from-[#0F172A] dark:via-[#121A2E] dark:to-[#161E35] z-0"></div>
      
      {/* Mesh gradient overlay */}
      <div className="absolute inset-0 opacity-40 dark:opacity-30 bg-[radial-gradient(ellipse_at_top_right,#0adeca,transparent_70%),radial-gradient(ellipse_at_bottom_left,#2d70f9,transparent_70%)]"></div>
      
      {/* Ambient particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div 
            key={i}
            initial={{ 
              x: `${Math.random() * 100}%`, 
              y: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.3 + 0.1,
              scale: Math.random() * 0.4 + 0.1
            }}
            animate={{ 
              y: [null, `${Math.random() * 10 - 5}%`, null],
              x: [null, `${Math.random() * 10 - 5}%`, null],
              opacity: [null, Math.random() * 0.3 + 0.2, null]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: Math.random() * 10 + 10,
              ease: "easeInOut"
            }}
            className="absolute rounded-full bg-gradient-to-r from-teal-300 to-brand-300 dark:from-teal-500 dark:to-brand-500"
            style={{ 
              width: Math.random() * 6 + 2 + "px", 
              height: Math.random() * 6 + 2 + "px", 
              filter: "blur(" + (Math.random() * 2 + 1) + "px)"
            }}
          ></motion.div>
        ))}
      </div>
      
      {/* Decorative elements */}
      <div className="absolute w-[800px] h-[800px] -top-[400px] -right-[400px] bg-brand-500/5 dark:bg-brand-800/5 rounded-full blur-3xl"></div>
      <div className="absolute w-[600px] h-[600px] -bottom-[300px] -left-[300px] bg-[#FF6F61]/5 dark:bg-[#FF6F61]/10 rounded-full blur-3xl"></div>
      
      <div className="section-container relative z-10 px-4 sm:px-6">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex mb-5"
          >
            <span className="px-4 py-1.5 rounded-full bg-white/80 dark:bg-night-900/80 backdrop-blur-md shadow-lg text-night-900 dark:text-white border border-brand-300/30 dark:border-brand-500/30 text-sm font-medium">
              <span className="mr-2 inline-block w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>
              Portfolio
            </span>
          </motion.div>
          
          <h2 className="flex justify-center items-baseline flex-wrap">
            {titleWords.map((word, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={wordVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mr-3 last:mr-0 tracking-tight text-night-900 dark:text-white"
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
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-night-700 dark:text-gray-300 max-w-2xl mx-auto text-lg mt-8"
          >
            {resume.projectsSection.subtitle}
          </motion.p>
        </div>
        
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16"
        >
          {resume.projectsSection.projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </motion.div>
        
        {resume.projectsSection.moreProjectsUrl && (
          <div className="text-center mt-20">
            <motion.a
              href={resume.projectsSection.moreProjectsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-3 font-medium bg-white/80 dark:bg-night-800/80 backdrop-blur-sm text-night-900 dark:text-white border border-night-200 dark:border-night-700 rounded-xl shadow-xl relative overflow-hidden group"
              whileHover={{ 
                y: -5,
                boxShadow: "0 25px 50px -12px rgba(45, 112, 249, 0.25)",
              }}
              whileTap={{ y: -2 }}
            >
              {/* Shimmering effect */}
              <span className="absolute inset-0 overflow-hidden rounded-xl">
                <span className="absolute inset-0 transform animate-shimmer">
                  <span className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-r from-transparent via-brand-400/20 to-transparent skew-x-[-20deg]"></span>
                </span>
              </span>
              
              <span className="relative z-10 flex items-center text-brand-600 dark:text-brand-400">
                View More Projects
                <svg xmlns="http://www.w3.org/2000/svg" className="ml-2.5 h-5 w-5 transform transition-transform duration-300 ease-bounce-gentle group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </motion.a>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;