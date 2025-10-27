import React, { useEffect, useState, useContext } from "react";
import { useFormik } from "formik";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axios from "axios";

function Edit_video() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { video } = useContext(UserContext);
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Find the selected video when the component loads
  useEffect(() => {
    const vid = video.find((v) => String(v.id) === id);
    if (vid) setSelectedVideo(vid);
  }, [id, video]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: selectedVideo?.title || "",
      description: selectedVideo?.description || "",
      url: selectedVideo?.url || "",
      views: selectedVideo?.views || 0,
      likes: selectedVideo?.likes || 0,
      dislikes: selectedVideo?.dislikes || 0,
    },
    onSubmit: async (values) => {
      if (!values.title.trim() || !values.url.trim()) {
        alert("Title and URL cannot be empty!");
        return;
      }

      try {
        await axios.put(`/api/videos/${id}`, values);
        alert("✅ Video updated successfully!");
        navigate("/admin-dashboard");
      } catch (error) {
        console.error("❌ Error updating video:", error);
        alert("Failed to update video. Please try again later.");
      }
    },
  });

  if (!selectedVideo)
    return <p className="text-center mt-5">Loading video details...</p>;

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4 rounded-4">
        <h3 className="mb-4 text-center fw-bold">Edit Video</h3>

        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Title</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Description</label>
            <textarea
              className="form-control"
              name="description"
              rows="3"
              value={formik.values.description}
              onChange={formik.handleChange}
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Video URL</label>
            <input
              type="text"
              className="form-control"
              name="url"
              value={formik.values.url}
              onChange={formik.handleChange}
              required
            />
          </div>

          <div className="row">
            <div className="col-md-4 mb-3">
              <label className="form-label fw-semibold">Views</label>
              <input
                type="number"
                className="form-control"
                name="views"
                value={formik.values.views}
                onChange={formik.handleChange}
              />
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label fw-semibold">Likes</label>
              <input
                type="number"
                className="form-control"
                name="likes"
                value={formik.values.likes}
                onChange={formik.handleChange}
              />
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label fw-semibold">Dislikes</label>
              <input
                type="number"
                className="form-control"
                name="dislikes"
                value={formik.values.dislikes}
                onChange={formik.handleChange}
              />
            </div>
          </div>

          <div className="d-flex gap-3 justify-content-center mt-3">
            <button type="submit" className="btn btn-success px-4">
              💾 Save Changes
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

export default Edit_video;
