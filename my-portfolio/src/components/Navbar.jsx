import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { resume } from '../data/resume';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toggleTheme, theme } = useTheme();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navVariants = {
    initial: { y: -100, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: 'spring', 
        stiffness: 100, 
        damping: 20 
      }
    }
  };

  const linkContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };
  
  const linkVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 15
      }
    }
  };

  const mobileMenuVariants = {
    closed: { 
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
      }
    },
    open: { 
      height: 'auto',
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: [0, 0, 0.2, 1],
      }
    }
  };

  return (
    <motion.header 
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? 'glass-card backdrop-blur-lg py-3' 
          : 'bg-transparent py-5'
      } border-b ${isScrolled ? 'border-gray-100 dark:border-night-800/50' : 'border-transparent'}`}
      variants={navVariants}
      initial="initial"
      animate="animate"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between">
          <motion.a 
            href="#" 
            className="text-xl font-display font-bold text-night-900 dark:text-white focus-ring rounded px-1.5 py-1"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="gradient-text">{resume.name.split(' ')[0]}</span>
          </motion.a>
          
          {/* Desktop Navigation */}
          <motion.div 
            className="hidden md:flex items-center space-x-8"
            variants={linkContainerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="flex space-x-5">
              {resume.navLinks.map((link) => (
                <motion.a
                  key={link.id}
                  href={`#${link.id}`}
                  variants={linkVariants}
                  className="group relative text-night-700 dark:text-gray-300 hover:text-brand-500 dark:hover:text-brand-400 transition-colors duration-300 font-medium text-sm py-2 focus-ring rounded px-1.5"
                >
                  <span className="relative z-10 tracking-wide">{link.name}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-500 dark:bg-brand-400 transition-all duration-300 ease-in-out group-hover:w-full rounded-full"></span>
                </motion.a>
              ))}
            </div>
            
            <div className="flex items-center space-x-3">
              {resume.socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                  className="text-night-700 dark:text-gray-300 hover:text-brand-500 dark:hover:text-brand-400 transition-all duration-300 focus-ring rounded-full p-1.5"
                  whileHover={{ 
                    scale: 1.1,
                    rotate: [0, -10, 10, -5, 0],
                    transition: { duration: 0.5 }
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <span className="sr-only">{link.name}</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d={link.icon} />
                  </svg>
                </motion.a>
              ))}
              
              <div className="h-6 w-px bg-gray-300 dark:bg-night-700 mx-0.5"></div>
              
              <motion.button
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                className="p-2 text-night-700 dark:text-gray-300 hover:text-brand-500 dark:hover:text-brand-400 rounded-full focus-ring"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
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
            </div>
          </motion.div>
          
          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <motion.button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              className="p-2 mr-2 text-night-700 dark:text-gray-300 hover:text-brand-500 dark:hover:text-brand-400 rounded-full focus-ring"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
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
            
            <motion.button
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
              className="p-2 text-night-700 dark:text-gray-300 hover:text-brand-500 dark:hover:text-brand-400 rounded-full focus-ring"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={isMobileMenuOpen ? "open" : "closed"}
                variants={{
                  open: {rotate: 180},
                  closed: {rotate: 0}
                }}
                transition={{duration: 0.5}}
              >
                {isMobileMenuOpen ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </motion.div>
            </motion.button>
          </div>
        </nav>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="md:hidden glass-card backdrop-blur-lg shadow-xl overflow-hidden"
          >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <motion.div 
                className="flex flex-col space-y-3"
                variants={linkContainerVariants}
                initial="hidden"
                animate="visible"
              >
                {resume.navLinks.map((link, i) => (
                  <motion.a
                    key={link.id}
                    href={`#${link.id}`}
                    variants={linkVariants}
                    custom={i}
                    whileTap={{ scale: 0.95 }}
                    className="px-3 py-3 text-night-700 dark:text-gray-300 hover:text-brand-500 dark:hover:text-brand-400 transition-colors duration-300 rounded-xl hover:bg-gray-50 dark:hover:bg-night-800 font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </motion.a>
                ))}
                
                <div className="border-t border-gray-200 dark:border-night-800 pt-4 mt-1">
                  <div className="flex justify-start space-x-4 px-3">
                    {resume.socialLinks.map((link, i) => (
                      <motion.a
                        key={link.name}
                        href={link.url}
                        variants={linkVariants}
                        custom={i + resume.navLinks.length}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={link.name}
                        className="text-night-700 dark:text-gray-300 hover:text-brand-500 dark:hover:text-brand-400 transition-colors duration-300 focus-ring rounded-full p-2 hover:bg-gray-50 dark:hover:bg-night-800"
                      >
                        <span className="sr-only">{link.name}</span>
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d={link.icon} />
                        </svg>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;