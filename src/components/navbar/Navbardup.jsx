// const Navbar = () => {
//   const [active, setActive] = useState(false);
//   const [open, setOpen] = useState(false);
//   const { pathname } = useLocation();
//   const currentUser = JSON.parse(localStorage.getItem("currentUser")); // Get from localStorage

//   const isActive = () => {
//     window.scrollY > 0 ? setActive(true) : setActive(false);
//   };

//   useEffect(() => {
//     window.addEventListener("scroll", isActive);
//     return () => window.removeEventListener("scroll", isActive);
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("currentUser");
//     window.location.reload(); // refresh to reset state
//   };

//   return (
//     <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
//       <div className="container">
//         <div className="logo">
//           <Link to="/" className="link">
//             Freelancia
//           </Link>
//         </div>
//         <div className="links">
//           <span>About Us</span>
//           <span>Contact</span>
//           <span>Explore More</span>
//           {!currentUser && (
//             <Link className="link" to="/login">
//               Sign In
//             </Link>
//           )}
//           {!currentUser?.isSeller && <span>Become a Seller</span>}
//           {!currentUser && <button>Join</button>}
//           {currentUser && (
//             <div className="user" onClick={() => setOpen(!open)}>
//               <img
//                 src="https://www.billboard.com/wp-content/uploads/2022/08/Ariana-Grande-the-voice-2021-billboard-1548.jpg?w=875&h=583&crop=1"
//                 alt=""
//               />
//               <span>{currentUser?.username}</span>
//               {open && (
//                 <div className="options">
//                   {currentUser?.isSeller && (
//                     <>
//                       <Link className="link" to="/mygigs">
//                         Gigs
//                       </Link>
//                       <Link className="link" to="/add">
//                         Add New Gig
//                       </Link>
//                     </>
//                   )}
//                   <Link className="link" to="/orders">
//                     Orders
//                   </Link>
//                   <Link className="link" to="/messages">
//                     Messages
//                   </Link>
//                   <span onClick={handleLogout}>Logout</span>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>

//       {(active || pathname !== "/") && (
//         <>
//           <hr />
//           <div className="menu">
//             <Link className="link menuLink" to="/">
//               Graphics Designing
//             </Link>
//             <Link className="link" to="/">
//               Video & Animation
//             </Link>
//             <Link className="link" to="/">
//               Writing & Translation
//             </Link>
//             <Link className="link" to="/">
//               AI Services
//             </Link>
//             <Link className="link" to="/">
//               Digital Marketing
//             </Link>
//             <Link className="link" to="/">
//               Music & Audio
//             </Link>
//             <Link className="link" to="/">
//               Programming & Tech
//             </Link>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Navbar;
