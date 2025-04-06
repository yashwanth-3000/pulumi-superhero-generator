import React, { useState, useRef, useEffect } from "react";
import { Send, Maximize2, X, Clock } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface Message {
  id: number;
  content: string;
  sender: "user" | "system";
  isHtml?: boolean;
  isProcessing?: boolean;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Welcome! Describe the Superhero you'd like to create. Be as detailed as possible or simply ask for characters like Superman, Batman, or Wonder Woman.",
      sender: "system"
    }
  ]);
  const [input, setInput] = useState("");
  const [isApiLoading, setIsApiLoading] = useState(false);
  const [hasHtmlContent, setHasHtmlContent] = useState(false);
  const [fullScreenHtml, setFullScreenHtml] = useState<string | null>(null);
  const [processingTimer, setProcessingTimer] = useState<number | null>(null);
  const [processingMessageId, setProcessingMessageId] = useState<number | null>(null);
  
  const { 
    changeTheme, 
    changeContent, 
    currentTheme, 
    currentContent, 
    changeLayout,
    setGeneratedHtml,
    isLoading 
  } = useTheme();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  
  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  // Countdown timer effect
  useEffect(() => {
    let timerId: NodeJS.Timeout | null = null;
    
    if (processingTimer !== null && processingTimer > 0) {
      timerId = setTimeout(() => {
        setProcessingTimer(prevTimer => prevTimer !== null ? prevTimer - 1 : null);
      }, 1000);
    }
    
    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, [processingTimer]);
  
  // Function to remove any existing processing messages
  const removeProcessingMessages = () => {
    setMessages(prev => prev.filter(msg => !msg.isProcessing));
  };
  
  const startProcessingTimer = (messageId: number) => {
    setProcessingTimer(90);
    setProcessingMessageId(messageId);
  };
  
  const stopProcessingTimer = () => {
    setProcessingTimer(null);
    setProcessingMessageId(null);
  };
  
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    const newMessage: Message = {
      id: messages.length + 1,
      content: input,
      sender: "user"
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    // Clear input
    setInput("");
    
    // Process the message
    await processMessage(newMessage.content);
  };
  
  const callExternalApi = async (userInput: string) => {
    setIsApiLoading(true);
    
    try {
      // Remove any existing processing messages before adding a new one
      removeProcessingMessages();
      
      // Add the processing message with timer
      const processingMessageId = messages.length + 2;
      addSystemResponse("Processing your request...", true);
      
      // Start the timer
      startProcessingTimer(processingMessageId);
      
      const response = await fetch('https://api-lr.agent.ai/v1/agent/6x9ygygq3flm6ivs/webhook/723f3282', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user_input: userInput })
      });
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      const data = await response.json();
      
      // Remove all processing messages
      removeProcessingMessages();
      
      // Stop the timer
      stopProcessingTimer();
      
      // Check if response contains HTML content
      if (data && data.response) {
        // Update the ThemeContext with the generated HTML
        setGeneratedHtml(data.response);
        
        // Notify user that the full page will be replaced
        addSystemResponse("Superhero Profile generated successfully! Replacing page...");
        
        // Add the HTML content as a special message type
        const htmlMessage: Message = {
          id: messages.length + 3,
          content: data.response,
          sender: "system",
          isHtml: true
        };
        
        setMessages(prev => [...prev, htmlMessage]);
        setHasHtmlContent(true);
      } else {
        // If no HTML content is found
        addSystemResponse("Sorry, I couldn't generate the content.");
      }
    } catch (error) {
      console.error('API call error:', error);
      
      // Remove processing messages
      removeProcessingMessages();
      
      addSystemResponse("Sorry, there was an error processing your request. Please try again later.");
      
      // Stop the timer on error
      stopProcessingTimer();
    } finally {
      setIsApiLoading(false);
    }
  };
  
  const processMessage = async (message: string) => {
    const lowerMessage = message.toLowerCase();
    
    // Check for layout change commands
    if (lowerMessage.includes("sidebar") || lowerMessage.includes("side layout")) {
      changeLayout("sidebar");
      addSystemResponse(`Switching to sidebar layout.`);
      return;
    }
    else if (lowerMessage.includes("centered") || lowerMessage.includes("center layout")) {
      changeLayout("centered");
      addSystemResponse(`Switching to centered layout.`);
      return;
    }
    else if (lowerMessage.includes("standard layout") || lowerMessage.includes("default layout")) {
      changeLayout("standard");
      addSystemResponse(`Switching to standard layout.`);
      return;
    }
    else if (lowerMessage.includes("auto layout")) {
      changeLayout("auto");
      addSystemResponse(`Switching to automatic layout.`);
      return;
    }
    
    // Check for generation commands
    if (lowerMessage.includes("generate") || lowerMessage.includes("create") || 
        lowerMessage.includes("tell me about") || lowerMessage.includes("show me")) {
      // Extract name or description
      let requestDescription = "";
      const generateMatches = message.match(/generate\s+(.+?)(?:\s|$)/i);
      const createMatches = message.match(/create\s+(.+?)(?:\s|$)/i);
      const tellMatches = message.match(/tell\s+me\s+about\s+(.+?)(?:\s|$)/i);
      const showMatches = message.match(/show\s+me\s+(.+?)(?:\s|$)/i);
      
      if (generateMatches && generateMatches[1]) {
        requestDescription = generateMatches[1];
      } else if (createMatches && createMatches[1]) {
        requestDescription = createMatches[1];
      } else if (tellMatches && tellMatches[1]) {
        requestDescription = tellMatches[1];
      } else if (showMatches && showMatches[1]) {
        requestDescription = showMatches[1];
      } else {
        // Try to extract a description from the message
        requestDescription = message;
      }
      
      if (requestDescription) {
        // Remove any existing processing messages
        removeProcessingMessages();
        
        // Add processing message with timer
        const processingMessageId = messages.length + 2;
        addSystemResponse(`Processing your request...`, true);
        
        // Start the timer
        startProcessingTimer(processingMessageId);
        
        try {
          await changeContent(requestDescription);
          
          // Remove processing messages
          removeProcessingMessages();
          
          // Stop the timer
          stopProcessingTimer();
          
          addSystemResponse(`I've generated your Superhero Profile!`);
        } catch (error) {
          // Remove processing messages
          removeProcessingMessages();
          
          // Stop the timer on error
          stopProcessingTimer();
          
          addSystemResponse("Sorry, I had trouble processing your request.");
        }
        return;
      }
    }
    
    // For any other message, treat it as a request to the webhook
    await callExternalApi(message);
  };
  
  const addSystemResponse = (content: string, isProcessing = false) => {
    const newMessage: Message = {
      id: messages.length + 2,
      content,
      sender: "system",
      isProcessing
    };
    
    setMessages(prev => [...prev, newMessage]);
  };
  
  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };
  
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => setIsVisible(true), 1000); // Reappear after 1 second
  };
  
  // Function to open HTML content in full screen
  const openFullScreenHtml = (html: string) => {
    setFullScreenHtml(html);
  };

  // Function to close full screen HTML view
  const closeFullScreenHtml = () => {
    setFullScreenHtml(null);
  };
  
  // Format the timer as MM:SS
  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  if (!isVisible) return null;
  
  return (
    <>
      <div className={cn(
        "fixed bottom-6 right-6 z-50 transition-all duration-500",
        "chat-interface-container",
        isMinimized ? "h-12" : "h-96",
        hasHtmlContent ? "w-[600px]" : "w-[320px]",
        "bg-black/80 backdrop-blur-md",
        "animate-in fade-in duration-700"
      )}
      style={{
        border: "1px dashed rgba(239, 68, 68, 0.4)",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'San Francisco', 'Helvetica Neue', sans-serif"
      }}>
        {/* Enhanced header with improved dotted pattern */}
        <motion.div 
          className="flex justify-between items-center p-3 border-b border-dashed border-red-500/30 relative"
          whileHover={{
            borderColor: "rgba(239, 68, 68, 0.5)",
            transition: { duration: 0.3 }
          }}
        >
          <div className="absolute top-0 left-0 w-full h-full opacity-5"
               style={{
                 backgroundImage: 'radial-gradient(circle at 8px 8px, rgba(239, 68, 68, 0.8) 1px, transparent 0)',
                 backgroundSize: '16px 16px'
               }}>
          </div>
          
          {/* Corner dots in header */}
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-dashed border-red-500/30"></div>
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-dashed border-red-500/30"></div>
          
          <h3 className="font-medium text-sm text-white relative z-10">
            Superhero Generator
          </h3>
          
          <div className="flex gap-3 relative z-10">
            <motion.button 
              onClick={toggleMinimize} 
              className="w-5 h-5 rounded-sm flex items-center justify-center bg-transparent hover:bg-red-500/10 border border-dashed border-red-500/30 transition-all duration-300 relative"
              whileHover={{
                borderColor: "rgba(239, 68, 68, 0.6)",
                backgroundColor: "rgba(239, 68, 68, 0.15)",
                boxShadow: "0 0 8px rgba(239, 68, 68, 0.2)",
                transition: {
                  type: "spring",
                  stiffness: 500,
                  damping: 10
                }
              }}
              whileTap={{ scale: 0.92 }}
            >
              {/* Corner dots on minimize button */}
              <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-dashed border-red-500/50"></div>
              <div className="absolute top-0 right-0 w-1 h-1 border-t border-r border-dashed border-red-500/50"></div>
              <div className="absolute bottom-0 left-0 w-1 h-1 border-b border-l border-dashed border-red-500/50"></div>
              <div className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-dashed border-red-500/50"></div>
              <div className="w-2 h-px bg-red-500"></div>
            </motion.button>
            <motion.button 
              onClick={handleClose} 
              className="w-5 h-5 rounded-sm flex items-center justify-center bg-transparent hover:bg-red-500/10 border border-dashed border-red-500/30 transition-all duration-300 relative"
              whileHover={{
                borderColor: "rgba(239, 68, 68, 0.6)",
                backgroundColor: "rgba(239, 68, 68, 0.15)",
                boxShadow: "0 0 8px rgba(239, 68, 68, 0.2)",
                transition: {
                  type: "spring",
                  stiffness: 500,
                  damping: 10
                }
              }}
              whileTap={{ scale: 0.92 }}
            >
              {/* Corner dots on close button */}
              <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-dashed border-red-500/50"></div>
              <div className="absolute top-0 right-0 w-1 h-1 border-t border-r border-dashed border-red-500/50"></div>
              <div className="absolute bottom-0 left-0 w-1 h-1 border-b border-l border-dashed border-red-500/50"></div>
              <div className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-dashed border-red-500/50"></div>
              <div className="w-2 h-2 rounded-sm bg-red-500/50"></div>
            </motion.button>
          </div>
        </motion.div>
        
        {!isMinimized && (
          <>
            {/* Chat messages container with enhanced dotted corner markers */}
            <div className="flex flex-col h-[calc(100%-6rem)] overflow-y-auto p-3 bg-black/50 relative">
              {/* Corner dots */}
              <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-dashed border-red-500/30"></div>
              <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-dashed border-red-500/30"></div>
              <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-dashed border-red-500/30"></div>
              <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-dashed border-red-500/30"></div>
              
              {/* Enhanced dotted pattern */}
              <div className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: 'radial-gradient(circle at 10px 10px, rgba(239, 68, 68, 0.6) 1px, transparent 0)',
                  backgroundSize: '20px 20px'
                }}>
              </div>
              
              {messages.map(message => (
                <motion.div 
                  key={message.id} 
                  className={cn(
                    "mb-3 max-w-[90%] animate-in fade-in slide-in-from-bottom duration-500",
                    message.sender === "user" ? "ml-auto" : "mr-auto"
                  )}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20
                  }}
                  whileHover={{
                    y: -3,
                    transition: {
                      type: "spring",
                      stiffness: 500,
                      damping: 15
                    }
                  }}
                >
                  {/* Message content with enhanced corners */}
                  <motion.div 
                    className={cn(
                      "p-3 rounded-sm relative transition-all",
                      message.sender === "user" 
                        ? "bg-red-500/10 border-dashed border border-red-500/30 text-white" 
                        : "bg-black/40 border border-dashed border-red-500/20 text-gray-300",
                      message.isHtml && "w-full"
                    )}
                    whileHover={{
                      borderColor: message.sender === "user" 
                        ? "rgba(239, 68, 68, 0.5)" 
                        : "rgba(239, 68, 68, 0.3)",
                      backgroundColor: message.sender === "user" 
                        ? "rgba(239, 68, 68, 0.15)" 
                        : "rgba(0, 0, 0, 0.5)",
                      boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
                      transition: { duration: 0.3 }
                    }}
                  >
                    {/* Corner dots on message bubbles */}
                    <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-dashed border-red-500/30"></div>
                    <div className="absolute top-0 right-0 w-1 h-1 border-t border-r border-dashed border-red-500/30"></div>
                    <div className="absolute bottom-0 left-0 w-1 h-1 border-b border-l border-dashed border-red-500/30"></div>
                    <div className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-dashed border-red-500/30"></div>
                    
                    {/* Content with conditional rendering for HTML */}
                    {message.isHtml ? (
                      <div className="html-content-preview">
                        <pre className="text-xs text-gray-300 whitespace-pre-wrap break-words">
                          {message.content.substring(0, 300)}...
                        </pre>
                        <motion.button 
                          onClick={() => openFullScreenHtml(message.content)}
                          className="absolute top-3 right-3 text-xs text-red-500 hover:text-red-400 transition-colors"
                          whileHover={{ 
                            scale: 1.1,
                            color: "rgb(239, 68, 68)",
                            transition: { duration: 0.2 }
                          }}
                          whileTap={{ scale: 0.95 }}
                        >
                          View
                        </motion.button>
                      </div>
                    ) : (
                      <div className="text-sm font-light">
                        {message.content}
                        
                        {/* Processing indicator with timer */}
                        {message.isProcessing && message.id === processingMessageId && processingTimer !== null && (
                          <motion.div 
                            className="mt-3 flex items-center justify-center bg-red-500/10 border border-dashed border-red-500/30 p-2 rounded-sm"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="rounded-full bg-red-500/20 w-8 h-8 flex items-center justify-center mr-2">
                              <Clock className="h-4 w-4 text-red-500" />
                            </div>
                            <div className="flex flex-col">
                              <div className="text-sm font-medium text-red-500">
                                {formatTimer(processingTimer)}
                              </div>
                              <div className="text-xs text-gray-400">
                                Estimated time remaining
                              </div>
                            </div>
                            <div className="ml-3 w-full max-w-[100px] bg-red-500/10 h-1 rounded">
                              <motion.div 
                                className="h-full bg-red-500"
                                style={{ 
                                  width: `${(processingTimer / 90) * 100}%`
                                }}
                                transition={{ ease: "linear" }}
                              />
                            </div>
                          </motion.div>
                        )}
                      </div>
                    )}
                    
                    {/* Subtle timestamp */}
                    <div className="text-[10px] text-gray-500 mt-1 text-right">
                      {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Input form with enhanced dotted border */}
            <motion.form 
              onSubmit={handleSendMessage} 
              className="p-3 border-t border-dashed border-red-500/30 relative"
              whileHover={{
                borderColor: "rgba(239, 68, 68, 0.5)",
                transition: { duration: 0.3 }
              }}
            >
              {/* Corner dots on form */}
              <div className="absolute top-0 left-2 w-2 h-2 border-t border-l border-dashed border-red-500/30"></div>
              <div className="absolute top-0 right-2 w-2 h-2 border-t border-r border-dashed border-red-500/30"></div>
              
              <div className="flex">
                <motion.input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Describe your Superhero idea here..."
                  className="flex-1 bg-black/30 text-white text-sm px-3 py-2 outline-none border border-dashed border-red-500/30 rounded-sm focus:border-red-500/50 transition-all duration-300"
                  disabled={isApiLoading || isLoading}
                  whileFocus={{
                    borderColor: "rgba(239, 68, 68, 0.6)",
                    boxShadow: "0 0 10px rgba(239, 68, 68, 0.2)",
                    transition: { duration: 0.3 }
                  }}
                  whileHover={{
                    borderColor: "rgba(239, 68, 68, 0.4)",
                    transition: { duration: 0.3 }
                  }}
                />
                <motion.button
                  type="submit"
                  disabled={isApiLoading || isLoading || !input.trim()}
                  className={cn(
                    "ml-2 w-10 h-10 flex items-center justify-center rounded-sm transition-all duration-500 relative",
                    "bg-transparent border border-dashed border-red-500/30",
                    "hover:bg-red-500/10 hover:border-red-500/50",
                    (isApiLoading || isLoading || !input.trim()) && "opacity-50 cursor-not-allowed"
                  )}
                  whileHover={{
                    scale: 1.05,
                    borderColor: "rgba(239, 68, 68, 0.6)",
                    backgroundColor: "rgba(239, 68, 68, 0.15)",
                    boxShadow: "0 0 10px rgba(239, 68, 68, 0.2)",
                    transition: {
                      type: "spring",
                      stiffness: 500,
                      damping: 10
                    }
                  }}
                  whileTap={{ scale: 0.95 }}
                  animate={!input.trim() ? { opacity: 0.5 } : { opacity: 1 }}
                >
                  {/* Corner dots on send button */}
                  <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-dashed border-red-500/30"></div>
                  <div className="absolute top-0 right-0 w-1 h-1 border-t border-r border-dashed border-red-500/30"></div>
                  <div className="absolute bottom-0 left-0 w-1 h-1 border-b border-l border-dashed border-red-500/30"></div>
                  <div className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-dashed border-red-500/30"></div>
                  <Send className="h-4 w-4 text-red-500" />
                </motion.button>
              </div>
              
              {(isApiLoading || isLoading) && (
                <div className="mt-2 text-xs text-gray-500 flex items-center">
                  <div className="mr-2 w-1 h-1 bg-red-500/50 rounded-full animate-ping"></div>
                  Processing your request...
                </div>
              )}
            </motion.form>
          </>
        )}
      </div>
      
      {/* Full screen HTML content view with enhanced dotted pattern */}
      {fullScreenHtml && (
        <motion.div 
          className="fixed inset-0 bg-black/90 z-50 flex flex-col p-4 relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Dotted background pattern */}
          <div className="absolute inset-0 opacity-5" 
            style={{
              backgroundImage: 'radial-gradient(circle at 10px 10px, rgba(239, 68, 68, 0.6) 1px, transparent 0)',
              backgroundSize: '20px 20px'
            }}>
          </div>
          
          {/* Corner dots */}
          <div className="absolute top-4 left-4 w-3 h-3 border-t border-l border-dashed border-red-500/30"></div>
          <div className="absolute top-4 right-4 w-3 h-3 border-t border-r border-dashed border-red-500/30"></div>
          <div className="absolute bottom-4 left-4 w-3 h-3 border-b border-l border-dashed border-red-500/30"></div>
          <div className="absolute bottom-4 right-4 w-3 h-3 border-b border-r border-dashed border-red-500/30"></div>
          
          <motion.div 
            className="flex justify-between items-center mb-4 border-b border-dashed border-red-500/30 pb-2 relative"
            whileHover={{
              borderColor: "rgba(239, 68, 68, 0.5)",
              transition: { duration: 0.3 }
            }}
          >
            <h3 className="text-white text-sm font-medium">Superhero Profile</h3>
            <motion.button 
              onClick={closeFullScreenHtml}
              className="w-6 h-6 rounded-sm flex items-center justify-center bg-transparent hover:bg-red-500/10 border border-dashed border-red-500/30 relative"
              whileHover={{
                scale: 1.1,
                borderColor: "rgba(239, 68, 68, 0.6)",
                backgroundColor: "rgba(239, 68, 68, 0.15)",
                boxShadow: "0 0 10px rgba(239, 68, 68, 0.2)",
                transition: {
                  type: "spring",
                  stiffness: 500,
                  damping: 10
                }
              }}
              whileTap={{ scale: 0.92 }}
            >
              {/* Corner dots on close button */}
              <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-dashed border-red-500/50"></div>
              <div className="absolute top-0 right-0 w-1 h-1 border-t border-r border-dashed border-red-500/50"></div>
              <div className="absolute bottom-0 left-0 w-1 h-1 border-b border-l border-dashed border-red-500/50"></div>
              <div className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-dashed border-red-500/50"></div>
              <X className="h-4 w-4 text-red-500" />
            </motion.button>
          </motion.div>
          <motion.div 
            className="flex-1 overflow-auto bg-white/5 p-4 border border-dashed border-red-500/30 rounded-sm relative"
            whileHover={{
              borderColor: "rgba(239, 68, 68, 0.4)",
              backgroundColor: "rgba(255, 255, 255, 0.07)",
              transition: { duration: 0.3 }
            }}
          >
            {/* Corner dots on content container */}
            <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-dashed border-red-500/30"></div>
            <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-dashed border-red-500/30"></div>
            <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-dashed border-red-500/30"></div>
            <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-dashed border-red-500/30"></div>
            <pre className="text-xs text-gray-300 whitespace-pre-wrap break-words">
              {fullScreenHtml}
            </pre>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default ChatInterface;
