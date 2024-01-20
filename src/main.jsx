import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login.jsx";
import App from "./pages/landing/App.jsx";
import Admin from "./pages/admin/Admin.jsx";
import "./index.css";
import Users from "./pages/admin/pages/Users.jsx";
import UserRoom from "./pages/admin/pages/UserRoom.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" exact={true} element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/users/:id"  element={<UserRoom />}/>
        <Route path="/message/:id" exact={true} element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
