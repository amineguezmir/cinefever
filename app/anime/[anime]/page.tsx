import Image from "next/image";
import { getAnimeDetails } from "@/lib/utils";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar, Star, Clock, Film, Play, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface AnimeDetailsPageProps {
  params: { anime: string };
}

export default async function AnimeDetailsPage({
  params,
}: AnimeDetailsPageProps) {
  const animeId = params.anime;
  const anime = await getAnimeDetails(animeId);

  if (!anime) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative h-[80vh] w-full">
        <div className="absolute inset-0 z-0">
          <Image
            src={
              anime.backdrop_path
                ? `https://image.tmdb.org/t/p/original${anime.backdrop_path}`
                : anime.poster_path
                ? `https://image.tmdb.org/t/p/original${anime.poster_path}`
                : "/placeholder.jpg"
            }
            alt={anime.name}
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/20" />
        </div>

        <div className="absolute inset-0 z-10 flex items-end">
          <div className="container mx-auto px-4 pb-16">
            <div className="flex flex-col md:flex-row gap-8 items-end">
              <div className="relative mt-8 md:mt-0">
                <div className="absolute -inset-1 bg-gradient-to-br from-rose-600 to-violet-500 rounded-xl blur-md opacity-70"></div>
                <Image
                  src={
                    anime.poster_path
                      ? `https://image.tmdb.org/t/p/w500${anime.poster_path}`
                      : "/placeholder.jpg"
                  }
                  alt={anime.name}
                  width={300}
                  height={450}
                  className="relative rounded-xl shadow-2xl border border-white/10 transform transition-transform duration-500 hover:scale-105"
                />
              </div>

              <div className="flex-1 space-y-6">
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                  {anime.name}
                </h1>

                <div className="flex flex-wrap items-center gap-3">
                  {anime.vote_average && (
                    <Badge className="bg-rose-500/90 hover:bg-rose-500 text-white px-3 py-1 text-sm font-medium flex items-center gap-1">
                      <Star className="h-4 w-4" />
                      <span className="font-bold">
                        {(anime.vote_average / 2).toFixed(1)}
                      </span>
                    </Badge>
                  )}

                  {anime.genres?.slice(0, 3).map((genre) => (
                    <Badge
                      key={genre.id}
                      variant="outline"
                      className="border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20"
                    >
                      {genre.name}
                    </Badge>
                  ))}

                  {anime.first_air_date && (
                    <Badge
                      variant="outline"
                      className="border-white/30 bg-white/10 backdrop-blur-sm flex items-center gap-1"
                    >
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{anime.first_air_date}</span>
                    </Badge>
                  )}
                </div>

                <p className="text-lg text-gray-300 max-w-3xl leading-relaxed">
                  {anime.overview || "No description available."}
                </p>

                <div className="pt-4 flex gap-4">
                  <Button className="bg-gradient-to-r from-rose-600 to-violet-500 hover:from-rose-700 hover:to-violet-600 text-white rounded-full px-8 py-6 text-lg font-medium">
                    <Play className="mr-2 h-5 w-5 fill-white" /> Watch Now
                  </Button>
                  <Button
                    variant="outline"
                    className="border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full px-8 py-6 text-lg font-medium"
                  >
                    <Plus className="mr-2 h-5 w-5" /> My List
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {anime.seasons?.length > 0 && (
        <div className="relative bg-gradient-to-b from-black to-gray-900 py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold flex items-center gap-3 text-white">
                <Film className="h-7 w-7 text-rose-500" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-violet-400">
                  Seasons
                </span>
              </h2>
              <Badge className="bg-white/10 backdrop-blur-sm text-white px-4 py-1.5 text-base">
                {anime.seasons.length}{" "}
                {anime.seasons.length === 1 ? "Season" : "Seasons"}
              </Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {anime.seasons.map((season) => (
                <Link
                  key={season.id}
                  href={`/anime/${anime.id}/episodes/${season.season_number}`}
                  className="group block"
                >
                  <div className="relative overflow-hidden rounded-xl bg-gray-800 transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(244,114,182,0.5)] group-hover:scale-[1.03]">
                    <div className="aspect-[2/3] relative overflow-hidden">
                      <Image
                        src={
                          season.poster_path
                            ? `https://image.tmdb.org/t/p/w500${season.poster_path}`
                            : anime.poster_path
                            ? `https://image.tmdb.org/t/p/w500${anime.poster_path}`
                            : "/placeholder.jpg"
                        }
                        alt={season.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="rounded-full bg-rose-600/80 p-4 backdrop-blur-sm">
                          <Play className="h-8 w-8 fill-white" />
                        </div>
                      </div>
                    </div>

                    <div className="p-5 space-y-3">
                      <h3 className="text-xl font-bold text-white group-hover:text-rose-400 transition-colors duration-300">
                        {season.name}
                      </h3>

                      <div className="flex items-center gap-4 text-gray-400">
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-4 w-4 text-rose-400" />
                          <span>{season.episode_count} Episodes</span>
                        </div>

                        {season.air_date && (
                          <div className="flex items-center gap-1.5">
                            <Calendar className="h-4 w-4 text-violet-400" />
                            <span>{season.air_date}</span>
                          </div>
                        )}
                      </div>

                      {season.overview && (
                        <p className="text-sm text-gray-400 line-clamp-2 group-hover:text-gray-300 transition-colors duration-300">
                          {season.overview}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
