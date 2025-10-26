import React, { useContext, useEffect, useState } from "react";
import { useSearch } from "./Custom_Hook/Search";
import { UserContext } from "./context/UserContext";
import { Link } from "react-router-dom";
import Home from "./User_dashboard";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const { setFil, video } = useContext(UserContext);
  const filterItem = useSearch(query, video);
  const [cookies, setCookie, removeCookie] = useCookies(["user_id"]);

  function searchItem() {
    setFil(filterItem);
  }
  return (
    <div className=" sticky-top">
      <nav className="navbar navbar-expand-md navbar-dark bg-dark p-3 text-white ">
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

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center gap-4 fs-5">
              <li className="nav-item">
                <Link
                  to="/home"
                  className="nav-link text-white"
                  onClick={() => setFil(video)}
                  style={{ fontWeight: "500" }}
                >
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  to="/about"
                  className="nav-link text-white"
                  style={{ fontWeight: "500" }}
                >
                  About Us
                </Link>
              </li>

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle d-flex align-items-center text-white"
                  href="#"
                  id="userDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{
                    backgroundColor: "#343a40",
                    borderRadius: "8px",
                    padding: "6px 12px",
                  }}
                >
                  <i
                    className="bi bi-person-circle me-2"
                    style={{ fontSize: "1.3rem", color: "white" }}
                  ></i>
                  <span style={{ fontWeight: "500" }}>
                    {cookies["user_id"]}
                  </span>
                </a>

                <ul
                  className="dropdown-menu dropdown-menu-end shadow-sm mt-2"
                  aria-labelledby="userDropdown"
                  style={{
                    minWidth: "170px",
                    borderRadius: "8px",
                  }}
                >
                  <li>
                    <a
                      className="dropdown-item d-flex align-items-center"
                      href="#"
                      style={{ fontWeight: "500" }}
                    >
                      <i className="bi bi-person me-2"></i> Profile
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button
                      className="dropdown-item text-danger d-flex align-items-center"
                      onClick={() => {
                        removeCookie("user_id", { path: "/" });
                        navigate("/");
                      }}
                      style={{ fontWeight: "500" }}
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
