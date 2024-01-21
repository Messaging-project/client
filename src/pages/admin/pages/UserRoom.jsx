import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import "./../admin.css";
import { IconDotsVertical } from "@tabler/icons-react";

export default function UserRoom() {
  const { id } = useParams();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // state for managing message replies
  const [isOpened, setIsOpened] = useState(false);
  const [messageContent, setMessageContent] = useState("");
  const [messageId, setMessageId] = useState("");

  let socket;

  useEffect(() => {
    socket = io.connect("ws://localhost:3001", {
      reconnection: true,
      reconnectionAttempts: 100,
    });
    socket.emit("admin_join_room", {
      admin: "admin@gmail.com",
      clientEmail: id,
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
  }, [messages]);

  const replyMessage = () => {
    if (isOpened === true) {
      socket.emit("admin_reply_specific_message", {
        userEmail: id,
        messageId: messageId,
        repliedMessage: message,
      });
      setIsOpened(false);
    } else {
      socket.emit("admin_send_message", { message, email: id });
    }
    setMessage("");
  };
  return (
    <div className="user-room-container">
      <h2>{id}</h2>
      <div className="message-body">
        {messages.map((msg, index) => {
          return (
            <div
              key={index}
              className={
                msg.sender === "admin@gmail.com"
                  ? "sentMessage"
                  : "receivedMessage"
              }
              style={{ display: "flex", flexDirection: "column" }}
            >
              <div styles={{ display: "flex", flexDirection: "row" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {msg.sender !== "admin@gmail.com" && (
                    <span style={{ fontSize: "13px" }}>From: {msg.sender}</span>
                  )}
                  <span>{msg.content}</span>
                </div>

                {msg.sender !== "admin@gmail.com" && (
                  <IconDotsVertical
                    size={15}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setIsOpened(!isOpened);
                      setMessageContent(msg.content);
                      setMessageId(msg._id);
                    }}
                  />
                )}
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {msg.replies.map((reply, index) => {
                  return (
                    <span key={index} className="sentMessage">
                      {reply}
                    </span>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="user-room-reply">
        {isOpened ? (
          <div
            style={{
              border: "1px solid black",
              width: "460px",
              borderRadius: "4px",
              padding: "2px 4px",
            }}
          >
            <span>{messageContent}</span>
            <button
              style={{
                padding: "2px 4px",
              }}
              onClick={() => setIsOpened(false)}
            >
              X
            </button>
          </div>
        ) : null}
        <input
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={replyMessage}>Reply</button>
      </div>
    </div>
  );
}
