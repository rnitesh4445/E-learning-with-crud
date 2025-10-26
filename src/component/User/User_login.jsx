import React, { useContext } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useCookies } from "react-cookie";


function User_login() {
  const[cookies,setCookie,removeCookie]=useCookies(['user_id']);
  console.log(cookies)
  const { user } = useContext(UserContext); 
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      user_id: "",
      password: "",
    },
    onSubmit: (details) => {
      
      const matchedUser = user.find((acc) => acc.user_id === details.user_id);

      if (!matchedUser) {
        alert("Invalid ID");
        return;
      }

      if (matchedUser.password === details.password) {
        setCookie('user_id',matchedUser.user_id)
        navigate("/user-dashboard");
      } else {
        alert("Invalid password");
      }
    },
  });

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="card shadow-lg p-4"
        style={{ width: "350px", borderRadius: "15px" }}
      >
        <h3 className="text-center mb-4">User Login</h3>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="user_id" className="form-label">
              User ID
            </label>
            <input
              type="text"
              id="user_id"
              name="user_id"
              className="form-control"
              onChange={formik.handleChange}
              value={formik.values.user_id}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
          </div>

          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-success">
              Login
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => navigate("/sign-up")}
            >
              Sign Up
            </button>
          </div>

          <div className="mt-3 text-center">
            <a href="#" className="text-decoration-none small">
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default User_login;
