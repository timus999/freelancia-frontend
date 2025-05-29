// src/components/layout/Header.jsx
import { useNavigate } from "react-router-dom";
import { Button } from "../common/Button";
import { useToast } from "../../hooks/useToast";
import { logout } from "../../api/auth";

export default function Header() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem("token");
      showToast("Logged out successfully!", "success");
      navigate("/login");
    } catch (error) {
      const message = error.response?.data?.error || "Logout failed";
      showToast(message, "error");
    }
  };

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Freelancia</h1>
        <Button variant="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </header>
  );
}