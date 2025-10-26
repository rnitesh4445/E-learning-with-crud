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
        const [videosRes, usersRes, adminRes] = await Promise.all([
          axios.get("http://localhost:3001/videos"),
          axios.get("http://localhost:3001/users"),
          axios.get("http://localhost:3001/admin"),
        ]);

        setVideo(videosRes.data);
        setFil(videosRes.data);
        setUser(usersRes.data);
        setAdmin(adminRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
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
