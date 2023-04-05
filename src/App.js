import Navbar from "./Navbar"
import Home from "./pages/Home"
import About from "./pages/About"
import { Route, Routes, BrowserRouter, } from "react-router-dom"
import Login from "./pages/Login"



// const router = createBrowserRouter([
//   {path:'/', element: <Login />},
//   {path:'/about', element: <About />}
// ]);



function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </>
  )

  //return <RouterProvider router={router} />;
}

export default App
