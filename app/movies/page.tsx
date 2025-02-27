import { MovieCard } from "@/components/movie-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

async function getMovies(category: string) {
  const accessToken = process.env.TMDB_ACCESS_TOKEN;
  if (!accessToken) {
    throw new Error("TMDB_ACCESS_TOKEN is not set in environment variables");
  }

  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        accept: "application/json",
      },
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const data = await res.json();
  return data.results || [];
}

export default async function MoviesPage() {
  const [popularMovies, topRatedMovies, upcomingMovies] = await Promise.all([
    getMovies("popular"),
    getMovies("top_rated"),
    getMovies("upcoming"),
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Movies</h1>
      <Tabs defaultValue="popular" className="w-full">
        <TabsList>
          <TabsTrigger value="popular">Popular</TabsTrigger>
          <TabsTrigger value="top_rated">Top Rated</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
        </TabsList>
        <TabsContent value="popular">
          <MovieGrid movies={popularMovies} />
        </TabsContent>
        <TabsContent value="top_rated">
          <MovieGrid movies={topRatedMovies} />
        </TabsContent>
        <TabsContent value="upcoming">
          <MovieGrid movies={upcomingMovies} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function MovieGrid({ movies }: { movies: any[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6">
      {movies.map((movie: any) => (
        <MovieCard
          key={movie.id}
          title={movie.title}
          posterPath={movie.poster_path}
          rating={movie.vote_average}
          year={new Date(movie.release_date).getFullYear()}
          id={movie.id}
        />
      ))}
    </div>
  );
}
