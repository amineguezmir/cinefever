import Image from "next/image";
import { getAnimeDetails, getTVSeasonEpisodes } from "@/lib/utils";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Play, Star, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface AnimeEpisodesPageProps {
  params: { anime: string; episodes: string };
}

export default async function AnimeEpisodesPage({
  params,
}: AnimeEpisodesPageProps) {
  const animeId = params.anime;
  const seasonNumber = params.episodes;

  const anime = await getAnimeDetails(animeId);
  if (!anime) {
    return notFound();
  }

  const { episodes, seasonDetails } = await getTVSeasonEpisodes(
    animeId,
    seasonNumber
  );

  if (!episodes || episodes.length === 0) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="relative h-[50vh] w-full">
        <div className="absolute inset-0 z-0">
          <Image
            src={
              seasonDetails.poster_path
                ? `https://image.tmdb.org/t/p/original${seasonDetails.poster_path}`
                : anime.backdrop_path
                ? `https://image.tmdb.org/t/p/original${anime.backdrop_path}`
                : "/placeholder.jpg"
            }
            alt={seasonDetails.name}
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/20" />
        </div>

        <div className="absolute inset-0 z-10 flex items-end">
          <div className="container mx-auto px-4 pb-8">
            <Link
              href={`/anime/${animeId}`}
              className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-6"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to {anime.name}
            </Link>

            <div className="flex flex-col md:flex-row gap-8 items-end">
              <div className="relative mt-8 md:mt-0 shrink-0">
                <div className="absolute -inset-1 bg-gradient-to-br from-rose-600 to-violet-500 rounded-xl blur-md opacity-70"></div>
                <Image
                  src={
                    seasonDetails.poster_path
                      ? `https://image.tmdb.org/t/p/w500${seasonDetails.poster_path}`
                      : "/placeholder.jpg"
                  }
                  alt={seasonDetails.name}
                  width={200}
                  height={300}
                  className="relative rounded-xl shadow-2xl border border-white/10"
                />
              </div>

              <div className="flex-1 space-y-4">
                <div>
                  <h2 className="text-lg text-gray-400 font-medium">
                    {anime.name}
                  </h2>
                  <h1 className="text-3xl md:text-4xl font-bold text-white">
                    {seasonDetails.name}
                  </h1>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <Badge className="bg-white/10 backdrop-blur-sm text-white px-3 py-1">
                    {episodes.length} Episodes
                  </Badge>
                  {seasonDetails.air_date && (
                    <Badge
                      variant="outline"
                      className="border-white/30 bg-white/10 backdrop-blur-sm flex items-center gap-1"
                    >
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{seasonDetails.air_date}</span>
                    </Badge>
                  )}
                </div>

                {seasonDetails.overview && (
                  <p className="text-gray-300 max-w-3xl">
                    {seasonDetails.overview}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative bg-gradient-to-b from-black to-gray-900 min-h-screen">
        <div className="container mx-auto px-4 py-12">
          <div className="grid gap-6">
            {episodes.map((episode, index) => (
              <div
                key={episode.id}
                className="group relative overflow-hidden rounded-xl bg-gray-800/50 hover:bg-gray-800/80 transition-colors duration-300"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="relative md:w-[300px] aspect-video md:aspect-[16/9]">
                    <Image
                      src={
                        episode.still_path
                          ? `https://image.tmdb.org/t/p/w500${episode.still_path}`
                          : seasonDetails.poster_path
                          ? `https://image.tmdb.org/t/p/w500${seasonDetails.poster_path}`
                          : "/placeholder.jpg"
                      }
                      alt={episode.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button className="rounded-full w-12 h-12 bg-rose-600/90 hover:bg-rose-600 text-white">
                        <Play className="h-6 w-6 fill-current" />
                      </Button>
                    </div>

                    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm rounded-md px-2 py-1">
                      <span className="text-sm font-medium">
                        Episode {episode.episode_number}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 p-6">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <h3 className="text-xl font-bold text-white group-hover:text-rose-400 transition-colors">
                        {episode.name}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        {episode.runtime && (
                          <div className="flex items-center gap-1.5">
                            <Clock className="h-4 w-4 text-rose-400" />
                            <span>{episode.runtime}min</span>
                          </div>
                        )}
                        {episode.vote_average > 0 && (
                          <div className="flex items-center gap-1.5">
                            <Star className="h-4 w-4 text-yellow-400" />
                            <span>{(episode.vote_average / 2).toFixed(1)}</span>
                          </div>
                        )}
                        {episode.air_date && (
                          <div className="flex items-center gap-1.5">
                            <Calendar className="h-4 w-4 text-violet-400" />
                            <span>{episode.air_date}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {episode.overview && (
                      <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                        {episode.overview}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
