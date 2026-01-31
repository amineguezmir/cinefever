import { getAnimes } from "@/lib/utils";
import AnimeCard from "@/components/anime-card";

export default async function AnimePage() {
  const animes = await getAnimes();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-950 to-gray-900 text-white">
      {/* <div className="fixed inset-0 z-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-pink-500 blur-[100px]"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-purple-500 blur-[120px]"></div>
        <div className="absolute top-1/2 left-1/3 w-72 h-72 rounded-full bg-blue-500 blur-[150px]"></div>
      </div> */}

      <div>
        <div className=" text-center py-10">
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-400 to-cyan-400 inline-block">
            Anime
          </h1>
          {/* <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto"></div>
          <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
            Discover the most popular anime series from around the world. Dive
            into fantastic worlds and epic stories.
          </p> */}
        </div>

        <div className="flex justify-center mb-8 gap-4 overflow-x-auto pb-2">
          {["All", "Action", "Adventure", "Comedy", "Fantasy", "Sci-Fi"].map(
            (genre) => (
              <button
                key={genre}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  genre === "All"
                    ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white"
                    : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50"
                }`}
              >
                {genre}
              </button>
            )
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {animes.length > 0 ? (
            animes.map((anime) => <AnimeCard key={anime.id} anime={anime} />)
          ) : (
            <div className="col-span-full text-center py-20">
              <div className="inline-block p-6 rounded-full bg-gray-800/50 mb-4">
                <svg
                  className="w-10 h-10 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="text-xl text-gray-400">No anime found.</p>
              <p className="text-gray-500 mt-2">
                Try again later or check your connection.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
