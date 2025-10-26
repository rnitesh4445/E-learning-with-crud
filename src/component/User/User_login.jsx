import React, { useContext } from "react";
import { useFormik } from "formik";
import { useCookies } from "react-cookie";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function User_login() {
  const { user } = useContext(UserContext);
  const [cookies, setCookie] = useCookies(["user_id"]);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { user_id: "", password: "" },
    onSubmit: (values) => {
      const matchedUser = user.find(
        (u) => u.user_id.toLowerCase() === values.user_id.toLowerCase()
      );

      if (!matchedUser) {
        alert("Invalid User ID");
        return;
      }

      if (matchedUser.password === values.password) {
        setCookie("user_id", matchedUser.user_id, { path: "/" });
        navigate("/user-dashboard");
      } else {
        alert("Invalid Password");
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
              value={formik.values.user_id}
              onChange={formik.handleChange}
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
              value={formik.values.password}
              onChange={formik.handleChange}
            />
          </div>

          <button type="submit" className="btn btn-success w-100">
            Login
          </button>

          <div className="text-center mt-3">
            <span>Don't have an account? </span>
            <Link to="/sign-up" className="btn btn-link">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default User_login;
