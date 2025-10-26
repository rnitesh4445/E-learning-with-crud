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

  useEffect(() => {
    const vid = video.find((v) => v.id === id);
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
      try {
        await axios.put(`http://localhost:3000/videos/${id}`, values);
        alert("Video updated successfully!");
        navigate("/admin-dashboard");
      } catch (error) {
        console.error("Error updating video:", error);
        alert("Failed to update video.");
      }
    },
  });

  if (!selectedVideo)
    return <p className="text-center mt-4">Loading video...</p>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Edit Video</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            rows="3"
            value={formik.values.description}
            onChange={formik.handleChange}
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Video URL</label>
          <input
            type="text"
            className="form-control"
            name="url"
            value={formik.values.url}
            onChange={formik.handleChange}
          />
        </div>

        <div className="row">
          <div className="col-md-4 mb-3">
            <label className="form-label">Views</label>
            <input
              type="number"
              className="form-control"
              name="views"
              value={formik.values.views}
              onChange={formik.handleChange}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">Likes</label>
            <input
              type="number"
              className="form-control"
              name="likes"
              value={formik.values.likes}
              onChange={formik.handleChange}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">Dislikes</label>
            <input
              type="number"
              className="form-control"
              name="dislikes"
              value={formik.values.dislikes}
              onChange={formik.handleChange}
            />
          </div>
        </div>

        <button type="submit" className="btn btn-success">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default Edit_video;
