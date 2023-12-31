import { useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import LongMenu from "./EditBtn";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { Stack, TextareaAutosize } from "@mui/material";
import { useState } from "react";

EditCard.propTypes = {
  id: PropTypes.number.isRequired, // Use the appropriate type
  editClose: PropTypes.func.isRequired, // Use the appropriate type
  editComplete: PropTypes.func.isRequired, // Use the appropriate type
};

export default function EditCard({ id, editClose, editComplete }) {
  //newsList에서 id일치하는 데이터 참조하기
  let newsData = useSelector(state => state.news.newsList);
  newsData = newsData.filter(news => news.id === id);

  const [title, setTitle] = useState(newsData[0].title);
  const [content, setContent] = useState(newsData[0].content);

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
        zIndex: 3,
        position: "absolute",
        left: 0,
        width: "99%",
        maxWidth: "1024px",
        borderRadius: "50px",
      }}
    >
      <CardHeader
        sx={{ pl: 2, pr: 2, pb: 0 }}
        title={
          <TextareaAutosize
            defaultValue={newsData[0].title}
            style={{ fontSize: "20px", width: "100%" }}
            maxRows={2}
            onChange={e => setTitle(e.target.value)}
          />
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
        <LongMenu id={newsData[0].id} />
        <Typography variant="caption" sx={{ p: 1 }}>
          {timeSince(newsData[0].updatedAt)}
        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        height={300}
        //랜덤이미지 또는 S3 버킷에 업로드한 이미지 삽입
        image={`https://picsum.photos/1920/1300?random=${newsData[0].id}`}
        alt="random_img"
      />
      <Collapse in={true} timeout="auto" unmountOnExit>
        <CardContent
          sx={{ width: "99%", display: "flex", flexDirection: "column" }}
        >
          <TextareaAutosize
            defaultValue={newsData[0].content}
            style={{ fontSize: "24px" }}
            maxRows={10}
            onChange={e => setContent(e.target.value)}
          />
          <Stack
            spacing={2}
            direction={"row"}
            sx={{ justifyContent: "center", height: "60px", p: 1 }}
          >
            <Button
              size={"large"}
              variant={"contained"}
              onClick={() => {
                const payload = { id, title, content };
                editComplete(payload);
                editClose();
              }}
            >
              완료
            </Button>
            <Button size={"large"} variant={"outlined"} onClick={editClose}>
              취소
            </Button>
          </Stack>
        </CardContent>
      </Collapse>
    </Card>
  );
}
