import MediaUploader from "@/components/media-uploader";
import MediaLibrary from "@/components/media-library";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-gray-800 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-red-600">StreamVault</h1>
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              <li className="font-medium">Home</li>
              <li className="font-medium text-gray-400 hover:text-white">
                Movies
              </li>
              <li className="font-medium text-gray-400 hover:text-white">
                TV Shows
              </li>
              <li className="font-medium text-gray-400 hover:text-white">
                My Library
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="container mx-auto p-4 py-8">
        <MediaUploader />
        <MediaLibrary />
      </main>
    </div>
  );
}
