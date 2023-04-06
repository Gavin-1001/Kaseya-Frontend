import Register from "./components/Register";
import Login from "./components/Login";
import Unauthorized from "./components/Unauthorized";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Linkpage from "./components/Linkpage";
import SecureAbout from "./pages/SecureAbout";
import AddEmployeeForm from "./components/AddEmployeeForm";
import RequireAuth from "./components/RequireAuth";
import TestRoute from "./pages/TestRoute";
import Missing from "./pages/Missing";
import About from "./pages/About";

import {Routes, Route} from 'react-router-dom'

function App() {
  return (
    
    <Routes>
      <Route path="/" element={<Layout />} />

      {/*
      Watch videos on Dave Gray, SO when the user logs in using user/password gavin/gavin  
      It directs to the Layout page, I don't know if its working correctly, have a look    
      */}


        {/*public routes*/}
        <Route path="login" element={<Login />} />
        <Route path="about" element={<About />} />
        <Route path="register" element={<Register />} />
        <Route path="links" element={<Linkpage />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="test" element={<TestRoute/>} />

        {/*Protected Routes*/} 
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="secure" element={<SecureAbout />} />
          <Route path="addEmployee" element={<AddEmployeeForm />} />

        </Route>
        {/*Exception/Edge case Route*/}
        <Route path="*" element={<Missing />} />


    </Routes>
 
  );

}

export default App
