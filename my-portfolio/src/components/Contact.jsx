import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useForm } from 'react-hook-form';
import { resume } from '../data/resume';

const Contact = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset
  } = useForm();
  
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
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    },
  };
  
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    // Simulate form submission
    console.log('Form submitted:', data);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    reset();
    
    // Reset submission status after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };
  
  return (
    <section id="contact" className="bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/4 right-1/4 w-1/3 h-1/3 bg-primary-500/10 dark:bg-primary-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-1/4 h-1/4 bg-accent-500/10 dark:bg-accent-500/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="section-container">
        <div className="text-center mb-16">
          <motion.span
            className="badge-primary inline-block mb-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Let's Talk
          </motion.span>
          
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {resume.contactSection.title}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto text-lg"
          >
            {resume.contactSection.subtitle}
          </motion.p>
        </div>
        
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="max-w-5xl mx-auto"
        >
          <div className="glass-card rounded-2xl shadow-2xl overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-8 animated-gradient-bg text-white">
                <h3 className="text-2xl font-bold mb-6">{resume.contactSection.infoTitle}</h3>
                
                <div className="space-y-6">
                  {resume.contactSection.contactDetails.map((detail, index) => (
                    <motion.div 
                      key={index}
                      variants={itemVariants}
                      className="flex items-start group"
                    >
                      <div className="shrink-0 mr-4 p-3 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={detail.icon} />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-white/80 mb-1">{detail.title}</h4>
                        <p className="text-lg font-medium">{detail.value}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="mt-12">
                  <h4 className="text-sm font-medium text-white/80 mb-4">{resume.contactSection.socialTitle}</h4>
                  <div className="flex space-x-4">
                    {resume.socialLinks.map((link) => (
                      <a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={link.name}
                        className="p-3 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors duration-300"
                      >
                        <span className="sr-only">{link.name}</span>
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d={link.icon} />
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="p-8 bg-white dark:bg-gray-800">
                <h3 className="text-2xl font-bold mb-6">{resume.contactSection.formTitle}</h3>
                
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-success-50 dark:bg-success-600/20 p-6 rounded-lg text-center mb-6"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-success-500 dark:text-success-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h4 className="text-lg font-bold text-success-600 dark:text-success-500 mb-2">
                      {resume.contactSection.successTitle}
                    </h4>
                    <p className="text-success-600 dark:text-success-500">
                      {resume.contactSection.successMessage}
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                      <div className="relative">
                        <input
                          type="text"
                          id="name"
                          {...register('name', { 
                            required: 'Name is required',
                            minLength: {
                              value: 2,
                              message: 'Name must have at least 2 characters'
                            }
                          })}
                          className={`peer w-full rounded-lg border ${errors.name ? 'border-error-500 dark:border-error-500' : 'border-gray-300 dark:border-gray-600'} bg-transparent px-4 py-3 pt-5 placeholder-transparent focus:border-primary-500 dark:focus:border-primary-400 focus:outline-none text-base`}
                          placeholder="Your Name"
                        />
                        <label
                          htmlFor="name"
                          className={`absolute left-4 -top-0.5 text-sm text-gray-600 dark:text-gray-400 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus:-top-0.5 peer-focus:text-sm peer-focus:text-primary-600 dark:peer-focus:text-primary-400 ${errors.name ? 'text-error-500 dark:text-error-500 peer-focus:text-error-500 dark:peer-focus:text-error-500' : ''}`}
                        >
                          Your Name
                        </label>
                      </div>
                      {errors.name && (
                        <p className="mt-1 text-sm text-error-500 dark:text-error-500">{errors.name.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <div className="relative">
                        <input
                          type="email"
                          id="email"
                          {...register('email', { 
                            required: 'Email is required',
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: 'Invalid email address'
                            }
                          })}
                          className={`peer w-full rounded-lg border ${errors.email ? 'border-error-500 dark:border-error-500' : 'border-gray-300 dark:border-gray-600'} bg-transparent px-4 py-3 pt-5 placeholder-transparent focus:border-primary-500 dark:focus:border-primary-400 focus:outline-none text-base`}
                          placeholder="Your Email"
                        />
                        <label
                          htmlFor="email"
                          className={`absolute left-4 -top-0.5 text-sm text-gray-600 dark:text-gray-400 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus:-top-0.5 peer-focus:text-sm peer-focus:text-primary-600 dark:peer-focus:text-primary-400 ${errors.email ? 'text-error-500 dark:text-error-500 peer-focus:text-error-500 dark:peer-focus:text-error-500' : ''}`}
                        >
                          Your Email
                        </label>
                      </div>
                      {errors.email && (
                        <p className="mt-1 text-sm text-error-500 dark:text-error-500">{errors.email.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <div className="relative">
                        <textarea
                          id="message"
                          {...register('message', { 
                            required: 'Message is required',
                            minLength: {
                              value: 10,
                              message: 'Message must have at least 10 characters'
                            }
                          })}
                          rows="4"
                          className={`peer w-full rounded-lg border ${errors.message ? 'border-error-500 dark:border-error-500' : 'border-gray-300 dark:border-gray-600'} bg-transparent px-4 py-3 pt-5 placeholder-transparent focus:border-primary-500 dark:focus:border-primary-400 focus:outline-none text-base`}
                          placeholder="Your Message"
                        ></textarea>
                        <label
                          htmlFor="message"
                          className={`absolute left-4 -top-0.5 text-sm text-gray-600 dark:text-gray-400 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus:-top-0.5 peer-focus:text-sm peer-focus:text-primary-600 dark:peer-focus:text-primary-400 ${errors.message ? 'text-error-500 dark:text-error-500 peer-focus:text-error-500 dark:peer-focus:text-error-500' : ''}`}
                        >
                          Your Message
                        </label>
                      </div>
                      {errors.message && (
                        <p className="mt-1 text-sm text-error-500 dark:text-error-500">{errors.message.message}</p>
                      )}
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 px-6 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg shadow-lg shadow-primary-500/20 transition-colors duration-300 relative overflow-hidden focus-ring disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="opacity-0">Send Message</span>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                          </div>
                        </>
                      ) : 'Send Message'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;