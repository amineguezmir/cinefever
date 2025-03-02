"use client";
import { getTvShowPlayers } from "@/utils/players";
import { useState, useEffect } from "react";
import { Select, SelectItem, Card, Image, Skeleton } from "@nextui-org/react";
import { FaPlay } from "react-icons/fa6";
import IconButton from "@/components/ui/IconButton";

export default function EpisodePlayer({ tvShow, episode }) {
  const players = getTvShowPlayers(
    tvShow.id,
    episode.season_number,
    episode.episode_number
  );
  const [selectedSource, setSelectedSource] = useState(
    players?.[0]?.title || ""
  );
  const [playEpisode, setPlayEpisode] = useState(false);

  useEffect(() => {
    console.log("Selected source changed:", selectedSource);
  }, [selectedSource]);

  return (
    <section id="episode-player">
      {playEpisode ? (
        <div className="space-y-5">
          {players.map(
            ({ title, source }) =>
              selectedSource === title && (
                <Card key={title}>
                  <Skeleton className="absolute aspect-video size-full" />
                  <iframe
                    className="aspect-video size-full"
                    src={source}
                    allowFullScreen
                  />
                </Card>
              )
          )}
          <Select
            disallowEmptySelection
            selectionMode="single"
            size="sm"
            label="Selected Source"
            defaultSelectedKeys={[selectedSource]}
            selectedKeys={[selectedSource]}
            onChange={({ target }) => setSelectedSource(target.value)}
          >
            {players.map(({ title }) => (
              <SelectItem key={title} value={title}>
                {title}
              </SelectItem>
            ))}
          </Select>
        </div>
      ) : (
        <Card className="group aspect-video size-full relative">
          <Image
            isBlurred
            alt={episode.name}
            className="w-full h-full object-cover"
            src={`https://image.tmdb.org/t/p/w780/${episode.still_path}`}
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
          <IconButton
            icon={<FaPlay className="text-3xl text-white" />}
            radius="full"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 scale-125 group-hover:scale-150 transition-transform"
            color="default"
            size="lg"
            onPress={() => setPlayEpisode(true)}
            style={{
              width: "100px",
              height: "100px",
            }}
          />
        </Card>
      )}
    </section>
  );
}
