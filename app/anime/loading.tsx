export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-950 to-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="relative w-24 h-24 mx-auto mb-8">
          <div className="absolute inset-0 rounded-full border-4 border-t-pink-500 border-r-purple-500 border-b-blue-500 border-l-transparent animate-spin"></div>
          <div className="absolute inset-2 rounded-full border-4 border-t-transparent border-r-pink-500 border-b-purple-500 border-l-blue-500 animate-spin animation-delay-150"></div>
          <div className="absolute inset-4 rounded-full border-4 border-t-blue-500 border-r-transparent border-b-pink-500 border-l-purple-500 animate-spin animation-delay-300"></div>
        </div>
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-400 to-cyan-400 inline-block">
          Loading Anime...
        </h2>
      </div>
    </div>
  );
}
