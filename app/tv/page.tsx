import { getTVShows } from "@/lib/utils";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

async function getTVShowsByCategory(category: string) {
  const accessToken = process.env.TMDB_ACCESS_TOKEN;
  if (!accessToken) {
    throw new Error("TMDB_ACCESS_TOKEN is not set in environment variables");
  }

  const res = await fetch(
    `https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`,
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

export default async function TVShowsPage() {
  const [popularTVShows, topRatedTVShows, onAirTVShows] = await Promise.all([
    getTVShowsByCategory("popular"),
    getTVShowsByCategory("top_rated"),
    getTVShowsByCategory("on_the_air"),
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">TV Shows</h1>
      <Tabs defaultValue="popular" className="w-full">
        <TabsList>
          <TabsTrigger value="popular">Popular</TabsTrigger>
          <TabsTrigger value="top_rated">Top Rated</TabsTrigger>
          <TabsTrigger value="on_the_air">On Air</TabsTrigger>
        </TabsList>
        <TabsContent value="popular">
          <TVShowGrid tvShows={popularTVShows} />
        </TabsContent>
        <TabsContent value="top_rated">
          <TVShowGrid tvShows={topRatedTVShows} />
        </TabsContent>
        <TabsContent value="on_the_air">
          <TVShowGrid tvShows={onAirTVShows} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function TVShowGrid({ tvShows }: { tvShows: any[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6">
      {tvShows.map((show: any) => (
        <Link
          key={show.id}
          href={`/tv/${show.id}`}
          className="block border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
        >
          <img
            src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
            alt={show.name}
            className="w-full h-80 object-cover"
          />
          <div className="p-4">
            <h2 className="text-lg font-semibold">{show.name}</h2>
          </div>
        </Link>
      ))}
    </div>
  );
}
