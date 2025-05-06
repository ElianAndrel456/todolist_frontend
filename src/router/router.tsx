import { AuthLayout } from "@/layout/authLayout";
import { HomePage } from "@/pages/home/HomePage";

import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
    ],
  },
]);
