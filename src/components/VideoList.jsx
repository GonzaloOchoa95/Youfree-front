import React, { useContext, useState } from "react";
import { VideoContext } from "../context/VideoContext";

const VideoList = () => {
  const { videos } = useContext(VideoContext);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredVideos = videos.filter((video) =>
    video.filename.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="video-list-container">
      <h2>Lista de Videos</h2>
      <input
        type="text"
        placeholder="Buscar videos..."
        className="search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="video-list">
        {filteredVideos.length > 0 ? (
          filteredVideos.map((video, index) => (
            <div key={index} className="video-item">
              <video controls>
                <source src={video.url} type="video/mp4" />
              </video>
              <p>{video.filename}</p>
            </div>
          ))
        ) : (
          <p>No se encontraron videos</p>
        )}
      </div>
    </div>
  );
};

export default VideoList;
