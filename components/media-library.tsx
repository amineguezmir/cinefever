"use client";

import { useState, useEffect } from "react";
import { Film, Tv, Calendar, Clock, HardDrive, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMediaStore } from "@/lib/media-store";
import { formatDistanceToNow } from "@/lib/utils";
import type { Media } from "@/lib/media-store";

export default function MediaLibrary() {
  const { media = [], getMediaUrl } = useMediaStore();
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mediaUrl, setMediaUrl] = useState<string | null>(null);

  const mediaList = media || [];
  const movies = mediaList.filter((item) => item.type === "movie");
  const tvShows = mediaList.filter((item) => item.type === "tv");

  const handlePlayMedia = async (mediaItem: Media) => {
    try {
      if (getMediaUrl) {
        const url = await getMediaUrl(mediaItem.id);
        setSelectedMedia(mediaItem);
        setMediaUrl(url);
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Error getting media URL:", error);
    }
  };

  const closeDialog = () => {
    setSelectedMedia(null);
    setIsPlaying(false);
    if (mediaUrl) {
      URL.revokeObjectURL(mediaUrl);
      setMediaUrl(null);
    }
  };

  useEffect(() => {
    return () => {
      if (mediaUrl) {
        URL.revokeObjectURL(mediaUrl);
      }
    };
  }, [mediaUrl]);

  if (mediaList.length === 0) {
    return (
      <div className="mt-10 rounded-lg border border-gray-800 bg-gray-900 p-10 text-center">
        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-800">
          <HardDrive className="h-10 w-10 text-gray-400" />
        </div>
        <h3 className="mb-2 text-xl font-medium">Your library is empty</h3>
        <p className="text-gray-400">
          Upload your first movie or TV show to get started
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="all" className="w-full">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold">Your Media Library</h2>
          <TabsList className="bg-gray-800">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="movies">Movies</TabsTrigger>
            <TabsTrigger value="tvshows">TV Shows</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {mediaList.map((item) => (
              <MediaCard key={item.id} media={item} onPlay={handlePlayMedia} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="movies" className="mt-0">
          {movies.length === 0 ? (
            <p className="text-center text-gray-400">
              No movies in your library yet
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {movies.map((item) => (
                <MediaCard
                  key={item.id}
                  media={item}
                  onPlay={handlePlayMedia}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="tvshows" className="mt-0">
          {tvShows.length === 0 ? (
            <p className="text-center text-gray-400">
              No TV shows in your library yet
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {tvShows.map((item) => (
                <MediaCard
                  key={item.id}
                  media={item}
                  onPlay={handlePlayMedia}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {selectedMedia && (
        <Dialog open={!!selectedMedia} onOpenChange={closeDialog}>
          <DialogContent className="max-w-4xl bg-gray-900 p-0 text-white">
            <div className="relative aspect-video w-full">
              {isPlaying && mediaUrl ? (
                <video
                  src={mediaUrl}
                  controls
                  autoPlay
                  className="h-full w-full"
                  onEnded={() => setIsPlaying(false)}
                  onError={(e) => {
                    console.error("Video playback error:", e);
                    setIsPlaying(false);
                  }}
                />
              ) : (
                <div className="relative h-full w-full">
                  <img
                    src={selectedMedia.thumbnail || "/placeholder.svg"}
                    alt={selectedMedia.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <Button
                      onClick={async () => {
                        if (!mediaUrl) {
                          try {
                            const url = await getMediaUrl(selectedMedia.id);
                            setMediaUrl(url);
                          } catch (error) {
                            console.error("Error getting media URL:", error);
                            return;
                          }
                        }
                        setIsPlaying(true);
                      }}
                      className="h-16 w-16 rounded-full bg-red-600 hover:bg-red-700"
                    >
                      <Play className="h-8 w-8 fill-white" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
            <div className="p-6">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">
                  {selectedMedia.title}
                  {selectedMedia.type === "tv" &&
                    selectedMedia.season &&
                    selectedMedia.episode && (
                      <span className="ml-2 text-gray-400">
                        S{selectedMedia.season.toString().padStart(2, "0")}E
                        {selectedMedia.episode.toString().padStart(2, "0")}
                      </span>
                    )}
                </DialogTitle>
              </DialogHeader>
              <div className="mt-4 flex flex-wrap gap-4">
                <div className="flex items-center text-sm text-gray-400">
                  <Clock className="mr-1 h-4 w-4" />
                  {selectedMedia.duration}
                </div>
                <div className="flex items-center text-sm text-gray-400">
                  <HardDrive className="mr-1 h-4 w-4" />
                  {selectedMedia.fileSize}
                </div>
                <div className="flex items-center text-sm text-gray-400">
                  <Calendar className="mr-1 h-4 w-4" />
                  Added {formatDistanceToNow(new Date(selectedMedia.dateAdded))}
                </div>
                <div className="flex items-center text-sm text-gray-400">
                  {selectedMedia.type === "movie" ? (
                    <Film className="mr-1 h-4 w-4" />
                  ) : (
                    <Tv className="mr-1 h-4 w-4" />
                  )}
                  {selectedMedia.type === "movie" ? "Movie" : "TV Show"}
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-400">
                <p>Filename: {selectedMedia.fileName}</p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

interface MediaCardProps {
  media: Media;
  onPlay: (media: Media) => void;
}

function MediaCard({ media, onPlay }: MediaCardProps) {
  return (
    <div className="group overflow-hidden rounded-lg border border-gray-800 bg-gray-900 transition-all hover:border-gray-700">
      <div className="relative aspect-video overflow-hidden">
        <img
          src={media.thumbnail || "/placeholder.svg"}
          alt={media.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all group-hover:bg-black/50 group-hover:opacity-100">
          <Button
            onClick={() => onPlay(media)}
            className="h-12 w-12 rounded-full bg-red-600 hover:bg-red-700"
          >
            <Play className="h-6 w-6 fill-white" />
          </Button>
        </div>
        <div className="absolute right-2 top-2 rounded bg-black/70 px-2 py-1 text-xs font-medium">
          {media.duration}
        </div>
      </div>
      <div className="p-4">
        <h3 className="mb-1 line-clamp-1 font-medium">{media.title}</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center text-xs text-gray-400">
            {media.type === "movie" ? (
              <Film className="mr-1 h-3 w-3" />
            ) : (
              <Tv className="mr-1 h-3 w-3" />
            )}
            {media.type === "movie" ? (
              "Movie"
            ) : (
              <>
                TV Show • S{media.season?.toString().padStart(2, "0")}E
                {media.episode?.toString().padStart(2, "0")}
              </>
            )}
          </div>
          <div className="text-xs text-gray-400">{media.fileSize}</div>
        </div>
      </div>
    </div>
  );
}
