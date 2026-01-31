import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDistanceToNow(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return "just now";
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes !== 1 ? "s" : ""} ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours !== 1 ? "s" : ""} ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} day${diffInDays !== 1 ? "s" : ""} ago`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} month${diffInMonths !== 1 ? "s" : ""} ago`;
  }

  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears} year${diffInYears !== 1 ? "s" : ""} ago`;
}

export async function getTVShows() {
  const url = "https://api.themoviedb.org/3/tv/popular";

  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("TMDB API Error:", data);
      throw new Error(`Failed to fetch TV shows: ${data.status_message}`);
    }

    return data.results || [];
  } catch (error) {
    console.error("Fetch error:", error);
    throw new Error("Failed to fetch TV shows");
  }
}

export async function getTVShowDetails(tvId: string) {
  const url = `https://api.themoviedb.org/3/tv/${tvId}`;

  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("TMDB API Error:", data);
      throw new Error(
        `Failed to fetch TV show details: ${data.status_message}`
      );
    }

    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw new Error("Failed to fetch TV show details");
  }
}

export async function getTVShowSeasons(tvId: string) {
  const url = `https://api.themoviedb.org/3/tv/${tvId}`;

  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("TMDB API Error:", data);
      throw new Error(
        `Failed to fetch TV show seasons: ${data.status_message}`
      );
    }

    return data.seasons || [];
  } catch (error) {
    console.error("Fetch error:", error);
    throw new Error("Failed to fetch TV show seasons");
  }
}
export async function getTVSeasonEpisodes(tvId: string, seasonNumber: string) {
  const url = `https://api.themoviedb.org/3/tv/${tvId}/season/${seasonNumber}`;

  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("TMDB API Error:", data);
      throw new Error(
        `Failed to fetch season episodes: ${data.status_message}`
      );
    }

    const episodes =
      data.episodes?.map((episode: any) => ({
        ...episode,
        still_path: episode.still_path
          ? `https://image.tmdb.org/t/p/original${episode.still_path}`
          : null,
        poster_path: data.poster_path
          ? `https://image.tmdb.org/t/p/original${data.poster_path}`
          : null,
      })) || [];

    return {
      episodes,
      seasonDetails: {
        name: data.name,
        overview: data.overview,
        poster_path: data.poster_path
          ? `https://image.tmdb.org/t/p/original${data.poster_path}`
          : null,
        air_date: data.air_date,
        season_number: data.season_number,
      },
    };
  } catch (error) {
    console.error("Fetch error:", error);
    throw new Error("Failed to fetch season episodes");
  }
}
export async function getTVEpisodeStream(
  tvId: string,
  season: string,
  episode: string
) {
  return `https://your-streaming-server.com/tv/${tvId}/season-${season}/episode-${episode}.mp4`;
}

export async function getTVEpisodeDetails(
  id: number,
  season: number,
  episode: number
) {
  const accessToken = process.env.TMDB_ACCESS_TOKEN;

  if (!accessToken) {
    throw new Error(
      "TMDB_ACCESS_TOKEN is missing in the environment variables."
    );
  }

  const res = await fetch(
    `https://api.themoviedb.org/3/tv/${id}/season/${season}/episode/${episode}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch episode details");
  }

  return res.json();
}

export async function getTVShowSearchResults(query: string) {
  const url = `https://api.themoviedb.org/3/search/tv?query=${encodeURIComponent(
    query
  )}`;

  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("TMDB API Error:", data);
      throw new Error(`Failed to search TV shows: ${data.status_message}`);
    }

    return data.results || [];
  } catch (error) {
    console.error("Fetch error:", error);
    throw new Error("Failed to search TV shows");
  }
}

export async function getAnimes() {
  const url =
    "https://api.themoviedb.org/3/discover/tv?with_genres=16&sort_by=popularity.desc";

  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("TMDB API Error:", data);
      throw new Error(`Failed to fetch anime: ${data.status_message}`);
    }

    return data.results || [];
  } catch (error) {
    console.error("Fetch error:", error);
    throw new Error("Failed to fetch anime");
  }
}

export async function getAnimeDetails(animeId: string) {
  const url = `https://api.themoviedb.org/3/tv/${animeId}`;

  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("TMDB API Error:", data);
      throw new Error(`Failed to fetch anime details: ${data.status_message}`);
    }

    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw new Error("Failed to fetch anime details");
  }
}

export async function getTVShowCredits(id: string) {
  try {
    const res = await fetch(`https://api.themoviedb.org/3/tv/${id}/credits`, {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch TV show credits for id: ${id}`);
    }
    return await res.json();
  } catch (error) {
    console.error("Error fetching TV show credits:", error);
    return { cast: [] };
  }
}

export async function getSimilarTVShows(id: string) {
  try {
    const res = await fetch(`https://api.themoviedb.org/3/tv/${id}/similar`, {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch similar TV shows for id: ${id}`);
    }
    return await res.json();
  } catch (error) {
    console.error("Error fetching similar TV shows:", error);
    return { results: [] };
  }
}
