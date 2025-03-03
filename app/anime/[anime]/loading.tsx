export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="relative h-[50vh] w-full bg-gray-800 animate-pulse">
        <div className="container mx-auto relative h-full px-4">
          <div className="absolute bottom-8 space-y-4">
            <div className="h-12 w-96 bg-gray-700 rounded-lg" />
            <div className="flex gap-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-8 w-24 bg-gray-700 rounded-full" />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
          <div className="space-y-6">
            <div className="aspect-[2/3] bg-gray-800 rounded-lg animate-pulse" />
            <div className="bg-gray-800 rounded-lg p-4 space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-4 bg-gray-700 rounded w-full" />
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <div className="h-8 bg-gray-800 rounded w-48" />
              <div className="space-y-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-4 bg-gray-800 rounded w-full" />
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="h-8 bg-gray-800 rounded w-48" />
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="aspect-video bg-gray-800 rounded-lg animate-pulse"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
