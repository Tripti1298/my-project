import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaMicrophone, FaPaperPlane } from "react-icons/fa";
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
    
    // Simulating bot response (Replace with API call)
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
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-5 right-5 w-80 bg-white shadow-lg rounded-lg overflow-hidden"
    >
      <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Chatbot</h2>
        <MdClose className="cursor-pointer text-2xl" />
      </div>
      <div className="p-4 h-64 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 p-2 rounded-lg ${msg.sender === "user" ? "bg-blue-500 text-white self-end" : "bg-gray-200 text-black self-start"}`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={chatEndRef}></div>
      </div>
      <div className="p-4 border-t flex gap-2">
        <button className="bg-gray-300 px-3 py-1 rounded" onClick={() => setInput("Where is the library?")}>Library</button>
        <button className="bg-gray-300 px-3 py-1 rounded" onClick={() => setInput("What is today’s mess menu?")}>Mess Menu</button>
      </div>
      <div className="p-4 border-t flex items-center gap-2">
        <input
          type="text"
          className="flex-1 border p-2 rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button className="bg-blue-500 text-white p-2 rounded" onClick={sendMessage}>
          <IoMdSend />
        </button>
        <button
          className={`p-2 rounded-full ${isListening ? "bg-red-500" : "bg-green-500"}`}
          onClick={isListening ? stopListening : startListening}
        >
          <FaMicrophone className="text-white" />
        </button>
      </div>
    </motion.div>
  );
};

export default Chatbot;
