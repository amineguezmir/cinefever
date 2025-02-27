"use client";

import { useEffect, useRef } from "react";
import Plyr from "plyr";
import "plyr/dist/plyr.css";

interface VideoPlayerProps {
  videoSrc: string;
  posterSrc?: string;
}

export function VideoPlayer({ videoSrc, posterSrc }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      const player = new Plyr(videoRef.current, {
        controls: [
          "play-large",
          "play",
          "progress",
          "current-time",
          "mute",
          "volume",
          "captions",
          "settings",
          "pip",
          "airplay",
          "fullscreen",
        ],
      });

      return () => {
        player.destroy();
      };
    }
  }, []);

  return (
    <div className="w-full aspect-video">
      <video ref={videoRef} poster={posterSrc}>
        <source src={videoSrc} type="video/mp4" />
      </video>
    </div>
  );
}
