import VideoPlayer from "@/components/VideoPlayer";

const EpisodePage = ({
  params,
}: {
  params: { show: string; episode: string };
}) => {
  return (
    <div>
      <h1>
        Watching {params.show} - Episode {params.episode}
      </h1>
      <VideoPlayer show={params.show} episode={params.episode} />
    </div>
  );
};

export default EpisodePage;
