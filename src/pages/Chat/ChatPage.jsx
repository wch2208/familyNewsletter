import {
  List,
  ListItem,
  ListItemText,
  InputBase,
  IconButton,
  Paper,
  Grid,
  styled,
  AppBar,
  Toolbar,
  Typography,
  Box,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import OpenAI from "openai";
import { useState, useEffect, useRef } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BasicSpeedDial from "./components/ChatSpeedDial";
//import Backdrop from "@mui/material";

function ChatPage() {
  const navigate = useNavigate();
  const apiKey = import.meta.env.VITE_API_KEY;
  const openai = new OpenAI({ apiKey: apiKey, dangerouslyAllowBrowser: true });
  const [messageList, setMessageList] = useState([]);
  const [threadId, setThreadId] = useState("");
  const [loading, setLoading] = useState(false);
  const chatScrollRef = useRef(null);
  const inputRef = useRef("");
  const [news, setNews] = useState({});

  // ---------------------------- 채팅창 컨테이너 스타일 -------------------------------//
  const StyledContainer = styled(Grid)(() => ({
    backgroundColor: "#bacee0",
    minHeight: "100vh",
    "@supports (-webkit-appearance:none) and (stroke-color: transparent)": {
      minHeight: "-webkit-fill-available",
    },
    width: "100vw",
    margin: "0, auto",
    paddingTop: "10px",
    paddingLeft: "20px",
    paddingRight: "20px",
  }));

  // ---------------------------- 대화창 컴포넌트 스타일 -------------------------------//
  const StyledChat = styled(Grid)(({ theme }) => ({
    maxHeight: "calc(84vh - 64px)",
    minHeight: "calc(84vh - 64px)",
    overflowY: "auto",
    mb: 0.5,

    // 미디어 쿼리를 사용하여 브레이크포인트에 따른 스타일 정의
    [theme.breakpoints.up("md")]: {
      maxHeight: "calc(64vh - 64px)",
    },
  }));

  //스레드를 생성, 전체화면모드 on
  useEffect(() => {
    async function createThread() {
      if (threadId === "") {
        const thread = await openai.beta.threads.create();
        setThreadId(thread.id);
      }
    }

    createThread();
  }, [openai.beta, threadId]);

  //메세지 추가 시 스크롤 맨 아래로 이동
  function scrollDown() {
    chatScrollRef.current.scrollTo({
      top: chatScrollRef.current.scrollHeight,
      behavior: "instant",
    });
  }
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTo({
        top: chatScrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messageList]);

  async function handleSendMessage(messageText) {
    setLoading(true);

    //메세지 생성
    await openai.beta.threads.messages.create(threadId, {
      role: "user",
      content: messageText,
    });

    scrollDown();

    //run 실행
    let run = await openai.beta.threads.runs.create(threadId, {
      assistant_id: "asst_iXmdKomVhAtle5hLnCXo6Mta",
    });

    //run 상태 확인 반복 완료될 때 까지
    while (run.status !== "completed") {
      run = await openai.beta.threads.runs.retrieve(threadId, run.id);
      console.log(run.status);
      if (run.status === "failed") {
        console.log("run failed");
        //
        window.location.reload(1);
        alert("assistant 통신에 문제가 발생하였습니다. 다시 시작합니다.");
        break;
      }
      //반복간격 0.5초
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    //실행 완료 후 메시지 출력
    const messages = await openai.beta.threads.messages.list(threadId);
    //메시지 리스트에 추가
    setMessageList([...messageList, messages.data[1], messages.data[0]]);
    inputRef.current.value = "";
    setLoading(false);

    //답변이 "|"을 포함하고 있다면 news 상태 값에 저장한다. 이 값이 생성된 뉴스기사이다.
    let newsResult = messages.data[0].content[0].text.value;
    if (newsResult.includes("|")) {
      setNews({
        title: newsResult.split("|")[0],
        content: newsResult.split("|")[1],
      });
    }
  }

  //뉴스기사 저장
  const addNews = async news => {
    try {
      const response = await axios.post(
        "https://api.familynewsletter-won.com/news",
        news
      );
      console.log("Article added:", response.data); // 서버의 응답을 콘솔에 출력
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  return (
    <StyledContainer container justifyContent="center" alignItems="center">
      <AppBar
        position="static"
        sx={{ borderRadius: "10px", backgroundColor: "white" }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            sx={{ color: "black", marginRight: "8px", zIndex: 1 }}
            onClick={() => navigate(-1)}
          >
            <ArrowBackIcon />
          </IconButton>
          <Box
            sx={{
              width: "100vw",
              left: 0,
              justifyContent: "center",
              display: "flex",
              position: "fixed",
            }}
          >
            <Typography sx={{ color: "black" }}>
              Family Newsletter Interview
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      <StyledChat id="chatScroll" item xs={12} ref={chatScrollRef}>
        <List>
          {messageList.map((data, index) =>
            data.role === "assistant" ? (
              <ListItem key={index}>
                <Paper elevation={1} sx={{ p: 1, maxWidth: "80%" }}>
                  <ListItemText primary={data.content[0].text.value} />
                </Paper>
              </ListItem>
            ) : (
              <ListItem key={index} sx={{ justifyContent: "flex-end" }}>
                <Paper
                  elevation={1}
                  sx={{
                    p: 1,
                    maxWidth: "80%",
                    bgcolor: "#FEE500",
                    wordBreak: "break-word",
                  }}
                >
                  <ListItemText primary={data.content[0].text.value} />
                </Paper>
              </ListItem>
            )
          )}
        </List>
      </StyledChat>

      <BasicSpeedDial
        news={news}
        onSendMessage={handleSendMessage}
        addNews={addNews}
      />

      <Grid item xs={12}>
        <Paper
          variant="outlined"
          sx={{
            display: "flex",
            alignItems: "center",
            bgcolor: loading || messageList.length == 0 ? "gray" : false,
          }}
        >
          <InputBase
            fullWidth
            placeholder="위의 재생(시작)버튼으로 인터뷰 시작"
            disabled={loading || messageList.length == 0}
            sx={{ ml: 1 }}
            inputRef={inputRef}
            onKeyDown={e => {
              if (e.key === "Enter") {
                handleSendMessage(inputRef.current.value);
              }
            }}
          />
          {loading || messageList.length == 0 ? (
            <AccessTimeIcon />
          ) : (
            <IconButton
              color="primary"
              sx={{ p: "10px" }}
              onClick={() => {
                handleSendMessage(inputRef.current.value);
              }}
            >
              <SendIcon />
            </IconButton>
          )}
        </Paper>
      </Grid>
    </StyledContainer>
  );
}
export default ChatPage;
