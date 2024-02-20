/** @format */
import "./register.css";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { FaUser } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import toast from "react-hot-toast";
const Register = () => {
  const navigate = useNavigate();

  //Formik
  const formik = useFormik({
    initialValues: {
      user_name: "",
      mot_de_passe: "",
      confirm_password: "",
      profil: "",
    },
    validationSchema: Yup.object({
      user_name: Yup.string().required("Required field"),
      mot_de_passe: Yup.string()
        .min(6, "Mot de passe doit contenir au moins 6 caractères")
        .required("Mot de passe obligatoire"),
      confirm_password: Yup.string()
        .label("confirm password")
        .required("Confirmation mot de passe obligatoire")
        .oneOf([Yup.ref("mot_de_passe")], "Passwords must match"),
      profil: Yup.string().required("Profil is required"),
    }),

    onSubmit: async (values) => {
      const { user_name, mot_de_passe, profil } = values;

      try {
        const response = await axios.post("http://localhost:5000/auth/signup", {
          user_name,
          mot_de_passe,
          profil,
        });

        toast.success(response.data.message);
        navigate("/login");
      } catch (error: any) {
        toast.error(error.response.data.message);
      }
    },
  });

  const Toggle = useCallback(() => {
    navigate("/login");
  }, []);
  return (
    <div className="register">
      <form className="form" onSubmit={formik.handleSubmit}>
        <h3>S'inscrire</h3>

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
        <div className="mb-1 profil">
          <label className="form-label">Profile</label>
          <div className="d-flex align-items-center gap-2 w-100">
            <FaUserTie size={24} style={{ color: "#2be135" }} />
            <select
              className="select"
              id="profil"
              name="profil"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.profil}
            >
              <option selected>Profile...</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
              <option value="superviseur">Superviseur</option>
            </select>
          </div>
          {formik.touched.profil && formik.errors.profil ? (
            <div className="text-danger">{formik.errors.profil}</div>
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
        <div className="mb-1">
          <label className="form-label">Confirmer le Mot de passe</label>
          <div className="d-flex align-items-center gap-2">
            <RiLockPasswordFill size={24} style={{ color: "#2be135" }} />
            <input
              type="password"
              className="form-control"
              placeholder="Confirmer votre mot de passe"
              id="confirm_password"
              name="confirm_password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirm_password}
            />
          </div>
        </div>
        {formik.touched.confirm_password && formik.errors.confirm_password ? (
          <div className="text-danger">{formik.errors.confirm_password}</div>
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
          Déjà j'ai un compte. Se connecter
        </div>
      </form>
    </div>
  );
};

export default Register;
