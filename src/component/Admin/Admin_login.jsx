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
    onSubmit: (values) => {
      const matchedAdmin = admin.find(
        (a) => a.admin_id === values.admin_id );

      if (!matchedAdmin) {
        alert("❌ Invalid Admin ID");
        return;
      }

      if (matchedAdmin.password === values.password) {
      
        setCookie("admin_id", matchedAdmin.admin_id, { path: "/" });
        alert("✅ Admin Login Successful");
        navigate("/admin-dashboard");
      } else {
        alert("⚠️ Invalid Password");
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
              placeholder="Enter Admin ID"
              value={formik.values.admin_id}
              onChange={formik.handleChange}
              required
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
              placeholder="Enter Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={!formik.values.admin_id || !formik.values.password}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Admin_login;
