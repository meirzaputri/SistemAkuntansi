import React from "react";
import ReactDOM from "react-dom/client";
import router from "./router";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "../src/context/AuthContext";
import SidebarProvider from "../src/context/SidebarContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <SidebarProvider>
        <RouterProvider router={router} />
      </SidebarProvider>
    </AuthProvider>
  </React.StrictMode>
);
