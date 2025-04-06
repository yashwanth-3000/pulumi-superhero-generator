import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from "@/contexts/ThemeContext";
import { Github, Cloud, Zap } from "lucide-react";

const Hero = () => {
  const { currentContent } = useTheme();
  const heroRef = useRef<HTMLDivElement>(null);
  
  // Staggered animation variants with smoother easing
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.3,
        ease: "easeOut"
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 12,
        mass: 1.2,
      }
    }
  };
  
  // Superhero generator features
  const features = [
    "superhero origin stories",
    "unique power profiles",
    "character visualization",
    "nemesis generation",
    "universe integration"
  ];

  // Function to focus on the chat interface
  const focusOnChat = (e: React.MouseEvent) => {
    e.preventDefault();
    // Find the chat interface element
    const chatInterface = document.querySelector('.chat-interface-container');
    
    // If found, scroll to it and potentially focus the input field
    if (chatInterface) {
      chatInterface.scrollIntoView({ behavior: 'smooth' });
      
      // Try to find and focus the input field after scrolling
      setTimeout(() => {
        const inputField = chatInterface.querySelector('input');
        if (inputField) {
          inputField.focus();
        }
      }, 500);
    }
  };
  
  return (
    <div
      ref={heroRef}
      className="relative min-h-[100vh] overflow-hidden bg-black mt-[-1rem] mb-[-1rem]"
    >
      {/* Enhanced dotted background pattern */}
      <div className="absolute inset-0 opacity-5" 
                style={{
             backgroundImage: 'radial-gradient(circle at 15px 15px, rgba(239, 68, 68, 0.3) 1px, transparent 0)',
             backgroundSize: '30px 30px'
           }}>
          </div>

      {/* Enhanced circuit lines */}
      <div className="absolute inset-0 z-10 opacity-5">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1000 1000"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <g stroke="rgb(239, 68, 68)" fill="none" strokeWidth="0.5" strokeDasharray="4 4">
            <path d="M100,100 L900,100 L900,900 L100,900 Z" />
            <path d="M300,300 L700,300 L700,700 L300,700 Z" />
            <path d="M100,100 L300,300" />
            <path d="M900,100 L700,300" />
            <path d="M100,900 L300,700" />
            <path d="M900,900 L700,700" />
          </g>
        </svg>
      </div>

      {/* Corner dots */}
      <div className="absolute top-5 left-5 w-3 h-3 border-t border-l border-dashed border-red-500/30 z-20"></div>
      <div className="absolute top-5 right-5 w-3 h-3 border-t border-r border-dashed border-red-500/30 z-20"></div>
      <div className="absolute bottom-5 left-5 w-3 h-3 border-b border-l border-dashed border-red-500/30 z-20"></div>
      <div className="absolute bottom-5 right-5 w-3 h-3 border-b border-r border-dashed border-red-500/30 z-20"></div>
      
      {/* 3D Perspective effect container - more subtle */}
      <div 
        className="container mx-auto px-6 md:px-10 pt-14 md:pt-16 pb-24 md:pb-36 z-20 relative h-full flex items-center"
        style={{
          fontFamily: "-apple-system, BlinkMacSystemFont, 'San Francisco', 'Helvetica Neue', sans-serif"
        }}
      >
        <motion.div
          className="flex flex-col items-center text-center md:max-w-4xl mx-auto w-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Project infrastructure badges - Pulumi and GitHub */}
          <motion.div 
            className="flex flex-wrap items-center justify-center gap-4 mb-6"
            variants={itemVariants}
          >
            <motion.div 
              className="inline-flex items-center rounded-full border border-dashed border-red-500/20 bg-black/30 px-3 py-1 text-sm text-red-500 backdrop-blur-sm"
              whileHover={{
                scale: 1.05,
                borderColor: "rgba(239, 68, 68, 0.5)",
                backgroundColor: "rgba(25, 25, 25, 0.8)",
                y: -3,
                boxShadow: "0 10px 25px -5px rgba(239, 68, 68, 0.3)",
                transition: {
                  type: "spring",
                  stiffness: 400,
                  damping: 10
                }
              }}
              whileTap={{ scale: 0.97 }}
            >
              <Zap className="h-3.5 w-3.5 text-red-500 mr-1" />
              <span className="tracking-normal">superhero generator</span>
            </motion.div>

            <motion.a
              href="https://github.com/yashwanth-3000/pulumi-superhero-generator" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 rounded-full border border-dashed border-gray-400/30 bg-gray-800/50 px-3 py-1 text-sm text-gray-300 backdrop-blur-sm"
              whileHover={{
                scale: 1.05,
                borderColor: "rgba(255, 255, 255, 0.5)",
                backgroundColor: "rgba(30, 30, 30, 0.7)",
                y: -3,
                boxShadow: "0 10px 25px -5px rgba(200, 200, 200, 0.2)",
                transition: {
                  type: "spring",
                  stiffness: 400,
                  damping: 10
                }
              }}
              whileTap={{ scale: 0.97 }}
            >
              <Github className="h-3.5 w-3.5 text-gray-300 mr-1" />
              <span>GitHub</span>
            </motion.a>
            
            <motion.div
              className="inline-flex items-center space-x-2 rounded-full border border-dashed border-red-500/30 bg-black/40 px-3 py-1 text-sm text-red-400 backdrop-blur-sm"
              whileHover={{
                scale: 1.05,
                borderColor: "rgba(239, 68, 68, 0.5)",
                backgroundColor: "rgba(20, 20, 20, 0.8)",
                y: -3,
                boxShadow: "0 10px 25px -5px rgba(239, 68, 68, 0.3)",
                transition: {
                  type: "spring",
                  stiffness: 400,
                  damping: 10
                }
              }}
              whileTap={{ scale: 0.97 }}
            >
              <Cloud className="h-3.5 w-3.5 text-red-400 mr-1" />
              <span>Deployed with Pulumi</span>
            </motion.div>
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-medium text-white tracking-normal leading-tight mb-6 normal-case"
            variants={itemVariants}
          >
            <span className="block font-light">create your own</span>
            <span className="block bg-gradient-to-r from-red-500 to-red-400 bg-clip-text text-transparent font-bold">
              superhero universe
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl font-light normal-case"
            variants={itemVariants}
          >
            bring fictional characters to life with detailed superhero portfolios.
            describe your hero concept and watch as we generate complete character profiles — from origin stories to superpowers and arch-nemeses.
          </motion.p>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-5 gap-3 md:gap-6 w-full mb-12"
            variants={containerVariants}
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature}
                className="flex items-center justify-center p-3 rounded-sm border border-dashed border-red-500/30 bg-black/40 backdrop-blur-none relative"
                variants={itemVariants}
                custom={index}
              >
                {/* Corner dots inside feature cards - simplified without hover effects */}
                <div className="absolute top-1 left-1 w-1 h-1 border-t border-l border-dashed border-red-500/40"></div>
                <div className="absolute top-1 right-1 w-1 h-1 border-t border-r border-dashed border-red-500/40"></div>
                <div className="absolute bottom-1 left-1 w-1 h-1 border-b border-l border-dashed border-red-500/40"></div>
                <div className="absolute bottom-1 right-1 w-1 h-1 border-b border-r border-dashed border-red-500/40"></div>
                <span className="text-sm text-red-400 normal-case tracking-normal font-medium">{feature}</span>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Visual design description with dotted decoration */}
          <motion.div
            className="mt-6 p-6 border border-dashed border-red-500/10 rounded-sm bg-black/50 backdrop-blur-sm relative overflow-hidden max-w-3xl"
            variants={itemVariants}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7, ease: "easeOut" }}
            whileHover={{
              borderColor: "rgba(239, 68, 68, 0.3)",
              boxShadow: "0 20px 40px -20px rgba(239, 68, 68, 0.2)",
              y: -5,
              transition: {
                duration: 0.5,
                ease: [0.23, 1, 0.32, 1]
              }
            }}
            whileTap={{
              scale: 0.99,
              y: -2
            }}
          >
            {/* Corner dots for description box */}
            <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-dashed border-red-500/30"></div>
            <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-dashed border-red-500/30"></div>
            <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-dashed border-red-500/30"></div>
            <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-dashed border-red-500/30"></div>
            
            {/* Dotted background pattern inside the box */}
            <div className="absolute inset-0 opacity-5" 
              style={{
                backgroundImage: 'radial-gradient(circle at 8px 8px, rgba(239, 68, 68, 0.8) 1px, transparent 0)',
                backgroundSize: '16px 16px'
              }}>
            </div>
            
            <h3 className="text-xl font-bold text-white normal-case tracking-normal mb-4">create iconic superhero characters</h3>
            
            <p className="text-gray-300 mb-4 font-light">
              our advanced ai combines your descriptions with superhero tropes and archetypes
              to create compelling and unique fictional characters in seconds.
            </p>
            <p className="text-gray-300 font-light">
              simply describe your hero concept in the chat below, and we'll generate 
              complete character profiles including <span className="font-medium">origin stories, superpowers, 
              weaknesses, and nemeses</span> — inspired by classics like Superman, Batman, and Wonder Woman but uniquely yours.
            </p>
          </motion.div>
        </motion.div>
        </div>
      
      {/* Enhanced bottom line - dotted pattern */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-red-500/10" 
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(239, 68, 68, 0.3) 50%, transparent 50%)',
          backgroundSize: '8px 1px'
        }}>
      </div>
    </div>
  );
};

export default Hero;
