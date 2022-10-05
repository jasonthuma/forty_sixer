import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import AuthProvider from "./context/AuthContext";
import HikeProvider from "./context/HikeContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import MountainProvider from "./context/MountainContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <HikeProvider>
        <MountainProvider>
          <App />
        </MountainProvider>
      </HikeProvider>
    </AuthProvider>
  </React.StrictMode>
);
