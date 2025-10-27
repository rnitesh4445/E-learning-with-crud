import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function User_signup() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    user_id: "",
    user_name: "",
    password: "",
    mobile: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

  
    const exists = user.some(
      (u) => u.user_id.toLowerCase() === form.user_id.toLowerCase()
    );
    if (exists) {
      alert("⚠️ User ID already exists!");
      return;
    }

    const newUser = {
      ...form,
      id: Date.now().toString(), 
    };

    try {
      
      const baseURL = import.meta.env.VITE_API_URL || window.location.origin;

      await axios.post(`${baseURL}/api/users`, newUser);

    
      setUser((prev) => [...prev, newUser]);
      alert("🎉 Signup successful!");
      navigate("/user-login");
    } catch (error) {
      console.error(" Signup error:", error);
      alert("Failed to sign up. Please try again later.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="card shadow-lg p-4"
        style={{ width: "400px", borderRadius: "15px" }}
      >
        <h3 className="text-center mb-4">User Signup</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="user_id" className="form-label">
              User ID
            </label>
            <input
              type="text"
              id="user_id"
              name="user_id"
              className="form-control"
              value={form.user_id}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="user_name" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="user_name"
              name="user_name"
              className="form-control"
              value={form.user_name}
              onChange={handleChange}
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
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="mobile" className="form-label">
              Mobile
            </label>
            <input
              type="text"
              id="mobile"
              name="mobile"
              className="form-control"
              value={form.mobile}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default User_signup;
