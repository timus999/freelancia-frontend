// import { useNavigate} from "react-router-dom";
// import { Button } from "../components/common/Button";

// export default function Register() {
//     const navigate = useNavigate();

//     return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-center">Choose Your Role</h2>
//         <div className="space-y-4">
//           <Button onClick={() => navigate("/signup/freelancer")}>
//             Register as Freelancer
//           </Button>
//           <Button
//             variant="secondary"
//             onClick={() => navigate("/signup/client")}
//           >
//             Register as Client
//           </Button>
//         </div>
//         <p className="mt-4 text-center text-sm">
//           Already have an account?{" "}
//           <a href="/login" className="text-blue-600 hover:underline">
//             Login
//           </a>
//         </p>
//       </div>
//     </div>
//     )
// }