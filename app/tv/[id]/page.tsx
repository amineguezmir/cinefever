import { getTVShowDetails, getTVShowSeasons } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Star, Clock, Film, Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default async function TVShowDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const tvShow = await getTVShowDetails(params.id);
  const seasons = await getTVShowSeasons(params.id);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative h-[80vh] w-full">
        <div className="absolute inset-0 z-0">
          <Image
            src={`https://image.tmdb.org/t/p/original${
              tvShow.backdrop_path || tvShow.poster_path
            }`}
            alt={`${tvShow.name} backdrop`}
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
                <div className="absolute -inset-1 bg-gradient-to-br from-purple-600 to-blue-500 rounded-xl blur-md opacity-70"></div>
                <Image
                  src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
                  alt={tvShow.name}
                  width={300}
                  height={450}
                  className="relative rounded-xl shadow-2xl border border-white/10 transform transition-transform duration-500 hover:scale-105"
                />
              </div>

              <div className="flex-1 space-y-6">
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                  {tvShow.name}
                </h1>

                <div className="flex flex-wrap items-center gap-3">
                  <Badge className="bg-yellow-500/90 hover:bg-yellow-500 text-black px-3 py-1 text-sm font-medium flex items-center gap-1">
                    <Star className="h-4 w-4 fill-black" />
                    <span className="font-bold">
                      {tvShow.vote_average.toFixed(1)}
                    </span>
                  </Badge>

                  {tvShow.genres
                    ?.slice(0, 3)
                    .map((genre: { id: number; name: string }) => (
                      <Badge
                        key={genre.id}
                        variant="outline"
                        className="border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20"
                      >
                        {genre.name}
                      </Badge>
                    ))}

                  <Badge
                    variant="outline"
                    className="border-white/30 bg-white/10 backdrop-blur-sm flex items-center gap-1"
                  >
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{tvShow.first_air_date}</span>
                  </Badge>
                </div>

                <p className="text-lg text-gray-300 max-w-3xl leading-relaxed">
                  {tvShow.overview}
                </p>

                <div className="pt-4 flex gap-4">
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white rounded-full px-8 py-6 text-lg font-medium">
                    <Play className="mr-2 h-5 w-5 fill-white" /> Watch Now
                  </Button>
                  <Button
                    variant="outline"
                    className="border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full px-8 py-6 text-lg font-medium"
                  >
                    + My List
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative bg-gradient-to-b from-black to-gray-900 py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold flex items-center gap-3 text-white">
              <Film className="h-7 w-7 text-purple-500" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                Seasons
              </span>
            </h2>
            <Badge className="bg-white/10 backdrop-blur-sm text-white px-4 py-1.5 text-base">
              {seasons.length} {seasons.length === 1 ? "Season" : "Seasons"}
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {seasons.map((season) => (
              <Link
                key={season.id}
                href={`/tv/${params.id}/season/${season.season_number}`}
                className="group block"
              >
                <div className="relative overflow-hidden rounded-xl bg-gray-800 transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] group-hover:scale-[1.03]">
                  <div className="aspect-[2/3] relative overflow-hidden">
                    <Image
                      src={
                        season.poster_path
                          ? `https://image.tmdb.org/t/p/w500${season.poster_path}`
                          : `/placeholder.svg?height=450&width=300`
                      }
                      alt={season.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="rounded-full bg-purple-600/80 p-4 backdrop-blur-sm">
                        <Play className="h-8 w-8 fill-white" />
                      </div>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors duration-300">
                      {season.name}
                    </h3>

                    <div className="flex items-center gap-4 text-gray-400">
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4 text-purple-400" />
                        <span>{season.episode_count} Episodes</span>
                      </div>

                      {season.air_date && (
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-4 w-4 text-blue-400" />
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
    </div>
  );
}
