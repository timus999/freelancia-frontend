// src/App.jsx
import { AppRoutes } from "./routes/AppRoutes";
import toast, { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <div>
      <Toaster position="top-right" />
      <AppRoutes />
    </div>
  );
}