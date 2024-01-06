//EditCard.jsx
import { useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Stack, TextareaAutosize } from "@mui/material";
import { useState } from "react";
import PropTypes from "prop-types";
import InputFileUpload from "../../../components/common/UploadBtn";
import { TimeSince } from "../components/TimeSince";
import { useDispatch } from "react-redux";
import { updateNews } from "../../../features/news/newsSlice";

EditCard.propTypes = {
  id: PropTypes.number.isRequired,
  editClose: PropTypes.func.isRequired,
  // editComplete: PropTypes.func.isRequired,
};

/**
 * EditCard 컴포넌트는 뉴스 기사의 제목과 내용을 수정할 수 있는 카드 형태의 UI를 제공합니다.
 * 이 컴포넌트는 기사의 id를 받아 해당 뉴스 데이터를 참조하며,
 * 수정된 내용을 완료 버튼 클릭 시 상위 컴포넌트로 전달하여 업데이트를 반영할 수 있도록 합니다.
 * 취소 버튼을 통해 수정을 취소하고, 카드를 닫을 수도 있습니다.
 * 이미지 업로드를 위한 InputFileUpload 컴포넌트와 최종 수정 시간을 표시하는 TimeSince 컴포넌트도 포함하고 있습니다.
 */

export default function EditCard({ id, editClose }) {
  //newsList에서 id일치하는 데이터 참조하기
  let newsData = useSelector(state => state.news.newsList);
  newsData = newsData.filter(news => news.id === id);
  const dispatch = useDispatch();

  const [title, setTitle] = useState(newsData[0]?.title);
  const [content, setContent] = useState(newsData[0]?.content);
  const [isTouched, setIsTouched] = useState(false);
  const [selectedFile, setSelectedFile] = useState([]);

  //터치 감지
  const handleTouchStart = () => {
    setIsTouched(true);
  };

  const handleTouchEnd = () => {
    setIsTouched(false);
  };

  const handleFileSelect = files => {
    setSelectedFile(prev => [...prev, ...files]);
    console.log("파일 첨부 후 selectedFile 상태:", selectedFile);
  };

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
            defaultValue={title}
            style={{ fontSize: "16px", width: "100%" }}
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
        <InputFileUpload onFileSelect={handleFileSelect} />

        <Typography variant="caption" sx={{ p: 1 }}>
          {TimeSince(newsData[0].updatedAt)}
        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        height={300}
        image={newsData[0].imageUrl}
        alt="random_img"
        sx={{
          cursor: "pointer",
          "&:hover": {
            transition: "transform 0.2s ease-in-out",
            transform: "scale(1.05)",
          },
          width: "100%",
          transition: "transform 0.2s ease-in-out",
          transform: isTouched ? "scale(0.95)" : "scale(1)",
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      />

      <Collapse in={true} timeout="auto" unmountOnExit>
        <CardContent
          sx={{ width: "99%", display: "flex", flexDirection: "column" }}
        >
          <TextareaAutosize
            defaultValue={content}
            style={{ fontSize: "14px" }}
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
                dispatch(
                  updateNews({
                    id,
                    title,
                    content,
                    files: selectedFile,
                  })
                );
                editClose();
                //window.location.reload(); // 새로고침 해주기
              }}
            >
              완료
            </Button>
            <Button
              size={"large"}
              variant={"outlined"}
              onClick={editClose}
              autoFocus
            >
              취소
            </Button>
          </Stack>
        </CardContent>
      </Collapse>
    </Card>
  );
}
