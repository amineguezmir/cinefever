import Image from "next/image";
import { notFound } from "next/navigation";
import { Star, Clock, Calendar } from "lucide-react";
import { MovieDetails } from "@/components/movie-details";
import { MovieCast } from "@/components/movie-cast";
import { MovieReviews } from "@/components/movie-reviews";
import { Button } from "@/components/ui/button";
import MoviePlayer from "@/app/movie/[id]/MoviePlayer";
import { WatchNowButton } from "./WatchNowButton";

async function getMovieDetails(id: string) {
  const accessToken = process.env.TMDB_ACCESS_TOKEN;
  if (!accessToken) {
    throw new Error("TMDB_ACCESS_TOKEN is not set in environment variables");
  }

  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?append_to_response=videos,credits,reviews,"watch/providers"`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        accept: "application/json",
      },
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) {
    notFound();
  }

  return res.json();
}

export default async function MoviePage({
  params,
}: {
  params: { id: string };
}) {
  const movie = await getMovieDetails(params.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            width={500}
            height={750}
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="md:w-2/3">
          <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center">
              <Star className="w-5 h-5 text-yellow-400 mr-1" />
              <span>{movie.vote_average.toFixed(1)}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-1" />
              <span>{movie.runtime} min</span>
            </div>
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-1" />
              <span>{new Date(movie.release_date).getFullYear()}</span>
            </div>
          </div>
          <p className="text-lg mb-4">{movie.overview}</p>
          <div className="flex gap-4 mb-8">
            <WatchNowButton />
            <Button variant="outline">Add to Watchlist</Button>
          </div>
          <MovieDetails movie={movie} />
        </div>
      </div>
      <MovieCast cast={movie.credits.cast} />
      <div id="movie-player">
        <MoviePlayer movie={movie} />
      </div>
      <MovieReviews reviews={movie.reviews.results} />
    </div>
  );
}
