import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";

const Footer = () => {
  const { currentTheme } = useTheme();
  
  // Nothing theme configuration
  const config = {
    bgColor: "black",
    accentColor: "red-500",
    primaryColor: "red-500",
    textColor: "white",
    subTextColor: "gray-400",
    borderColor: "red-500/20"
  };
  
  return (
    <footer 
      className={`bg-${config.bgColor} py-12 border-t border-${config.borderColor}`}
      style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'San Francisco', 'Helvetica Neue', sans-serif" }}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <div className="mb-8">
            <div className="flex items-center justify-center">
              <div className="h-2 w-2 bg-red-500 rounded-full animate-pulse mr-2"></div>
              <h2 className={`text-${config.textColor} text-lg font-light tracking-normal`}>
                nothing tech
              </h2>
            </div>
            <p className={`text-${config.subTextColor} text-sm mt-2 max-w-md mx-auto font-light`}>
              minimalism meets innovation. technology stripped to its essence.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl mb-12">
            <div>
              <h3 className={`text-${config.textColor} text-sm font-light mb-4 normal-case tracking-normal`}>
                navigation
              </h3>
              <ul className="space-y-2">
                {["home", "products", "design", "about", "contact"].map(item => (
                  <li key={item}>
                    <a 
                      href="#" 
                      className={`text-${config.subTextColor} text-xs normal-case hover:text-${config.accentColor} transition-colors tracking-normal`}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className={`text-${config.textColor} text-sm font-light mb-4 normal-case tracking-normal`}>
                resources
              </h3>
              <ul className="space-y-2">
                {["devices", "audio", "accessories", "support", "community"].map(item => (
                  <li key={item}>
                    <a 
                      href="#" 
                      className={`text-${config.subTextColor} text-xs normal-case hover:text-${config.accentColor} transition-colors tracking-normal`}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className={`text-${config.textColor} text-sm font-light mb-4 normal-case tracking-normal`}>
                stay updated
              </h3>
              <p className={`text-${config.subTextColor} text-xs mb-4 font-light`}>
                subscribe to our newsletter for updates.
              </p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="your email" 
                  className={`bg-black border border-${config.borderColor} text-${config.textColor} px-3 py-2 text-xs rounded-sm flex-grow outline-none focus:border-${config.accentColor}`}
                />
                <button 
                  className={`bg-${config.accentColor}/10 border border-${config.borderColor} text-${config.accentColor} px-3 py-2 text-xs rounded-sm ml-2 normal-case hover:bg-${config.accentColor}/20 transition-colors tracking-normal`}
                >
                  join
                </button>
              </div>
            </div>
          </div>
          
          <div className="pt-6 border-t border-red-500/10 w-full max-w-4xl">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className={`text-${config.subTextColor} text-xs font-light normal-case`}>
                © {new Date().getFullYear()} nothing tech. all rights reserved.
              </p>
              <div className="flex space-x-4 mt-4 md:mt-0">
                {["twitter", "instagram", "facebook", "youtube"].map(social => (
                  <a 
                    key={social} 
                    href="#" 
                    className={`text-${config.subTextColor} text-xs hover:text-${config.accentColor} transition-colors normal-case tracking-normal`}
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
