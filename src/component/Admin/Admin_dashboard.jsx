import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate, Outlet } from "react-router-dom";

function Admin_dashboard() {
  const { video } = useContext(UserContext);
  const navigate = useNavigate();

  const handleAddVideo = () => {
   navigate(`/admin-dashboard/add-video`);
  };

  const handleEdit = (id) => {
    navigate(`/admin-dashboard/edit-video/${id}`);
  };


  const handleDelete = (id) => {
navigate(`/admin-dashboard/delete-video/${id}`);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
        <h2 className="fw-bold mb-2 mb-md-0">Admin Dashboard</h2>
        <button
          className="btn btn-primary d-flex align-items-center"
          onClick={handleAddVideo}
        >
          <i className="bi bi-plus-circle me-2"></i> Add Video
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-primary text-center">
            <tr>
              <th style={{ minWidth: "120px" }}>Title</th>
              <th style={{ minWidth: "200px" }}>Video Preview</th>
              <th style={{ minWidth: "150px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {video.length > 0 ? (
              video.map((item, index) => (
                <tr key={item.id || index}>
                  <td
                    className="fw-semibold text-center text-truncate"
                    style={{ maxWidth: "150px" }}
                  >
                    {item.title || "Untitled"}
                  </td>
                  <td className="text-center">
                    <div
                      className="ratio ratio-16x9 mx-auto"
                      style={{ maxWidth: "250px" }}
                    >
                      <iframe
                        src={item.url}
                        title={item.title}
                    
                        allowFullScreen
                        className="rounded"
                      ></iframe>
                    </div>
                  </td>
                  <td className="text-center">
                    <div className="d-flex justify-content-center flex-wrap gap-2">
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => handleEdit(item.id)}
                      >
                        <i className="bi bi-pencil"></i> Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(item.id)}
                      >
                        <i className="bi bi-trash"></i> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center text-muted">
                  No videos uploaded yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    
    </div>
  );
}

export default Admin_dashboard;
