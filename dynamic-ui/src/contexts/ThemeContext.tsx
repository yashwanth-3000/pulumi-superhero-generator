import React, { createContext, useState, useContext, ReactNode } from "react";
import { toast } from "sonner";

type ThemeType = "superhero";
type LayoutType = "standard" | "sidebar" | "centered" | "auto";

interface ContentInfo {
  name: string;
  color?: string;
  description?: string;
}

interface ThemeContextType {
  currentTheme: ThemeType;
  currentContent: string;
  currentLayout: LayoutType;
  contentInfo: ContentInfo | null;
  generatedHtml: string | null;
  changeTheme: (theme: ThemeType) => void;
  changeContent: (content: string) => Promise<void>;
  changeLayout: (layout: LayoutType) => void;
  setGeneratedHtml: (html: string | null) => void;
  isLoading: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeType>("superhero");
  const [currentContent, setCurrentContent] = useState<string>("Default");
  const [currentLayout, setCurrentLayout] = useState<LayoutType>("standard");
  const [contentInfo, setContentInfo] = useState<ContentInfo | null>(null);
  const [generatedHtml, setGeneratedHtml] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const changeTheme = (theme: ThemeType) => {
    setCurrentTheme(theme);
    document.body.classList.add("superhero-theme");
    toast.success("Superhero theme activated");
  };
  
  const changeContent = async (content: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create simple content info
      const info: ContentInfo = {
        name: content,
        color: '#e11d48',
        description: `Superhero profile for ${content}`
      };
      
      setContentInfo(info);
      setCurrentContent(info.name);
      
      // Apply custom CSS variables if needed
      document.documentElement.style.setProperty('--custom-primary', info.color || '#e11d48');
      
      toast.success(`Superhero profile generated`);
    } catch (error) {
      console.error("Error generating superhero:", error);
      toast.error("Failed to generate superhero profile");
    } finally {
      setIsLoading(false);
    }
  };
  
  const changeLayout = (layout: LayoutType) => {
    setCurrentLayout(layout);
    toast.success(`${layout.charAt(0).toUpperCase() + layout.slice(1)} layout activated`);
  };
  
  // Apply theme on initial load
  React.useEffect(() => {
    document.body.classList.add("superhero-theme");
  }, []);
  
  return (
    <ThemeContext.Provider value={{ 
      currentTheme, 
      currentContent, 
      currentLayout, 
      contentInfo, 
      generatedHtml,
      changeTheme, 
      changeContent,
      changeLayout,
      setGeneratedHtml,
      isLoading
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
