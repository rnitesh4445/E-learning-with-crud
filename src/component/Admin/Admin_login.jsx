import React, { useContext } from "react";
import { useFormik } from "formik";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function Admin_login() {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["admin_id"]);
  const { admin } = useContext(UserContext);

  const formik = useFormik({
    initialValues: {
      admin_id: "",
      password: "",
    },
    onSubmit: (sbt) => {
      const matchedAdmin = admin.find((a) => a.admin_id === sbt.admin_id);

      if (!matchedAdmin) {
        alert("Invalid Admin ID");
        return;
      }

      if (matchedAdmin.password === sbt.password) {
        setCookie("admin_id", matchedAdmin.admin_id, { path: "/" });
        navigate("/admin-dashboard");
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
        <h3 className="text-center mb-4">Admin Login</h3>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="admin_id" className="form-label">
              Admin ID
            </label>
            <input
              type="text"
              id="admin_id"
              name="admin_id"
              className="form-control"
              onChange={formik.handleChange}
              value={formik.values.admin_id}
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
          </div>
        </form>
      </div>
    </div>
  );
}

export default Admin_login;
