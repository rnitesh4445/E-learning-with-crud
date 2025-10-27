import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function DeleteVideo() {
  const { video, setVideo } = useContext(UserContext);
  const { id } = useParams();
  const navigate = useNavigate();

  
  const selectedVideo = video.find((v) => String(v.id) === id);


  const handleDelete = async () => {
    if (!selectedVideo) return;
    try {
    
      await axios.delete(`/api/videos/${id}`);

    
      setVideo((prev) => prev.filter((v) => String(v.id) !== id));

      
      navigate("/admin-dashboard");
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete video. Please try again.");
    }
  };

  
  const handleCancel = () => {
    navigate("/admin-dashboard");
  };


  if (!selectedVideo)
    return <p className="text-center mt-5">Video not found.</p>;

  return (
    <div className="delete-overlay d-flex align-items-center justify-content-center vh-100 bg-dark bg-opacity-50">
      <div
        className="card shadow-lg p-4"
        style={{ maxWidth: "500px", borderRadius: "15px" }}
      >
        <div className="ratio ratio-16x9 mb-3">
          <iframe
            src={selectedVideo?.url || ""}
            title={selectedVideo?.title || "Video Preview"}
            frameBorder="0"
            allowFullScreen
            className="rounded"
          ></iframe>
        </div>

        <h5 className="mb-3 text-center">
          Are you sure you want to delete{" "}
          <strong>"{selectedVideo.title}"</strong>?
        </h5>

        <div className="d-flex justify-content-between">
          <button className="btn btn-danger px-4" onClick={handleDelete}>
            <i className="bi bi-trash"></i> Delete
          </button>
          <button className="btn btn-secondary px-4" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteVideo;
