import { AppRoutes } from "./routes/AppRoutes";
import Header from "./components/layout/Header";
import toast, { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
    <div>
      <Toaster position="top-right" />
      <Header />
      <AppRoutes />
    </div>
</BrowserRouter>
  );
}