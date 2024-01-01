import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LongMenu from "./EditBtn";

//확장 버튼 애니메이션 스타일
const ExpandMore = styled(props => {
  // eslint-disable-next-line no-unused-vars
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

//본문 요약 애니메이션 스타일
const AbbreviateAnimatedTypography = styled(props => {
  // eslint-disable-next-line no-unused-vars
  const { expand, ...other } = props;
  return <Typography {...other} />;
})(({ expand }) => ({
  animation: expand
    ? "AbbreviateMoveAndFadeIn 0.3s ease-in-out forwards"
    : "AbbreviateMoveAndFadeOut 0.3s ease-in-out forwards",
  "@keyframes AbbreviateMoveAndFadeIn": {
    from: {
      transform: "translateY(0)",
      opacity: 1,
    },
    to: {
      transform: "translateY(40px)",
      opacity: 0,
    },
  },
  "@keyframes AbbreviateMoveAndFadeOut": {
    from: {
      transform: "translateY(40px)",
      opacity: 0,
    },
    to: {
      transform: "translateY(0)",
      opacity: 1,
    },
  },
}));

//본문 내용 애니메이션 스타일
const AnimatedTypography = styled(props => {
  // eslint-disable-next-line no-unused-vars
  const { expand, ...other } = props;
  return <Typography {...other} />;
})(({ expand }) => ({
  animation: expand
    ? "moveAndFadeIn 0.3s ease-in-out forwards"
    : "moveAndFadeOut 0.3s ease-in-out forwards",
  "@keyframes moveAndFadeIn": {
    from: {
      transform: "translateY(-40px)",
      opacity: 0,
    },
    to: {
      transform: "translateY(0)",
      opacity: 1,
    },
  },
  "@keyframes moveAndFadeOut": {
    from: {
      transform: "translateY(0)",
      opacity: 1,
    },
    to: {
      transform: "translateY(-40px)",
      opacity: 0,
    },
  },
}));

export default function CardComponent(newsData) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  //본문 줄바꿈을 위한 배열 생성
  const contentArr = newsData.content.split(".");

  //이미지 url 배열
  const imageArr = newsData.imageUrl
    ? newsData.imageUrl.split(";")
    : ["https://picsum.photos/1920/1300"];

  console.log("imageArr", imageArr);
  //게시물 작성 경과 시간 표시
  function timeSince(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    let interval = seconds / 31536000; // 1년의 초

    if (interval > 1) {
      return Math.floor(interval) + "년 전";
    }
    interval = seconds / 2592000; // 1달의 초
    if (interval > 1) {
      return Math.floor(interval) + "달 전";
    }
    interval = seconds / 86400; // 1일의 초
    if (interval > 1) {
      return Math.floor(interval) + "일 전";
    }
    interval = seconds / 3600; // 1시간의 초
    if (interval > 1) {
      return Math.floor(interval) + "시간 전";
    }
    interval = seconds / 60; // 1분의 초
    if (interval > 1) {
      return Math.floor(interval) + "분 전";
    }
    return Math.floor(seconds) + "초 전";
  }

  return (
    <Card
      sx={{
        maxWidth: "1024px",
        borderRadius: "50px",
        mt: "20px",
        mb: "20px",
        ml: "8px",
        mr: "8px",
      }}
    >
      <CardHeader title={newsData.title} />
      <CardContent
        sx={{
          m: 0,
          p: 0,
          height: "40px",
          overflow: "hidden",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <LongMenu id={newsData.id} />
        <Typography variant="caption" sx={{ p: 1 }}>
          {timeSince(newsData.updatedAt)}
        </Typography>
      </CardContent>

      {imageArr.map((url, index) => {
        return (
          <CardMedia
            key={index}
            component="img"
            sx={{ overflow: "hidden", height: "200px" }}
            image={url}
            alt="random_img"
          />
        );
      })}

      <CardContent
        onClick={handleExpandClick}
        sx={{ height: "60px", ml: 2, overflow: "hidden", color: "#D3D3D3" }}
      >
        <AbbreviateAnimatedTypography expand={expanded}>
          {newsData.content}
        </AbbreviateAnimatedTypography>
      </CardContent>
      <CardActions disableSpacing>
        <ExpandMore
          sx={{ width: "100%" }}
          disableRipple={true}
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent sx={{ ml: 5, mr: 5, p: 0 }}>
          {contentArr.map((content, index) => (
            <AnimatedTypography
              expand={expanded}
              key={index}
              sx={{ mt: "10px", overflow: "hidden" }}
            >
              {content}.
            </AnimatedTypography>
          ))}
        </CardContent>
        <CardActions disableSpacing>
          <ExpandMore
            sx={{ width: "100%" }}
            disableRipple={true}
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
      </Collapse>
    </Card>
  );
}
