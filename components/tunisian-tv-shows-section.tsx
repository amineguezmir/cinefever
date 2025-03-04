"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ErrorBoundary } from "react-error-boundary";
import { Clock, MoonStar, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

function ErrorFallback({ error }: { error: Error }) {
  return (
    <div role="alert" className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
      <p className="font-medium">Something went wrong:</p>
      <pre className="text-red-500 mt-2 text-sm overflow-auto">
        {error.message}
      </pre>
    </div>
  );
}

interface TunisianTVShowsSectionProps {
  title: string;
  tvShows: any[];
  category: string;
}

export function TunisianTVShowsSection({
  title,
  tvShows,
  category,
}: TunisianTVShowsSectionProps) {
  const [timeRemaining, setTimeRemaining] = useState<string>("");

  // Sort the TV shows to show 2025 shows first
  const sortedTvShows = [...tvShows].sort((a, b) => {
    const yearA = new Date(a.first_air_date).getFullYear();
    const yearB = new Date(b.first_air_date).getFullYear();

    // Sort 2025 shows first
    if (yearA === 2025 && yearB !== 2025) return -1;
    if (yearA !== 2025 && yearB === 2025) return 1;

    // Then sort by most recent year
    return yearB - yearA;
  });

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const target = new Date();

      target.setHours(1, 0, 0, 0);

      if (now.getHours() >= 1) {
        target.setDate(target.getDate() + 1);
      }

      const diff = target.getTime() - now.getTime();

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    };

    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    setTimeRemaining(calculateTimeRemaining());

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative mb-12">
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/10 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl" />
      <div className="absolute top-20 right-10 w-24 h-24 bg-indigo-500/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 py-8 relative">
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="flex items-center gap-3 mb-2">
            <MoonStar className="h-8 w-8 text-amber-500" />
            <h2 className="text-3xl font-bold md:text-4xl bg-gradient-to-r from-amber-500 to-amber-300 bg-clip-text text-transparent">
              {title}
            </h2>
            <MoonStar className="h-8 w-8 text-amber-500" />
          </div>
          <p className="text-indigo-600 dark:text-indigo-300 max-w-2xl mx-auto">
            Discover the most anticipated shows of the holy month. Gather with
            family and enjoy these special Ramadan productions.
          </p>

          <div className="w-full max-w-md flex items-center my-6">
            <div className="flex-grow h-0.5 bg-gradient-to-r from-transparent via-amber-300 to-transparent"></div>
            <Sparkles className="mx-4 h-5 w-5 text-amber-500" />
            <div className="flex-grow h-0.5 bg-gradient-to-r from-transparent via-amber-300 to-transparent"></div>
          </div>
        </div>

        {sortedTvShows.length > 0 ? (
          <div className="relative">
            <Carousel className="w-full">
              <CarouselContent className="flex">
                {sortedTvShows.map((tvShow: any) => {
                  const year = new Date(tvShow.first_air_date).getFullYear();
                  const is2025 = year === 2025;

                  return (
                    <CarouselItem
                      key={tvShow.id}
                      className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 p-2"
                    >
                      <ErrorBoundary FallbackComponent={ErrorFallback}>
                        <div className="relative group">
                          <div className="absolute -top-3 -right-3 z-10">
                            <div className="relative">
                              <div className="absolute inset-0 bg-amber-500 rounded-full blur-md opacity-30 animate-pulse"></div>
                              <Badge
                                variant="outline"
                                className="relative bg-gradient-to-r from-amber-600 to-amber-400 text-white border-0 px-3 py-1 rounded-full shadow-lg"
                              >
                                <MoonStar className="h-3.5 w-3.5 mr-1" />
                                {is2025 ? "Ramadan 2025" : "Ramadan"}
                              </Badge>
                            </div>
                          </div>
                          <Link
                            href={`/tv/${tvShow.id}`}
                            className={`group relative flex flex-col overflow-hidden rounded-lg shadow-lg bg-gradient-to-br ${
                              is2025
                                ? "from-indigo-800/90 to-black/95 ring-2 ring-amber-500/50"
                                : "from-indigo-900/80 to-black/90 ring-1 ring-amber-500/30"
                            }`}
                          >
                            <div className="relative aspect-[2/3] w-full overflow-hidden">
                              <Image
                                src={
                                  tvShow.poster_path
                                    ? `https://image.tmdb.org/t/p/w500${tvShow.poster_path}`
                                    : "/placeholder.svg?height=450&width=300"
                                }
                                alt={tvShow.name}
                                fill
                                className="object-cover transition-all duration-300 group-hover:scale-110 group-hover:brightness-75 group-hover:saturate-150"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-amber-900/40 to-transparent opacity-60"></div>
                              <div className="absolute inset-0 flex flex-col justify-between p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                <div className="flex justify-between">
                                  <Badge
                                    className={`bg-gradient-to-r ${
                                      is2025
                                        ? "from-amber-500 to-amber-300"
                                        : "from-amber-600 to-amber-400"
                                    } border-0 w-fit`}
                                  >
                                    Ramadan {year}
                                  </Badge>
                                </div>
                                <div className="space-y-2">
                                  <h3 className="text-lg font-bold text-amber-200 line-clamp-1">
                                    {tvShow.name}
                                  </h3>
                                  <div className="flex items-center gap-2 text-sm text-white/70">
                                    <span>{year}</span>
                                    <span>•</span>
                                    <div className="flex items-center">
                                      <span className="mr-1 text-amber-400">
                                        ★
                                      </span>
                                      {tvShow.vote_average.toFixed(1)}
                                    </div>
                                  </div>
                                  <p className="line-clamp-2 text-sm text-white/70">
                                    {tvShow.overview}
                                  </p>
                                  <Button
                                    className={`w-full gap-2 bg-gradient-to-r ${
                                      is2025
                                        ? "from-amber-500 to-amber-400 hover:from-amber-600 hover:to-amber-500"
                                        : "from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600"
                                    } border-0`}
                                    size="sm"
                                  >
                                    Watch Now
                                  </Button>
                                </div>
                              </div>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
                            {is2025 && (
                              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
                            )}
                          </Link>
                        </div>
                      </ErrorBoundary>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-amber-500/20 hover:bg-amber-500/30 text-white" />
              <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-amber-500/20 hover:bg-amber-500/30 text-white" />
            </Carousel>
          </div>
        ) : (
          <div className="text-center py-12 bg-indigo-50 dark:bg-indigo-950/30 rounded-xl border border-indigo-100 dark:border-indigo-800/30">
            <MoonStar className="h-12 w-12 text-amber-500/50 mx-auto mb-4" />
            <p className="text-indigo-600 dark:text-indigo-300 mb-4">
              Ramadan TV shows will be added soon...
            </p>

            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-5 w-5 text-amber-500" />
                <p className="text-amber-500 font-medium">
                  Shows arriving at 1:00 AM
                </p>
              </div>

              <div className="bg-indigo-100 dark:bg-indigo-900/50 rounded-lg px-6 py-3 mt-2">
                <p className="font-mono text-2xl font-bold bg-gradient-to-r from-amber-500 to-indigo-500 bg-clip-text text-transparent">
                  {timeRemaining}
                </p>
                <p className="text-xs text-indigo-500 dark:text-indigo-300 mt-1">
                  hours : minutes : seconds
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-amber-300 to-transparent"></div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
