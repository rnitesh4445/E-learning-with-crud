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
    if (!title || !url) {
      alert("Please fill in the title and URL");
      return;
    }

    const newVideo = {
      id: Date.now().toString(),
      title,
      description,
      url,
      views: Number(views),
      likes: Number(likes),
      dislikes: Number(dislikes),
      category_id: Number(categoryId),
      comments,
    };

    try {
      await axios.post("http://localhost:3000/videos", newVideo);
      setVideo([...video, newVideo]);
      navigate("/admin-dashboard");
    } catch (error) {
      console.error("Error adding video:", error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow-sm" style={{ width: "500px" }}>
        <h3 className="text-center mb-4">Add New Video</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">URL</label>
            <input
              type="text"
              className="form-control"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label">Views</label>
              <input
                type="number"
                className="form-control"
                value={views}
                onChange={(e) => setViews(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Likes</label>
              <input
                type="number"
                className="form-control"
                value={likes}
                onChange={(e) => setLikes(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Dislikes</label>
              <input
                type="number"
                className="form-control"
                value={dislikes}
                onChange={(e) => setDislikes(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-3 mt-3">
            <label className="form-label">Category ID</label>
            <input
              type="number"
              className="form-control"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Comments</label>
            <textarea
              className="form-control"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
            ></textarea>
          </div>
          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-success">
              Add Video
            </button>
            <button
              type="button"
              className="btn btn-secondary"
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
