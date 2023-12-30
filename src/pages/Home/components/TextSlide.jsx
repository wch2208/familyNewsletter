import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { storeLatestFiveNewsTitles } from "../../../features/news/newsSlice";
import { styled } from "@mui/material";
import "./TextSlide.css";

const TextSlide = () => {
  //슬라이드 효과에 들어가는 글자 스타일
  const StyledTypography = styled(Typography)(({ theme }) => ({
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
  //
  const dispatch = useDispatch();
  const newsList = useSelector(state => state.news.newsList);
  const titleList = useSelector(state => state.news.titleList);

  useEffect(() => {
    dispatch(storeLatestFiveNewsTitles(newsList));
  }, [newsList, dispatch]);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const nextIndex = (currentIndex + 1) % titleList.length;
    const timer = setTimeout(() => setCurrentIndex(nextIndex), 4000); // 4초마다 변경
    return () => clearTimeout(timer);
  }, [currentIndex, titleList.length]);

  return (
    <Box className="slider" sx={{ height: 0 }}>
      <StyledTypography variant="h5" className="text">
        {titleList[currentIndex]}
      </StyledTypography>
    </Box>
  );
};

export default TextSlide;
