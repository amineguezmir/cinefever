"use server";

export async function getTVShowsByCategory(category: string, page = 1) {
  const accessToken = process.env.TMDB_ACCESS_TOKEN;
  if (!accessToken) {
    throw new Error("TMDB_ACCESS_TOKEN is not set in environment variables");
  }

  const res = await fetch(
    `https://api.themoviedb.org/3/tv/${category}?language=en-US&page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        accept: "application/json",
      },
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const data = await res.json();

  const showsWithDetails = await Promise.all(
    data.results.map(async (show: any) => {
      const detailsRes = await fetch(
        `https://api.themoviedb.org/3/tv/${show.id}?language=en-US`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            accept: "application/json",
          },
        }
      );
      const details = await detailsRes.json();
      return { ...show, networks: details.networks };
    })
  );

  return {
    results: showsWithDetails || [],
    totalPages: data.total_pages || 1,
    totalResults: data.total_results || 0,
    page: data.page || 1,
  };
}

export async function searchTVShows(query: string, page = 1) {
  const accessToken = process.env.TMDB_ACCESS_TOKEN;
  if (!accessToken) {
    throw new Error("TMDB_ACCESS_TOKEN is not set in environment variables");
  }

  if (!query.trim()) {
    return {
      results: [],
      totalPages: 0,
      totalResults: 0,
      page: 1,
    };
  }

  const res = await fetch(
    `https://api.themoviedb.org/3/search/tv?query=${encodeURIComponent(
      query
    )}&language=en-US&page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        accept: "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const data = await res.json();

  const showsWithDetails = await Promise.all(
    data.results.map(async (show: any) => {
      const detailsRes = await fetch(
        `https://api.themoviedb.org/3/tv/${show.id}?language=en-US`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            accept: "application/json",
          },
        }
      );
      const details = await detailsRes.json();
      return { ...show, networks: details.networks };
    })
  );

  return {
    results: showsWithDetails || [],
    totalPages: data.total_pages || 1,
    totalResults: data.total_results || 0,
    page: data.page || 1,
  };
}
