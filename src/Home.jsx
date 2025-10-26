import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#f8f9fa" }}
    >
      <div className="d-flex flex-wrap gap-4 justify-content-center">
        {/* Admin Card */}
        <div
          className="card shadow-lg text-center"
          style={{
            width: "220px",
            borderRadius: "15px",
            cursor: "pointer",
            transition: "0.3s",
          }}
          onClick={() => navigate("/admin-login")}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "scale(1.05)")
          }
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <div
            className="card-body d-flex flex-column align-items-center justify-content-center"
            style={{ padding: "30px 20px" }}
          >
            <i
              className="bi bi-shield-lock fs-1 mb-3"
              style={{ color: "#0d6efd" }}
            ></i>
            <h5 className="card-title mb-2">Admin</h5>
            <p className="card-text text-muted">
              Access admin panel and manage users.
            </p>
            <button className="btn btn-primary mt-2">Login as Admin</button>
          </div>
        </div>

        {/* User Card */}
        <div
          className="card shadow-lg text-center"
          style={{
            width: "220px",
            borderRadius: "15px",
            cursor: "pointer",
            transition: "0.3s",
          }}
          onClick={() => navigate("/user-login")}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "scale(1.05)")
          }
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <div
            className="card-body d-flex flex-column align-items-center justify-content-center"
            style={{ padding: "30px 20px" }}
          >
            <i
              className="bi bi-person-circle fs-1 mb-3"
              style={{ color: "#198754" }}
            ></i>
            <h5 className="card-title mb-2">User</h5>
            <p className="card-text text-muted">
              Login as user to view your dashboard.
            </p>
            <button className="btn btn-success mt-2">Login as User</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
