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
  const articleBody = `"바닷가로 떠나 기대했던 햇살 가득한 풍경을 그리며 짐 가방을 싸던 찬희씨. 그러나 간절한 기대와 달리 몽롱한 구름이 뒤덮인 해변은 그에게 생각지도 못한 장면을 선사하였다. "사실 흐린 날씨라 바다 풍경이 아쉬웠어요,"라고 털어놓은 찬희씨. 그러나 이어진 이야기는 우리 모두에게 익숙한 '날씨 예보의 배신'에 대한 또 다른 해석을 제공했다.

  갈매기도 우울해 보이고 파도 소리만이 쓸쓸히 해변을 울려퍼졌던 날, 찬희씨는 바다의 또 다른 얼굴을 마주했다. 잔잔하게 출렁이는 바다 위에 자리 잡은 구름 무리가 형형색색 빛을 흘리며 바다에 또 다른 수채화를 그려냈다고. 비록 햇살은 감췄지만, 찬희씨의 마음속에는 뜻밖의 조용하고 평화로운 휴식이 자리 잡았다고 한다.
  
  그렇게 찬희씨는 바다와 구름의 은밀한 대화에 귀 기울이며, 잊고 있었던 자연의 소박한 아름다움에 다시 한번 눈을 떴다. "감탄 없이 쉽게 지나쳤을 풍경에 감사함을 느꼈어요. 바다도 운치 있게 구름 장막에 가려져 있더라고요." 라며 웃으며 말하는 찬희씨의 모습에서, 날씨라는 예측 불가능한 요소가 오히려 새로운 추억을 선사할 수도 있다는 것을 우리 모두에게 상기시킨다.
  
  결국, 바다에서의 아쉬움이었다고 생각했던 그 날은 찬희씨에게 기대하지 않았던 새로운 의미와 여운을 남겼다. 마치 구름이 지나간 후 더 맑고 투명해진 하늘처럼, 찬희씨의 바닷가 이야기는 우리에게 흐린 날씨마저 즐길 수 있는 방법을 알려주는 듯하다. 마법 같은 바다의 신비로움이 이렇게 일상 속에 스며든다니, 이제 우리는 구름 낀 바다를 만나더라도 작은 실망 대신 큰 기대를 가질 수 있을 것 같다."`;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card
      sx={{
        maxWidth: "1024px",

        borderRadius: "50px",
        // margin: "20px auto",
        mt: "20px",
        mb: "20px",
        ml: "8px",
        mr: "8px",
      }}
    >
      <CardHeader
        sx={{ ml: 2 }}
        title="구름 낀 하늘이 선사한 바다의 특별한 매력 "
      />

      <CardMedia
        component="img"
        height="400"
        image={`https://picsum.photos/1920/1300`}
        alt="random_img"
      />

      <CardContent
        onClick={handleExpandClick}
        sx={{ height: "60px", ml: 2, overflow: "hidden", color: "#D3D3D3" }}
      >
        <AbbreviateAnimatedTypography expand={expanded}>
          {articleBody.substring(0, 50)}...
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
