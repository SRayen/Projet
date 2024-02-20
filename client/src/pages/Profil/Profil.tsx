import "./profil.css";
import { useEffect, useState } from "react";
import axios from "axios";
import userStatusService from "../../stores/userStatusStore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
export default function Profil() {
  const { width, height } = useWindowSize();
  const { saveUserStatus } = userStatusService();
  const [user, setuser] = useState({ user_name: "", profil: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("http://localhost:5000/auth/user");
        console.log("===>", response.data);
        setuser(response.data);
        toast.success(response.data.message);
      } catch (error) {
        navigate("/login");
      }
    };
    fetch();
  }, [navigate]);

  return (
    <div className="home">
      <Confetti width={width} height={height} />
      <div className="desc">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#2be135"
            fill-opacity="1"
            d="M0,128L34.3,154.7C68.6,181,137,235,206,218.7C274.3,203,343,117,411,80C480,43,549,53,617,90.7C685.7,128,754,192,823,202.7C891.4,213,960,171,1029,138.7C1097.1,107,1166,85,1234,80C1302.9,75,1371,85,1406,90.7L1440,96L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z"
          ></path>
        </svg>
        <div className="bienvenue">
          <h1>Bienvenue</h1>
          <h2>
            <span className="key">Nom d'utilisateur: </span>
            {user.user_name}
          </h2>
          <h2>
            <span className="key">Profil: </span> {user.profil}
          </h2>
        </div>
      </div>
    </div>
  );
}
