import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";

export default function Admin() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState("");
  //   const [users, setUsers] = useState([])
  const socket = io.connect("ws://localhost:3001");

  const adminLogin = () => {
    if (admin) {
      socket.emit("login", admin);
    }
  };

  useEffect(() => {
    // For Admin
    socket.on("admin_login_success", (data) => {
      if (data) {
        navigate("/admin/users");
      }
      console.log(data);
      //   setUsers(data);
    });
  }, [socket]);
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
