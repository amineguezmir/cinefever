"use client";

import { useState, useEffect } from "react";
import { Search, Loader2, Film, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { MovieCard } from "@/components/movie-card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

export function SearchCommand() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setMovies([]);
      return;
    }

    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/movies/search?query=${searchQuery}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMovies(data);
      } catch (error: any) {
        console.error("Failed to search movies:", error);
        setError("Failed to search movies. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(() => {
      fetchMovies();
    }, 500);

    return () => clearTimeout(debounce);
  }, [searchQuery]);

  const clearSearch = () => {
    setSearchQuery("");
    setMovies([]);
  };

  return (
    <div className="relative w-full max-w-[600px] mx-auto p-4">
      <div className="relative group">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin text-primary" />
          ) : (
            <Search className="h-4 w-4" />
          )}
        </div>
        <Input
          placeholder="Search your favorite Movies or Tv Shows..."
          className="w-full pl-9 pr-12 bg-background/80 backdrop-blur-sm border-primary/20 focus-visible:ring-primary/30 focus-visible:border-primary/50 transition-all duration-200 h-11 rounded-xl"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 rounded-full p-0 text-muted-foreground hover:text-foreground"
              onClick={clearSearch}
            >
              <X className="h-3 w-3" />
              <span className="sr-only">Clear search</span>
            </Button>
          )}
          <kbd className="hidden md:inline-flex items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-70">
            <span className="text-xs">⌘</span>K
          </kbd>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="mt-4 p-4 bg-destructive/90 backdrop-blur-sm text-destructive-foreground rounded-lg shadow-lg border border-destructive/20"
          >
            <p className="text-sm font-medium">{error}</p>
          </motion.div>
        )}

        {searchQuery && !loading && movies.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute left-0 w-full mt-2 bg-background/95 backdrop-blur-md p-4 rounded-xl shadow-xl border border-primary/10 max-h-[70vh] overflow-y-auto z-50"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center justify-between mb-3 px-1"
            >
              <div className="flex items-center gap-2">
                <Film className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-medium">Search Results</h3>
              </div>
              <p className="text-xs text-muted-foreground">
                {movies.length} movies found
              </p>
            </motion.div>

            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              exit="exit"
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {movies.map((movie: any, index: number) => (
                <motion.div
                  key={movie.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.5,
                        ease: "easeOut",
                      },
                    },
                    exit: {
                      opacity: 0,
                      y: 20,
                      transition: {
                        duration: 0.3,
                      },
                    },
                  }}
                >
                  <MovieCard
                    id={movie.id}
                    title={movie.title}
                    posterPath={movie.poster_path}
                    rating={movie.vote_average}
                    year={new Date(movie.release_date).getFullYear()}
                    overview={movie.overview}
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}

        {loading && searchQuery && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="absolute left-0 w-full mt-2 bg-background/95 backdrop-blur-md p-6 rounded-xl shadow-xl border border-primary/10"
          >
            <div className="flex flex-col items-center justify-center gap-2">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">
                Searching for movies...
              </p>
            </div>
          </motion.div>
        )}

        {searchQuery && !loading && movies.length === 0 && !error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="absolute left-0 w-full mt-2 bg-background/95 backdrop-blur-md p-6 rounded-xl shadow-xl border border-primary/10"
          >
            <div className="flex flex-col items-center justify-center gap-2">
              <p className="text-center text-muted-foreground">
                No movies found matching "{searchQuery}"
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={clearSearch}
                className="mt-2"
              >
                Clear search
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
