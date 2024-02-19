/** @format */

import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

import userStatusService from "../stores/userStatusStore";
import { userStatusStore } from "../stores/userStatusStore";

interface User {
  user_name: string;
  profil: string;
}

const Login = () => {
  const [user, setUser] = useState<User>({ user_name: "", profil: "" });
  const [ok, setOk] = useState(false);
  const { saveUserStatus } = userStatusService();
  const { status } = userStatusStore();

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
        .min(6, "password must be at least 6 characters")
        .required("Required field"),
    }),
    onSubmit: async (values) => {
      const { user_name, mot_de_passe } = values;
      try {
        const response = await axios.post("http://localhost:5000/auth/signin");
        console.log("===>", response);
        console.log("i===>", response.data.id);

        saveUserStatus(true);

        setOk(true);
        navigate("/profil");

        return response.data;
      } catch (error) {
        //   throw new Error(`Error making POST request: ${error}`);
        console.log(error);
      }
    },
  });

  const Toggle = useCallback(() => {
    navigate("/register");
  }, []);

  return (
    <>
      {" "}
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="row border rounded-5 p-3 bg-modal shadow box-area g-5">
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4 d-flex justify-content-center align-items-center ">
              <div>
                <h6>Login</h6>
              </div>
            </div>
            <hr />
            <div className="mb-4 d-flex justify-content-center align-items-center ">
              <div>
                <h4>Welcome back</h4>
              </div>
            </div>
            <div className="m-3">
              <label className="mb-2">Nom d'utilisateur</label>

              <input
                type="text"
                className="form-control"
                placeholder="Entrer un nom d'utilisateur"
                id="user_name"
                name="user_name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.user_name}
              />

              {formik.touched.user_name && formik.errors.user_name ? (
                <div className="text-danger">{formik.errors.user_name}</div>
              ) : null}
              <br></br>
            </div>
            <div className="m-3">
              <label className="mb-2">Mot de passe</label>

              <input
                type="password"
                className="form-control"
                placeholder="Entrer votre mot de passe"
                id="mot_de_passe"
                name="mot_de_passe"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.mot_de_passe}
              />
            </div>

            {formik.touched.mot_de_passe && formik.errors.mot_de_passe ? (
              <div className="text-danger">{formik.errors.mot_de_passe}</div>
            ) : null}
            <br></br>

            <div className="d-grid">
              <button type="submit" className="class-button background-green">
                Submit
              </button>
            </div>
            <hr />
            <div className="m-3 d-flex justify-content-center align-items-center ">
              <div>First Time using roundstack? </div>
              <div
                onClick={Toggle}
                className="fw-light pointer-on-hover p-1 div-on-hover"
              >
                Create an account
              </div>
            </div>
          </form>
        </div>
      </div>{" "}
      {ok && (
        <h1>
          Welcome {user.user_name} , your profile is : {user.profil}
        </h1>
      )}
    </>
  );
};

export default Login;
