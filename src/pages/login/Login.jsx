import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";

export default function Login() {
  const [room, setRoom] = useState("");
  const navigate = useNavigate();

  const joinRoom = () => {
    if (room) {
      navigate(`/message/${room}`);
    }
  };
  return (
    <div className="login-container">
      <div className="form-input">
        <input
          type="email"
          placeholder="Enter your email to proceed..."
          onChange={(e) => setRoom(e.target.value)}
        />
        <button onClick={joinRoom}>Login</button>
      </div>
      <Link to="/admin">Login as Admin</Link>
    </div>
  );
}
