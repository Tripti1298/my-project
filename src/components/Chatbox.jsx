import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaMicrophone } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import { MdClose } from "react-icons/md";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const chatEndRef = useRef(null);
  const { transcript, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
      setInput(transcript);
    }
  }, [transcript]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    resetTranscript();

    setTimeout(() => {
      const botMessage = { text: "This is a bot response", sender: "bot" };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  const startListening = () => {
    setIsListening(true);
    SpeechRecognition.startListening({ continuous: true });
  };

  const stopListening = () => {
    setIsListening(false);
    SpeechRecognition.stopListening();
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed bottom-5 right-5 w-80 bg-white shadow-xl rounded-lg overflow-hidden border border-gray-200"
    >
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Chatbot</h2>
        <motion.button
          whileHover={{ scale: 1.2, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          className="cursor-pointer text-2xl"
        >
          <MdClose />
        </motion.button>
      </div>

      <div className="p-4 h-64 overflow-y-auto space-y-2">
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: msg.sender === "user" ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`p-2 rounded-lg max-w-xs ${
              msg.sender === "user"
                ? "bg-blue-500 text-white self-end ml-auto"
                : "bg-gray-200 text-black self-start mr-auto"
            }`}
          >
            {msg.text}
          </motion.div>
        ))}
        <div ref={chatEndRef}></div>
      </div>

      

      <div className="p-4 border-t flex items-center gap-2">
        <input
          type="text"
          className="flex-1 border p-2 rounded outline-none focus:ring-2 focus:ring-blue-400"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-2 rounded-full shadow-lg animate-pulse"
          onClick={sendMessage}
        >
          <IoMdSend className="text-xl" />
        </motion.button>
 
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`p-2 rounded-full shadow-lg transition ${
            isListening ? "bg-red-500 animate-pulse" : "bg-green-500"
          }`}
          onClick={isListening ? stopListening : startListening}
        >
          <FaMicrophone className="bg-green-500 animate-pulse"  />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Chatbot;
