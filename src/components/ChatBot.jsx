import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useChatContext } from "../context/ChatContext";
import {
  MessageCircle,
  X,
  Send,
  RotateCcw,
  Sparkles,
  Home,
  Calendar,
  Phone,
} from "lucide-react";

// Parse inline markdown (bold, italic, etc.)
const parseInlineMarkdown = (text) => {
  const parts = [];
  let currentIndex = 0;
  let keyCounter = 0;

  // Regex to match **bold**, *italic*, __bold__, _italic_
  const regex = /(\*\*|__)(.*?)\1|(\*|_)(.*?)\3/g;
  let match;

  while ((match = regex.exec(text)) !== null) {
    // Add text before the match
    if (match.index > currentIndex) {
      parts.push(text.slice(currentIndex, match.index));
    }

    // Add the formatted text
    if (match[1] && match[2]) {
      // Bold (**text** or __text__)
      parts.push(<strong key={keyCounter++}>{match[2]}</strong>);
    } else if (match[3] && match[4]) {
      // Italic (*text* or _text_)
      parts.push(<em key={keyCounter++}>{match[4]}</em>);
    }

    currentIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (currentIndex < text.length) {
    parts.push(text.slice(currentIndex));
  }

  return parts.length > 0 ? parts : text;
};

// Format message content to handle line breaks and formatting
const formatMessage = (content, isBot) => {
  // Split by line breaks and render each line
  const lines = content.split("\n");

  return lines.map((line, idx) => {
    // Check if line is a bullet point
    if (line.trim().startsWith("•") || line.trim().startsWith("-")) {
      return (
        <div key={idx} className="flex items-start gap-2 my-1">
          <span className="mt-1">•</span>
          <span>
            {parseInlineMarkdown(line.replace(/^[•\-]\s*/, "").trim())}
          </span>
        </div>
      );
    }

    // Check if line has emojis at start (like headers)
    const emojiMatch = line.match(/^([\u{1F300}-\u{1F9FF}])\s*(.+)/u);
    if (emojiMatch) {
      return (
        <div key={idx} className="font-semibold my-2">
          <span className="mr-2">{emojiMatch[1]}</span>
          <span>{parseInlineMarkdown(emojiMatch[2])}</span>
        </div>
      );
    }

    // Regular line with markdown parsing
    return line.trim() ? (
      <p key={idx} className="my-1">
        {parseInlineMarkdown(line)}
      </p>
    ) : (
      <br key={idx} />
    );
  });
};

const ChatBot = () => {
  const {
    messages,
    isOpen,
    isLoading,
    quickReplies,
    sendMessage,
    clearConversation,
    toggleChat,
  } = useChatContext();

  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSend = (e) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      sendMessage(inputValue);
      setInputValue("");
    }
  };

  const handleQuickReply = (text) => {
    sendMessage(text);
  };

  const handleHouseClick = (houseNumber) => {
    sendMessage(`Tell me more about property ${houseNumber}`);
  };

  const [showPreview, setShowPreview] = useState(false);

  // Show preview message periodically
  useEffect(() => {
    if (!isOpen) {
      const showTimer = setTimeout(() => setShowPreview(true), 3000);
      const hideTimer = setTimeout(() => setShowPreview(false), 10000);

      const interval = setInterval(() => {
        setShowPreview(true);
        setTimeout(() => setShowPreview(false), 7000);
      }, 20000);

      return () => {
        clearTimeout(showTimer);
        clearTimeout(hideTimer);
        clearInterval(interval);
      };
    }
  }, [isOpen]);

  return (
    <>
      {/* Chat Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <div className="fixed bottom-6 right-6 z-50">
            {/* Preview Message Bubble */}
            <AnimatePresence>
              {showPreview && (
                <motion.div
                  initial={{ opacity: 0, y: 20, x: 20 }}
                  animate={{ opacity: 1, y: 0, x: 0 }}
                  exit={{ opacity: 0, y: 10, x: 20 }}
                  className="absolute bottom-24 right-0 w-[320px] bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-4 border border-purple-100"
                  style={{ zIndex: 100 }}
                >
                  <div className="flex gap-3 items-center">
                    <div className="relative flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                        <Sparkles size={20} className="text-white" />
                      </div>
                      <motion.span
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="absolute -bottom-3 left-1/2 -translate-x-1/2 text-[11px] font-semibold text-purple-600"
                      >
                        Aria
                      </motion.span>
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-[15px] font-bold text-gray-900 tracking-tight">
                        Your personal AI home guide ✨
                      </p>
                      <p className="text-[13px] text-gray-600 leading-snug mt-1">
                        I can show you the 15 properties available right now and
                        help you pick the perfect match.
                      </p>
                    </div>
                  </div>
                  {/* Triangle pointer */}
                  <div className="absolute -bottom-3 right-12 w-5 h-5 bg-white border-r border-b border-purple-100 transform rotate-45"></div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Pulsing Glow Rings */}
            <motion.div
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(102, 126, 234, 0.4) 0%, rgba(118, 75, 162, 0) 70%)",
                filter: "blur(8px)",
              }}
            />

            {/* Main Chat Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: [0, -8, 0],
              }}
              exit={{ opacity: 0, y: 20 }}
              transition={{
                y: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleChat}
              className="relative text-white rounded-full w-20 h-20 shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                boxShadow:
                  "0 10px 50px rgba(102, 126, 234, 0.6), 0 0 30px rgba(118, 75, 162, 0.4)",
              }}
            >
              {/* Sparkle particles */}
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-0"
              >
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                  <motion.div
                    key={angle}
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                    className="absolute w-1 h-1 bg-white rounded-full"
                    style={{
                      top: "50%",
                      left: "50%",
                      transform: `rotate(${angle}deg) translateY(-35px)`,
                    }}
                  />
                ))}
              </motion.div>

              <motion.div
                animate={{
                  rotate: [0, 10, -10, 10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
              >
                <MessageCircle size={32} strokeWidth={2.5} />
              </motion.div>
            </motion.button>

            {/* AI Badge with animation */}
            <motion.div
              initial={{ scale: 0, opacity: 0, y: -6 }}
              animate={{
                scale: [1, 1.25, 1],
                rotate: [0, 4, -4, 0],
                opacity: [1, 0.85, 1],
              }}
              transition={{
                duration: 2.3,
                repeat: Infinity,
                repeatDelay: 1.1,
              }}
              className="absolute -top-2 -right-2 bg-gradient-to-r from-green-400 to-emerald-500 text-white text-[11px] rounded-full w-9 h-9 flex items-center justify-center font-bold shadow-lg border-2 border-white"
              style={{
                boxShadow: "0 4px 15px rgba(16, 185, 129, 0.5)",
              }}
            >
              <motion.span
                animate={{
                  opacity: [1, 0.5, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
              >
                AI
              </motion.span>
            </motion.div>

            {/* "Click me" indicator */}
          </div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-50 w-[420px] h-[650px] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            style={{
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
            }}
          >
            {/* Header */}
            <motion.div
              className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white p-5 flex items-center justify-between"
              initial={{ y: -50 }}
              animate={{ y: 0 }}
            >
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{
                    rotate: 360,
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    scale: { duration: 2, repeat: Infinity },
                  }}
                  className="bg-white/20 backdrop-blur-sm rounded-full p-2"
                >
                  <Sparkles size={24} />
                </motion.div>
                <div>
                  <h3 className="font-bold text-lg">Aria</h3>
                  <div className="flex items-center gap-1.5">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="w-2 h-2 bg-green-400 rounded-full"
                    />
                    <span className="text-xs text-white/90">
                      Online & Ready to Help
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={clearConversation}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                  title="New Conversation"
                >
                  <RotateCcw size={18} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleChat}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X size={20} />
                </motion.button>
              </div>
            </motion.div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white">
              {messages.map((message, index) => (
                <Message
                  key={message.id}
                  message={message}
                  index={index}
                  onHouseClick={handleHouseClick}
                />
              ))}

              {/* Loading Indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-gray-500"
                >
                  <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl px-4 py-3 rounded-bl-none">
                    <div className="flex gap-1.5">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          animate={{ y: [0, -8, 0] }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: i * 0.15,
                          }}
                          className="w-2 h-2 bg-purple-500 rounded-full"
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            {quickReplies.length > 0 && messages.length <= 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="px-4 py-2 bg-white border-t border-gray-100"
              >
                <p className="text-xs text-gray-500 mb-2 font-medium">
                  Quick questions:
                </p>
                <div className="flex flex-wrap gap-2">
                  {quickReplies.map((reply) => (
                    <motion.button
                      key={reply.id}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleQuickReply(reply.text)}
                      className="text-xs bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 text-purple-700 px-3 py-2 rounded-full border border-purple-200 transition-all duration-200 shadow-sm hover:shadow"
                    >
                      <span className="mr-1">{reply.icon}</span>
                      {reply.text.replace(/\s*\(\d+\)/, "")}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Input Area */}
            <motion.form
              onSubmit={handleSend}
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              className="p-4 bg-white border-t border-gray-100"
            >
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  disabled={isLoading}
                  className="flex-1 px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-all duration-200 disabled:bg-gray-50"
                />
                <motion.button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <Send size={20} />
                </motion.button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Message Component
const Message = ({ message, index, onHouseClick }) => {
  const isBot = message.type === "bot";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: index * 0.1,
        type: "spring",
        damping: 20,
        stiffness: 300,
      }}
      className={`flex ${isBot ? "justify-start" : "justify-end"}`}
    >
      <div className={`max-w-[80%] ${isBot ? "order-1" : "order-2"}`}>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`rounded-2xl px-4 py-3 ${
            isBot
              ? message.isError
                ? "bg-red-50 text-red-700 border border-red-200"
                : "bg-gradient-to-r from-purple-100 to-pink-100 text-gray-800 rounded-bl-none"
              : "bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-br-none"
          } shadow-md`}
        >
          <div className="text-sm leading-relaxed">
            {formatMessage(message.content, isBot)}
          </div>

          {/* Property Cards - Only show if relevant */}
          {message.suggestedHouses && message.suggestedHouses.length > 0 && (
            <div className="mt-3 space-y-2">
              <p className="text-xs font-semibold text-purple-700 mb-2">
                Quick View:
              </p>
              <div className="grid grid-cols-2 gap-2">
                {message.suggestedHouses.map((house) => (
                  <motion.button
                    key={house.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onHouseClick(house.number)}
                    className="bg-white rounded-lg p-2 text-left shadow-sm hover:shadow-md transition-all duration-200 border border-purple-200 hover:border-purple-400"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded p-1.5">
                        <Home size={12} />
                      </div>
                      <p className="font-bold text-xs text-gray-800">
                        {house.number}
                      </p>
                    </div>
                    <p className="text-xs text-gray-600">
                      Type {house.type.toUpperCase()}
                    </p>
                    <p
                      className={`text-xs font-semibold mt-1 ${
                        house.state === "actif"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {house.state === "actif" ? "✓ Available" : "✗ Reserved"}
                    </p>
                  </motion.button>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        <p className="text-xs text-gray-400 mt-1 px-2">
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </motion.div>
  );
};

export default ChatBot;
