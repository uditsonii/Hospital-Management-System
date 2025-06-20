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

  const sendMessage = async () => {
    if (!message.trim() || loading) return;
    setChat((prev) => [...prev, { sender: "You", text: message }]);
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/medical-chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await res.json();
      setChat((prev) => [...prev, { sender: "AI Assistant", text: data.reply }]);
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
      {/* Floating Button */}
     <div className="fixed bottom-6 right-2 sm:right-6 z-50">
  <button
    onClick={() => setOpen(!open)}
    className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-xl transition-all"
  >
    {open ? <FaTimes size={20} /> : <FaCommentMedical size={20} />}
  </button>
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
              🩺 Jeevan Jyoti AI Assistant
            </div>

            {/* Chat Messages */}
            <div
              ref={chatRef}
              className="flex-1 overflow-y-auto px-3 py-2 bg-gray-50 text-sm space-y-2"
            >
              {chat.map((msg, i) => (
                <div key={i}>
                  <strong className="text-blue-600">{msg.sender}:</strong>{" "}
                  <span>{msg.text}</span>
                </div>
              ))}
            </div>

            {/* Input Section */}
            <div className="flex gap-2 p-3 border-t bg-white sticky bottom-0">
              <input
                type="text"
                className="flex-1 border border-gray-300 p-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
