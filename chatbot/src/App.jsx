// frontend/src/App.jsx

import React, { useState } from "react";
import ChatBox from "./ChatBox";

function App() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! I’m Gemini AI. How can I help you today?" }
  ]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (text) => {
    // add user message
    const userMessage = { sender: "user", text };
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);

    try {
      const resp = await fetch(`${process.env.REACT_APP_API_URL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: text, history: messages })
      });
      const data = await resp.json();
      const botText = data.response || "Sorry, no response.";
      const botMessage = { sender: "bot", text: botText };
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      console.error("Error sending message:", err);
      const errorMessage = { sender: "bot", text: "Error: Could not reach server." };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Gemini AI Chatbot</h1>
      <ChatBox
        messages={messages}
        onSend={sendMessage}
        loading={loading}
      />
    </div>
  );
}

export default App;
