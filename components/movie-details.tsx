import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export function MovieDetails({ movie }: { movie: any }) {
  return (
    <Tabs defaultValue="details" className="w-full">
      <TabsList>
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="videos">Videos</TabsTrigger>
      </TabsList>
      <TabsContent value="details">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold mb-2">Genres</h3>
            <div className="flex flex-wrap gap-2">
              {movie.genres.map((genre: any) => (
                <Badge key={genre.id} variant="secondary">
                  {genre.name}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Languages</h3>
            <div className="flex flex-wrap gap-2">
              {movie.spoken_languages.map((lang: any) => (
                <Badge key={lang.iso_639_1} variant="outline">
                  {lang.english_name}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Production Companies</h3>
            <p>{movie.production_companies.map((company: any) => company.name).join(", ")}</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Budget</h3>
            <p>${movie.budget.toLocaleString()}</p>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="videos">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {movie.videos.results.slice(0, 4).map((video: any) => (
            <div key={video.id} className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${video.key}`}
                title={video.name}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  )
}

