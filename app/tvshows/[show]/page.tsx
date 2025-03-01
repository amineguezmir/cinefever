"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Clock } from "lucide-react";

const ShowPage = ({ params }: { params: { show: string } }) => {
  const [episodes, setEpisodes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const fetchEpisodes = async () => {
      console.log(`Fetching episodes for show: ${params.show}`);
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:3001/api/tvshows/${params.show}`
        );
        console.log(`Response status: ${response.status}`);

        if (response.ok) {
          const data = await response.json();
          console.log("Fetched episodes:", data.episodes);
          setEpisodes(data.episodes);
        } else {
          console.error("Failed to fetch episodes");
        }
      } catch (error) {
        console.error("Error fetching episodes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEpisodes();
  }, [params.show]);

  useEffect(() => {
    const calculateTimeUntil1AM = () => {
      const now = new Date();
      const target = new Date();

      target.setHours(1, 0, 0, 0);

      if (now.getHours() >= 1) {
        target.setDate(target.getDate() + 1);
      }

      const diff = target.getTime() - now.getTime();

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeRemaining({ hours, minutes, seconds });
    };

    calculateTimeUntil1AM();
    const interval = setInterval(calculateTimeUntil1AM, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">{params.show} - Episodes</h1>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full"></div>
        </div>
      ) : episodes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 space-y-6">
          <div className="text-center">
            <p className="text-lg text-muted-foreground mb-2">
              Next episode drops at
            </p>
            <h2 className="text-5xl font-bold text-primary">1:00 AM</h2>
          </div>

          <div className="flex items-center gap-2 text-2xl font-mono">
            <Clock className="h-5 w-5 text-primary animate-pulse" />
            <span className="tabular-nums">
              {String(timeRemaining.hours).padStart(2, "0")}:
              {String(timeRemaining.minutes).padStart(2, "0")}:
              {String(timeRemaining.seconds).padStart(2, "0")}
            </span>
          </div>

          <div className="w-64 h-1 bg-muted overflow-hidden rounded-full">
            <div
              className="h-full bg-primary transition-all duration-1000"
              style={{
                width: `${
                  100 -
                  ((timeRemaining.hours * 60 + timeRemaining.minutes) /
                    (24 * 60)) *
                    100
                }%`,
              }}
            ></div>
          </div>

          <button
            className="mt-4 px-6 py-2 bg-background border border-input rounded-full hover:bg-muted transition-all duration-300 transform hover:scale-105"
            onClick={() => window.location.reload()}
          >
            Check again
          </button>
        </div>
      ) : (
        <ul className="space-y-3">
          {episodes.map((episode, index) => (
            <li key={index}>
              <Link
                href={`/tvshows/${params.show}/${episode}`}
                className="block p-3 border-b border-muted hover:bg-muted/30 transition-colors rounded-sm"
              >
                Episode {index + 1}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ShowPage;
