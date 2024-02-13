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

import { TimeSince } from "../../utils/TimeSince";

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
  const contentArr = newsData.content.split("\n");

  //이미지 url 배열
  const imageArr = newsData.imageUrl
    ? newsData.imageUrl.split(";")
    : [`https://picsum.photos/1920/1300?random=${newsData.id}`];

  return (
    <Card
      sx={{
        maxWidth: "1920px",
        borderRadius: "50px",
        mt: "20px",
        mb: "0px",
        ml: "auto",
        mr: "auto",
        pr: "20px",
        pl: "20px",
      }}
    >
      <CardHeader
        sx={{ mb: 0, pb: 0 }}
        title={
          <Typography
            sx={{
              height: "64px",
              overflow: "hidden",
            }}
            variant="h6"
          >
            {newsData.title}
          </Typography>
        }
      />
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
          {TimeSince(newsData.updatedAt)}
        </Typography>
      </CardContent>

      {imageArr.map((url, index) => {
        return (
          <CardMedia
            key={index}
            component="img"
            sx={{
              overflow: "hidden",
              objectPosition: "center",
              height: "200px",
            }}
            image={url}
            alt="random_img"
          />
        );
      })}

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
              {content}
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
