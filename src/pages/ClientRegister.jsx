// // src/pages/ClientRegister.jsx
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Button } from "../components/common/Button";
// import { Input } from "../components/common/Input";
// import { Spinner } from "../components/common/Spinner";
// import { useToast } from "../hooks/useToast";
// import { useWallet } from "../hooks/useWallet";
// import { register } from "../api/auth";

// export default function ClientRegister() {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     companyName: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const { wallet, publicKey } = useWallet();
//   const { showToast } = useToast();
//   const navigate = useNavigate();

//   const handleChange = (name, value) => {
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleConnectWallet = async () => {
//     if (!wallet) {
//       showToast("Please install a Solana wallet (e.g., Phantom)", "error");
//       return;
//     }
//     try {
//       await wallet.connect();
//       showToast("Wallet connected successfully", "success");
//     } catch (error) {
//       showToast("Failed to connect wallet", "error");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     // Validation
//     if (!formData.email || !formData.email.includes("@")) {
//       showToast("Please enter a valid email", "error");
//       setLoading(false);
//       return;
//     }
//     if (!formData.password || formData.password.length < 8) {
//       showToast("Password must be at least 8 characters", "error");
//       setLoading(false);
//       return;
//     }

//     try {
//       const payload = {
//         email: formData.email,
//         password: formData.password,
//         role: "client",
//         wallet_address: publicKey ? publicKey.toString() : null,
//         company_name: formData.companyName || null,
//       };

//       const response = await register(payload);

//       localStorage.setItem("token", response.data.token);
//       showToast("Registration successful!", "success");
//       navigate("/dashboard");
//     } catch (error) {
//       const message = error.response?.data?.error || "Registration failed";
//       showToast(message, "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-center">
//           Client Registration
//         </h2>
//         {loading ? (
//           <Spinner />
//         ) : (
//           <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <Input
//                 label="Email"
//                 type="email"
//                 value={formData.email}
//                 onChange={(e) => handleChange("email", e.target.value)}
//                 placeholder="Enter your email"
//                 required
//               />
//             </div>
//             <div className="mb-4">
//               <Input
//                 label="Password"
//                 type="password"
//                 value={formData.password}
//                 onChange={(e) => handleChange("password", e.target.value)}
//                 placeholder="Enter your password"
//                 required
//               />
//             </div>
//             <div className="mb-4">
//               <Input
//                 label="Company Name (Optional)"
//                 type="text"
//                 value={formData.companyName}
//                 onChange={(e) => handleChange("companyName", e.target.value)}
//                 placeholder="Enter your company name"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Solana Wallet (Optional)
//               </label>
//               {publicKey ? (
//                 <p className="text-sm text-green-600">
//                   Connected: {publicKey.toString().slice(0, 8)}...
//                 </p>
//               ) : (
//                 <Button
//                   variant="secondary"
//                   onClick={handleConnectWallet}
//                   disabled={loading}
//                 >
//                   Connect Wallet
//                 </Button>
//               )}
//             </div>
//             <Button type="submit" disabled={loading}>
//               Register
//             </Button>
//           </form>
//         )}
//         <p className="mt-4 text-center text-sm">
//           Already have an account?{" "}
//           <a href="/login" className="text-blue-600 hover:underline">
//             Login
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }