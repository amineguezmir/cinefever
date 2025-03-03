"use client";

import { Button } from "@/components/ui/button";
import { useCallback } from "react";

export function WatchNowButton() {
  const scrollToPlayer = useCallback(() => {
    const playerElement = document.getElementById("movie-player");
    if (playerElement) {
      playerElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, []);

  return <Button onClick={scrollToPlayer}>Watch Now</Button>;
}
