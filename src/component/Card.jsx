import React from 'react'

function Card({video}) {
  return (
    <div className="col-12 col-md-4 col-lg-3 mb-2 ">
      <div className="card">
        <iframe
          className="card-img-top"
          width="100%"
          height="180"
          src={video.url}
          title={video.title}
        ></iframe>

        <div className="card-body">
          <h5 className="card-title">{video.title}</h5>
        </div>
      </div>
    </div>
  );
}

export default Card