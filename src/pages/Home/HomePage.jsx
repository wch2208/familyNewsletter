import { useEffect, useState } from "react";
import { Grid, Typography, Grow, Button } from "@mui/material";
import mainVideo from "../../assets/mainVideo.mp4";
import ArrowDownwardTwoToneIcon from "@mui/icons-material/ArrowDownwardTwoTone";

function HomePage() {
  const [checked, setChecked] = useState(true);
  const [title] = useState([
    "1. 지속 가능한 미래를 위한 새로운 기술: 청정 에너지 혁신",
    "2. 글로벌 건강 위기에 대응하는 혁신적인 의료 기술 개발 동향",
    "3. 스마트 시티 기술의 발전과 도시 생활의 변화",
  ]); //전역상태로 바꾸자
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let timeoutId;

    const interval = setInterval(() => {
      setChecked(false);

      timeoutId = setTimeout(() => {
        setIndex(index => (index + 1) % title.length);
        setChecked(true);
      }, 1000);
    }, 3000);

    return () => {
      clearInterval(interval);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [title.length]);

  return (
    //컨테이너
    //이미지컨테이너
    //소개문구
    //제목슬라이더
    //----------------------------  hero section ------------------//
    <Grid
      id="outline"
      container
      spacing={2}
      sx={{
        overflow: "hidden",
      }}
    >
      <Grid
        id="hero-section"
        container
        spacing={2}
        sx={{
          overflow: "hidden",
          justifyContent: "center",
        }}
      >
        <video autoPlay loop muted id="video" overflow="hidden">
          <source src={mainVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <Typography
          xs={12}
          variant="h2"
          sx={{ zIndex: 1, position: "absolute", top: "100px" }}
        >
          Famaily Newsletter
        </Typography>
        <Grow
          in={checked}
          style={{ transformOrigin: "50% 100% 0" }}
          {...(checked ? { timeout: 1000 } : { timeout: 1000 })}
        >
          <Typography
            xs={12}
            variant="h5"
            noWrap={true}
            sx={{
              zIndex: 0,
              position: "absolute",
              top: "240px",
              left: "20%",
              color: "white",
              width: "80%",
            }}
          >
            {title[index]}
          </Typography>
        </Grow>
        <Typography
          xs={12}
          variant="overline"
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
        <Button
          variant="outlined"
          href="/"
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
        <ArrowDownwardTwoToneIcon
          sx={{
            zIndex: 1,
            position: "absolute",
            top: "95%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "white",
            fontSize: "50px",
          }}
        />
      </Grid>
      <Grid container id="list-section" sx={{ height: "2000px" }}></Grid>
    </Grid>
  );
}
export default HomePage;
