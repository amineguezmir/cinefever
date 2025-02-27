"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ExternalLink, MessageSquare, Star, ThumbsUp } from "lucide-react";
import { motion } from "framer-motion";

interface ReviewAuthorDetails {
  avatar_path: string | null;
  name: string;
  rating: number | null;
  username: string;
}

interface Review {
  author: string;
  author_details: ReviewAuthorDetails;
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
}

export function MovieReviews({ reviews = [] }: { reviews: Review[] }) {
  return (
    <section className="my-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-500 to-red-600 bg-clip-text text-transparent">
            Fan Reviews
          </h2>
          <Button variant="outline" className="gap-1 group">
            See all reviews
            <MessageSquare className="w-4 h-4 transition-transform group-hover:scale-110" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.slice(0, 4).map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [helpfulCount, setHelpfulCount] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);

  const handleHelpfulClick = () => {
    if (!hasVoted) {
      setHelpfulCount(helpfulCount + 1);
      setHasVoted(true);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  const getExcerpt = (content: string) => {
    const contentWithoutUrl = content
      .replace(/Read the full review here: https?:\/\/\S+$/i, "")
      .trim();

    if (contentWithoutUrl.includes("\r\n")) {
      return contentWithoutUrl.split("\r\n")[0];
    }

    return contentWithoutUrl;
  };

  const extractReviewUrl = (content: string) => {
    const urlMatch = content.match(
      /Read the full review here: (https?:\/\/\S+)/i
    );
    return urlMatch ? urlMatch[1] : review.url;
  };

  const reviewUrl = extractReviewUrl(review.content);
  const rating = review.author_details.rating;
  const avatarSrc = review.author_details.avatar_path
    ? review.author_details.avatar_path.startsWith("/")
      ? `https://image.tmdb.org/t/p/w100_and_h100_face${review.author_details.avatar_path}`
      : review.author_details.avatar_path
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card className="h-full overflow-hidden border-2 hover:border-amber-500/50 transition-all duration-300 shadow-md hover:shadow-amber-500/20">
        <CardHeader className="pb-2 relative">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 border-2 border-amber-500/50 shadow-md">
              {avatarSrc ? (
                <AvatarImage src={avatarSrc} alt={review.author} />
              ) : (
                <AvatarImage
                  src={`https://ui-avatars.com/api/?name=${review.author}&background=random`}
                  alt={review.author}
                />
              )}
              <AvatarFallback className="bg-gradient-to-br from-amber-400 to-red-500 text-white">
                {review.author.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg">{review.author}</span>
                {review.author_details.username !== review.author && (
                  <span className="text-xs text-muted-foreground">
                    @{review.author_details.username}
                  </span>
                )}
              </div>
              <div className="text-xs text-muted-foreground">
                {formatDate(review.created_at)}
              </div>
            </div>
          </div>
          {rating !== null && (
            <div className="absolute top-4 right-6 flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.round(rating / 2)
                      ? "fill-amber-500 text-amber-500"
                      : "text-muted-foreground"
                  }`}
                />
              ))}
            </div>
          )}
        </CardHeader>
        <CardContent>
          <div className="relative">
            <p className={`text-sm ${isExpanded ? "" : "line-clamp-3"}`}>
              {isExpanded ? review.content : getExcerpt(review.content)}
            </p>
            {review.content.length > 150 && (
              <Button
                variant="link"
                className="p-0 h-auto text-amber-600 hover:text-amber-700"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? "Show less" : "Read more"}
              </Button>
            )}
          </div>
        </CardContent>
        <CardFooter className="pt-0 flex justify-between items-center">
          <Button
            variant="ghost"
            size="sm"
            className="gap-1 text-xs"
            onClick={handleHelpfulClick}
            disabled={hasVoted}
          >
            <ThumbsUp
              className={`h-3.5 w-3.5 ${
                hasVoted ? "fill-amber-500 text-amber-500" : ""
              }`}
            />
            Helpful {helpfulCount > 0 && `(${helpfulCount})`}
          </Button>
          <div className="flex items-center gap-2">
            {rating !== null && (
              <Badge
                variant="outline"
                className="bg-amber-500/10 hover:bg-amber-500/20"
              >
                {rating}/10
              </Badge>
            )}
            {reviewUrl && (
              <Button
                variant="outline"
                size="sm"
                className="h-7 px-2"
                onClick={() => window.open(reviewUrl, "_blank")}
              >
                <ExternalLink className="h-3.5 w-3.5" />
                <span className="sr-only">Read full review</span>
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
