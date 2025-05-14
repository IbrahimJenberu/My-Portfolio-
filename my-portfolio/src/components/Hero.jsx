import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { resume } from '../data/resume';

const Hero = () => {
  const heroRef = useRef(null);
  const [isHoveredPrimary, setIsHoveredPrimary] = useState(false);
  const [isHoveredSecondary, setIsHoveredSecondary] = useState(false);
  
  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  
  // Smooth physics-based springs
  const smoothY1 = useSpring(y1, { stiffness: 100, damping: 30 });
  const smoothY2 = useSpring(y2, { stiffness: 100, damping: 30 });
  const smoothY3 = useSpring(y3, { stiffness: 100, damping: 30 });
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!heroRef.current) return;
      
      const { clientX, clientY } = e;
      const { width, height, left, top } = heroRef.current.getBoundingClientRect();
      
      const x = (clientX - left) / width;
      const y = (clientY - top) / height;
      
      const layer1 = heroRef.current.querySelector('.parallax-layer-1');
      const layer2 = heroRef.current.querySelector('.parallax-layer-2');
      const layer3 = heroRef.current.querySelector('.parallax-layer-3');
      
      if (layer1 && layer2 && layer3) {
        layer1.style.transform = `translate(${x * 15}px, ${y * 15}px)`;
        layer2.style.transform = `translate(${-x * 25}px, ${-y * 25}px)`;
        layer3.style.transform = `translate(${x * 10}px, ${-y * 10}px) rotate(${x * 5}deg)`;
      }
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.2,
      }
    }
  };
  
  const childVariants = {
    hidden: { 
      y: 20, 
      opacity: 0 
    },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };
  
  const buttonVariants = {
    initial: { scale: 1, boxShadow: "0px 4px 20px rgba(45, 112, 249, 0.2)" },
    hover: {
      scale: 1.05,
      boxShadow: "0px 8px 30px rgba(45, 112, 249, 0.4)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.97,
      boxShadow: "0px 2px 10px rgba(45, 112, 249, 0.3)",
      transition: {
        type: "spring",
        stiffness: 800,
        damping: 15
      }
    }
  };

  return (
    <section 
      ref={heroRef}
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-50 via-white to-white dark:from-[#0F172A] dark:via-[#121A2E] dark:to-[#161E35] z-0"></div>
      
      {/* Mesh gradient overlay */}
      <div className="absolute inset-0 opacity-40 dark:opacity-30 bg-[radial-gradient(circle_at_bottom_left,#2d70f9,transparent_70%),radial-gradient(circle_at_top_right,#0adeca,transparent_70%)]"></div>
      
      {/* Sunrise coral accent */}
      <div className="absolute -bottom-48 left-0 right-0 h-64 bg-gradient-to-t from-[#FF6F61]/15 to-transparent dark:from-[#FF6F61]/10 dark:to-transparent rounded-full filter blur-3xl transform scale-150 opacity-50 dark:opacity-30"></div>
      
      {/* Silver mist accent */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#E0E0E0]/40 to-transparent dark:from-[#E0E0E0]/15 dark:to-transparent filter blur-3xl transform scale-150 opacity-60 dark:opacity-20"></div>
      
      {/* Particles cloud background effect */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div 
            key={i}
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight,
              opacity: Math.random() * 0.4 + 0.1,
              scale: Math.random() * 0.4 + 0.1
            }}
            animate={{ 
              y: [null, Math.random() * 40 - 20 + "px", null],
              x: [null, Math.random() * 40 - 20 + "px", null]
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
      
      {/* Synthetic DNA helix graphic - representing tech/healthcare */}
      <div className="absolute h-full w-full opacity-10 dark:opacity-5 pointer-events-none overflow-hidden">
        <motion.div 
          className="absolute h-[120%] w-[120%] top-0 left-1/2 transform -translate-x-1/2"
          style={{ y: smoothY3 }}
        >
          <div className="absolute left-1/4 h-full w-1 bg-gradient-to-b from-brand-300 via-teal-300 to-brand-300 animate-dna-move"></div>
          <div className="absolute left-[calc(1/4_+_40px)] h-full w-1 bg-gradient-to-b from-teal-300 via-brand-300 to-teal-300 animate-dna-move-delay"></div>
          {Array.from({ length: 25 }).map((_, i) => (
            <React.Fragment key={i}>
              <div className="absolute w-40 h-0.5 bg-brand-300 transform -rotate-45 animate-dna-fade"
                 style={{ top: `${(i * 8) + 5}%`, left: 'calc(25% - 20px)' }}></div>
              <div className="absolute w-40 h-0.5 bg-teal-300 transform rotate-45 animate-dna-fade-delay"
                 style={{ top: `${(i * 8) + 10}%`, left: 'calc(25% + 20px)' }}></div>
            </React.Fragment>
          ))}
        </motion.div>
      </div>
      
      {/* Parallax Layers */}
      <motion.div 
        className="absolute inset-0 z-0 overflow-hidden"
        style={{ opacity }}
      >
        <motion.div 
          className="parallax-layer-1 absolute opacity-10 dark:opacity-10 pointer-events-none"
          style={{ y: smoothY1 }}
        >
          <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-brand-400 filter blur-5xl"></div>
          <div className="absolute bottom-1/3 right-1/5 w-96 h-96 rounded-full bg-teal-400 filter blur-5xl"></div>
        </motion.div>
        <motion.div 
          className="parallax-layer-2 absolute opacity-10 dark:opacity-10 pointer-events-none"
          style={{ y: smoothY2 }}
        >
          <div className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full bg-indigo-400 filter blur-5xl"></div>
          <div className="absolute -bottom-20 left-1/3 w-96 h-96 rounded-full bg-[#FF6F61] filter blur-5xl"></div>
        </motion.div>
        <motion.div 
          className="parallax-layer-3 absolute opacity-70 dark:opacity-20 mix-blend-soft-light pointer-events-none"
          style={{ y: smoothY3 }}
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle,rgba(255,255,255,0.8)_0%,transparent_70%)]"></div>
        </motion.div>
      </motion.div>
      
      {/* Hero Content */}
      <div className="section-container z-10 text-center relative pb-16 md:pb-0">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto px-4"
        >
          <motion.div 
            variants={childVariants}
            className="relative mb-8 inline-flex"
          >
            <span className="badge-primary text-base sm:text-base border-2 px-5 py-1.5 rounded-full bg-white/80 dark:bg-night-900/80 backdrop-blur-md shadow-xl text-night-900 dark:text-white border-brand-300/30 dark:border-brand-500/30">
              <span className="mr-2 inline-block w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>
              AI & Machine Learning Engineer
            </span>
          </motion.div>

          <motion.div variants={childVariants} className="relative mb-6 overflow-hidden">
            <motion.h1 
              className="font-display text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight"
            >
              <span className="block text-night-900 dark:text-white mb-1">{resume.heroSection.greeting}</span>
              
              <div className="relative overflow-hidden">
                <motion.span 
                  className="section-title-gradient relative block"
                  style={{
                    backgroundSize: "200% 100%",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundImage: "linear-gradient(90deg, #2d70f9, #0adeca, #FF6F61, #2d70f9)",
                  }}
                  initial={{ backgroundPosition: "0% 50%" }}
                  animate={{ backgroundPosition: "100% 50%" }}
                  transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
                >
                  {resume.heroSection.name}
                </motion.span>
                
                {/* Text reveal mask animation - fixed to swipe from left to right */}
                <motion.div
                  className="absolute inset-0 bg-white dark:bg-[#161E35]"
                  initial={{ left: "0%", right: "0%" }}
                  animate={{ left: "0%", right: "100%" }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
                ></motion.div>
              </div>
            </motion.h1>
          </motion.div>
          
          <motion.p 
            variants={childVariants}
            className="text-lg sm:text-xl md:text-2xl text-night-700 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            {resume.heroSection.subtitle}
          </motion.p>
          
          <motion.div
            variants={childVariants}
            className="flex flex-col sm:flex-row gap-5 justify-center"
          >
            <motion.a 
              href="#contact" 
              className="relative group overflow-hidden rounded-xl px-8 py-3 font-medium bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-xl"
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              onHoverStart={() => setIsHoveredPrimary(true)}
              onHoverEnd={() => setIsHoveredPrimary(false)}
            >
              {/* Animated liquid bubble effect */}
              <span className="absolute inset-0 w-full h-full">
                <span className="absolute -left-[100px] w-20 h-20 rounded-full bg-white/30 mix-blend-plus-lighter blur-md transform translate-x-0 animate-bubble"></span>
                <span className="absolute -left-[100px] w-36 h-36 rounded-full bg-white/20 mix-blend-plus-lighter blur-lg transform translate-x-0 animate-bubble delay-150"></span>
              </span>
              
              <span className="relative flex items-center justify-center">
                {resume.heroSection.ctaPrimary}
                <svg xmlns="http://www.w3.org/2000/svg" className="ml-2.5 h-5 w-5 transition-transform duration-300 ease-bounce-gentle group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              
              {/* Hover 3D press effect */}
              <AnimatePresence>
                {isHoveredPrimary && (
                  <motion.span 
                    className="absolute inset-0 bg-brand-400/20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  />
                )}
              </AnimatePresence>
            </motion.a>
            
            <motion.a 
              href={resume.heroSection.resumeUrl} 
              target="_blank"
              rel="noopener noreferrer"
              className="relative group overflow-hidden rounded-xl px-8 py-3 font-medium bg-white/80 dark:bg-night-800/80 backdrop-blur-sm text-night-900 dark:text-white border border-night-200 dark:border-night-700 shadow-xl"
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              onHoverStart={() => setIsHoveredSecondary(true)}
              onHoverEnd={() => setIsHoveredSecondary(false)}
            >
              {/* Shimmering border effect */}
              <span className="absolute inset-0 overflow-hidden rounded-xl">
                <span className="absolute inset-0 transform animate-shimmer">
                  <span className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-r from-transparent via-brand-400/20 to-transparent skew-x-[-20deg]"></span>
                </span>
              </span>
              
              <span className="relative flex items-center justify-center text-brand-600 dark:text-brand-400">
                {resume.heroSection.ctaSecondary}
                <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5 transition-transform duration-300 ease-bounce-gentle group-hover:translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </span>
              
              {/* Hover glow effect */}
              <AnimatePresence>
                {isHoveredSecondary && (
                  <motion.span 
                    className="absolute inset-0 bg-brand-400/10 dark:bg-brand-400/5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  />
                )}
              </AnimatePresence>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll indicator - Fixed position at bottom, now properly positioned */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          transition: {
            delay: 1.5,
            duration: 1,
            ease: [0, 0.55, 0.45, 1]
          }
        }}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 hidden md:flex flex-col items-center"
      >
        <span className="text-sm text-night-500 dark:text-gray-400 mb-3 tracking-wider uppercase font-medium">Scroll Down</span>
        <motion.div 
          className="w-8 h-12 border-2 border-night-300 dark:border-night-600 rounded-full flex justify-center"
          animate={{ 
            boxShadow: ["0px 0px 0px rgba(45, 112, 249, 0)", "0px 0px 20px rgba(45, 112, 249, 0.5)", "0px 0px 0px rgba(45, 112, 249, 0)"],
            borderColor: ["rgb(209 213 219)", "rgb(45 112 249)", "rgb(209 213 219)"]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <motion.div 
            className="w-1.5 h-3 bg-night-500 dark:bg-night-400 rounded-full mt-2"
            animate={{ 
              y: [0, 16, 0],
              opacity: [0.8, 1, 0.8],
              backgroundColor: ["rgb(107 114 128)", "rgb(45 112 249)", "rgb(107 114 128)"]
            }}
            transition={{ 
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut" 
            }}
          ></motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;