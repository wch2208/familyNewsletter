import { useEffect, useState } from "react";
import { Grid, Typography, Grow, Button, styled } from "@mui/material";
import mainVideo from "../../assets/mainVideo.mp4";
import ArrowDownwardTwoToneIcon from "@mui/icons-material/ArrowDownwardTwoTone";
import CardComponent from "./components/CardComponent";
import { Link } from "react-router-dom";
import BasicSpeedDial from "../../components/common/SpeedDial";

function HomePage() {
  const [checked, setChecked] = useState(true);
  const [title, setTitle] = useState([]); //hero section에서 슬라이드 타이틀
  const [data, setData] = useState([]); //RDS 뉴스 데이터

  useEffect(() => {
    // 뉴스 데이터를 불러오는 함수
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.familynewsletter-won.com/news"
        );
        const result = await response.json();
        setData(result);
        //resert.title 중에 인덱스 0~4까지만 따로 배열로 저장
        const titleArray = result
          .filter((v, i) => i < 5)
          .map(item => item.title);
        setTitle(titleArray);
      } catch (error) {
        console.error("데이터를 불러오는 데 실패했습니다.", error);
      }
    };

    fetchData();
  }, []); // 빈 배열을 전달하여 컴포넌트 마운트 시에만 실행

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

  //------------------------- 제목 요약 슬라이드 ---------------------------//
  const TitleSlide = styled(Typography)(({ theme }) => ({
    position: "absolute",
    left: "5%",
    top: "240px",
    color: "white",
    width: "90vw",
    overflow: "hidden",

    // 미디어 쿼리를 사용하여 브레이크포인트에 따른 스타일 정의
    [theme.breakpoints.up("sm")]: {
      display: "flex",
      justifyContent: "center",
    },
  }));
  //------------------------- 제목 요약 슬라이드 ---------------------------//

  return (
    <>
      <Grid
        id="outline"
        container
        sx={{
          overflow: "hidden",
          backgroundColor: "#f2f2f2",
          p: 0,
          m: 0,
        }}
      >
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
          <Grow
            in={checked}
            style={{ transformOrigin: "50% 100% 0" }}
            {...(checked ? { timeout: 1000 } : { timeout: 1000 })}
          >
            <TitleSlide xs={12} variant="h5" noWrap={true}>
              {title[index]}
            </TitleSlide>
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
          <BasicSpeedDial />
        </Grid>
        <Grid container id="list-section">
          {data.map(newsData => (
            <Grid item xs={12} md={6} key={newsData.id}>
              <CardComponent {...newsData} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </>
  );
}
export default HomePage;
