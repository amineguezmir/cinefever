"use client";

import type React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Play, Bookmark, MoonStar, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

export interface TvShow {
  name: string;
  episodes: any[];
  posterPath?: string;
  rating?: number;
  year?: number;
  status?: string;
  director?: string;
  cast?: string[];
  description?: string;
  genres?: string[];
}

interface TvShowCardProps {
  show: TvShow;
  className?: string;
  isRamadanSpecial?: boolean;
}

export function TvShowCard({
  show,
  className,
  isRamadanSpecial = true,
}: TvShowCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    console.log("Rendering TvShowCard for:", show.name);
    const bookmarkedShows = JSON.parse(
      localStorage.getItem("bookmarkedShows") || "[]"
    );
    setIsBookmarked(bookmarkedShows.some((s: TvShow) => s.name === show.name));
  }, [show.name]);

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();

    const bookmarkedShows = JSON.parse(
      localStorage.getItem("bookmarkedShows") || "[]"
    );

    if (isBookmarked) {
      const updatedBookmarks = bookmarkedShows.filter(
        (s: TvShow) => s.name !== show.name
      );
      localStorage.setItem("bookmarkedShows", JSON.stringify(updatedBookmarks));
    } else {
      localStorage.setItem(
        "bookmarkedShows",
        JSON.stringify([...bookmarkedShows, show])
      );
    }

    setIsBookmarked(!isBookmarked);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
      className={cn(className, "relative")}
    >
      {isRamadanSpecial && (
        <>
          <div className="absolute -top-3 -right-3 z-10">
            <div className="relative">
              <div className="absolute inset-0 bg-amber-500 rounded-full blur-md opacity-30 animate-pulse"></div>
              <Badge
                variant="outline"
                className="relative bg-gradient-to-r from-amber-600 to-amber-400 text-white border-0 px-3 py-1 rounded-full shadow-lg"
              >
                <MoonStar className="h-3.5 w-3.5 mr-1" />
                Ramadan Special
              </Badge>
            </div>
          </div>
          <div className="absolute -z-10 inset-0 bg-gradient-to-t from-amber-500/20 to-indigo-500/10 rounded-lg blur-xl opacity-30"></div>
        </>
      )}

      <Link
        href={`/tvshows/${show.name}`}
        className={cn(
          "group relative flex flex-col overflow-hidden rounded-lg shadow-lg",
          isRamadanSpecial
            ? "bg-gradient-to-br from-indigo-900/80 to-black/90 ring-1 ring-amber-500/30"
            : "bg-black/40"
        )}
      >
        <div className="relative aspect-[2/3] w-full overflow-hidden">
          <Image
            src={show.posterPath || "/placeholder.svg"}
            alt={show.name}
            fill
            className={cn(
              "object-cover transition-all duration-300 group-hover:scale-110",
              isRamadanSpecial
                ? "group-hover:brightness-75 group-hover:saturate-150"
                : "group-hover:brightness-50"
            )}
          />

          {isRamadanSpecial && (
            <div className="absolute inset-0 bg-gradient-to-t from-amber-900/40 to-transparent opacity-60"></div>
          )}

          <div className="absolute inset-0 flex flex-col justify-between p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="flex justify-between">
              <Badge
                variant={isRamadanSpecial ? "default" : "secondary"}
                className={cn(
                  "w-fit",
                  isRamadanSpecial &&
                    "bg-gradient-to-r from-amber-600 to-amber-400 border-0"
                )}
              >
                {isRamadanSpecial ? "Ramadan 2025" : "TV Series"}
              </Badge>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 rounded-full bg-black/50 hover:bg-black/70"
                onClick={handleBookmark}
              >
                <Bookmark
                  className={cn(
                    "h-4 w-4",
                    isBookmarked
                      ? "fill-amber-400 text-amber-400"
                      : "text-white"
                  )}
                />
              </Button>
            </div>
            <div className="space-y-2">
              <h3
                className={cn(
                  "text-lg font-bold text-white line-clamp-1",
                  isRamadanSpecial && "text-amber-200"
                )}
              >
                {show.name}
              </h3>
              {show.year && show.rating && (
                <div className="flex items-center gap-2 text-sm text-white/70">
                  <span>{show.year}</span>
                  <span>•</span>
                  <div className="flex items-center">
                    <Star
                      className={cn(
                        "mr-1 h-3.5 w-3.5",
                        isRamadanSpecial
                          ? "fill-amber-400 text-amber-400"
                          : "fill-yellow-400 text-yellow-400"
                      )}
                    />
                    {show.rating.toFixed(1)}
                  </div>
                </div>
              )}
              {show.description && (
                <p className="line-clamp-2 text-sm text-white/70">
                  {show.description}
                </p>
              )}

              {isRamadanSpecial ? (
                <div className="flex gap-2">
                  <Button
                    className="flex-1 gap-2 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 border-0"
                    size="sm"
                  >
                    <Play className="h-4 w-4" />
                    Watch
                  </Button>
                </div>
              ) : (
                <Button className="w-full gap-2" size="sm">
                  <Play className="h-4 w-4" />
                  Watch Now
                </Button>
              )}
            </div>
          </div>
        </div>

        {isRamadanSpecial && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
        )}
      </Link>
    </motion.div>
  );
}
