"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Upload, X, HardDrive } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
// import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { useMediaStore } from "@/lib/media-store";

export default function MediaUploader() {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [storageInfo, setStorageInfo] = useState<{
    used: string;
    available: string;
  } | null>(null);
  //   const { toast } = useToast();
  const { addMedia, checkStorage } = useMediaStore();

  useEffect(() => {
    const updateStorageInfo = async () => {
      try {
        if (checkStorage) {
          const info = await checkStorage();
          setStorageInfo(info);
        }
      } catch (error) {
        console.error("Error checking storage:", error);
      }
    };
    updateStorageInfo();
  }, [checkStorage]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCurrentFile(e.target.files[0]);
    }
  };

  const clearFile = () => {
    setCurrentFile(null);
  };

  const simulateUpload = async () => {
    if (!currentFile) return;

    setIsUploading(true);
    setProgress(0);

    const totalTime = 3000;
    const interval = 100;
    const steps = totalTime / interval;
    let currentStep = 0;

    const timer = setInterval(async () => {
      currentStep++;
      const newProgress = Math.round((currentStep / steps) * 100);
      setProgress(newProgress);

      if (currentStep >= steps) {
        clearInterval(timer);
        setIsUploading(false);

        try {
          const isEpisode =
            currentFile.name.toLowerCase().includes("s0") ||
            currentFile.name.toLowerCase().includes("ep") ||
            currentFile.name.toLowerCase().includes("episode");

          const media = {
            id: Date.now().toString(),
            title: formatTitle(currentFile.name),
            type: isEpisode ? "tv" : "movie",
            season: isEpisode ? extractSeason(currentFile.name) : null,
            episode: isEpisode ? extractEpisode(currentFile.name) : null,
            fileSize: formatFileSize(currentFile.size),
            duration: generateRandomDuration(),
            thumbnail: generateThumbnail(isEpisode),
            dateAdded: new Date().toISOString(),
            fileName: currentFile.name,
          };

          await addMedia(media, currentFile);

          // Update storage info after successful upload
          const newStorageInfo = await checkStorage();
          setStorageInfo(newStorageInfo);

          //   toast({
          //     title: "Upload Complete",
          //     description: `${media.title} has been added to your library`,
          //   });

          setCurrentFile(null);
        } catch (error) {
          console.error("Error uploading file:", error);
          //   toast({
          //     title: "Upload Failed",
          //     description:
          //       "There was an error uploading your file. Please try again.",
          //     variant: "destructive",
          //   });
        }
      }
    }, interval);
  };

  const formatTitle = (fileName: string): string => {
    let title = fileName.replace(/\.[^/.]+$/, "");
    title = title.replace(/\b[Ss]\d{1,2}[Ee]\d{1,2}\b/, "");
    title = title.replace(/\b\d{3,4}p\b/, "");
    title = title.replace(/\bx264\b|\bHDTV\b|\bWEB-DL\b|\bBluRay\b/gi, "");
    title = title.replace(/[._-]/g, " ");
    title = title.replace(/\s+/g, " ").trim();
    return title
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const extractSeason = (fileName: string): number => {
    const seasonMatch = fileName.match(/[Ss](\d{1,2})/i);
    return seasonMatch ? Number.parseInt(seasonMatch[1]) : 1;
  };

  const extractEpisode = (fileName: string): number => {
    const episodeMatch = fileName.match(/[Ee](\d{1,2})/i);
    return episodeMatch ? Number.parseInt(episodeMatch[1]) : 1;
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    );
  };

  const generateRandomDuration = (): string => {
    const hours = Math.floor(Math.random() * 2) + 1;
    const minutes = Math.floor(Math.random() * 60);
    return `${hours}h ${minutes}m`;
  };

  const generateThumbnail = (isTvShow: boolean): string => {
    const tvShowThumbnails = [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600&text=TV+Show",
    ];

    const movieThumbnails = [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600&text=Movie",
    ];

    const thumbnails = isTvShow ? tvShowThumbnails : movieThumbnails;
    return thumbnails[Math.floor(Math.random() * thumbnails.length)];
  };

  return (
    <div className="mb-10 rounded-lg border border-gray-800 bg-gray-900 p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">Upload Media</h2>
        {storageInfo && (
          <div className="text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <HardDrive className="h-4 w-4" />
              <span>
                Used: {storageInfo.used} • Available: {storageInfo.available}
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="mb-4">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => document.getElementById("file-upload")?.click()}
            disabled={isUploading}
            className="border-dashed border-gray-700 bg-transparent text-gray-300 hover:bg-gray-800 hover:text-white"
          >
            <Upload className="mr-2 h-4 w-4" />
            Select File
          </Button>
          <input
            id="file-upload"
            type="file"
            accept="video/*"
            className="hidden"
            onChange={handleFileChange}
            disabled={isUploading}
          />

          {currentFile && (
            <div className="flex flex-1 items-center justify-between rounded-md bg-gray-800 p-2 px-3">
              <span className="truncate text-sm">{currentFile.name}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={clearFile}
                disabled={isUploading}
                className="h-6 w-6 text-gray-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>

      {currentFile && !isUploading && (
        <Button
          onClick={simulateUpload}
          className="bg-red-600 text-white hover:bg-red-700"
        >
          Upload Now
        </Button>
      )}

      {isUploading && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">
              Uploading {currentFile?.name}
            </span>
            <span className="text-sm font-medium">{progress}%</span>
          </div>
          <Progress
            value={progress}
            className="h-2 bg-gray-800"
            indicatorClassName="bg-red-600"
          />
        </div>
      )}

      {/* <Toaster /> */}
    </div>
  );
}
