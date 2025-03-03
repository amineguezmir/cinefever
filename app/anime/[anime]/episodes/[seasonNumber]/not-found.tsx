import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="text-center space-y-6 relative">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-rose-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-25" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-violet-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-25" />
        </div>

        <div className="relative">
          <h1 className="text-7xl font-bold text-white mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-300 mb-8">
            Episodes Not Found
          </h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            We couldn't find the episodes you're looking for. They might have
            disappeared into another dimension!
          </p>
          <Button
            asChild
            className="bg-gradient-to-r from-rose-600 to-violet-500 hover:from-rose-700 hover:to-violet-600 text-white rounded-full px-6"
          >
            <Link href="/anime">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Return to Anime List
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
