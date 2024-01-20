import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import io from "socket.io-client";

export default function Users() {
  const [users, setUsers] = useState([]);
  const socket = io.connect("ws://localhost:3001");

  useEffect(() => {
    // For Admin
    socket.emit("login", "admin@gmail.com");

    socket.on("admin_login_success", (data) => {
      setUsers(data);
    });
  }, []);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {users &&
        users.map((user, index) => {
          return (
            <Link to={`/admin/users/${user.email}`} key={index}>
              {user.email}
            </Link>
          );
        })}
    </div>
  );
}
