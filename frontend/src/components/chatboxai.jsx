import React, { useState, useRef, useEffect } from "react";
import { FaCommentMedical, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function MedicalChatbot() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chat]);

  useEffect(() => {
    if (open && chat.length === 0) {
      setChat([
        {
          sender: "AI Assistant",
          text: "Hello! 👋 I’m City AI Assistant. How can I help you today with your medical concerns?",
        },
      ]);
    }
  }, [open]);

  const sendMessage = async () => {
    if (!message.trim() || loading) return;
    setChat((prev) => [...prev, { sender: "You", text: message }]);
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/medical-chat`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message }),
        }
      );

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await res.json();
      setChat((prev) => [
        ...prev,
        { sender: "AI Assistant", text: data.reply },
      ]);
    } catch (error) {
      setChat((prev) => [
        ...prev,
        {
          sender: "AI Assistant",
          text: "❌ Sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-2 sm:right-6 z-50">
        <div className="relative">
          {!open && (
            <div className="absolute bottom-full right-0 mb-2 bg-white px-3 py-1 text-xs sm:text-sm rounded-full shadow-md text-gray-700 whitespace-nowrap">
              💬 Need help? Ask City AI
            </div>
          )}

          <button
            onClick={() => setOpen(!open)}
            className={`bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white p-4 rounded-full shadow-xl transition-all
      hover:scale-105 hover:shadow-2xl focus:outline-none
      ${!open ? "animate-bounce-chat" : ""}`}
          >
            {open ? <FaTimes size={20} /> : <FaCommentMedical size={20} />}
          </button>
        </div>
      </div>

      {/* Chatbox */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-20 right-4 w-[90vw] sm:w-96 h-[400px] z-50 bg-white border shadow-2xl rounded-2xl flex flex-col"
          >
            {/* Header */}
            <div className="bg-blue-600 text-white p-3 rounded-t-2xl text-center font-semibold text-lg">
              🩺 City AI Assistant
            </div>

            <div
              ref={chatRef}
              className="flex-1 overflow-y-auto px-3 py-2 text-sm space-y-2 
             bg-gradient-to-br from-blue-200 via-indigo-100 to-blue-300 
             animate-gradientMove"
              style={{ backgroundSize: "200% 200%" }}
            >
              {/* Added Disclaimer Message */}
              <div className="text-center text-xs text-gray-500 bg-gray-100 p-2 rounded-md my-2 shadow-inner">
                <span className="font-semibold">Disclaimer:</span> I'm an AI
                assistant. While I aim for accuracy, I can make mistakes. Always
                consult a healthcare professional for diagnosis, treatment, or
                any personal medical advice.
              </div>

              {chat.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className={`flex ${
                    msg.sender === "You" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-lg text-sm shadow-md ${
                      msg.sender === "You"
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-800"
                    }`}
                  >
                    <strong className="block mb-1 text-xs opacity-70">
                      {msg.sender}
                    </strong>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Input Section */}
            <div className="flex gap-2 p-3 border-t bg-white sticky bottom-0">
              <input
                type="text"
                className="flex-1 border border-gray-300 p-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 
             transition-all duration-300 focus:scale-[1.02]"
                placeholder="Ask something medical..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") sendMessage();
                }}
                disabled={loading}
              />

              <button
                onClick={sendMessage}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? "..." : "Send"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
