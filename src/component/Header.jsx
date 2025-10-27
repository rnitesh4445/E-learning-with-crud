import React, { useContext, useState } from "react";
import { useSearch } from "./Custom_Hook/Search";
import { UserContext } from "./context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function Header() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const { setFil, video } = useContext(UserContext);
  const filterItem = useSearch(query, video);
  const [cookies, , removeCookie] = useCookies(["user_id"]);

  
  const searchItem = () => setFil(filterItem);

  
  const handleLogout = () => {
    removeCookie("user_id", { path: "/" });
    navigate("/");
  };

  return (
    <div className="sticky-top">
      <nav className="navbar navbar-expand-md navbar-dark bg-dark p-3">
        <div className="container-fluid">
          <img
            src="/img/logo.png"
            alt="Logo"
            height="40"
            width="40"
            className="rounded-circle me-2"
          />

          
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

      
          <div className="collapse navbar-collapse" id="navbarContent">
  
            <div
              className="d-flex mx-auto my-2 my-lg-0 input-group"
              style={{ maxWidth: "350px" }}
            >
              <input
                className="form-control rounded-start"
                type="search"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    searchItem();
                  }
                }}
              />
              <button
                className="btn btn-primary rounded-end"
                onClick={searchItem}
              >
                Search
              </button>
            </div>

            {/* Nav Links */}
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center gap-4 fs-5">
              <li className="nav-item">
                <Link
                  to="/home"
                  className="nav-link text-white fw-semibold"
                  onClick={() => setFil(video)}
                >
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/about" className="nav-link text-white fw-semibold">
                  About Us
                </Link>
              </li>

              {/* User Dropdown */}
              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle d-flex align-items-center text-white bg-dark border-0"
                  id="userDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="bi bi-person-circle me-2 fs-4"></i>
                  <span className="fw-semibold">
                    {cookies["user_id"] || "Guest"}
                  </span>
                </button>

                <ul
                  className="dropdown-menu dropdown-menu-end shadow-sm mt-2"
                  aria-labelledby="userDropdown"
                  style={{ minWidth: "170px", borderRadius: "8px" }}
                >
                  <li>
                    <button
                      className="dropdown-item d-flex align-items-center"
                      disabled
                    >
                      <i className="bi bi-person me-2"></i> Profile
                    </button>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button
                      className="dropdown-item text-danger d-flex align-items-center"
                      onClick={handleLogout}
                    >
                      <i className="bi bi-box-arrow-right me-2"></i> Logout
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
