import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <div>
      <input
        placeholder="Admin Login...."
        onChange={(e) => setAdmin(e.target.value)}
      />
      <button onClick={adminLogin}>Admin Login</button>
    </div>
  );
}
