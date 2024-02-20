/** @format */
import "./login.css";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import userStatusService from "../../stores/userStatusStore";
import { userStatusStore } from "../../stores/userStatusStore";
import toast from "react-hot-toast";
const Login = () => {
  const { saveUserStatus } = userStatusService();
  const navigate = useNavigate();

  //Formik
  const formik = useFormik({
    initialValues: {
      user_name: "",
      mot_de_passe: "",
    },
    validationSchema: Yup.object({
      user_name: Yup.string().required("Nom d'utilisateur obligatoire"),
      mot_de_passe: Yup.string()
        .min(6, "Mot de passe doit contenir au moins 6 caractères")
        .required("Mot de passe obligatoire"),
    }),
    onSubmit: async (values) => {
      const { user_name, mot_de_passe } = values;
      try {
        const response = await axios.post("http://localhost:5000/auth/signin", {
          user_name,
          mot_de_passe,
        });
        toast.success(response.data.message);
        console.log("===>", response);
        console.log("i===>", response.data.id);

        saveUserStatus(true);

        navigate("/profil");

        return response.data;
      } catch (error: any) {
        toast.error(error.message);
      }
    },
  });

  const Toggle = useCallback(() => {
    navigate("/register");
  }, []);

  return (
    <div className="register">
      <form className="form" onSubmit={formik.handleSubmit}>
        <h3>Se connecter</h3>

        <div className="mb-1">
          <label className="form-label">Nom d'utilisateur</label>
          <div className="d-flex align-items-center gap-2">
            <FaUser size={24} style={{ color: "#2be135" }} />
            <input
              type="text"
              className="form-control"
              aria-describedby="emailHelp"
              placeholder="Enter un nom d'utilisateur"
              id="user_name"
              name="user_name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.user_name}
            />
          </div>

          {formik.touched.user_name && formik.errors.user_name ? (
            <div className="text-danger">{formik.errors.user_name}</div>
          ) : null}
        </div>

        {/* password */}
        <div className="mb-1">
          <label className="form-label">Mot de passe</label>
          <div className="d-flex align-items-center gap-2">
            <RiLockPasswordFill size={24} style={{ color: "#2be135" }} />
            <input
              type="password"
              className="form-control"
              placeholder="Enter votre mot de passe"
              id="mot_de_passe"
              name="mot_de_passe"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.mot_de_passe}
            />
          </div>
        </div>
        {formik.touched.mot_de_passe && formik.errors.mot_de_passe ? (
          <div className="text-danger">{formik.errors.mot_de_passe}</div>
        ) : null}

        <button
          type="submit"
          style={{ backgroundColor: "#2be135" }}
          className="btn "
        >
          Submit
        </button>

        <div
          onClick={Toggle}
          className="fw-light pointer-on-hover p-1 div-on-hover navigate"
        >
          Créer Un compte
        </div>
      </form>
    </div>
  );
};

export default Login;
