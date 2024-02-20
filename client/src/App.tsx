import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from "./components/common/header/Header";
import Footer from "./components/common/footer/Footer";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import axios from "axios";
import ProtectedRoutes from "./ProtectedRoutes";
import Profil from "./pages/Profil";
import Home from "./pages/Home";

/* withCredentials:true :==> to allow this request to get credentials from that API Endpoint.
 Exp: (when we register a user==>getting back a cookie from backend url) ==>it will be saved in the 
 frontend to know this user is loggedIn */
axios.defaults.withCredentials = true;
function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/profil" element={<Profil />} />
          </Route>
        </Routes>
        <Footer />
      </Router>
    </>
  );
}
export default App;
