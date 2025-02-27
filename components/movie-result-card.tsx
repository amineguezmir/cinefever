import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Calendar, Clock, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MovieResultCardProps {
  id: number;
  title: string;
  posterPath: string;
  rating: number;
  year: number;
  overview: string;
  index: number;
}

export const MovieResultCard = ({
  id,
  title,
  posterPath,
  rating,
  year,
  overview,
  index,
}: MovieResultCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const posterUrl = posterPath
    ? `https://image.tmdb.org/t/p/w500${posterPath}`
    : "/placeholder.svg?height=750&width=500";

  const circumference = 2 * Math.PI * 20;
  const strokeDashoffset = circumference - (rating / 10) * circumference;

  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <Link href={`/movie/${id}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{
          duration: 0.5,
          delay: index * 0.1,
          ease: [0.23, 1, 0.32, 1],
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="relative h-[280px] rounded-2xl overflow-hidden cursor-pointer group"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 z-10" />
        <Image
          src={posterUrl || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        <div className="absolute inset-0 z-20 p-6 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
              className="bg-black/30 backdrop-blur-md rounded-lg px-3 py-1.5 text-xs font-medium text-white/90"
            >
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {year}
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
              className="relative flex items-center justify-center"
            >
              <svg className="w-[50px] h-[50px] rotate-[-90deg]">
                <circle
                  cx="25"
                  cy="25"
                  r="20"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  className="text-white/10"
                />
                <circle
                  cx="25"
                  cy="25"
                  r="20"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  className={cn(
                    "transition-all duration-700",
                    rating >= 7.5
                      ? "text-green-500"
                      : rating >= 6
                      ? "text-yellow-500"
                      : "text-red-500"
                  )}
                />
              </svg>
              <span className="absolute text-sm font-bold text-white">
                {rating.toFixed(1)}
              </span>
            </motion.div>
          </div>

          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
              className="text-xl font-bold text-white mb-2 line-clamp-2"
            >
              {title}
            </motion.h3>

            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: isHovered ? 1 : 0,
                height: isHovered ? "auto" : 0,
              }}
              transition={{ duration: 0.3 }}
              className="space-y-3"
            >
              <p className="text-sm text-white/80 line-clamp-2">{overview}</p>

              <div className="flex gap-2">
                <button
                  onClick={handleButtonClick}
                  className="px-4 py-1.5 rounded-lg bg-primary/90 hover:bg-primary text-white text-sm font-medium transition-colors"
                >
                  Watch Now
                </button>
                <button
                  onClick={handleButtonClick}
                  className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-medium backdrop-blur-sm transition-colors"
                >
                  Add to List
                </button>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-10"
          />
        </div>
      </motion.div>
    </Link>
  );
};
