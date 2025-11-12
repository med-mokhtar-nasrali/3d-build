import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useChatContext } from "../context/ChatContext";
import { MessageCircle, X, Send, RotateCcw, Home } from "lucide-react";

// --- Markdown Parsing ---
const parseInlineMarkdown = (text) => {
  const parts = [];
  let currentIndex = 0;
  let keyCounter = 0;
  const regex = /(\*\*|__)(.*?)\1|(\*|_)(.*?)\3/g;
  let match;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > currentIndex) {
      parts.push(text.slice(currentIndex, match.index));
    }
    if (match[1] && match[2]) parts.push(<strong key={keyCounter++}>{match[2]}</strong>);
    else if (match[3] && match[4]) parts.push(<em key={keyCounter++}>{match[4]}</em>);
    currentIndex = match.index + match[0].length;
  }
  if (currentIndex < text.length) parts.push(text.slice(currentIndex));
  return parts.length > 0 ? parts : text;
};

const formatMessage = (content) => {
  const lines = content.split("\n");
  return lines.map((line, idx) =>
    line.trim() ? (
      <p key={idx} className="my-1">
        {parseInlineMarkdown(line)}
      </p>
    ) : (
      <br key={idx} />
    )
  );
};

export default function ChatBot() {
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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus();
  }, [isOpen]);

  const handleSend = (e) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      sendMessage(inputValue);
      setInputValue("");
    }
  };

  const handleQuickReply = (text) => sendMessage(text);

  // --- Minimal floating glow for closed state ---
  const FloatingButton = () => (
    <motion.button
      onClick={toggleChat}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-50 w-20 h-20 rounded-full bg-black text-white shadow-[0_0_25px_rgba(255,255,255,0.15)] flex items-center justify-center transition-all duration-300 border border-white/10 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
    >
      <motion.div
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
      >
        <MessageCircle size={32} strokeWidth={2} />
      </motion.div>
      <motion.span
        className="absolute -top-2 -right-2 bg-white text-black text-xs font-semibold rounded-full w-8 h-8 flex items-center justify-center border border-black shadow"
        animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        AI
      </motion.span>
    </motion.button>
  );

  return (
    <>
      <AnimatePresence>{!isOpen && <FloatingButton />}</AnimatePresence>

      {/* --- Chat Window --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 80, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-50 w-[420px] h-[640px] rounded-3xl bg-gradient-to-b from-[#0a0a0a] to-[#111] border border-white/10 shadow-[0_0_60px_rgba(255,255,255,0.08)] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <motion.div
              className="flex items-center justify-between px-5 py-4 bg-black/80 backdrop-blur-md border-b border-white/10 text-white"
              initial={{ y: -40 }}
              animate={{ y: 0 }}
            >
              <div className="flex items-center gap-3">
                <motion.div
                  className="p-2 bg-white/10 rounded-full border border-white/20"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <MessageCircle size={20} />
                </motion.div>
                <div>
                  <h3 className="font-bold text-base tracking-tight">Aria</h3>
                  <div className="flex items-center gap-1 text-xs text-white/60">
                    <div className="w-2 h-2 bg-green-400 rounded-full" />
                    <span>Online</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={clearConversation}
                  className="p-2 rounded-full hover:bg-white/10 transition"
                >
                  <RotateCcw size={16} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={toggleChat}
                  className="p-2 rounded-full hover:bg-white/10 transition"
                >
                  <X size={18} />
                </motion.button>
              </div>
            </motion.div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 bg-gradient-to-b from-[#111] to-black text-white/90 space-y-4">
              {messages.map((msg, index) => (
                <Message key={msg.id} message={msg} index={index} />
              ))}

              {isLoading && (
                <div className="flex items-center gap-2 text-gray-400">
                  <div className="bg-white/10 px-4 py-2 rounded-2xl">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          animate={{ y: [0, -6, 0] }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: i * 0.15,
                          }}
                          className="w-2 h-2 bg-white rounded-full"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            {quickReplies.length > 0 && messages.length <= 1 && (
              <div className="px-4 py-3 border-t border-white/10 bg-black/40 backdrop-blur-md">
                <p className="text-xs text-white/40 mb-2 uppercase tracking-widest">
                  Quick Questions
                </p>
                <div className="flex flex-wrap gap-2">
                  {quickReplies.map((reply) => (
                    <motion.button
                      key={reply.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleQuickReply(reply.text)}
                      className="text-xs text-white bg-white/10 border border-white/20 px-3 py-2 rounded-full hover:bg-white/20 transition-all"
                    >
                      {reply.text}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <form
              onSubmit={handleSend}
              className="flex items-center gap-2 p-4 border-t border-white/10 bg-black/70 backdrop-blur-md"
            >
              <input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-transparent border border-white/20 rounded-2xl px-4 py-3 text-white placeholder-white/40 focus:border-white focus:outline-none transition-all"
              />
              <motion.button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-2xl bg-white text-black font-semibold disabled:opacity-40 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all"
              >
                <Send size={18} />
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// --- Message ---
const Message = ({ message, index }) => {
  const isBot = message.type === "bot";
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      className={`flex ${isBot ? "justify-start" : "justify-end"}`}
    >
      <div
        className={`max-w-[80%] ${isBot
            ? "bg-white/10 text-white border border-white/15 rounded-2xl rounded-bl-none"
            : "bg-white text-black rounded-2xl rounded-br-none"
          } px-4 py-3 shadow-sm`}
      >
        <div className="text-sm leading-relaxed">{formatMessage(message.content)}</div>
      </div>
    </motion.div>
  );
};
