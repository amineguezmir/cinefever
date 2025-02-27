import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const watchlists = new Map<string, Set<number>>();

export async function POST(req: Request) {
  const session = await getServerSession();

  if (!session?.user?.email) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { movieId } = await req.json();
  const userEmail = session.user.email;

  if (!watchlists.has(userEmail)) {
    watchlists.set(userEmail, new Set());
  }

  const userWatchlist = watchlists.get(userEmail)!;

  if (userWatchlist.has(movieId)) {
    userWatchlist.delete(movieId);
  } else {
    userWatchlist.add(movieId);
  }

  return NextResponse.json({ success: true });
}

export async function GET(req: Request) {
  const session = await getServerSession();

  if (!session?.user?.email) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const userEmail = session.user.email;
  const userWatchlist = watchlists.get(userEmail) || new Set();

  return NextResponse.json(Array.from(userWatchlist));
}
