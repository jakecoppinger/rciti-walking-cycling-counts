import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import { render } from "react-dom";
import React from "react";
import "./index.css";
import "./App.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { HelmetProvider } from "react-helmet-async";
import { LandingPage } from "./pages/LandingPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
]);

render(
  <React.StrictMode>
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
