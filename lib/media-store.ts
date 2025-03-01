"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createStore, del } from "idb-keyval";
import { checkStorageAvailability, requestPersistentStorage } from "./storage";

const mediaStore = createStore("media-files-store", "media-files");

export interface Media {
  id: string;
  title: string;
  type: "movie" | "tv";
  season: number | null;
  episode: number | null;
  fileSize: string;
  duration: string;
  thumbnail: string;
  dateAdded: string;
  fileName: string;
}

interface MediaStore {
  media: Media[];
  addMedia: (media: Media, file: File) => Promise<void>;
  removeMedia: (id: string) => Promise<void>;
  getMediaUrl: (id: string) => Promise<string>;
  checkStorage: () => Promise<{ used: string; available: string } | null>;
}

const formatBytes = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${Number.parseFloat((bytes / k ** i).toFixed(2))} ${sizes[i]}`;
};

export const useMediaStore = create<MediaStore>()(
  persist(
    (set, get) => ({
      media: [] as Media[],

      addMedia: async (media: Media, file: File) => {
        try {
          const storage = await checkStorageAvailability();
          if (storage) {
            const fileSize = file.size;
            if (fileSize > storage.available) {
              throw new Error("Not enough storage space available");
            }
          }

          const base64Data = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
          });

          // Store the file data
          await set(`media-file-${media.id}`, base64Data, mediaStore);

          // Update the media list
          set((state) => ({
            media: [media, ...(state.media || [])],
          }));
        } catch (error) {
          console.error("Error adding media:", error);
          throw error;
        }
      },

      removeMedia: async (id: string) => {
        try {
          await del(`media-file-${id}`, mediaStore);
          set((state) => ({
            media: (state.media || []).filter((item) => item.id !== id),
          }));
        } catch (error) {
          console.error("Error removing media:", error);
          throw error;
        }
      },

      getMediaUrl: async (id: string) => {
        try {
          const base64Data = await get(`media-file-${id}`, mediaStore);
          if (!base64Data) {
            throw new Error("Media file not found");
          }

          return base64Data;

          // If you prefer to use Blob URLs (which might be more efficient for large files),
          // uncomment this code instead:
          /*
          const byteString = atob(base64Data.split(",")[1])
          const mimeString = base64Data.split(",")[0].split(":")[1].split(";")[0]
          const ab = new ArrayBuffer(byteString.length)
          const ia = new Uint8Array(ab)

          for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i)
          }

          const blob = new Blob([ab], { type: mimeString })
          return URL.createObjectURL(blob)
          */
        } catch (error) {
          console.error("Error getting media URL:", error);
          throw error;
        }
      },

      checkStorage: async () => {
        try {
          const storage = await checkStorageAvailability();
          if (storage) {
            return {
              used: formatBytes(storage.used),
              available: formatBytes(storage.available),
            };
          }
          return null;
        } catch (error) {
          console.error("Error checking storage:", error);
          return null;
        }
      },
    }),
    {
      name: "media-storage",
      version: 1,
    }
  )
);

// Initialize persistent storage
if (typeof window !== "undefined") {
  requestPersistentStorage().then((isPersisted) => {
    if (isPersisted) {
      console.log("Storage will be persisted");
    } else {
      console.warn("Storage may be cleared by the browser");
    }
  });
}
