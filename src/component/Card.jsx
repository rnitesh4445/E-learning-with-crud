import React from "react";

function Card({ video }) {
  
  const embedUrl = video.url.replace("watch?v=", "embed/");

  return (
    <div className="col-12 col-md-4 col-lg-3 mb-3">
      <div className="card shadow-sm border-0">
        <iframe
          className="card-img-top"
          width="100%"
          height="180"
          src={embedUrl}
          title={video.title}
          allowFullScreen
          loading="lazy"
        ></iframe>

        <div className="card-body text-center">
          <h6 className="card-title text-truncate" title={video.title}>
            {video.title}
          </h6>
        </div>
      </div>
    </div>
  );
}

export default Card;
