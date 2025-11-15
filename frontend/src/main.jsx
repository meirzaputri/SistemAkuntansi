import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from "react-router-dom";
import router from "./router";
import './index.css'

import SidebarProvider from "./context/SidebarContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <SidebarProvider>
    <RouterProvider router={router} />
  </SidebarProvider>
);
