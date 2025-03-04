import { getTVSeasonEpisodes } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, Play, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default async function SeasonPage({
  params,
}: {
  params: { id: string; season: string };
}) {
  const { episodes, seasonDetails } = await getTVSeasonEpisodes(
    params.id,
    params.season
  );

  const getWatchUrl = (episodeNumber: number): string => {
    const episodeUrls: Record<number, string> = {
      1: "https://vkvideo.ru/video890230561_456256271",
      2: "https://vkvideo.ru/video-225093482_456239045",
      3: "https://vkvideo.ru/video890230561_456257085",
    };
    return episodeUrls[episodeNumber] || "#";
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative h-[40vh]">
        <div className="absolute inset-0 z-0">
          <Image
            src={
              seasonDetails.poster_path ||
              episodes[0]?.still_path ||
              "/placeholder.svg?height=400&width=600"
            }
            alt={seasonDetails.name || `Season ${params.season}`}
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-black/40" />
        </div>

        <div className="absolute inset-0 z-10">
          <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-8">
            <Link
              href={`/tv/${params.id}`}
              className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-4 group"
            >
              <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
              Back to Show
            </Link>

            <div className="flex items-end gap-6">
              {seasonDetails.poster_path && (
                <div className="hidden md:block relative">
                  <div className="absolute -inset-1 bg-gradient-to-br from-purple-600 to-blue-500 rounded-xl blur-md opacity-70" />
                  <Image
                    src={seasonDetails.poster_path || "/placeholder.svg"}
                    alt={seasonDetails.name || `Season ${params.season}`}
                    width={200}
                    height={300}
                    className="relative rounded-xl border border-white/10"
                  />
                </div>
              )}

              <div className="flex-1">
                <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                  {seasonDetails.name || `Season ${params.season}`}
                </h1>

                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <Badge className="bg-purple-600/90 hover:bg-purple-600 px-3 py-1">
                    {episodes.length} Episodes
                  </Badge>
                  {seasonDetails.air_date && (
                    <Badge
                      variant="outline"
                      className="border-white/30 bg-white/10 backdrop-blur-sm"
                    >
                      <Calendar className="h-3.5 w-3.5 mr-1" />
                      {seasonDetails.air_date}
                    </Badge>
                  )}
                </div>

                {seasonDetails.overview && (
                  <p className="text-gray-300 max-w-3xl leading-relaxed line-clamp-3">
                    {seasonDetails.overview}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {params.id === "285435" && (
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Watch Episodes Now
          </h2>
          <div className="flex justify-center gap-4">
            <a
              href={getWatchUrl(1)}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-purple-600 hover:bg-purple-500 text-white py-3 px-6 rounded-lg transition-all duration-300"
            >
              Watch Episode 1
            </a>
            <a
              href={getWatchUrl(2)}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-purple-600 hover:bg-purple-500 text-white py-3 px-6 rounded-lg transition-all duration-300"
            >
              Watch Episode 2
            </a>
            <a
              href={getWatchUrl(3)}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-purple-600 hover:bg-purple-500 text-white py-3 px-6 rounded-lg transition-all duration-300"
            >
              Watch Episode 3
            </a>
          </div>
        </div>
      )}

      <div className="relative bg-gradient-to-b from-black to-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {episodes.map((episode) => (
              <Link
                key={episode.id}
                href={`/tv/${params.id}/season/${params.season}/episode/${episode.episode_number}`}
                className="group"
              >
                <div className="relative bg-gray-800/50 rounded-xl overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] group-hover:scale-[1.02]">
                  <div className="relative aspect-video">
                    <Image
                      src={
                        episode.still_path ||
                        "/placeholder.svg?height=250&width=400"
                      }
                      alt={episode.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent opacity-60" />

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="rounded-full bg-purple-600/80 p-4 backdrop-blur-sm transform group-hover:scale-110 transition-transform duration-500">
                        <Play className="h-8 w-8 fill-white" />
                      </div>
                    </div>

                    <div className="absolute top-4 left-4">
                      <Badge className="bg-black/50 backdrop-blur-sm border-white/10">
                        Episode {episode.episode_number}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-bold group-hover:text-purple-400 transition-colors duration-300">
                          {episode.name}
                        </h3>

                        <div className="flex flex-wrap items-center gap-3 mt-2 text-gray-400">
                          {episode.air_date && (
                            <div className="flex items-center gap-1.5">
                              <Calendar className="h-4 w-4 text-purple-400" />
                              <span>{episode.air_date}</span>
                            </div>
                          )}
                          {episode.runtime && (
                            <div className="flex items-center gap-1.5">
                              <Clock className="h-4 w-4 text-blue-400" />
                              <span>{episode.runtime}min</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {episode.overview && (
                      <p className="mt-3 text-sm text-gray-400 line-clamp-2 group-hover:text-gray-300 transition-colors duration-300">
                        {episode.overview}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
