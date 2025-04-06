import React from "react";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Hero from "@/components/Hero";
import ChatInterface from "@/components/ChatInterface";
import { useTheme } from "@/contexts/ThemeContext";

// Component to render generated HTML content
const GeneratedContent: React.FC<{ html: string }> = ({ html }) => {
  const { setGeneratedHtml } = useTheme();
  
  return (
    <div className="relative w-full min-h-screen">
      <div 
        dangerouslySetInnerHTML={{ __html: html }} 
        className="w-full min-h-screen"
      />
      <button 
        onClick={() => setGeneratedHtml(null)}
        className="fixed top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-md shadow-lg z-50 hover:bg-red-700 transition-colors"
      >
        Return to App
      </button>
    </div>
  );
};

// Main layout for the superhero generator app
const SuperheroLayout: React.FC = () => {
  const { generatedHtml } = useTheme();
  
  // If we have generated HTML, render it instead of the normal layout
  if (generatedHtml) {
    return <GeneratedContent html={generatedHtml} />;
  }
  
  // Standard layout for superhero generator
  return (
    <div className="min-h-screen h-full w-full theme-transition dotted-pattern bg-black">
      <main className="h-full w-full">
        <Hero />
      </main>
      <ChatInterface />
    </div>
  );
};

const Index = () => {
  return (
    <ThemeProvider>
      <div className="bg-black min-h-screen h-full w-full">
        <SuperheroLayout />
      </div>
    </ThemeProvider>
  );
};

export default Index;
