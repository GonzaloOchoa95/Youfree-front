import React, { createContext, useState } from "react";

// Crear contexto
export const VideoContext = createContext();

// Proveedor de contexto
export const VideoProvider = ({ children }) => {
  const [videos, setVideos] = useState([]);

  return (
    <VideoContext.Provider value={{ videos, setVideos }}>
      {children}
    </VideoContext.Provider>
  );
};
