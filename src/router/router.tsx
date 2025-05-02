import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },

  {
    path: "/login",
    element: <LoginPage />,
  },
]);
