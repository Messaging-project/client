import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./admin.css";

export default function Admin() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState("");

  const adminLogin = () => {
    if (admin) {
      socket.emit("login", admin);
      navigate("/admin/users");
    }
  };

  return (
    <div className="login-container">
      <div className="form-input">

      <input
        placeholder="Admin Login...."
        onChange={(e) => setAdmin(e.target.value)}
      />
      <button onClick={adminLogin}>Admin Login</button>
      </div>
    </div>
  );
}
