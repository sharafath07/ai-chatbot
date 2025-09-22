// frontend/src/Message.jsx

import React from "react";
import ReactMarkdown from "react-markdown";

const Message = ({ sender, text }) => {
  const isUser = sender === "user";

  return (
    <div className={`message ${isUser ? "user" : "bot"}`}>
      <div className="message-content">
        <ReactMarkdown>{text}</ReactMarkdown>
      </div>
    </div>
  );
};

export default Message;
