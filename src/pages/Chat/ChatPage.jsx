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
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import OpenAI from "openai";
import { useState, useEffect, useRef } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

function ChatPage() {
  const navigate = useNavigate();
  const apiKey = import.meta.env.VITE_API_KEY;
  const openai = new OpenAI({ apiKey: apiKey, dangerouslyAllowBrowser: true });
  const [messageList, setMessageList] = useState([]);
  const [threadId, setThreadId] = useState("");
  const [loading, setLoading] = useState(false);
  const chatScrollRef = useRef(null);
  const inputRef = useRef("");

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
  useEffect(() => {
    if (chatScrollRef.current) {
      const scrollHeight = chatScrollRef.current.scrollHeight;
      const height = chatScrollRef.current.clientHeight;
      chatScrollRef.current.scrollTop = scrollHeight - height;
    }
  }, [messageList]);

  async function handleSendMessage(messageText) {
    setLoading(true);

    //메세지 생성
    await openai.beta.threads.messages.create(threadId, {
      role: "user",
      content: messageText,
    });

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
        break;
      }
      //반복간격 0.5초
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    console.log("상태확인 통과");

    //실행 완료 후 메시지 출력
    const messages = await openai.beta.threads.messages.list(threadId);
    //메시지 리스트에 추가
    setMessageList([...messageList, messages.data[1], messages.data[0]]);
    inputRef.current.value = "";
    setLoading(false);
  }

  return (
    <StyledContainer container justifyContent="center" alignItems="center">
      <AppBar
        position="static"
        sx={{ borderRadius: "30px", backgroundColor: "white" }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            sx={{ color: "black", marginRight: "8px" }}
            onClick={() => navigate(-1)}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography sx={{ color: "black" }}>
            Famaily Newsletter Interview
          </Typography>
        </Toolbar>
      </AppBar>
      {/* <LongTextSnackbar /> */}

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
      {/* <CustomizedSnackbars /> */}
      <Grid item xs={12} sx={{ mb: 0.5 }}>
        <Stack spacing={2} direction="row" sx={{ justifyContent: "center" }}>
          <Button
            variant="contained"
            size="small"
            onClick={() => {
              handleSendMessage("안녕?");
            }}
          >
            시작
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={() => {
              handleSendMessage("내 이름은 테스터야");
            }}
          >
            질문 1
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={() => {
              handleSendMessage(
                "나는 음악을 듣는 취미가 있어. 좋아하는 장르는 K-pop이야. 요즘은 르세라핌의 perfect night가 인기가 많더라. 오늘도 즐겁게 들었어."
              );
            }}
          >
            질문 2
          </Button>

          <Button
            variant="contained"
            size="small"
            onClick={() => {
              handleSendMessage("인터뷰 종료");
            }}
          >
            종료
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
