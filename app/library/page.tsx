import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { MovieCard } from "@/components/movie-card";
import { Button } from "@/components/ui/button";

async function getWatchlist() {
  const session = await getServerSession();
  if (!session?.user?.email) return [];

  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/watchlist`, {
      headers: {
        Cookie: `next-auth.session-token=${session.user.email}`,
      },
    });

    if (!res.ok) return [];

    const movieIds = await res.json();

    const moviePromises = movieIds.map(async (id: number) => {
      const res = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
        headers: {
          Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
          accept: "application/json",
        },
      });
      return res.json();
    });

    return Promise.all(moviePromises);
  } catch (error) {
    console.error("Failed to fetch watchlist:", error);
    return [];
  }
}

export default async function LibraryPage() {
  const session = await getServerSession();

  if (!session) {
    redirect("/auth/signin");
  }

  const watchlist = await getWatchlist();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">My Library</h1>
      {watchlist.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {watchlist.map((movie: any) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              posterPath={movie.poster_path}
              rating={movie.vote_average}
              year={new Date(movie.release_date).getFullYear()}
              overview={movie.overview}
              genres={movie.genres?.map((g: any) => g.name)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-4">
            Your watchlist is empty
          </h2>
          <p className="text-muted-foreground mb-8">
            Start adding movies to your watchlist to keep track of what you want
            to watch.
          </p>
          <Button asChild>
            <Link href="/discover">Discover Movies</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
