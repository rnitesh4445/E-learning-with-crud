import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./context/UserContext";
import Card from "./Card";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function User_dashboard() {
  const navigate = useNavigate();
  const [cookies] = useCookies(["user_id"]);
  const { fil } = useContext(UserContext);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    // ✅ Redirect unauthenticated users
    if (!cookies["user_id"]) {
      navigate("/");
    } else {
      setIsCheckingAuth(false);
    }
  }, [cookies, navigate]);

  if (isCheckingAuth) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div
        className="container-fluid"
        style={{
          backgroundColor: "#f5f5f5",
          minHeight: "89vh",
          padding: "10px",
        }}
      >
        <div className="row g-3">
          {fil && fil.length > 0 ? (
            fil.map((item) => <Card key={item.id} video={item} />)
          ) : (
            <div className="text-center text-muted py-5">
              <h5>No videos found</h5>
              <p>Try adjusting your search or check back later.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default User_dashboard;
