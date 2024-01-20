import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import "./login.css";

export default function Login() {
  const socket = io.connect("ws://localhost:3001");
  const [room, setRoom] = useState("");
  const navigate = useNavigate();

  const joinRoom = () => {
    socket.emit("join_room", room);
    if (room) {
      navigate(`/message/${room}`);
    }
  };
  return (
    <div>
      <input type="email" onChange={(e) => setRoom(e.target.value)} />
      <button onClick={joinRoom}>Login</button>
    </div>
  );
}
