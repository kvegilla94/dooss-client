import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/home";
import Booking from "./routes/booking";
import User from "./routes/user";
import BookingDetail, {
  loader as bookingLoader,
} from "./routes/bookingDetails";
import Root from "./routes/root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "booking",
        element: <Booking />,
      },
      {
        path: "user",
        element: <User />,
        children: [
          {
            path: ":id",
            loader: bookingLoader,
            element: <BookingDetail />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
