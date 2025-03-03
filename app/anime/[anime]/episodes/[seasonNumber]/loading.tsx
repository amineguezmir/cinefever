export default function Loading() {
  return (
    <div className="min-h-screen bg-black">
      <div className="relative h-[50vh] w-full bg-gray-900">
        <div className="absolute inset-0 z-10 flex items-end">
          <div className="container mx-auto px-4 pb-8">
            <div className="h-6 w-32 bg-gray-800 rounded mb-6" />
            <div className="flex flex-col md:flex-row gap-8 items-end">
              <div className="relative shrink-0 w-[200px] h-[300px] bg-gray-800 rounded-xl" />
              <div className="flex-1 space-y-4">
                <div className="space-y-2">
                  <div className="h-5 w-32 bg-gray-800 rounded" />
                  <div className="h-8 w-64 bg-gray-800 rounded" />
                </div>
                <div className="flex gap-2">
                  <div className="h-6 w-24 bg-gray-800 rounded-full" />
                  <div className="h-6 w-24 bg-gray-800 rounded-full" />
                </div>
                <div className="h-20 w-full max-w-3xl bg-gray-800 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative bg-gradient-to-b from-black to-gray-900 min-h-screen">
        <div className="container mx-auto px-4 py-12">
          <div className="grid gap-6">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="rounded-xl bg-gray-800/50 overflow-hidden"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-[300px] aspect-video md:aspect-[16/9] bg-gray-800" />
                  <div className="flex-1 p-6 space-y-4">
                    <div className="space-y-2">
                      <div className="h-6 w-48 bg-gray-800 rounded" />
                      <div className="flex gap-4">
                        <div className="h-4 w-20 bg-gray-800 rounded" />
                        <div className="h-4 w-20 bg-gray-800 rounded" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 w-full bg-gray-800 rounded" />
                      <div className="h-4 w-2/3 bg-gray-800 rounded" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
