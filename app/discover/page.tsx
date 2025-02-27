"use client";

import { useState, useEffect } from "react";
import { MovieCard } from "@/components/movie-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
// import { toast } from "@/components/ui/use-toast"

const genres = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 18, name: "Drama" },
  { id: 27, name: "Horror" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 53, name: "Thriller" },
];

const years = Array.from({ length: 25 }, (_, i) => 2024 - i);

export default function DiscoverPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const query = searchParams.get("query") || "";
    const genre = searchParams.get("genre") || "";
    const year = searchParams.get("year") || "";
    setSearchQuery(query);
    setSelectedGenre(genre);
    setSelectedYear(year);
    handleSearch(query, genre, year, 1);
  }, [searchParams]);

  const handleSearch = async (
    query: string,
    genre: string,
    year: string,
    page: number
  ) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (query) params.set("query", query);
      if (genre) params.set("genre", genre);
      if (year) params.set("year", year);
      params.set("page", page.toString());

      const response = await fetch(`/api/movies/search?${params.toString()}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setMovies(page === 1 ? data : [...movies, ...data]);
      setPage(page);
      router.push(`/discover?${params.toString()}`);
    } catch (error) {
      console.error("Failed to search movies:", error);
      // toast({
      //   title: "Error",
      //   description: "Failed to search movies. Please try again.",
      //   variant: "destructive",
      // })
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    handleSearch(searchQuery, selectedGenre, selectedYear, page + 1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Discover Movies</h1>
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <Input
          placeholder="Search movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-grow"
        />
        <Select value={selectedGenre} onValueChange={setSelectedGenre}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Genre" />
          </SelectTrigger>
          <SelectContent>
            {genres.map((genre) => (
              <SelectItem key={genre.id} value={genre.id.toString()}>
                {genre.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedYear} onValueChange={setSelectedYear}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent>
            {years.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          onClick={() =>
            handleSearch(searchQuery, selectedGenre, selectedYear, 1)
          }
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </Button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {movies.map((movie: any) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            posterPath={movie.poster_path}
            rating={movie.vote_average}
            year={new Date(movie.release_date).getFullYear()}
            overview={movie.overview}
          />
        ))}
      </div>
      {movies.length > 0 && (
        <div className="mt-8 flex justify-center">
          <Button onClick={loadMore} disabled={loading}>
            {loading ? "Loading..." : "Load More"}
          </Button>
        </div>
      )}
    </div>
  );
}
