import Link from "next/link";
import Image from "next/image";
import { MovieCard } from "@/components/movie-card";
import { TVShowCard } from "@/components/card-tvshow";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Calendar, Clock } from "lucide-react";
import { TunisianTVShowsSection } from "@/components/tunisian-tv-shows-section";

async function getMovies(endpoint: string) {
  const accessToken = process.env.TMDB_ACCESS_TOKEN;
  if (!accessToken) {
    throw new Error("TMDB_ACCESS_TOKEN is not set in environment variables");
  }

  const res = await fetch(`https://api.themoviedb.org/3${endpoint}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      accept: "application/json",
    },
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    console.error(`HTTP error! status: ${res.status}`);
    return [];
  }

  const data = await res.json();
  return data.results || [];
}

async function getTVShows(endpoint: string) {
  const accessToken = process.env.TMDB_ACCESS_TOKEN;
  if (!accessToken) {
    throw new Error("TMDB_ACCESS_TOKEN is not set in environment variables");
  }

  const res = await fetch(`https://api.themoviedb.org/3${endpoint}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      accept: "application/json",
    },
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    console.error(`HTTP error! status: ${res.status}`);
    return [];
  }

  const data = await res.json();
  return data.results || [];
}

function FeaturedMovie({ movie }: { movie: any }) {
  return (
    <Card className="relative w-full h-[70vh] overflow-hidden rounded-xl group">
      <Image
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        alt={movie.title}
        fill
        className="object-cover transition-all duration-700 ease-in-out transform group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      <CardContent className="absolute bottom-0 left-0 p-8 text-white w-full transition-all duration-300 ease-in-out transform translate-y-4 group-hover:translate-y-0">
        <h2 className="text-5xl font-bold mb-4 drop-shadow-lg">
          {movie.title}
        </h2>
        <p className="text-lg mb-6 line-clamp-2 max-w-2xl drop-shadow-md">
          {movie.overview}
        </p>
        <div className="flex items-center gap-6 mb-6">
          <div className="flex items-center">
            <Star className="w-5 h-5 text-yellow-400 mr-1" />
            <span>{movie.vote_average.toFixed(1)}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="w-5 h-5 mr-1" />
            <span>{new Date(movie.release_date).getFullYear()}</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-5 h-5 mr-1" />
            <span>{movie.runtime || 120} min</span>
          </div>
        </div>
        <Button
          asChild
          size="lg"
          className="transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          <Link href={`/movie/${movie.id}`}>Watch Now</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

function MovieSection({
  title,
  movies,
  category,
}: {
  title: string;
  movies: any[];
  category: string;
}) {
  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
        <Button variant="link" className="text-blue-500 text-lg" asChild>
          <Link href={`/movies?category=${category}`}>See All</Link>
        </Button>
      </div>
      <div className="relative">
        <Carousel className="w-full">
          <CarouselContent className="flex">
            {movies.slice(0, 10).map((movie: any) => (
              <CarouselItem
                key={movie.id}
                className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
              >
                <MovieCard
                  id={movie.id}
                  title={movie.title}
                  posterPath={movie.poster_path}
                  rating={movie.vote_average}
                  year={new Date(movie.release_date).getFullYear()}
                  overview={movie.overview}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white" />
        </Carousel>
      </div>
    </section>
  );
}

function TVShowSection({
  title,
  tvShows,
  category,
}: {
  title: string;
  tvShows: any[];
  category: string;
}) {
  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
        <Button variant="link" className="text-blue-500 text-lg" asChild>
          <Link href={`/tv?category=${category}`}>See All</Link>
        </Button>
      </div>
      <div className="relative">
        <Carousel className="w-full">
          <CarouselContent className="flex">
            {tvShows.slice(0, 10).map((tvShow: any) => (
              <CarouselItem
                key={tvShow.id}
                className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
              >
                <TVShowCard
                  id={tvShow.id}
                  title={tvShow.name}
                  posterPath={tvShow.poster_path}
                  rating={tvShow.vote_average}
                  year={new Date(tvShow.first_air_date).getFullYear()}
                  overview={tvShow.overview}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white" />
        </Carousel>
      </div>
    </section>
  );
}

export default async function Home() {
  const [trendingMovies, topRatedMovies, upcomingMovies, topRatedTVShows] =
    await Promise.all([
      getMovies("/trending/movie/day"),
      getMovies("/movie/top_rated?language=en-US&page=1"),
      getMovies("/movie/upcoming?language=en-US&page=1"),
      getTVShows("/tv/top_rated?language=en-US&page=1"),
    ]);

  return (
    <div className="flex-1 space-y-12 p-8 pt-6">
      <Carousel className="mb-12 -mx-8">
        <CarouselContent>
          {trendingMovies.slice(0, 5).map((movie: any) => (
            <CarouselItem key={movie.id}>
              <div className="p-1">
                <FeaturedMovie movie={movie} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white" />
      </Carousel>

      <Separator />

      <MovieSection
        title="Trending Now"
        movies={trendingMovies}
        category="trending"
      />
      <Separator />
      <MovieSection
        title="Top Rated"
        movies={topRatedMovies}
        category="top-rated"
      />
      <Separator />
      <MovieSection
        title="Coming Soon"
        movies={upcomingMovies}
        category="upcoming"
      />
      <Separator />
      <TVShowSection
        title="Top Rated TV Shows"
        tvShows={topRatedTVShows}
        category="top-rated"
      />
    </div>
  );
}
