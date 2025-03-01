"use client";
import React, { useEffect, useState } from "react";

const VideoPlayer = ({ show, episode }: { show: string; episode: string }) => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideoUrl = async () => {
      try {
        const url = `http://localhost:3001/tvshows/${show}/${episode}`;
        console.log("Fetching video from URL:", url);
        setVideoUrl(url);
      } catch (error) {
        console.error("Error fetching video:", error);
      }
    };

    fetchVideoUrl();
  }, [show, episode]);

  if (!videoUrl) {
    return <div>Loading...</div>;
  }

  console.log("Video URL:", videoUrl);

  return (
    <div>
      <h2>
        {show} - Episode {episode}
      </h2>
      <video controls width="100%">
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
