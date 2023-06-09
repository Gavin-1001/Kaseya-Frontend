import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register.jsx";
import NotFound from "./pages/NotFoundException/NotFound";
import Dashboard from "./pages/dashboard/Dashboard";
import { AuthGuard } from "./AuthGuard/auth.guard";
import { Role } from "./common/models/Role";
import Logout from "./pages/Logout/Logout";
import Skills from './pages/skills/Skills'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <AuthGuard role={[Role.USER]}>
                <Dashboard />
              </AuthGuard>
            }
          />
          <Route
            path="/skills"
            element={
              <AuthGuard role={[Role.USER]}>
                  <Skills />
              </AuthGuard>
            }
          />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Register />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
