import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserContextProvider from "./context/UserContextProvider";
import Header from "./Header";

import User_login from "./User/User_login";
import User_signup from "./User/User_reagister";
import User_dashboard from "./User_dashboard";
import Home from "../Home";
import Admin_login from "./Admin/Admin_login";
import Admin_dashboard from "./Admin/Admin_dashboard";
import Edit_video from "./Admin/Edit_video";
import DeleteVideo from "./Admin/DeleteVideo";
import AddVideo from "./Admin/AddVideo";

export function Index() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user-login" element={<User_login />} />
          <Route path="/admin-login" element={<Admin_login />} />
          <Route
            path="/user-dashboard"
            element={
              <>
                <Header /> <User_dashboard />
              </>
            }
          />
          <Route path="/sign-up" element={<User_signup />} />
          <Route path="/admin-dashboard" element={<Admin_dashboard />} />
          <Route
            path="/admin-dashboard/edit-video/:id"
            element={<Edit_video />}
          />
          <Route
            path="/admin-dashboard/delete-video/:id"
            element={<DeleteVideo />}
          />
          <Route
            path="/admin-dashboard/add-video"
            element={<AddVideo/>}
          />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}
