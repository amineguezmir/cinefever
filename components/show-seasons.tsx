"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Play, Clock, CalendarDays } from "lucide-react";

interface Episode {
  number: number;
  title: string;
  description: string;
  duration: string;
  thumbnail: string;
}

interface Season {
  number: number;
  year: number;
  episodes: Episode[];
}

interface ShowSeasonsProps {
  seasons: Season[];
}

export default function ShowSeasons({ seasons }: ShowSeasonsProps) {
  const [selectedSeason, setSelectedSeason] = useState(
    seasons[0].number.toString()
  );

  return (
    <Tabs
      defaultValue={selectedSeason}
      onValueChange={setSelectedSeason}
      className="space-y-8"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Episodes</h2>
        <TabsList className="bg-white/10 p-1">
          {seasons.map((season) => (
            <TabsTrigger
              key={season.number}
              value={season.number.toString()}
              className="data-[state=active]:bg-red-600"
            >
              Season {season.number}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {seasons.map((season) => (
        <TabsContent
          key={season.number}
          value={season.number.toString()}
          className="mt-6 space-y-6"
        >
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-2xl font-bold">Season {season.number}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <CalendarDays className="h-4 w-4" />
                <span>{season.year}</span>
                <span>•</span>
                <span>{season.episodes.length} Episodes</span>
              </div>
            </div>
          </div>

          {season.episodes.length === 0 ? (
            <div className="relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-gray-900 to-black p-8 text-center">
              <div className="relative z-10 space-y-4">
                <h3 className="text-2xl font-bold">Coming Soon</h3>
                <p className="text-gray-400">
                  Season {season.number} is in production. Stay tuned for new
                  episodes!
                </p>
                <div className="mx-auto h-px w-24 bg-gradient-to-r from-transparent via-red-500 to-transparent" />
              </div>
              <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_120%,rgba(255,0,0,0.1),transparent)]" />
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {season.episodes.map((episode) => (
                <div
                  key={episode.number}
                  className="group relative overflow-hidden rounded-xl border border-white/10 bg-gray-900 transition-all hover:border-red-500/50"
                >
                  <div className="relative aspect-video">
                    <img
                      src={episode.thumbnail || "/placeholder.svg"}
                      alt={episode.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
                    <Button
                      size="icon"
                      className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600 opacity-0 transition-opacity hover:bg-red-700 group-hover:opacity-100"
                    >
                      <Play className="h-6 w-6 fill-white" />
                    </Button>
                  </div>
                  <div className="space-y-2 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-400">
                        Episode {episode.number}
                      </span>
                      <div className="flex items-center gap-1 text-sm text-gray-400">
                        <Clock className="h-3 w-3" />
                        <span>{episode.duration}</span>
                      </div>
                    </div>
                    <h4 className="font-medium">{episode.title}</h4>
                    <p className="line-clamp-2 text-sm text-gray-400">
                      {episode.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      ))}
    </Tabs>
  );
}
