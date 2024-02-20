import { useEffect, useState } from "react";
import axios from "axios";
import userStatusService from "../stores/userStatusStore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
export default function Profil() {
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
  }, []);

  const logOut = async () => {
    try {
      const response = await axios.post("http://localhost:5000/auth/signout");

      saveUserStatus(false);
    } catch (error) {
      //   throw new Error(`Error making POST request: ${error}`);
      console.log(error);
    }
  };

  return (
    <>
      <div>
        Hello {user.user_name} , Profil: {user.profil}
      </div>
      <button onClick={() => logOut()}>Log Out</button>
    </>
  );
}
