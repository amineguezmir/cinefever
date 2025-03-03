import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="text-center space-y-6">
        <div className="relative">
          <div className="absolute inset-0 blur-3xl opacity-30">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-pink-500 rounded-full" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500 rounded-full" />
          </div>

          <div className="relative">
            <h1 className="text-7xl font-bold text-white mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-300 mb-8">
              Anime Not Found
            </h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              The anime you're looking for seems to have disappeared into
              another dimension. Let's get you back to the main page!
            </p>
            <Link
              href="/anime"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 text-white font-medium transition-transform hover:scale-105"
            >
              Return to Anime List
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
