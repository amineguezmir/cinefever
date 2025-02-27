import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");
  const genre = searchParams.get("genre");
  const year = searchParams.get("year");
  const page = searchParams.get("page") || "1";

  const accessToken = process.env.TMDB_ACCESS_TOKEN;
  if (!accessToken) {
    return NextResponse.json(
      { error: "TMDB_ACCESS_TOKEN is not set" },
      { status: 500 }
    );
  }

  let url = "https://api.themoviedb.org/3/discover/movie?";
  const params = new URLSearchParams();

  if (query) {
    url = "https://api.themoviedb.org/3/search/movie?";
    params.set("query", query);
  }

  if (genre) params.set("with_genres", genre);
  if (year) params.set("primary_release_year", year);

  params.set("language", "en-US");
  params.set("page", page);

  try {
    const res = await fetch(`${url}${params.toString()}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        accept: "application/json",
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`HTTP error! status: ${res.status}, body: ${errorText}`);
      return NextResponse.json(
        { error: `HTTP error! status: ${res.status}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data.results);
  } catch (error) {
    console.error("Error fetching movies:", error);
    return NextResponse.json(
      { error: "Failed to fetch movies" },
      { status: 500 }
    );
  }
}
