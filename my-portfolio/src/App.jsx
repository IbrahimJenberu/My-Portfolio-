import React, { Suspense, useEffect } from 'react';
import { useTheme } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects'; // No longer lazy loaded
import Skills from './components/Skills'; // No longer lazy loaded
import Education from './components/Education'; // New component
import Contact from './components/Contact'; // No longer lazy loaded
import Footer from './components/Footer';

const LoadingFallback = () => (
  <div className="flex justify-center items-center h-[40vh]">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-500 dark:border-primary-400"></div>
  </div>
);

function App() {
  const { theme } = useTheme();
  
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <div className="min-h-screen flex flex-col bg-ai-pattern">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;