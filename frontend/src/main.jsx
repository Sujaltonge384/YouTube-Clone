import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";
import "./index.css";

import { AuthProvider } from "./context/AuthContext.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>

    {/* Makes authentication available to the entire app */}
    <AuthProvider>
      <App />
    </AuthProvider>

  </StrictMode>
);