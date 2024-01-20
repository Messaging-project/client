import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import "./app.css";

function App() {
  const socket = io.connect("ws://localhost:3001", {
    reconnection: true,
    reconnectionAttempts: 100, // Adjust the number of attempts as needed
  });



  const { id } = useParams();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  socket.emit("join_room", id);

  const sendMessage = () => {
    socket.emit("send_message", { message, email: id });
    setMessage("");
  };

  useEffect(() => {
    const newSocket = io.connect("ws://localhost:3001", {
      reconnection: true,
      reconnectionAttempts: 100, // Adjust the number of attempts as needed
    });
    newSocket.on("received_message_client", (data) => {
      setMessages(data);
    });
    newSocket.on("user_found", (data) => {
      setMessages(data);
    });

    return () => {
      newSocket.disconnect();
    };
    
  }, [messages]);

  return (
    <div className="container">
      <div className="messageBody">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={msg.sender === id ? "sentMessage" : "receivedMessage"}
          >
            {msg.content}
          </div>
        ))}
      </div>

      <div className="inputBody">
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
