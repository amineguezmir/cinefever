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
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
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
  const [totalPages, setTotalPages] = useState(100); // Default to a high number to ensure pagination works

  useEffect(() => {
    const query = searchParams.get("query") || "";
    const genre = searchParams.get("genre") || "";
    const year = searchParams.get("year") || "";
    const currentPage = Number.parseInt(searchParams.get("page") || "1", 10);
    setSearchQuery(query);
    setSelectedGenre(genre);
    setSelectedYear(year);
    setPage(currentPage);
    handleSearch(query, genre, year, currentPage);
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

      // Check if the API response has a results property (like TMDB API)
      if (data.results) {
        setMovies(data.results);
        // If we have total_pages in the response, use it
        if (data.total_pages) {
          setTotalPages(data.total_pages);
        }
        // If we have total_results, calculate total pages
        else if (data.total_results) {
          setTotalPages(Math.ceil(data.total_results / 20));
        }
        // If we have a full page of results (typically 20), assume there are more pages
        else if (data.results.length >= 20) {
          setTotalPages(Math.max(100, totalPages)); // Set a high number to ensure pagination works
        }
      } else {
        // If the API directly returns an array of movies
        setMovies(data);
        // If we have a full page of results (typically 20), assume there are more pages
        if (data.length >= 20) {
          setTotalPages(Math.max(100, totalPages)); // Set a high number to ensure pagination works
        }
      }

      setPage(page);

      // Use a different approach for navigation to ensure the page updates
      const url = `/discover?${params.toString()}`;
      router.push(url, { scroll: false });
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
// this code i put here just for testing 
// i'll delete later 
const handlePage2Change = (newPage:Number)=> {
  if (newPage < 1 || (newPage === page && !loading)) return 
  const params = new URLSearchParams()
  if (searchQuery) params.set("query", searchQuery)
    if (selectedGenre) params.set("genre", selectedGenre)
      if (selectedYear) paramas.set("year" , selectedYear)
        params.set("page", newPage.toString())


}

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || (newPage === page && !loading)) return;

    // Create URL params
    const params = new URLSearchParams();
    if (searchQuery) params.set("query", searchQuery);
    if (selectedGenre) params.set("genre", selectedGenre);
    if (selectedYear) params.set("year", selectedYear);
    params.set("page", newPage.toString());

    // Navigate to the new URL which will trigger the useEffect
    router.push(`/discover?${params.toString()}`);
  };

  // Generate pagination items with improved UI
  const renderPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 7; // Maximum number of page buttons to show

    // Always show first page
    items.push(
      <Button
        key="first"
        variant={page === 1 ? "default" : "outline"}
        size="sm"
        onClick={() => handlePageChange(1)}
        disabled={loading}
        className="h-9 w-9 p-0"
      >
        1
      </Button>
    );

    // Calculate range of pages to show
    let startPage = Math.max(2, page - 2);
    let endPage = Math.min(totalPages - 1, page + 2);

    // Adjust range if we're near the beginning
    if (page <= 4) {
      startPage = 2;
      endPage = Math.min(totalPages - 1, 6);
    }

    // Adjust range if we're near the end
    if (page >= totalPages - 3) {
      startPage = Math.max(2, totalPages - 5);
      endPage = totalPages - 1;
    }

    // Add ellipsis after first page if needed
    if (startPage > 2) {
      items.push(
        <span
          key="ellipsis-start"
          className="flex items-center justify-center h-9 w-9"
        >
          <MoreHorizontal className="h-4 w-4" />
        </span>
      );
    }

    // Add page numbers
    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <Button
          key={i}
          variant={page === i ? "default" : "outline"}
          size="sm"
          onClick={() => handlePageChange(i)}
          disabled={loading}
          className="h-9 w-9 p-0"
        >
          {i}
        </Button>
      );
    }

    // Add ellipsis before last page if needed
    if (endPage < totalPages - 1) {
      items.push(
        <span
          key="ellipsis-end"
          className="flex items-center justify-center h-9 w-9"
        >
          <MoreHorizontal className="h-4 w-4" />
        </span>
      );
    }

    // Always show last page if there's more than one page
    if (totalPages > 1) {
      items.push(
        <Button
          key="last"
          variant={page === totalPages ? "default" : "outline"}
          size="sm"
          onClick={() => handlePageChange(totalPages)}
          disabled={loading}
          className="h-9 w-9 p-0"
        >
          {totalPages}
        </Button>
      );
    }

    return items;
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
          <div className="flex items-center space-x-1 bg-background border rounded-lg p-1 shadow-sm">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1 || loading}
              className="h-9 w-9 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="hidden sm:flex space-x-1">
              {renderPaginationItems()}
            </div>

            <div className="sm:hidden flex items-center space-x-1">
              <span className="text-sm font-medium">
                Page {page} of {totalPages}
              </span>
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages || loading}
              className="h-9 w-9 p-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
