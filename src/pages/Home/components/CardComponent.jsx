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
      <CardHeader sx={{ ml: 2 }} title={newsData.title} />

      <CardMedia
        component="img"
        height="400"
        //랜덤이미지 또는 S3 버킷에 업로드한 이미지 삽입
        image={`https://picsum.photos/1920/1300?random=${newsData.id}`}
        alt="random_img"
      />

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
          <AnimatedTypography expand={expanded}>
            {newsData.content}
          </AnimatedTypography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
