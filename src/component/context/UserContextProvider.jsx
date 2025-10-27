import React, { useState, useEffect } from "react";
import { UserContext } from "./UserContext";
import axios from "axios";

function UserContextProvider({ children }) {
  const [video, setVideo] = useState([]);
  const [fil, setFil] = useState([]);
  const [user, setUser] = useState([]);
  const [admin, setAdmin] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Dynamic base URL (for both local & deployed environments)
        const baseURL = import.meta.env.VITE_API_URL || window.location.origin;

        const [videosRes, usersRes, adminRes] = await Promise.all([
          axios.get(`${baseURL}/api/videos`),
          axios.get(`${baseURL}/api/users`),
          axios.get(`${baseURL}/api/admin`),
        ]);

        setVideo(videosRes.data);
        setFil(videosRes.data);
        setUser(usersRes.data);
        setAdmin(adminRes.data);
      } catch (error) {
        console.error("❌ Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <UserContext.Provider
      value={{ video, setVideo, fil, setFil, user, setUser, admin }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
