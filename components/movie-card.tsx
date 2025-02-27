"use client";

import type React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Play, Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

type Movie = {
  id: number;
  title: string;
  posterPath: string;
  rating: number;
  year: number;
  overview?: string;
  genres?: string[];
};

interface MovieCardProps {
  id: number;
  title: string;
  posterPath: string;
  rating: number;
  year: number;
  overview?: string;
  genres?: string[];
  className?: string;
}

export function MovieCard({
  id,
  title,
  posterPath,
  rating,
  year,
  overview,
  genres = [],
  className,
}: MovieCardProps) {
  const { data: session } = useSession();
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    if (session?.user) {
      const currentWatchlist = getWatchlistFromStorage();
      const isMovieInWatchlist = currentWatchlist.some(
        (movie) => movie.id === id
      );
      setIsBookmarked(isMovieInWatchlist);
    }
  }, [session, id]);

  const getWatchlistFromStorage = (): Movie[] => {
    const storedSession = JSON.parse(localStorage.getItem("session") || "{}");
    if (!storedSession?.user?.email) return [];

    const watchlist = JSON.parse(
      localStorage.getItem(`${storedSession.user.email}_watchlist`) || "[]"
    );
    return watchlist;
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();

    if (!session?.user) return;

    const currentWatchlist = getWatchlistFromStorage();

    const isAlreadyInWatchlist = currentWatchlist.some(
      (movie) => movie.id === id
    );

    if (!isAlreadyInWatchlist) {
      const updatedWatchlist = [
        ...currentWatchlist,
        { id, title, posterPath, rating, year, overview },
      ];
      localStorage.setItem(
        `${session.user.email}_watchlist`,
        JSON.stringify(updatedWatchlist)
      );
      setIsBookmarked(true);
    } else {
      setIsBookmarked(true);
    }
  };

  return (
    <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
      <Link
        href={`/movie/${id}`}
        className={cn(
          "group relative flex flex-col overflow-hidden rounded-lg bg-black/40 shadow-lg",
          className
        )}
      >
        <div className="relative aspect-[2/3] w-full overflow-hidden">
          <Image
            src={`https://image.tmdb.org/t/p/w500${posterPath}`}
            alt={title}
            fill
            className="object-cover transition-all duration-300 group-hover:scale-110 group-hover:brightness-50"
          />
          <div className="absolute inset-0 flex flex-col justify-between p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="flex justify-between">
              <Badge variant="secondary" className="w-fit">
                Movie
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
                    isBookmarked ? "fill-primary text-primary" : "text-white"
                  )}
                />
              </Button>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white line-clamp-1">
                {title}
              </h3>
              <div className="flex items-center gap-2 text-sm text-white/70">
                <span>{year}</span>
                <span>•</span>
                <div className="flex items-center">
                  <Star className="mr-1 h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                  {rating.toFixed(1)}
                </div>
              </div>
              {overview && (
                <p className="line-clamp-2 text-sm text-white/70">{overview}</p>
              )}
              <Button className="w-full gap-2" size="sm">
                <Play className="h-4 w-4" />
                Play Now
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
