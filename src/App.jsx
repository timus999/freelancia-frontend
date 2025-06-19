// "use client"
// import Navbar from "./components/navbar/Navbar"
// import Footer from "./components/footer/Footer"
// import Home from "./pages/home/Home"
// import Gigs from "./pages/gigs/Gigs"
// import Orders from "./pages/orders/Orders"
// import Mygigs from "./pages/mygigs/Mygigs"
// import Gig from "./pages/gig/Gig"
// import Add from "./pages/add/Add"
// import Messages from "./pages/messages/Messages"
// import Message from "./pages/message/Message"
// import Login from "./pages/login/Login"
// import Register from "./pages/register/Register"
// import Findjob from "./pages/findjob/Findjob"
// import Postjob from "./pages/postjob/Postjob"
// import { createBrowserRouter, RouterProvider, Outlet, useLocation } from "react-router-dom"
// import { motion, AnimatePresence } from "framer-motion"
// import "./App.scss"
// import FreelancerProfileCreation from "./pages/profile/freelancer/FreelancerProfileCreation"
// import ClientProfileCreation from "./pages/profile/client/ClientProfileCreation"
// import FreelancerProfile from "./pages/profile/view/FreelancerProfile"
// import ClientProfile from "./pages/profile/view/ClientProfile"

// function App() {
//   const Layout = () => {
//     const location = useLocation()
//     return (
//       <div className="app" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
//         <Navbar />
//         <AnimatePresence mode="wait" initial={false}>
//           <motion.div
//             key={location.pathname}
//             initial={{ opacity: 1, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
//             style={{ flex: 1 }}
//           >
//             <Outlet />
//           </motion.div>
//         </AnimatePresence>

//         <Footer />
//       </div>
//     )
//   }
//   //adding router
//   const router = createBrowserRouter([
//     {
//       path: "/",
//       element: <Layout />,
//       children: [
//         {
//           path: "/",
//           element: <Home />,
//         },
//         {
//           path: "/gigs",
//           element: <Gigs />,
//         },
//         {
//           path: "/gig/:id",
//           element: <Gig />,
//         },
//         {
//           path: "/orders",
//           element: <Orders />,
//         },
//         {
//           path: "/mygigs",
//           element: <Mygigs />,
//         },
//         {
//           path: "/add",
//           element: <Add />,
//         },
//         {
//           path: "/messages",
//           element: <Messages />,
//         },
//         {
//           path: "/message/:id",
//           element: <Message />,
//         },
//         {
//           path: "/login",
//           element: <Login />,
//         },
//         {
//           path: "/findjob",
//           element: <Findjob />,
//         },
//         {
//           path: "/postjob",
//           element: <Postjob />,
//         },
//         {
//           path: "/register",
//           element: <Register />,
//         },
//         {
//           path: "/create-freelancer-profile",
//           element: <FreelancerProfileCreation />,
//         },
//         {
//           path: "/create-client-profile",
//           element: <ClientProfileCreation />,
//         },
//         {
//           path: "/freelancer-profile/:id?",
//           element: <FreelancerProfile />,
//         },
//         {
//           path: "/client-profile/:id?",
//           element: <ClientProfile />,
//         },
//       ],
//     },
//   ]) // router added

//   return (
//     <div>
//       {/* <Navbar/>  //yo nav bar hatayae paxi balla logo click garda automatically home ma gayp */}
//       <RouterProvider router={router} />
//     </div>
//   )
// }
// export default App




//create rouyte
"use client"
import Navbar from "./components/navbar/Navbar"
import Footer from "./components/footer/Footer"
import Home from "./pages/home/Home"
import Gigs from "./pages/gigs/Gigs"
import Orders from "./pages/orders/Orders"
import Mygigs from "./pages/mygigs/Mygigs"
import Gig from "./pages/gig/Gig"
import Add from "./pages/add/Add"
import Messages from "./pages/messages/Messages"
import Message from "./pages/message/Message"
import Login from "./pages/login/Login"
import Register from "./pages/register/Register"
import Findjob from "./pages/findjob/Findjob"
import Postjob from "./pages/postjob/Postjob"
import FreelancerSearch from "./pages/freelancer-search/FreelancerSearch"
import JobDelivery from "./pages/job-delivery/JobDelivery"
import EscrowManagement from "./pages/escrow/EscrowManagement"
import TaskManagement from "./pages/task-management/TaskManagement"
import { createBrowserRouter, RouterProvider, Outlet, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import "./App.scss"
import FreelancerProfileCreation from "./pages/profile/freelancer/FreelancerProfileCreation"
import ClientProfileCreation from "./pages/profile/client/ClientProfileCreation"
import FreelancerProfile from "./pages/profile/view/FreelancerProfile"
import ClientProfile from "./pages/profile/view/ClientProfile"
import ProtectedRoute from "./routes/ProtectedRoute"

function App() {
  const Layout = () => {
    const location = useLocation()
    return (
      <div className="app" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Navbar />
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 1, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            style={{ flex: 1 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
        <Footer />
      </div>
    )
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/gigs",
          element: <Gigs />,
        },
        {
          path: "/gig/:id",
          element: <Gig />,
        },
        {
          path: "/orders",
          element: (
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          ),
        },
        {
          path: "/mygigs",
          element: (
            <ProtectedRoute requireFreelancer>
              <Mygigs />
            </ProtectedRoute>
          ),
        },
        {
          path: "/add",
          element: (
            <ProtectedRoute requireFreelancer>
              <Add />
            </ProtectedRoute>
          ),
        },
        {
          path: "/messages",
          element: (
            <ProtectedRoute>
              <Messages />
            </ProtectedRoute>
          ),
        },
        {
          path: "/message/:id",
          element: (
            <ProtectedRoute>
              <Message />
            </ProtectedRoute>
          ),
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/signup",
          element: <Register />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/findjob",
          element: (
            <ProtectedRoute requireFreelancer>
              <Findjob />
            </ProtectedRoute>
          ),
        },
        {
          path: "/postjob",
          element: (
            <ProtectedRoute requireClient>
              <Postjob />
            </ProtectedRoute>
          ),
        },
        {
          path: "/freelancer-search",
          element: (
            <ProtectedRoute requireClient>
              <FreelancerSearch />
            </ProtectedRoute>
          ),
        },
        {
          path: "/job-delivery/:jobId",
          element: (
            <ProtectedRoute>
              <JobDelivery />
            </ProtectedRoute>
          ),
        },
        {
          path: "/escrow/:jobId",
          element: (
            <ProtectedRoute>
              <EscrowManagement />
            </ProtectedRoute>
          ),
        },
        {
          path: "/tasks/:jobId",
          element: (
            <ProtectedRoute>
              <TaskManagement />
            </ProtectedRoute>
          ),
        },
        {
          path: "/create-freelancer-profile",
          element: <FreelancerProfileCreation />,
        },
        {
          path: "/create-client-profile",
          element: <ClientProfileCreation />,
        },
        {
          path: "/freelancer-profile/:id?",
          element: <FreelancerProfile />,
        },
        {
          path: "/client-profile/:id?",
          element: <ClientProfile />,
        },
      ],
    },
  ])

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
