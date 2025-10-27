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
    validate: (values) => {
      const errors = {};
      if (!values.user_id) errors.user_id = "User ID is required";
      if (!values.password) errors.password = "Password is required";
      return errors;
    },
    onSubmit: (values) => {
      const matchedUser = user.find(
        (u) => u.user_id?.toLowerCase() === values.user_id.toLowerCase()
      );

      if (!matchedUser) {
        alert("❌ Invalid User ID");
        return;
      }

      if (matchedUser.password === values.password) {
        setCookie("user_id", matchedUser.user_id, {
          path: "/",
          maxAge: 7 * 24 * 60 * 60, // cookie expires in 7 days
          sameSite: "Lax",
        });
        navigate("/user-dashboard");
      } else {
        alert("❌ Invalid Password");
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
        <form onSubmit={formik.handleSubmit} noValidate>
          <div className="mb-3">
            <label htmlFor="user_id" className="form-label">
              User ID
            </label>
            <input
              type="text"
              id="user_id"
              name="user_id"
              className={`form-control ${
                formik.errors.user_id ? "is-invalid" : ""
              }`}
              value={formik.values.user_id}
              onChange={formik.handleChange}
            />
            {formik.errors.user_id && (
              <div className="invalid-feedback">{formik.errors.user_id}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className={`form-control ${
                formik.errors.password ? "is-invalid" : ""
              }`}
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            {formik.errors.password && (
              <div className="invalid-feedback">{formik.errors.password}</div>
            )}
          </div>

          <button type="submit" className="btn btn-success w-100">
            Login
          </button>

          <div className="text-center mt-3">
            <span>Don't have an account? </span>
            <Link to="/sign-up" className="btn btn-link p-0">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default User_login;
