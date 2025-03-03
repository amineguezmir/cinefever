"use client";

import type React from "react";

import { useState, useEffect, useTransition } from "react";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Calendar,
  TrendingUp,
  Award,
  Tv,
  X,
  Loader2,
  Star,
  Filter,
} from "lucide-react";
import { getTVShowsByCategory, searchTVShows } from "../actions/tv-shows";
import { TVShowGridSkeleton } from "@/components/tv-show-skeleton";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

interface TVShow {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  first_air_date: string;
  overview: string;
  genre_ids: number[];
  origin_country: string[];
  original_language: string;
  popularity: number;
  status?: string;
  networks?: { id: number; name: string; logo_path: string }[];
}

interface TVShowsData {
  results: TVShow[];
  totalPages: number;
  totalResults: number;
  page: number;
}

const genreMap: { [key: number]: string } = {
  10759: "Action & Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  10762: "Kids",
  9648: "Mystery",
  10763: "News",
  10764: "Reality",
  10765: "Sci-Fi & Fantasy",
  10766: "Soap",
  10767: "Talk",
  10768: "War & Politics",
  37: "Western",
};

const currentYear = new Date().getFullYear();
const yearRange = [1900, currentYear];

export default function TVShowsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const category = searchParams.get("category") || "popular";
  const page = Number.parseInt(searchParams.get("page") || "1");
  const searchQuery = searchParams.get("search") || "";

  const [popularTVShows, setPopularTVShows] = useState<TVShowsData>({
    results: [],
    totalPages: 1,
    totalResults: 0,
    page: 1,
  });
  const [topRatedTVShows, setTopRatedTVShows] = useState<TVShowsData>({
    results: [],
    totalPages: 1,
    totalResults: 0,
    page: 1,
  });
  const [onAirTVShows, setOnAirTVShows] = useState<TVShowsData>({
    results: [],
    totalPages: 1,
    totalResults: 0,
    page: 1,
  });
  const [searchResults, setSearchResults] = useState<TVShowsData>({
    results: [],
    totalPages: 1,
    totalResults: 0,
    page: 1,
  });
  const [searchInputValue, setSearchInputValue] = useState(searchQuery);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [yearFilter, setYearFilter] = useState<number[]>(yearRange);
  const [ratingFilter, setRatingFilter] = useState<number[]>([0, 10]);

  const clearFilters = () => {
    setSelectedGenre("all");
    setYearFilter(yearRange);
    setRatingFilter([0, 10]);
  };

  useEffect(() => {
    const loadTVShows = async () => {
      setIsLoading(true);
      try {
        if (searchQuery) {
          const results = await searchTVShows(searchQuery, page);
          setSearchResults(results);
        } else {
          if (category === "popular" || !category) {
            const results = await getTVShowsByCategory("popular", page);
            setPopularTVShows(results);
          }
          if (category === "top_rated") {
            const results = await getTVShowsByCategory("top_rated", page);
            setTopRatedTVShows(results);
          }
          if (category === "on_the_air") {
            const results = await getTVShowsByCategory("on_the_air", page);
            setOnAirTVShows(results);
          }
        }
      } catch (error) {
        console.error("Error loading TV shows:", error);
      } finally {
        setIsLoading(false);
      }
    };

    startTransition(() => {
      loadTVShows();
    });
  }, [category, page, searchQuery]);

  const updateUrlParams = (params: {
    category?: string;
    page?: number;
    search?: string;
  }) => {
    const newParams = new URLSearchParams(searchParams.toString());

    if (params.category !== undefined) {
      newParams.set("category", params.category);
      newParams.set("page", "1");
    }

    if (params.page !== undefined) {
      newParams.set("page", params.page.toString());
    }

    if (params.search !== undefined) {
      if (params.search) {
        newParams.set("search", params.search);
        newParams.delete("category");
      } else {
        newParams.delete("search");
        if (!newParams.has("category")) {
          newParams.set("category", "popular");
        }
      }
      newParams.set("page", "1");
    }

    router.push(`${pathname}?${newParams.toString()}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateUrlParams({ search: searchInputValue });
  };

  const handleClearSearch = () => {
    setSearchInputValue("");
    updateUrlParams({ search: "" });
  };

  const getCurrentData = (): TVShowsData => {
    if (searchQuery) {
      return searchResults;
    }

    switch (category) {
      case "top_rated":
        return topRatedTVShows;
      case "on_the_air":
        return onAirTVShows;
      case "popular":
      default:
        return popularTVShows;
    }
  };

  const currentData = getCurrentData();

  const filteredData = {
    ...currentData,
    results: currentData.results.filter((show) => {
      const genreMatch = selectedGenre
        ? show.genre_ids.includes(Number(selectedGenre))
        : true;
      const yearMatch = show.first_air_date
        ? new Date(show.first_air_date).getFullYear() >= yearFilter[0] &&
          new Date(show.first_air_date).getFullYear() <= yearFilter[1]
        : true;
      const ratingMatch =
        show.vote_average >= ratingFilter[0] &&
        show.vote_average <= ratingFilter[1];
      return genreMatch && yearMatch && ratingMatch;
    }),
  };

  const getCategoryIcon = () => {
    switch (category) {
      case "top_rated":
        return <Award className="h-5 w-5 mr-2" />;
      case "on_the_air":
        return <Calendar className="h-5 w-5 mr-2" />;
      case "popular":
      default:
        return <TrendingUp className="h-5 w-5 mr-2" />;
    }
  };

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background rounded-xl p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center">
            <Tv className="h-8 w-8 mr-3 text-primary" />
            <h1 className="text-4xl font-bold">TV Shows</h1>
          </div>

          <form
            onSubmit={handleSearch}
            className="flex w-full md:w-auto md:max-w-md gap-2"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search TV shows..."
                className="pl-9 pr-9 py-6 bg-background/80 backdrop-blur-sm border-primary/20 focus-visible:ring-primary"
                value={searchInputValue}
                onChange={(e) => setSearchInputValue(e.target.value)}
              />
              {searchInputValue && (
                <button
                  type="button"
                  onClick={() => setSearchInputValue("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <Button
              type="submit"
              className="py-6 bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={isPending || !searchInputValue.trim()}
            >
              {isPending ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : null}
              Search
            </Button>
          </form>
        </div>
      </div>

      <div className="bg-card rounded-xl shadow-sm border border-border p-6">
        {searchQuery ? (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <h2 className="text-2xl font-semibold">
                  Search Results for "{searchQuery}"
                </h2>
                {currentData.totalResults > 0 && (
                  <Badge
                    variant="secondary"
                    className="ml-3 bg-secondary text-secondary-foreground"
                  >
                    {currentData.totalResults} results
                  </Badge>
                )}
              </div>
              <Button
                variant="outline"
                onClick={handleClearSearch}
                className="gap-2"
              >
                <X className="h-4 w-4" />
                Clear Search
              </Button>
            </div>

            {isLoading ? (
              <TVShowGridSkeleton />
            ) : (
              <TVShowGrid tvShows={filteredData.results} />
            )}
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <Tabs
                value={category}
                onValueChange={(value) => updateUrlParams({ category: value })}
                className="w-full"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    {getCategoryIcon()}
                    <h2 className="text-2xl font-semibold capitalize">
                      {category.replace("_", " ")} TV Shows
                    </h2>
                    {currentData.totalResults > 0 && (
                      <Badge
                        variant="secondary"
                        className="ml-3 bg-secondary text-secondary-foreground"
                      >
                        {currentData.totalResults} shows
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    <TabsList className="grid grid-cols-3 w-auto bg-muted">
                      <TabsTrigger value="popular" className="px-4">
                        <TrendingUp className="h-4 w-4 mr-2 md:mr-1" />
                        <span className="hidden md:inline">Popular</span>
                      </TabsTrigger>
                      <TabsTrigger value="top_rated" className="px-4">
                        <Award className="h-4 w-4 mr-2 md:mr-1" />
                        <span className="hidden md:inline">Top Rated</span>
                      </TabsTrigger>
                      <TabsTrigger value="on_the_air" className="px-4">
                        <Calendar className="h-4 w-4 mr-2 md:mr-1" />
                        <span className="hidden md:inline">On Air</span>
                      </TabsTrigger>
                    </TabsList>
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-border text-foreground hover:bg-accent hover:text-accent-foreground"
                        >
                          <Filter className="h-4 w-4 mr-2" />
                          Filters
                        </Button>
                      </SheetTrigger>
                      <SheetContent>
                        <SheetHeader>
                          <SheetTitle>Filter TV Shows</SheetTitle>
                          <SheetDescription>
                            Apply filters to refine your TV show selection.
                          </SheetDescription>
                        </SheetHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label htmlFor="genre">Genre</Label>
                            <Select
                              value={selectedGenre}
                              onValueChange={setSelectedGenre}
                            >
                              <SelectTrigger id="genre">
                                <SelectValue placeholder="Select genre" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="all">All Genres</SelectItem>
                                {Object.entries(genreMap).map(([id, name]) => (
                                  <SelectItem key={id} value={id}>
                                    {name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid gap-2">
                            <Label>Year Range</Label>
                            <Slider
                              min={yearRange[0]}
                              max={yearRange[1]}
                              step={1}
                              value={yearFilter}
                              onValueChange={setYearFilter}
                              className="mt-2"
                            />
                            <div className="flex justify-between text-sm text-muted-foreground mt-1">
                              <span>{yearFilter[0]}</span>
                              <span>{yearFilter[1]}</span>
                            </div>
                          </div>
                          <div className="grid gap-2">
                            <Label>Rating Range</Label>
                            <Slider
                              min={0}
                              max={10}
                              step={0.1}
                              value={ratingFilter}
                              onValueChange={setRatingFilter}
                              className="mt-2"
                            />
                            <div className="flex justify-between text-sm text-muted-foreground mt-1">
                              <span>{ratingFilter[0].toFixed(1)}</span>
                              <span>{ratingFilter[1].toFixed(1)}</span>
                            </div>
                          </div>
                          <Button
                            onClick={clearFilters}
                            variant="outline"
                            className="mt-4"
                          >
                            Clear Filters
                          </Button>
                        </div>
                      </SheetContent>
                    </Sheet>
                  </div>
                </div>

                <TabsContent value="popular">
                  {isLoading ? (
                    <TVShowGridSkeleton />
                  ) : (
                    <TVShowGrid tvShows={filteredData.results} />
                  )}
                </TabsContent>
                <TabsContent value="top_rated">
                  {isLoading ? (
                    <TVShowGridSkeleton />
                  ) : (
                    <TVShowGrid tvShows={filteredData.results} />
                  )}
                </TabsContent>
                <TabsContent value="on_the_air">
                  {isLoading ? (
                    <TVShowGridSkeleton />
                  ) : (
                    <TVShowGrid tvShows={filteredData.results} />
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        )}

        {filteredData.totalPages > 1 && !isLoading && (
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 pt-6 border-t">
            <div className="text-sm text-muted-foreground">
              Showing page {filteredData.page} of {filteredData.totalPages}
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => updateUrlParams({ page: 1 })}
                disabled={page <= 1 || isPending}
                className="hidden sm:flex"
              >
                First
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => updateUrlParams({ page: page - 1 })}
                disabled={page <= 1 || isPending}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>

              <div className="flex items-center gap-1 px-2">
                {Array.from(
                  { length: Math.min(5, filteredData.totalPages) },
                  (_, i) => {
                    let pageNum = page;
                    if (page <= 3) {
                      pageNum = i + 1;
                    } else if (page >= filteredData.totalPages - 2) {
                      pageNum = filteredData.totalPages - 4 + i;
                    } else {
                      pageNum = page - 2 + i;
                    }

                    if (pageNum > 0 && pageNum <= filteredData.totalPages) {
                      return (
                        <Button
                          key={i}
                          variant={pageNum === page ? "default" : "outline"}
                          size="icon"
                          className="w-8 h-8"
                          onClick={() => updateUrlParams({ page: pageNum })}
                          disabled={isPending}
                        >
                          {pageNum}
                        </Button>
                      );
                    }
                    return null;
                  }
                )}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => updateUrlParams({ page: page + 1 })}
                disabled={page >= filteredData.totalPages || isPending}
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  updateUrlParams({ page: filteredData.totalPages })
                }
                disabled={page >= filteredData.totalPages || isPending}
                className="hidden sm:flex"
              >
                Last
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function TVShowGrid({ tvShows }: { tvShows: TVShow[] }) {
  if (tvShows.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <Tv className="h-16 w-16 text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold mb-2">No TV shows found</h3>
        <p className="text-muted-foreground max-w-md">
          Try adjusting your search or browse through different categories
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
      {tvShows.map((show) => (
        <motion.div
          key={show.id}
          className="relative group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link href={`/tv/${show.id}`} className="block">
            <div className="relative aspect-[2/3] overflow-hidden rounded-lg bg-muted shadow-md transition-all duration-300 group-hover:shadow-xl">
              {show.poster_path ? (
                <Image
                  src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                  alt={show.name}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-purple-200">
                  <Tv className="h-16 w-16 text-purple-400" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h2 className="font-bold text-lg line-clamp-2 mb-1">
                  {show.name}
                </h2>
                <p className="text-sm line-clamp-2 text-purple-100">
                  {show.overview}
                </p>
              </div>
            </div>
          </Link>
          <div className="absolute top-2 left-2 flex flex-col gap-2">
            {show.vote_average > 0 && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge
                      variant="secondary"
                      className="bg-secondary/70 text-secondary-foreground backdrop-blur-sm flex items-center gap-1"
                    >
                      <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                      {show.vote_average.toFixed(1)}
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>User Rating</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            {show.first_air_date && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge
                      variant="secondary"
                      className="bg-purple-700/70 text-white backdrop-blur-sm"
                    >
                      {new Date(show.first_air_date).getFullYear()}
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>First Air Date</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          <div className="mt-2 flex flex-wrap gap-1">
            {show.genre_ids.slice(0, 2).map((genreId) => (
              <Badge
                key={genreId}
                variant="outline"
                className="text-xs border-border text-foreground"
              >
                {genreMap[genreId] || "Unknown"}
              </Badge>
            ))}
            {show.origin_country[0] && (
              <Badge
                variant="outline"
                className="text-xs border-border text-foreground"
              >
                {show.origin_country[0]}
              </Badge>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
