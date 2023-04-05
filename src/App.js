import { Route, Routes, BrowserRouter, } from "react-router-dom"
import Login from "./pages/Login"
import { useEffect } from "react"


import Navbar from "./Navbar"
import Home from "./pages/Home"
import About from "./pages/About"
import Dashboard from "./pages/Dashboard"
import PrivateRoute from "./components/PrivateRoute"



// const router = createBrowserRouter([
//   {path:'/', element: <Login />},
//   {path:'/about', element: <About />}
// ]);

// USE LATER
// useEffect(() =>{
//   console.log(`JWT is ${jwt}`);

// }, [jwt]);


function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
      
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </>
  )

  //return <RouterProvider router={router} />;
}

export default App
