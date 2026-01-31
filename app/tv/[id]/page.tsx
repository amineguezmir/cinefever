import {
  getTVShowDetails,
  getTVShowSeasons,
  getTVShowCredits,
  getSimilarTVShows,
} from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Star,
  Clock,
  Play,
  Plus,
  ChevronRight,
  Info,
  Share2,
  Heart,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default async function TVShowDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const tvShow = await getTVShowDetails(params.id);
  const seasons = await getTVShowSeasons(params.id);
  const credits = await getTVShowCredits(params.id);
  const similarShows = await getSimilarTVShows(params.id);

  // Get main cast (limit to 8)
  const cast = credits?.cast?.slice(0, 8) || [];

  // Format runtime
  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours > 0 ? `${hours}h ` : ""}${mins > 0 ? `${mins}m` : ""}`;
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Immersive Hero Section */}
      <div className="relative w-full h-screen">
        {/* Dynamic Backdrop */}
        <div className="absolute inset-0">
          <Image
            src={`https://image.tmdb.org/t/p/original${
              tvShow.backdrop_path || tvShow.poster_path
            }`}
            alt={`${tvShow.name} backdrop`}
            fill
            className="object-cover object-center"
            priority
            quality={100}
          />

          {/* Overlay gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] to-transparent" />
          <div className="absolute inset-0 bg-[#0a0a0a]/30" />
        </div>

        {/* Content */}
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4 md:px-8 flex flex-col h-full justify-center">
            <div className="max-w-3xl space-y-6">
              {/* Badges */}
              <div className="flex flex-wrap gap-3">
                {tvShow.genres
                  ?.slice(0, 3)
                  .map((genre: { id: number; name: string }) => (
                    <Badge
                      key={genre.id}
                      className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-3 py-1.5 rounded-full"
                    >
                      {genre.name}
                    </Badge>
                  ))}
              </div>

              {/* Title */}
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white">
                {tvShow.name}
              </h1>

              {/* Tagline */}
              {tvShow.tagline && (
                <p className="text-xl text-white/80 italic">
                  "{tvShow.tagline}"
                </p>
              )}

              {/* Stats */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-white/70">
                <div className="flex items-center gap-1.5">
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  <span className="font-medium text-white">
                    {tvShow.vote_average?.toFixed(1)}
                  </span>
                  <span>/ 10</span>
                </div>

                {tvShow.first_air_date && (
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 text-white/50" />
                    <span>{tvShow.first_air_date?.split("-")[0]}</span>
                  </div>
                )}

                {tvShow.episode_run_time?.length > 0 && (
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-white/50" />
                    <span>{formatRuntime(tvShow.episode_run_time[0])}</span>
                  </div>
                )}

                {tvShow.status && (
                  <Badge className="bg-green-500/20 text-green-400 border border-green-500/30">
                    {tvShow.status}
                  </Badge>
                )}
              </div>

              {/* Overview */}
              <p className="text-lg text-white/80 leading-relaxed max-w-2xl">
                {tvShow.overview}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <Button className="bg-white text-black hover:bg-white/90 rounded-full px-8 py-6 text-lg font-medium transition-all duration-300 flex items-center gap-2">
                  <Play className="h-5 w-5 fill-black" /> Watch Now
                </Button>
                <Button
                  variant="outline"
                  className="border-white/20 bg-white/5 hover:bg-white/10 text-white rounded-full px-6 py-6 text-lg font-medium transition-all duration-300"
                >
                  <Plus className="h-5 w-5 mr-2" /> Add to List
                </Button>
                <Button
                  variant="outline"
                  className="border-white/20 bg-white/5 hover:bg-white/10 text-white rounded-full p-3 aspect-square transition-all duration-300"
                >
                  <Heart className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  className="border-white/20 bg-white/5 hover:bg-white/10 text-white rounded-full p-3 aspect-square transition-all duration-300"
                >
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              {/* Cast Preview */}
              {/* <div className="pt-8"> */}
              {/* <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-white/90">
                    Starring
                  </h3>
                  <Link
                    href={`/tv/${params.id}/cast`}
                    className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-1"
                  >
                    View All <ChevronRight className="h-4 w-4" />
                  </Link>
                </div> */}
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {cast.slice(0, 5).map((person) => (
                  <div key={person.id} className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/10">
                      <Image
                        src={
                          person.profile_path
                            ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
                            : `/placeholder.svg?height=200&width=200`
                        }
                        alt={person.name}
                        width={64}
                        height={64}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
              {/* </div> */}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 rounded-full border-2 border-white/30 flex items-center justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-[#0a0a0a]">
        <div className="container mx-auto px-4 md:px-8   space-y-20">
          {/* Seasons Section */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-white">Seasons</h2>
              <Badge className="bg-white/10 text-white px-3 py-1">
                {seasons.length} {seasons.length === 1 ? "Season" : "Seasons"}
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {seasons.map((season) => (
                <Link
                  key={season.id}
                  href={`/tv/${params.id}/season/${season.season_number}`}
                  className="group"
                >
                  <div className="bg-[#141414] rounded-2xl overflow-hidden transition-transform duration-300 group-hover:scale-[1.02] group-hover:shadow-xl group-hover:shadow-purple-900/10">
                    <div className="aspect-video relative overflow-hidden">
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
                      <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />

                      <div className="absolute top-4 left-4">
                        <Badge className="bg-white/10 backdrop-blur-md text-white">
                          Season {season.season_number}
                        </Badge>
                      </div>

                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-white/20 backdrop-blur-md rounded-full p-4 transform group-hover:scale-110 transition-transform duration-300">
                          <Play className="h-8 w-8 fill-white" />
                        </div>
                      </div>
                    </div>

                    <div className="p-6 space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors duration-300">
                          {season.name}
                        </h3>
                        <Badge className="bg-purple-500/20 text-purple-400 border border-purple-500/30">
                          {season.episode_count} Episodes
                        </Badge>
                      </div>

                      {season.air_date && (
                        <div className="flex items-center gap-1.5 text-white/60">
                          <Calendar className="h-4 w-4" />
                          <span>{season.air_date.split("-")[0]}</span>
                        </div>
                      )}

                      {season.overview && (
                        <p className="text-white/70 line-clamp-2 text-sm">
                          {season.overview}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Cast Section */}
          {/* Cast Section */}
          <section className="relative">
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-900/5 to-blue-900/5 rounded-3xl blur-3xl" />

            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-white">Cast & Crew</h2>
              {credits?.cast?.length > 8 && (
                <Link
                  href={`/tv/${params.id}/cast`}
                  className="text-white/60 hover:text-white transition-colors flex items-center gap-1"
                >
                  View All <ChevronRight className="h-5 w-5" />
                </Link>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-6">
              {cast.map((person) => (
                <div key={person.id} className="group">
                  <div className="bg-[#141414] rounded-xl overflow-hidden transition-all duration-300 group-hover:shadow-lg group-hover:shadow-purple-900/10">
                    <div className="aspect-[2/3] relative overflow-hidden">
                      <Image
                        src={
                          person.profile_path
                            ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
                            : `/placeholder.svg?height=450&width=300`
                        }
                        alt={person.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>

                    <div className="p-3 text-center">
                      <h3 className="font-medium text-white text-sm line-clamp-1 group-hover:text-purple-400 transition-colors duration-300">
                        {person.name}
                      </h3>
                      <p className="text-xs text-white/60 line-clamp-1 mt-0.5">
                        {person.character}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Show Info Section */}
          <section className="bg-[#141414] rounded-2xl p-8">
            <div className="flex items-center gap-2 mb-6">
              <Info className="h-5 w-5 text-white/60" />
              <h2 className="text-2xl font-bold text-white">
                Show Information
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {tvShow.networks?.length > 0 && (
                <div>
                  <h3 className="text-white/60 text-sm mb-2">Networks</h3>
                  <div className="flex flex-wrap gap-3">
                    {tvShow.networks.map((network) => (
                      <div
                        key={network.id}
                        className="bg-white/5 rounded-lg p-3 flex items-center"
                      >
                        {network.logo_path ? (
                          <Image
                            src={`https://image.tmdb.org/t/p/w200${network.logo_path}`}
                            alt={network.name}
                            width={60}
                            height={30}
                            className="h-6 object-contain"
                          />
                        ) : (
                          <span className="text-white text-sm">
                            {network.name}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {tvShow.created_by?.length > 0 && (
                <div>
                  <h3 className="text-white/60 text-sm mb-2">Created By</h3>
                  <div className="flex flex-wrap gap-2">
                    {tvShow.created_by.map((creator) => (
                      <Badge
                        key={creator.id}
                        className="bg-white/5 hover:bg-white/10 text-white"
                      >
                        {creator.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {tvShow.production_countries?.length > 0 && (
                <div>
                  <h3 className="text-white/60 text-sm mb-2">
                    Production Countries
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {tvShow.production_countries.map((country, index) => (
                      <Badge
                        key={index}
                        className="bg-white/5 hover:bg-white/10 text-white"
                      >
                        {country.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {tvShow.spoken_languages?.length > 0 && (
                <div>
                  <h3 className="text-white/60 text-sm mb-2">Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {tvShow.spoken_languages.map((language, index) => (
                      <Badge
                        key={index}
                        className="bg-white/5 hover:bg-white/10 text-white"
                      >
                        {language.english_name || language.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Similar Shows Section */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-white">
                You May Also Like
              </h2>
              {/* <Link
                href={`/tv/${params.id}/similar`}
                className="text-white/60 hover:text-white transition-colors flex items-center gap-1"
              >
                View All <ChevronRight className="h-5 w-5" />
              </Link> */}
            </div>

            <div className="overflow-x-auto">
              <div
                className="flex gap-6 pb-4"
                style={{ minWidth: "max-content" }}
              >
                {similarShows?.results?.slice(0, 10).map((show) => (
                  <Link
                    key={show.id}
                    href={`/tv/${show.id}`}
                    className="group block w-[180px]"
                  >
                    <div className="bg-[#141414] rounded-xl overflow-hidden transition-all duration-300 group-hover:shadow-lg group-hover:shadow-purple-900/10">
                      <div className="aspect-[2/3] relative overflow-hidden">
                        <Image
                          src={
                            show.poster_path
                              ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
                              : `/placeholder.svg?height=450&width=300`
                          }
                          alt={show.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        <div className="absolute top-2 right-2">
                          <div className="bg-black/50 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-medium flex items-center gap-1">
                            <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                            <span className="text-white">
                              {show.vote_average?.toFixed(1)}
                            </span>
                          </div>
                        </div>

                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="bg-white/20 backdrop-blur-md rounded-full p-3 transform group-hover:scale-110 transition-transform duration-300">
                            <Play className="h-6 w-6 fill-white" />
                          </div>
                        </div>
                      </div>

                      <div className="p-3">
                        <h3 className="font-medium text-white text-sm line-clamp-1 group-hover:text-purple-400 transition-colors duration-300">
                          {show.name}
                        </h3>
                        <p className="text-xs text-white/60 mt-0.5">
                          {show.first_air_date?.split("-")[0]}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
