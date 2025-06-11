import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../common/Button";
import { Input } from "../common/Input";
import { useToast } from "../../hooks/useToast";
import { useScroll } from "../../hooks/useScroll";
import { logout } from "../../api/auth";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const { showToast } = useToast();
  const navigate = useNavigate();
  const isScrolled = useScroll(100); // Show search after 100px scroll

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      showToast("Logged out successfully!", "success");
      navigate("/login");
    } catch (error) {
      showToast("Logout failed", "error");
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 bg-white shadow-md transition-all duration-300 ${
        isScrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-green-600">
          <img src="/logo.png" alt="Freelancia" className="h-8" />
        </Link>
        {isScrolled && (
          <div className="flex-1 mx-4">
            <Input
              type="text"
              placeholder="What service are you looking for?"
              className="w-full max-w-xl"
            />
          </div>
        )}
        <nav className="flex items-center space-x-4">
          <Link to="/jobs" className="text-gray-600 hover:text-green-600">
            Explore
          </Link>
          <Link to="/freelancer" className="text-gray-600 hover:text-green-600">
            Become a Freelancer
          </Link>
          {isLoggedIn ? (
            <Button variant="secondary" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <>
              <Link to="/login">
                <Button variant="secondary">Login</Button>
              </Link>
              <Link to="/register">
                <Button>Sign Up</Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}