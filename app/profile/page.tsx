"use client";

import type React from "react";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Camera,
  Film,
  Popcorn,
  Sparkles,
  Edit,
  Save,
  X,
  LogOut,
  Plus,
  Play,
  Search,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

export default function MovieProfile() {
  const router = useRouter();
  const { data: session } = useSession();
  const [editMode, setEditMode] = useState(false);
  const [userBio, setUserBio] = useState(
    "Just joined! Ready to discover amazing movies and build my collection."
  );
  const [coverUrl, setCoverUrl] = useState(
    "/placeholder.svg?height=400&width=1200"
  );
  const coverInputRef = useRef<HTMLInputElement>(null);

  const userName = session?.user?.name || "Movie Fan";
  const userImage = session?.user?.image;
  const userEmail = session?.user?.email;

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setCoverUrl(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleExploreGenres = () => {
    router.push("/discover");
  };
  const handlePopMovies = () => {
    router.push("/movies");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="relative h-64 md:h-80 w-full overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={coverUrl || "/placeholder.svg"}
            alt="Profile Cover"
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
        </div>

        <Button
          variant="outline"
          size="icon"
          className="absolute top-4 right-4 bg-black/30 hover:bg-black/50 border-none text-white"
          onClick={() => coverInputRef.current?.click()}
        >
          <Camera className="h-4 w-4" />
          <span className="sr-only">Change cover photo</span>
        </Button>
        <input
          type="file"
          ref={coverInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleCoverUpload}
        />
      </div>

      <div className="container mx-auto px-4 relative -mt-20">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col items-center md:items-start">
            <div className="relative">
              <Avatar className="h-32 w-32 border-4 border-gray-800 shadow-lg">
                <AvatarImage src={userImage || ""} alt={userName} />
                <AvatarFallback className="bg-purple-900 text-2xl">
                  {userName
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="mt-4 text-center md:text-left">
              {editMode ? (
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="bio" className="text-gray-300">
                      Bio
                    </Label>
                    <textarea
                      id="bio"
                      value={userBio}
                      onChange={(e) => setUserBio(e.target.value)}
                      className="w-full max-w-xs h-24 px-3 py-2 rounded-md bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => setEditMode(false)}
                      size="sm"
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      <Save className="h-4 w-4 mr-1" /> Save
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setEditMode(false)}
                      size="sm"
                      className="border-gray-600 text-gray-300 hover:bg-gray-800"
                    >
                      <X className="h-4 w-4 mr-1" /> Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold text-white">
                      {userName}
                    </h1>
                    <Badge
                      variant="outline"
                      className="bg-purple-900/50 text-purple-300 border-purple-700"
                    >
                      New User
                    </Badge>
                  </div>
                  <p className="text-gray-400 mt-1 max-w-md">{userBio}</p>
                  <div className="mt-3 flex gap-2">
                    <Button
                      onClick={() => setEditMode(true)}
                      size="sm"
                      variant="outline"
                      className="border-gray-700 hover:bg-gray-800 text-gray-300"
                    >
                      <Edit className="h-4 w-4 mr-1" /> Edit Bio
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="destructive"
                          className="bg-red-900 hover:bg-red-800 text-white"
                        >
                          <LogOut className="h-4 w-4 mr-1" /> Sign Out
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-gray-800 border-gray-700 text-white">
                        <DialogHeader>
                          <DialogTitle>
                            Are you sure you want to sign out?
                          </DialogTitle>
                        </DialogHeader>
                        <div className="flex justify-end gap-2 mt-4">
                          <Button
                            variant="outline"
                            className="border-gray-600 hover:bg-gray-700 text-gray-300"
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="destructive"
                            className="bg-red-700 hover:bg-red-600"
                            onClick={() => signOut()}
                          >
                            Sign Out
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 md:mt-0">
            <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow bg-gradient-to-br from-purple-900/40 to-indigo-900/40">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg text-white">
                    Movies Watched
                  </h3>
                  <Film className="h-5 w-5 text-purple-400" />
                </div>
                <p className="text-3xl font-bold mt-2 text-white">0</p>
                <p className="text-sm text-gray-400 mt-1">
                  Start your movie journey
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow bg-gradient-to-br from-pink-900/40 to-red-900/40">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg text-white">
                    Watchlist
                  </h3>
                  <Plus className="h-5 w-5 text-pink-400" />
                </div>
                <p className="text-3xl font-bold mt-2 text-white">0</p>
                <p className="text-sm text-gray-400 mt-1">
                  Add movies to watch later
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow bg-gradient-to-br from-blue-900/40 to-cyan-900/40">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg text-white">
                    Favorites
                  </h3>
                  <Sparkles className="h-5 w-5 text-blue-400" />
                </div>
                <p className="text-3xl font-bold mt-2 text-white">0</p>
                <p className="text-sm text-gray-400 mt-1">
                  Save your favorite films
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-3 text-white">
            Favorite Genres
          </h2>
          <Card className="border-none bg-gray-800/50">
            <CardContent className="p-6 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-purple-900/50 flex items-center justify-center mb-4">
                <Popcorn className="h-8 w-8 text-purple-400" />
              </div>
              <h3 className="text-lg font-medium text-white">
                Discover Your Taste
              </h3>
              <p className="text-gray-400 mt-2 max-w-md">
                Hey {userName?.split(" ")[0]}, let's find some movies that match
                your taste!
              </p>
              <Button
                className="mt-4 bg-purple-700 hover:bg-purple-600"
                onClick={handleExploreGenres}
              >
                <Search className="h-4 w-4 mr-2" /> Explore Genres
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-10 mb-20">
          <Tabs defaultValue="recently-watched" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-gray-800">
              <TabsTrigger
                value="recently-watched"
                className="data-[state=active]:bg-gray-700"
              >
                Recently Watched
              </TabsTrigger>
              <TabsTrigger
                value="recommendations"
                className="data-[state=active]:bg-gray-700"
              >
                Recommendations
              </TabsTrigger>
            </TabsList>

            <TabsContent value="recently-watched" className="mt-6">
              <Card className="border-none bg-gray-800/50">
                <CardContent className="p-8 flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center mb-4">
                    <Play className="h-10 w-10 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-medium text-white">
                    Ready to Start, {userName?.split(" ")[0]}?
                  </h3>
                  <p className="text-gray-400 mt-2 max-w-md">
                    Your movie journey begins here. Start watching to build your
                    personal collection.
                  </p>
                  <Button
                    className="mt-6 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 border-none"
                    onClick={handleExploreGenres}
                  >
                    Discover Movies
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="recommendations" className="mt-6">
              <Card className="border-none bg-gray-800/50">
                <CardContent className="p-8 flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center mb-4">
                    <Sparkles className="h-10 w-10 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-medium text-white">
                    Personalized Just for You
                  </h3>
                  <p className="text-gray-400 mt-2 max-w-md">
                    Hi {userName?.split(" ")[0]}! Watch movies to help us
                    understand your taste. We'll use that to recommend films
                    you'll love.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 w-full">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="aspect-[2/3] rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-colors flex items-center justify-center group cursor-pointer overflow-hidden relative"
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                          <span className="text-white text-sm">Discover</span>
                        </div>
                        <Film className="h-8 w-8 text-gray-600 group-hover:text-gray-500 transition-colors" />
                      </div>
                    ))}
                  </div>
                  <Button
                    className="mt-6 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 border-none"
                    onClick={handlePopMovies}
                  >
                    Browse Popular Movies
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
