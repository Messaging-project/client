import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login.jsx";
import App from "./pages/landing/App.jsx";
import "./index.css";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/message/:id" exact={true} element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
