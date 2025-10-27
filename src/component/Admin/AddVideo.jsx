import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddVideo() {
  const { video, setVideo } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [views, setViews] = useState(0);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [categoryId, setCategoryId] = useState(1);
  const [comments, setComments] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    if (!title.trim() || !url.trim()) {
      alert("⚠️ Please provide both Title and URL.");
      return;
    }

    
    const newVideo = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      url: url.trim(),
      views: Number(views),
      likes: Number(likes),
      dislikes: Number(dislikes),
      category_id: Number(categoryId),
      comments: comments.trim(),
    };

    try {
      await axios.post("/api/videos", newVideo);
      setVideo([...video, newVideo]);
      alert("✅ Video added successfully!");
      navigate("/admin-dashboard");
    } catch (error) {
      console.error("Error adding video:", error);
      alert("Failed to add video. Please try again later.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="card p-4 shadow-lg rounded-4"
        style={{ width: "500px", border: "1px solid #ddd" }}
      >
        <h3 className="text-center mb-4 fw-bold">Add New Video</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter video title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Video URL</label>
            <input
              type="text"
              className="form-control"
              placeholder="Paste YouTube or video link"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Description</label>
            <textarea
              className="form-control"
              rows="3"
              placeholder="Write a short description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label fw-semibold">Views</label>
              <input
                type="number"
                className="form-control"
                value={views}
                onChange={(e) => setViews(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label fw-semibold">Likes</label>
              <input
                type="number"
                className="form-control"
                value={likes}
                onChange={(e) => setLikes(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label fw-semibold">Dislikes</label>
              <input
                type="number"
                className="form-control"
                value={dislikes}
                onChange={(e) => setDislikes(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-3 mt-3">
            <label className="form-label fw-semibold">Category ID</label>
            <input
              type="number"
              className="form-control"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Comments</label>
            <textarea
              className="form-control"
              rows="2"
              placeholder="Add comments..."
              value={comments}
              onChange={(e) => setComments(e.target.value)}
            ></textarea>
          </div>

          <div className="d-flex justify-content-between mt-4">
            <button type="submit" className="btn btn-success px-4">
              ➕ Add Video
            </button>
            <button
              type="button"
              className="btn btn-secondary px-4"
              onClick={() => navigate("/admin-dashboard")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddVideo;
