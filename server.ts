const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(cors());

const mimeTypes: { [key: string]: string } = {
  ".mp4": "video/mp4",
  ".mkv": "video/x-matroska",
};

const findVideoFile = (folder: string, episode: string): string | null => {
  const episodeName = episode.split(".")[0];

  const files = fs.readdirSync(folder);
  console.log("Looking in folder:", folder);
  console.log("Files found:", files);

  const videoFile = files.find((file: string) => {
    console.log(
      `Checking if file ${file} matches ${episodeName}.mkv or ${episodeName}.mp4`
    );
    return file === `${episodeName}.mkv` || file === `${episodeName}.mp4`;
  });

  console.log("Found video file:", videoFile);

  return videoFile ? path.join(folder, videoFile) : null;
};

app.get("/tvshows/:show/:episode", (req: any, res: any) => {
  const { show, episode } = req.params;
  console.log(`Received request for show: ${show}, episode: ${episode}`);

  const folderPath = path.join(__dirname, "videos/tvshows", show);
  console.log("Looking for episode in folder:", folderPath);

  const videoPath = findVideoFile(folderPath, episode);

  if (videoPath) {
    const ext = path.extname(videoPath).toLowerCase();
    const mimeType = mimeTypes[ext];
    if (mimeType) {
      res.setHeader("Content-Type", mimeType);
      console.log("Setting Content-Type:", mimeType);
    }

    console.log("Video file found:", videoPath);
    res.sendFile(videoPath);
  } else {
    console.log("Episode not found");
    res.status(404).json({ error: "Episode not found" });
  }
});

app.get("/api/tvshows", (req: any, res: any) => {
  const tvShowsPath = path.join(__dirname, "videos/tvshows");
  const tvShows = fs.readdirSync(tvShowsPath).map((show: any) => {
    const episodes = fs
      .readdirSync(path.join(tvShowsPath, show))
      .filter((file: any) => file.endsWith(".mp4") || file.endsWith(".mkv"));
    return { name: show, episodes };
  });
  res.json(tvShows);
});

app.get("/api/tvshows/:show", (req: any, res: any) => {
  const { show } = req.params;
  const tvShowsPath = path.join(__dirname, "videos/tvshows");
  const showPath = path.join(tvShowsPath, show);

  console.log(`Received request for show: ${show}`);
  console.log(`Looking for episodes in folder: ${showPath}`);

  if (fs.existsSync(showPath)) {
    const episodes = fs
      .readdirSync(showPath)
      .filter((file: any) => file.endsWith(".mp4") || file.endsWith(".mkv"));
    console.log(`Found episodes: ${episodes}`);
    return res.json({ episodes });
  } else {
    console.error(`Show ${show} not found`);
    res.status(404).json({ error: "Show not found" });
  }
});

app.listen(PORT, () => {
  console.log(`🎥 TV Show server running at http://localhost:${PORT}`);
});
