// import React, { useEffect, useState } from 'react';
// import "./Navbar.scss"
// import { Link,useLocation, useNavigate } from "react-router-dom";

// const Navbar = () =>{
//    const[active, setActive] = React.useState(false);
//    const [open, setOpen] =useState(false); //menu click huda ko functionality
//    const {pathname} = useLocation();
//    const navigate = useNavigate();
//    const currentUser = JSON.parse(localStorage.getItem("currentUser")); // Get from localStorage

//    const isActive =()=>{
//    window.scrollY > 0 ? setActive(true) : setActive(false);
//    };

//    useEffect(() => {
//     window.addEventListener("scroll", isActive);
//     return () =>{
//         window.removeEventListener("scroll", isActive);
//     }
//    }, []);


// const handleLogout = () => {
//     localStorage.removeItem("currentUser");
//     navigate("/");
// };
// // when clicking on profile options menu apprea so this is currenr user
// // const currentUser={
// //     id:1,
// //     username: "Ariana",
// //     isFreelancer: true, //if you are not Freelancer you wont see the menu
// // }
//     return (
//         <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>  
//         {/* yedi homepage haina thin line option active hunxa always aru page ma  */}
//            <div className="container">
//               <div className="logo">
//               <Link to="/" className='link'>
//                  Freelancia
//               </Link>
//               </div>
//               <div className="links"> 
//                 <span>About Us</span>
//                 <span>Contact</span>
//                 <span>Explore More</span>
//                 {!currentUser && (
//                     <Link className="link" to="/login">
//                         Login In
//                     </Link>
//                 )}
//                 {/* //if curerent user is Freelancer dont show this links */}
                
//                { !currentUser && (
//                 <Link className='link' to='/register'>
//                     <button>Register</button>
//                 </Link>
               
//                )} 
//                {/* //if you are current user you wont see this button */}
//                { currentUser && (
//                 <div className="user"onClick={()=> setOpen(!open)}>
//                 <img src="https://www.billboard.com/wp-content/uploads/2022/08/Ariana-Grande-the-voice-2021-billboard-1548.jpg?w=875&h=583&crop=1" alt=""/>
//                     <span>{currentUser?.username}</span>
                    
//                   { open && 
//                   <div className="options"> 
//                     { currentUser?.isFreelancer ? (
//                         <>
//                             <Link className="link" to="/mygigs">Gigs</Link>
//                             <Link className="link" to="/add">Add New Gig</Link>
//                              <Link className="link" to="/findjob">Findjob</Link>
                             
//                         </>
//                     ):(
//                         <Link className="link" to="/postjob">Post Job</Link>
                        
//                         )}
//                         <Link className="link" to="/orders">Orders</Link>
//                         <Link className="link" to="/messages">Messages</Link>
//                         <Link className="link" to={currentUser ?.isFreelancer ? "/freelancer" : "/client"}>Profile</Link>
                        
//                         {/* <Link>Logout</Link> */}
//                         <span onClick={handleLogout}>Logout</span>
//                     </div>}
//                 </div>
//                )}
//               </div>
//         </div>
//            {(active || pathname !=="/") && (
//             <>    
//             <hr />
//             <div className="menu">
//             <Link className= "link menuLink" to="/">
//              Graphics Designing
//             </Link>
//             <Link className= "link" to="/">
//              Video & Animation
//             </Link>
//             <Link className= "link" to="/">
//              Writting & transition
//              </Link>
//             <Link className= "link" to="/">
//              Ai services
//              </Link>
//             <Link className= "link" to="/">
//              Digital marketing
//              </Link>
//             <Link className= "link" to="/">
//              Music & Audio
//              </Link>
//             <Link className= "link" to="/">
//              Pragramming & Tech
//              </Link>
//           </div>
//           </>
//           )}
//         </div>
//     );
// };
// export default Navbar;


//route correct
"use client"

import React, { useEffect, useState } from "react"
import "./Navbar.scss"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"

const Navbar = () => {
  const [active, setActive] = React.useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { user, logout, isFreelancer, isClient } = useAuth()

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false)
  }

  useEffect(() => {
    window.addEventListener("scroll", isActive)
    return () => {
      window.removeEventListener("scroll", isActive)
    }
  }, [])

  const handleLogout = async () => {
    await logout()
    navigate("/")
  }

  return (
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="logo">
          <Link to="/" className="link">
            Freelancia
          </Link>
        </div>
        <div className="links">
          <span>About Us</span>
          <span>Contact</span>
          <span>Explore More</span>
          {!user && (
            <Link className="link" to="/login">
              Login In
            </Link>
          )}
          {!user && (
            <Link className="link" to="/register">
              <button>Register</button>
            </Link>
          )}
          {user && (
            <div className="user" onClick={() => setOpen(!open)}>
              <img
                src={
                  user.profile_picture ||
                  "https://www.billboard.com/wp-content/uploads/2022/08/Ariana-Grande-the-voice-2021-billboard-1548.jpg?w=875&h=583&crop=1" ||
                  "/placeholder.svg"
                }
                alt=""
              />
              <span>{user?.username || `${user?.firstName} ${user?.lastName}`}</span>

              {open && (
                <div className="options">
                  {isFreelancer && (
                    <>
                      <Link className="link" to="/mygigs">
                        Gigs
                      </Link>
                      <Link className="link" to="/add">
                        Add New Gig
                      </Link>
                      <Link className="link" to="/findjob">
                        Find Jobs
                      </Link>
                    </>
                  )}
                  {isClient && (
                    <>
                      <Link className="link" to="/postjob">
                        Post Job
                      </Link>
                      <Link className="link" to="/freelancer-search">
                        Find Freelancers
                      </Link>
                    </>
                  )}
                  <Link className="link" to="/orders">
                    Orders
                  </Link>
                  <Link className="link" to="/messages">
                    Messages
                  </Link>
                  <Link className="link" to={isFreelancer ? "/freelancer-profile" : "/client-profile"}>
                    Profile
                  </Link>
                  <span onClick={handleLogout}>Logout</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {(active || pathname !== "/") && (
        <>
          <hr />
          <div className="menu">
            <Link className="link menuLink" to="/gigs?category=graphics">
              Graphics Designing
            </Link>
            <Link className="link" to="/gigs?category=video">
              Video & Animation
            </Link>
            <Link className="link" to="/gigs?category=writing">
              Writing & Translation
            </Link>
            <Link className="link" to="/gigs?category=ai">
              AI Services
            </Link>
            <Link className="link" to="/gigs?category=marketing">
              Digital Marketing
            </Link>
            <Link className="link" to="/gigs?category=music">
              Music & Audio
            </Link>
            <Link className="link" to="/gigs?category=programming">
              Programming & Tech
            </Link>
          </div>
        </>
      )}
    </div>
  )
}

export default Navbar
