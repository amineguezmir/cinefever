"use client";
import IconButton from "@/components/ui/IconButton";
import { getTVEpisodePlayers } from "@/utils/players";
import {
  Card,
  Image,
  Skeleton,
  Select,
  SelectItem,
  Tooltip,
} from "@nextui-org/react";
import { forwardRef, useState, useEffect } from "react";
import { FaPlay, FaStar } from "react-icons/fa6";
import { IoIosRocket, IoMdHelpCircle } from "react-icons/io";
import { FaAd } from "react-icons/fa";
import AdsWarning from "@/components/ui/AdsWarning";

export interface TVPlayerProps {
  tvId: string;
  season: string;
  episode: string;
  backdrop: string;
  title: string;
}

const TVPlayer = forwardRef<HTMLDivElement, TVPlayerProps>(
  ({ tvId, season, episode, backdrop, title }, ref) => {
    console.log("TVPlayer Component Rendered", tvId, season, episode);

    const players = getTVEpisodePlayers(tvId, season, episode);
    console.log("Players fetched:", players);

    const [warning, setWarning] = useState(false);
    const [playEpisode, setPlayEpisode] = useState(true);
    const [selectedSource, setSelectedSource] = useState<string>(
      players?.[0]?.title || ""
    );

    useEffect(() => {
      console.log("playEpisode state changed:", playEpisode);
    }, [playEpisode]);

    useEffect(() => {
      console.log("warning state changed:", warning);
    }, [warning]);

    useEffect(() => {
      console.log("Selected source changed:", selectedSource);
    }, [selectedSource]);

    const handlePlay = () => {
      console.log("handlePlay called");
      setPlayEpisode(true);
    };

    const Placeholder = () => (
      <Card shadow="md" className="group aspect-video size-full">
        <Image
          isBlurred
          alt={title}
          className="size-full"
          classNames={{
            wrapper:
              "absolute-center aspect-video size-full group-hover:opacity-70 transition",
          }}
          src={backdrop}
        />
        <IconButton
          icon={<FaPlay />}
          radius="full"
          tooltip={`Play ${title}`}
          className="absolute-center"
          color="warning"
          variant="faded"
          size="lg"
          onPress={handlePlay}
        />
      </Card>
    );

    const PlayerTabs = () => {
      console.log("Rendering PlayerTabs...");
      return players.map(
        ({ title, source }) =>
          selectedSource === title && (
            <Card key={title} shadow="md" className="relative">
              <Skeleton className="absolute aspect-video size-full" />
              <iframe
                className="z-10 aspect-video size-full"
                src={source}
                allowFullScreen
              />
            </Card>
          )
      );
    };

    const SourceSelection = () => (
      <div className="flex items-center justify-center gap-2">
        <Select
          disallowEmptySelection
          selectionMode="single"
          size="sm"
          label="Selected Source"
          placeholder="Select source"
          className="max-w-xs"
          defaultSelectedKeys={[selectedSource]}
          selectedKeys={[selectedSource]}
          onChange={({ target }) => {
            console.log("Source selection changed:", target.value);
            setSelectedSource(target.value);
          }}
        >
          {players.map(({ title, recommended, fast, ads }) => (
            <SelectItem key={title} value={title} textValue={title}>
              <div className="flex items-center space-x-2">
                <span>{title}</span>
                {recommended && <FaStar className="text-warning-500" />}
                {fast && <IoIosRocket className="text-danger-500" />}
                {ads && <FaAd className="text-primary-500" />}
              </div>
            </SelectItem>
          ))}
        </Select>
        <Tooltip
          content={
            <div className="space-y-2 px-1 py-2">
              <div className="flex items-center gap-2">
                <FaStar className="text-warning-500" />
                <span>Recommended</span>
              </div>
              <div className="flex items-center gap-2">
                <IoIosRocket className="text-danger-500" />
                <span>Fast hosting</span>
              </div>
              <div className="flex items-center gap-2">
                <FaAd className="text-primary-500" />
                <span>May contain popup ads</span>
              </div>
            </div>
          }
          placement="right"
          showArrow
        >
          <div>
            <IoMdHelpCircle size={24} className="cursor-help" />
          </div>
        </Tooltip>
      </div>
    );

    return (
      <section
        id="tv-player"
        ref={ref}
        className="z-[3] aspect-video size-auto"
      >
        {playEpisode ? (
          <div className="space-y-5">
            <PlayerTabs />
            <SourceSelection />
          </div>
        ) : (
          <Placeholder />
        )}
        {warning && <AdsWarning />}
      </section>
    );
  }
);

TVPlayer.displayName = "TVPlayer";

export default TVPlayer;
