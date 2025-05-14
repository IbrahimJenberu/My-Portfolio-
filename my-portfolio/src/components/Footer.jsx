import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { resume } from '../data/resume';

const Footer = () => {
  const { theme, toggleTheme } = useTheme();
  const currentYear = new Date().getFullYear();
  const [hoveredSocial, setHoveredSocial] = useState(null);
  const [hoveredNav, setHoveredNav] = useState(null);
  
  const socialVariants = {
    initial: { 
      scale: 1,
      boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)" 
    },
    hover: { 
      scale: 1.15, 
      boxShadow: "0px 5px 15px rgba(45, 112, 249, 0.3)",
      transition: { type: "spring", stiffness: 500, damping: 15 }
    }
  };
  
  const linkVariants = {
    initial: { x: 0 },
    hover: { 
      x: 5, 
      transition: { type: "spring", stiffness: 300, damping: 10 }
    }
  };
  
  const contactItemVariants = {
    initial: { 
      backgroundColor: "transparent",
      scale: 1
    },
    hover: { 
      backgroundColor: theme === 'dark' ? "rgba(45, 112, 249, 0.1)" : "rgba(45, 112, 249, 0.05)",
      scale: 1.02,
      transition: { type: "spring", stiffness: 300, damping: 10 }
    }
  };
  
  return (
    <footer className="relative overflow-hidden bg-white dark:bg-[#0F172A] border-t border-gray-200/60 dark:border-night-800/60">
      {/* Ambient background */}
      <div className="absolute inset-0 opacity-40 dark:opacity-30 bg-[radial-gradient(ellipse_at_top_right,#0adeca,transparent_70%),radial-gradient(ellipse_at_bottom_left,#2d70f9,transparent_70%)] pointer-events-none"></div>
      
      {/* Decorative particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div 
            key={i}
            initial={{ 
              x: `${Math.random() * 100}%`, 
              y: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.3 + 0.1,
              scale: Math.random() * 0.4 + 0.1
            }}
            animate={{ 
              y: [null, `${Math.random() * 10}%`, null],
              x: [null, `${Math.random() * 10}%`, null],
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
      
      <div className="container mx-auto px-6 sm:px-8 py-12 relative z-10">
        <div className="glass-card rounded-2xl p-8 md:p-10 backdrop-blur-md border border-white/20 dark:border-night-800/50 shadow-xl mb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            {/* Brand Column */}
            <div className="md:col-span-5">
              <a 
                href="#" 
                className="text-2xl font-bold font-display text-night-900 dark:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-lg inline-block mb-4"
              >
                <span className="relative">
                  <span className="relative z-10" style={{
                    background: "linear-gradient(90deg, #2d70f9, #0adeca)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundSize: "200% 100%"
                  }}>
                    {resume.name.split(' ')[0]}
                  </span>
                  <motion.span 
                    className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-brand-500 to-teal-400"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  ></motion.span>
                </span>
                <span className="text-night-700 dark:text-gray-300 ml-1.5"> {resume.name.split(' ').slice(1).join(' ')}</span>
              </a>
              
              <p className="text-night-700 dark:text-gray-400 mb-8 max-w-sm leading-relaxed">
                {resume.footerTagline}
              </p>
              
              <div className="flex space-x-4">
                {resume.socialLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.name}
                    className="p-2.5 bg-white dark:bg-night-800 shadow-md rounded-lg text-night-700 dark:text-gray-300 border border-gray-200/50 dark:border-night-700/50 transition-colors duration-200 overflow-hidden relative group"
                    variants={socialVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap={{ scale: 0.95 }}
                    onHoverStart={() => setHoveredSocial(link.name)}
                    onHoverEnd={() => setHoveredSocial(null)}
                  >
                    <span className="sr-only">{link.name}</span>
                    <svg className="h-5 w-5 relative z-10 transition-colors duration-200 group-hover:text-brand-500 dark:group-hover:text-brand-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d={link.icon} />
                    </svg>
                    
                    {/* Radial gradient when hovered */}
                    <AnimatePresence>
                      {hoveredSocial === link.name && (
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-r from-brand-500/10 to-teal-500/10 dark:from-brand-500/20 dark:to-teal-500/20 pointer-events-none"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </AnimatePresence>
                  </motion.a>
                ))}
              </div>
            </div>
            
            {/* Navigation Column */}
            <div className="md:col-span-3">
              <h3 className="text-lg font-bold font-display text-night-900 dark:text-white mb-6 inline-flex items-center">
                <span className="w-5 h-5 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-brand-500 dark:text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </span>
                Navigation
              </h3>
              <ul className="space-y-2.5">
                {resume.navLinks.map((link) => (
                  <li key={link.id} className="overflow-hidden">
                    <motion.a 
                      href={`#${link.id}`}
                      className="text-night-700 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors duration-200 flex items-center group"
                      variants={linkVariants}
                      initial="initial"
                      whileHover="hover"
                      onHoverStart={() => setHoveredNav(link.id)}
                      onHoverEnd={() => setHoveredNav(null)}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full mr-2 transition-colors duration-200 ${
                        hoveredNav === link.id ? 
                        'bg-brand-500 dark:bg-brand-400' : 
                        'bg-gray-400 dark:bg-gray-600'
                      }`}></span>
                      {link.name}
                      
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-3.5 w-3.5 ml-1.5 text-brand-500 dark:text-brand-400 opacity-0 transform -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Contact Column */}
            <div className="md:col-span-4">
              <h3 className="text-lg font-bold font-display text-night-900 dark:text-white mb-6 inline-flex items-center">
                <span className="w-5 h-5 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-teal-500 dark:text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                Contact
              </h3>
              <ul className="space-y-3">
                {resume.contactSection.contactDetails.map((detail, index) => (
                  <motion.li 
                    key={index} 
                    className="flex items-start p-2 rounded-lg"
                    variants={contactItemVariants}
                    initial="initial"
                    whileHover="hover"
                  >
                    <div className="shrink-0 mr-3 text-brand-500 dark:text-brand-400 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={detail.icon} />
                      </svg>
                    </div>
                    <div>
                      <span className="block text-night-700 dark:text-gray-300 text-sm font-medium">{detail.value}</span>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200/60 dark:border-night-800/60 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-night-600 dark:text-gray-400">
            © {currentYear} {resume.copyright}
          </p>
          
          <div className="flex items-center mt-4 md:mt-0 space-x-3">
            <motion.button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              className="p-2 text-night-600 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 rounded-lg border border-gray-200/60 dark:border-night-800/60 backdrop-blur-sm bg-white/70 dark:bg-night-800/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              whileHover={{ y: -2, boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)" }}
              whileTap={{ y: 0 }}
            >
              {theme === 'dark' ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </motion.button>
            
            <span className="px-3 py-1.5 text-xs rounded-full border border-gray-200/60 dark:border-night-800/60 backdrop-blur-sm bg-white/70 dark:bg-night-800/70 text-night-700 dark:text-gray-300 font-medium flex items-center">
              <span className="w-1.5 h-1.5 rounded-full mr-1.5 bg-green-500 animate-pulse"></span>
              Designed with precision
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;