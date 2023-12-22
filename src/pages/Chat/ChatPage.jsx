import {
  List,
  ListItem,
  ListItemText,
  InputBase,
  IconButton,
  Paper,
  Grid,
  Button,
  Stack,
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
  const StyledContainer = styled(Grid)(({ theme }) => ({
    backgroundColor: "#bacee0",
    height: "100vh",
    width: "100vw",
    maxWidth: "1024px",
    margin: "0, auto",
    paddingTop: "10px",
    paddingLeft: "20px",
    paddingRight: "20px",

    // 미디어 쿼리를 사용하여 브레이크포인트에 따른 스타일 정의
    [theme.breakpoints.up("md")]: {
      border: "4px solid black",
      borderRadius: "30px",
      height: "84vh",
      width: "900px",
      margin: "auto",
      marginTop: "5%",
    },
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
      minHeight: "calc(64vh - 64px)",
    },
  }));

  //스레드를 생성
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
        id: messages.data[0].id,
      });
    }
  }

  //뉴스기사 저장
  const addNews = async news => {
    try {
      const response = await axios.post("http://localhost:5000/news", news);
      console.log("Article added:", response.data); // 서버의 응답을 콘솔에 출력
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  //뉴스기사 저장 상태 콘솔에서 확인
  const getNews = async () => {
    try {
      const response = await axios.get("http://localhost:5000/news");
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
              Famaily Newsletter Interview
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
      <Grid item xs={12} sx={{ mb: 0.5 }}>
        <Stack spacing={2} direction="row" sx={{ justifyContent: "center" }}>
          <Button
            variant="contained"
            size="small"
            onClick={() => {
              handleSendMessage("안녕?");
            }}
          >
            인터뷰 시작
          </Button>

          <Button
            variant="contained"
            size="small"
            onClick={() => {
              handleSendMessage(
                "안녕? 내 이름은 Tester, 근황에 대해서 이야기할게. 나는 지난주에 콘서트에 다녀왔어. 자주 듣는 곡이었지만 라이브로 들으면 평소와 다른 감동이 느껴져서 콘서트에 가는 것이 좋더라. 좋아하는 가수가 있다면 콘서트에 가는 것을 추천해!. 인터뷰 종료."
              );
            }}
          >
            테스트 실행
          </Button>

          <Button
            variant="contained"
            size="small"
            onClick={() => {
              handleSendMessage("인터뷰 종료");
            }}
          >
            뉴스 생성
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={() => {
              addNews(news);
            }}
          >
            addNews
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={() => {
              getNews();
            }}
          >
            getNews
          </Button>
        </Stack>
      </Grid>

      <Grid item xs={12}>
        <Paper
          variant="outlined"
          sx={{
            display: "flex",
            alignItems: "center",
            p: "2px 4px",
            bgcolor: loading ? "gray" : false,
          }}
        >
          <InputBase
            fullWidth
            placeholder="메세지를 입력하세요."
            disabled={loading}
            sx={{ ml: 1, flex: 1 }}
            inputRef={inputRef}
            onKeyDown={e => {
              if (e.key === "Enter") {
                handleSendMessage(inputRef.current.value);
              }
            }}
          />
          {loading ? (
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
