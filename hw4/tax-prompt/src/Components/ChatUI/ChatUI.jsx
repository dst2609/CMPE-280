import React, { useState } from "react";
import axios from "axios";
import "./ChatUI.css";

const ChatUI = () => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  //get the frotend message to backend, get the response and display it on frontend
  const handleSendMessage = async () => {
    try {
      const result = await axios.post("http://localhost:3000/api/chat", {
        message,
      });

      setResponse(result.data.message);
      // console.log(result.data.message);
    } catch (error) {
      console.error("Error sending message:", error);
      setResponse("Failed to get response");
    }
  };

  return (
    <div className="chat-wrapper">
      <header className="chat-header">
        Deloitte Auditor Enterprise Chat UI
      </header>
      <div className="chat-body">
        <input
          type="text"
          value={message}
          onChange={handleMessageChange}
          placeholder="Tax Prompt"
          className="chat-input"
        />
        <div className="chat-buttons">
          <button className="button-send" onClick={handleSendMessage}>
            Send
          </button>
          <button className="button-cancel" onClick={() => setMessage("")}>
            Cancel
          </button>
        </div>
        <div className="chat-response">{response}</div>
      </div>
    </div>
  );
};

export default ChatUI;
