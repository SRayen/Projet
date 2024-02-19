import { useEffect, useState } from "react";
import axios from "axios";
import userStatusService from "../stores/userStatusStore";

export default function Profil() {
  const { saveUserStatus } = userStatusService();
  const [user, setuser] = useState({ email: "", profil: "" });

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("http://localhost:5000/auth/user");
        console.log("===>", response.data);
        setuser(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);

  return (
    <>
      <div>
        Hello {user.email} , Profil: {user.profil}
      </div>
    </>
  );
}
