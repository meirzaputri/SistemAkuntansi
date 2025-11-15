import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";

const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const Dashboard = lazy(() => import("../pages/Dashboard/Home"));
const AppLayout = lazy(() => import("../layout/AppLayout"));

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/signup", element: <Register /> },
  {
    path: "/apps",
    element: <AppLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "dashboard", element: <Dashboard /> },
    ]
  }
]);

export default router;
