import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import io from "socket.io-client";
import "./../admin.css";

export default function Users() {
  const [users, setUsers] = useState([]);
  const socket = io.connect("ws://localhost:3001");

  useEffect(() => {
    socket.emit("login", "admin@gmail.com");

    socket.on("admin_login_success", (data) => {
      setUsers(data);
    });
  }, []);
  return (
    <div className="admin-users">
      <h1>Contacts</h1>
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
