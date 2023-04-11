import Register from "./components/Register";
import Login from "./components/Login";

import Home from "./components/Home";


import SecureAbout from "./pages/SecureAbout";

import RequireAuth from "./components/RequireAuth";
import TestRoute from "./pages/TestRoute";
import Missing from "./pages/Missing";

import { Routes, Route} from 'react-router-dom'


function App() {
  return (

    // <Router>
    //   <Routes>
    //     <Route path="/" element={<Login />} />
    //     <Route path="/about" element={<About />} />
    //     <Route path="/register" element={<Register />} />
    //   </Routes>
    // </Router>


    
    // <Routes>
    //   {/* <Route path="/" element={<Login />} /> */}

    //   {/*
    //   Watch videos on Dave Gray, SO when the user logs in using user/password gavin/gavin  
    //   It directs to the Layout page, I don't know if its working correctly, have a look    
    //   */}


    //     {/*public routes*/}
    //     <Route path="/login" element={<Login />} />
    //     <Route path="/register" element={<Register />} />
    //     <Route path="/test" element={<TestRoute/>} />

    //     {/*Protected Routes*/} 
    //     <Route element={<RequireAuth />}>
    //       <Route path="/home" element={<Home />} />

    //       <Route path="/secure" element={<SecureAbout />} />


    //     </Route>
    //     {/*Exception/Edge case Route*/}
    //     <Route path="*" element={<Missing />} />


    // </Routes>
 

    <Routes>
        {/* <Route path='' element={<Home />} /> */}
        <Route path='/' element={<Login />} />
        <Route
          path='/home'
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
    </Routes>


  );

  

}

export default App
