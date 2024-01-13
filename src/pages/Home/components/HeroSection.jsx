import mainVideo from "../../../assets/mainVideo.mp4";
import ArrowDownwardTwoToneIcon from "@mui/icons-material/ArrowDownwardTwoTone";
import { Link } from "react-router-dom";
import { Grid, Typography, Button } from "@mui/material";
import TextSlide from "./TextSlide";

function HeroSection() {
  return (
    <Grid
      id="hero-section"
      container
      sx={{
        overflow: "hidden",
        justifyContent: "center",
        mb: 1,
        objectFit: "cover",
      }}
    >
      <video
        autoPlay
        playsInline
        loop
        muted
        id="video"
        overflow="hidden"
        style={{ pointerEvents: "none" }}
      >
        <source src={mainVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <Typography
        xs={12}
        variant="h2"
        sx={{ zIndex: 1, position: "absolute", top: "100px" }}
      >
        Family Newsletter
      </Typography>

      <TextSlide />

      <Typography
        xs={12}
        variant="subtitle1"
        sx={{
          zIndex: 1,
          position: "absolute",
          top: "540px",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "white",
          width: "90%",
          textAlign: "center",
        }}
      >
        챗봇과 인터뷰하면 기사가 자동으로 생성됩니다.
      </Typography>
      <Link to="/chatpage">
        <Button
          variant="outlined"
          sx={{
            zIndex: 0,
            position: "absolute",
            top: "500px",
            left: "50%",
            transform: "translate(-50%, -50%)",
            border: "3px solid white",
            color: "black",
            fontSize: "20px",
            backgroundColor: "#FEE500",
            "&:hover": {
              backgroundColor: "#FEE500",
              color: "black",
              border: "3px solid red",
            },
          }}
        >
          인터뷰 시작하기
        </Button>
      </Link>

      <ArrowDownwardTwoToneIcon
        sx={{
          zIndex: 1,
          position: "absolute",
          top: "650px",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "white",
          fontSize: "50px",
        }}
      />
    </Grid>
  );
}

export default HeroSection;
