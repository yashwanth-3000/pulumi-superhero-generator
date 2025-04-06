import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);
  
  // Menu items
  const menuItems = [
    { name: "home", href: "#" },
    { name: "heroes", href: "#heroes" },
    { name: "generator", href: "#generator" },
    { name: "gallery", href: "#gallery" },
  ];
  
  // Animation variants
  const navVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };
  
  const menuItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (custom: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: custom * 0.1,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };
  
  return (
    <header 
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-700 relative",
        scrolled ? 
          "py-2 backdrop-blur-md bg-black/80" : 
          "py-3 bg-transparent"
      )}
      style={{ 
        fontFamily: "-apple-system, BlinkMacSystemFont, 'San Francisco', 'Helvetica Neue', sans-serif",
        borderBottom: scrolled ? 
          "1px solid rgba(239, 68, 68, 0.1)" : 
          "1px dashed rgba(239, 68, 68, 0.05)"
      }}
    >
      {/* Dotted background pattern */}
      <div className="absolute inset-0 opacity-5" 
        style={{
          backgroundImage: 'radial-gradient(circle at 8px 8px, rgba(239, 68, 68, 0.8) 1px, transparent 0)',
          backgroundSize: '16px 16px'
        }}>
      </div>
      
      {/* Corner dots */}
      <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-dashed border-red-500/30 z-10"></div>
      <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-dashed border-red-500/30 z-10"></div>
      
      <motion.div 
        className="container mx-auto px-5 relative"
        initial="hidden"
        animate="visible"
        variants={navVariants}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.a 
            href="#" 
            className="text-white group flex items-center space-x-1 relative"
            whileHover={{ 
              scale: 1.05,
              transition: {
                type: "spring",
                stiffness: 400,
                damping: 10
              }
            }}
          >
            <div className="w-6 h-6 relative">
              <div className="absolute inset-0 border border-dashed border-red-500/30 rounded-sm"></div>
              <motion.div 
                className="absolute inset-[3px] bg-red-500/10 rounded-sm"
                animate={{ borderColor: "rgba(239, 68, 68, 0.3)" }}
                whileHover={{
                  backgroundColor: "rgba(239, 68, 68, 0.2)",
                  transition: { duration: 0.3 }
                }}
              ></motion.div>
              {/* Corner dots on logo */}
              <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-dashed border-red-500/50"></div>
              <div className="absolute top-0 right-0 w-1 h-1 border-t border-r border-dashed border-red-500/50"></div>
              <div className="absolute bottom-0 left-0 w-1 h-1 border-b border-l border-dashed border-red-500/50"></div>
              <div className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-dashed border-red-500/50"></div>
            </div>
            <span className="text-md font-medium tracking-tight ml-2">super<span className="text-red-500">hero</span></span>
          </motion.a>
          
          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-10">
            {menuItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="text-white/80 text-sm hover:text-red-500 normal-case font-light transition-colors duration-500 relative group"
                variants={menuItemVariants}
                custom={index}
                whileHover={{ 
                  y: -2,
                  color: "rgb(239, 68, 68)",
                  transition: {
                    type: "spring",
                    stiffness: 500,
                    damping: 10
                  }
                }}
              >
                {item.name}
                <motion.div 
                  className="absolute bottom-0 left-0 w-0 h-px bg-red-500 group-hover:w-full transition-all duration-500"
                  style={{
                    backgroundImage: 'linear-gradient(to right, rgba(239, 68, 68, 0.8) 50%, transparent 50%)',
                    backgroundSize: '4px 1px'
                  }}
                  whileHover={{
                    height: "2px",
                    transition: { duration: 0.3 }
                  }}
                ></motion.div>
              </motion.a>
            ))}
            
            <motion.div
              variants={menuItemVariants}
              custom={menuItems.length}
            >
              <Button 
                className="bg-transparent hover:bg-red-600/10 text-red-500 normal-case font-medium transition-all duration-500 border border-dashed border-red-500/20 hover:border-red-500/40"
                size="sm"
                asChild
              >
                <motion.a
                  href="#generator"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 15px rgba(239, 68, 68, 0.3)",
                    backgroundColor: "rgba(239, 68, 68, 0.1)",
                    borderColor: "rgba(239, 68, 68, 0.5)",
                    transition: {
                      type: "spring",
                      stiffness: 400,
                      damping: 10
                    }
                  }}
                >
                  create hero
                </motion.a>
            </Button>
            </motion.div>
          </nav>
          
          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden text-white w-10 h-10 flex items-center justify-center rounded-sm border border-dashed border-red-500/10 bg-black/40 relative"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.92 }}
            whileHover={{
              borderColor: "rgba(239, 68, 68, 0.4)",
              backgroundColor: "rgba(239, 68, 68, 0.08)",
              boxShadow: "0 0 10px rgba(239, 68, 68, 0.2)",
              transition: {
                type: "spring",
                stiffness: 400,
                damping: 10
              }
            }}
            initial={false}
            animate={{ 
              backgroundColor: mobileMenuOpen ? "rgba(239, 68, 68, 0.1)" : "rgba(0, 0, 0, 0.4)",
              borderColor: mobileMenuOpen ? "rgba(239, 68, 68, 0.3)" : "rgba(239, 68, 68, 0.1)"
            }}
            transition={{ duration: 0.5 }}
          >
            {/* Corner dots on mobile menu button */}
            <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-dashed border-red-500/30"></div>
            <div className="absolute top-0 right-0 w-1 h-1 border-t border-r border-dashed border-red-500/30"></div>
            <div className="absolute bottom-0 left-0 w-1 h-1 border-b border-l border-dashed border-red-500/30"></div>
            <div className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-dashed border-red-500/30"></div>
            
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <X className="h-5 w-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Menu className="h-5 w-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.div>
      
      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden bg-black/90 backdrop-blur-xl relative"
            style={{ borderBottom: "1px dashed rgba(239, 68, 68, 0.1)" }}
          >
            {/* Mobile menu dotted background */}
            <div className="absolute inset-0 opacity-5" 
              style={{
                backgroundImage: 'radial-gradient(circle at 10px 10px, rgba(239, 68, 68, 0.6) 1px, transparent 0)',
                backgroundSize: '20px 20px'
              }}>
            </div>
            
            {/* Corner dots for mobile menu */}
            <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-dashed border-red-500/30"></div>
            <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-dashed border-red-500/30"></div>
            <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-dashed border-red-500/30"></div>
            <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-dashed border-red-500/30"></div>
            
            <div className="container mx-auto px-5 py-8">
              <div className="flex flex-col space-y-5">
                {menuItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className="text-white/80 text-sm font-light normal-case tracking-normal flex items-center"
                    onClick={() => setMobileMenuOpen(false)}
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ 
                      x: 0, 
                      opacity: 1,
                      transition: { delay: index * 0.1 + 0.2, duration: 0.5 }
                    }}
                    exit={{ 
                      x: -10, 
                      opacity: 0,
                      transition: { duration: 0.3 }
                    }}
                    whileHover={{
                      x: 3,
                      color: "rgb(239, 68, 68)",
                      transition: {
                        type: "spring",
                        stiffness: 500,
                        damping: 15
                      }
                    }}
                  >
                    <motion.div 
                      className="w-1 h-1 rounded-full bg-red-500/30 mr-2"
                      whileHover={{
                        scale: 1.5,
                        backgroundColor: "rgba(239, 68, 68, 0.7)",
                        transition: { duration: 0.3 }
                      }}
                    ></motion.div>
                    {item.name}
                  </motion.a>
                ))}
                
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ 
                    y: 0, 
                    opacity: 1,
                    transition: { delay: 0.5, duration: 0.5 }
                  }}
                  exit={{ 
                    y: 10, 
                    opacity: 0,
                    transition: { duration: 0.3 }
                  }}
                >
                  <Button 
                    className="mt-2 w-full bg-transparent text-red-500 normal-case font-medium transition-all duration-500 border border-dashed border-red-500/20 hover:border-red-500/40 hover:bg-red-500/5"
                    onClick={() => setMobileMenuOpen(false)}
                    asChild
                  >
                    <motion.a
                      href="#generator"
                      whileHover={{
                        scale: 1.03,
                        boxShadow: "0 5px 15px rgba(239, 68, 68, 0.2)",
                        backgroundColor: "rgba(239, 68, 68, 0.1)",
                        borderColor: "rgba(239, 68, 68, 0.5)",
                        transition: {
                          type: "spring",
                          stiffness: 400,
                          damping: 10
                        }
                      }}
                    >
                      create hero
                    </motion.a>
                  </Button>
                </motion.div>
        </div>
      </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
