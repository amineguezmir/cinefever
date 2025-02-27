import Image from "next/image"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

export function MovieCast({ cast }: { cast: any[] }) {
  return (
    <section className="my-8">
      <h2 className="text-2xl font-bold mb-4">Top Cast</h2>
      <ScrollArea className="w-full whitespace-nowrap rounded-md border">
        <div className="flex w-max space-x-4 p-4">
          {cast.slice(0, 10).map((actor) => (
            <div key={actor.id} className="flex flex-col items-center space-y-2">
              <div className="overflow-hidden rounded-full">
                <Image
                  src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                  alt={actor.name}
                  width={100}
                  height={100}
                  className="object-cover"
                />
              </div>
              <div className="text-center">
                <p className="font-medium">{actor.name}</p>
                <p className="text-sm text-muted-foreground">{actor.character}</p>
              </div>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  )
}

