"use client";

import { useState, useEffect } from "react";
import { TvShowCard, type TvShow } from "../../components/tv-show-card";
import { ErrorBoundary } from "react-error-boundary";
import { Clock, MoonStar, Sparkles } from "lucide-react";

function ErrorFallback({ error }: { error: Error }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
    </div>
  );
}

export default function TvShows() {
  const [tvShows, setTvShows] = useState<TvShow[]>([]);
  const [timeRemaining, setTimeRemaining] = useState<string>("");

  useEffect(() => {
    async function fetchTvShows() {
      try {
        const response = await fetch("http://localhost:3001/api/tvshows");
        const data = await response.json();
        console.log("API Response:", data);
        return data;
      } catch (error) {
        console.error("Error fetching TV shows:", error);
        return [];
      }
    }

    fetchTvShows().then((shows) => {
      console.log("TV Shows before processing:", shows);

      const processedShows = shows.map((show) =>
        show.name.toLowerCase() === "alfetna"
          ? {
              ...createDefaultShow(),
              ...show,
              posterPath:
                "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-01%20131240-HYHjBolQ8bfdqAMaNOqFNOxbv8FGDY.png",
            }
          : show
      );

      console.log("TV Shows after processing:", processedShows);
      setTvShows(processedShows);
    });
  }, []);

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
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/10 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl" />
      <div className="absolute top-20 right-10 w-24 h-24 bg-indigo-500/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 py-8 relative">
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="flex items-center gap-3 mb-2">
            <MoonStar className="h-8 w-8 text-amber-500" />
            <h1 className="text-3xl font-bold md:text-4xl bg-gradient-to-r from-amber-500 to-amber-300 bg-clip-text text-transparent">
              Ramadan TV Specials
            </h1>
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

        {tvShows.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {tvShows.map((show: TvShow, index: number) => (
              <ErrorBoundary
                FallbackComponent={ErrorFallback}
                key={show.name || index}
              >
                <TvShowCard show={show} isRamadanSpecial={true} />
              </ErrorBoundary>
            ))}
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
    </div>
  );
}

function createDefaultShow(): Partial<TvShow> {
  return {
    name: "alfetna",
    posterPath:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-01%20131240-HYHjBolQ8bfdqAMaNOqFNOxbv8FGDY.png",
    rating: 8.7,
    year: 2025,
    status: "Tunisian series, not yet aired",
    director: "Sousen Al-Jamni",
    cast: [
      "Rim Al-Riahi",
      "Kawthar Al-Bardi",
      "Najla Ben Abdullah",
      "Mohamed Murad",
      "Mohamed Ali Ben Juma",
      "Aya Fatouh",
    ],
    description:
      "Through various social issues, the series explores the complexities of family relationships, inheritance conflicts, and the reasons that fueled the flames of revenge between members of the same family.",
    genres: ["Drama", "Social"],
  };
}
