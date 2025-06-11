// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/common/Button";
import { Input } from "../components/common/Input";
import { Spinner } from "../components/common/Spinner";
import { useToast } from "../hooks/useToast";
import { login } from "../api/auth";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);

      // Validation
      if (!formData.email || !formData.email.includes("@")) {
        showToast("Please enter a valid email", "error");
        setLoading(false);
        return;
      }
      if (!formData.password) {
        showToast("Please enter a password", "error");
        setLoading(false);
        return;
      }

      try {
        const response = await login({
          email: formData.email,
          password: formData.password,
        });

        localStorage.setItem("token", response.token);
        showToast("Login successful!", "success");
        navigate("/dashboard");
      } catch (error) {
        const message = error.response?.data?.error || "Login failed";
        showToast(message, "error");
      } finally {
        setLoading(false);
      }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {loading ? (
          <Spinner />
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Input
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-4">
              <Input
                label="Password"
                type="password"
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            <Button type="submit" disabled={loading}>
              Login
            </Button>
          </form>
        )}
        <p className="mt-4 text-center text-sm">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}