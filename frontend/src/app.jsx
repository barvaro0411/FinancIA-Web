// frontend/src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom"; // ✅ elimina BrowserRouter aquí
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import PrivateRoute from "./routes/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <AuthProvider>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
