import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import "./app.css";

function App() {
  const { id } = useParams();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  let socket;
  useEffect(() => {
    socket = io.connect("ws://localhost:3001", {
      reconnection: true,
      reconnectionAttempts: 100, // Adjust the number of attempts as needed
    });
    socket.emit("join_room", id);
    socket.on("received_message_client", (data) => {
      setMessages(data);
    });
    socket.on("user_found", (data) => {
      setMessages(data);
    });

    return () => {
      socket.disconnect();
    };
  }, [messages]);
  const sendMessage = () => {
    socket.emit("send_message", { message, email: id });
    setMessage("");
  };

  return (
    <div className="user-room-container">
      <h2>Admin</h2>
      <div className="message-body">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={msg.sender === id ? "sentMessage" : "receivedMessage"}
          >
            {msg.content}
          </div>
        ))}
      </div>

      <div className="user-room-reply">
        <input
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send Message</button>
      </div>
    </div>
  );
}

export default App;
