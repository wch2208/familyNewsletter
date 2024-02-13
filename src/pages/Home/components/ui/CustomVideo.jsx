import { styled } from "@mui/material";
import React from "react";
import mainVideo from "../../../../assets/mainVideo.mp4";

const Video = styled("video")({
  pointerEvents: "none",
  overflow: "hidden",
});

function CustomVideo() {
  return (
    <Video autoPlay playsInline loop muted>
      <source src={mainVideo} type="video/mp4" />
      Your browser does not support the video tag.
    </Video>
  );
}

export default CustomVideo;
