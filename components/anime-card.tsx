import Image from "next/image";
import Link from "next/link";

interface AnimeCardProps {
  anime: {
    id: number;
    name: string;
    poster_path: string | null;
    vote_average?: number;
    first_air_date?: string;
    overview?: string;
  };
}

export default function AnimeCard({ anime }: AnimeCardProps) {
  const year = anime.first_air_date
    ? new Date(anime.first_air_date).getFullYear()
    : null;

  const rating = anime.vote_average
    ? Math.round((anime.vote_average / 2) * 10) / 10
    : null;

  return (
    <Link
      href={`/anime/${anime.id}`}
      className="block transform transition-all duration-300 hover:scale-105 h-full"
    >
      <div className="relative group rounded-lg overflow-hidden shadow-[0_0_15px_rgba(255,0,130,0.3)] hover:shadow-[0_0_25px_rgba(255,0,130,0.7)] h-full flex flex-col bg-gray-900/60 backdrop-blur-sm">
        {/* Rating badge */}
        {rating && (
          <div className="absolute top-2 right-2 z-30 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <svg
              className="w-3.5 h-3.5 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-white">{rating}</span>
          </div>
        )}

        <div className="relative aspect-[2/3] overflow-hidden">
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 border-2 border-pink-500 rounded-t-lg z-20"></div>

          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-purple-900/90 z-10"></div>

          <Image
            src={
              anime.poster_path
                ? `https://image.tmdb.org/t/p/w500${anime.poster_path}`
                : "/placeholder.jpg"
            }
            alt={anime.name}
            width={300}
            height={450}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {year && (
            <div className="absolute bottom-3 left-3 z-20 bg-pink-600/80 backdrop-blur-sm px-2 py-0.5 rounded text-xs font-medium text-white">
              {year}
            </div>
          )}
        </div>

        <div className="p-3 flex-grow flex flex-col">
          <div className="mb-2">
            <h3 className="font-bold text-white leading-tight line-clamp-2">
              {anime.name}
            </h3>
            <div className="h-0.5 w-0 bg-gradient-to-r from-pink-500 to-purple-500 mt-1 group-hover:w-full transition-all duration-300"></div>
          </div>

          {anime.overview && (
            <p className="text-xs text-gray-300 line-clamp-3 mb-2 flex-grow">
              {anime.overview}
            </p>
          )}

          <div className="flex justify-between items-center mt-auto">
            <div className="flex gap-1 flex-wrap">
              <span className="inline-block px-1.5 py-0.5 bg-blue-500/20 border border-blue-500/40 rounded-sm text-[10px] text-blue-300">
                Anime
              </span>
              <span className="inline-block px-1.5 py-0.5 bg-purple-500/20 border border-purple-500/40 rounded-sm text-[10px] text-purple-300">
                TV
              </span>
            </div>

            <div className="group-hover:translate-x-0 translate-x-2 transition-transform duration-300 opacity-0 group-hover:opacity-100">
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center">
                <svg
                  className="w-3 h-3 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute top-0 left-0 w-10 h-10 overflow-hidden">
          <div className="absolute transform rotate-45 bg-gradient-to-r from-pink-600 to-purple-600 text-white text-xs font-bold py-1 left-[-35px] top-[9px] w-[100px] text-center">
            NEW
          </div>
        </div>
      </div>
    </Link>
  );
}
