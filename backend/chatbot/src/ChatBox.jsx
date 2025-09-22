// frontend/src/ChatBox.jsx

import React, { useState, useRef, useEffect } from "react";
import Message from "./Message";

const ChatBox = ({ messages, onSend, loading }) => {
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;
    onSend(input.trim());
    setInput("");
  };

  // auto-scroll
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  return (
    <div className="chatbox-container">
      <div className="messages-container">
        {messages.map((m, idx) => (
          <Message key={idx} sender={m.sender} text={m.text} />
        ))}
        {loading && <div className="message bot">Typing...</div>}
        <div ref={bottomRef} />
      </div>
      <div className="form-box">
        <form className="input-form" onSubmit={handleSubmit}>
        <input
          className="input-field"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button className="send-button" type="submit" disabled={loading}>
          Send
        </button>
      </form>
      </div>
      
    </div>
  );
};

export default ChatBox;
