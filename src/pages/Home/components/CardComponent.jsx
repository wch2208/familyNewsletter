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
  const { expand, ...other } = props;
  return <Typography {...other} />;
})(({ expand }) => ({
  //
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

export default function CardComponent() {
  const [expanded, setExpanded] = React.useState(false);

  //firebase에 등록된 데이터 가져오기
  const articleBody =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, velit. Dicta repellendus veniam sapiente quae fugiat ipsam ipsa  facilis minima error pariatur? Qui quaerat ipsa a magnam et?  Architecto, quia. Lorem ipsum dolor sit amet consectetur adipisicing  elit. Voluptatem, velit. Dicta repellendus veniam sapiente quae  fugiat ipsam ipsa facilis minima error pariatur? Qui quaerat ipsa a  magnam et? Architecto, quia. Lorem ipsum dolor sit amet consectetur  adipisicing elit. Voluptatem, velit. Dicta repellendus veniam  sapiente quae fugiat ipsam ipsa facilis minima error pariatur? Qui  quaerat ipsa a magnam et? Architecto, quia. Lorem ipsum dolor sit  amet consectetur adipisicing elit. Voluptatem, velit. Dicta  repellendus veniam sapiente quae fugiat ipsam ipsa facilis minima  error pariatur? Qui quaerat ipsa a magnam et? Architecto, quia.  Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem,  velit. Dicta repellendus veniam sapiente quae fugiat ipsam ipsa  facilis minima error pariatur? Qui quaerat ipsa a magnam et? Architecto, quia.";

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card
      sx={{
        maxWidth: "1024px",
        minWidth: "375px",
        borderRadius: "50px",
        margin: "20px auto",
      }}
    >
      <CardHeader
        sx={{ ml: 5 }}
        title="Shrimp and Chorizo PaellaShrimp and Chorizo PaellaShrimp and Chorizo Paella"
      />

      <CardMedia
        component="img"
        height="400"
        image={`https://picsum.photos/1920/1300`}
        alt="random_img"
      />

      <CardContent
        onClick={handleExpandClick}
        sx={{ height: "60px", ml: 2, overflow: "hidden" }}
      >
        <AbbreviateAnimatedTypography expand={expanded}>
          {articleBody}
        </AbbreviateAnimatedTypography>
      </CardContent>
      <CardActions disableSpacing>
        {/* <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton> */}
        {/* <IconButton aria-label="share">
          <ShareIcon />
        </IconButton> */}
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
            {articleBody}
          </AnimatedTypography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
