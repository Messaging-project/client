import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

export default function UserRoom() {
  const socket = io.connect("http://localhost:3001");
  const { id } = useParams();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  socket.emit("admin_join_room", {
    admin: "admin@gmail.com",
    clientEmail: id,
  });

  useEffect(() => {
    const socket = io.connect("ws://localhost:3001", {
      reconnection: true,
      reconnectionAttempts: 100, // Adjust the number of attempts as needed
    });
    socket.on("received_message", (data) => {
      setMessages(data);
    });

    socket.on("admin_user_found", (data) => {
      setMessages(data);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const replyMessage = () => {
    socket.emit("admin_send_message", { message, email: id });
    setMessage("");
  };
  return (
    <div>
      <h2>Client: {id}</h2>
      {messages.map((msg, index) => {
        return (
          <div
            key={index}
            className={
              msg.sender === "admin@gmail.com"
                ? "sentMessage"
                : "receivedMessage"
            }
          >
            {msg.content}
          </div>
        );
      })}

      <input
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={replyMessage}>Reply</button>
    </div>
  );
}
