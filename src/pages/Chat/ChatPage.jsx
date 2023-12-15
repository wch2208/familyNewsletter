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
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import styled from "@emotion/styled";
import SendIcon from "@mui/icons-material/Send";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import OpenAI from "openai";
import { useState, useEffect, useRef } from "react";

function ChatPage() {
  // ------------------   makeStyles -----------------//

  const theme = createTheme();
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

  // ------------------   makeStyles -----------------//

  const apiKey = import.meta.env.VITE_API_KEY;
  const openai = new OpenAI({ apiKey: apiKey, dangerouslyAllowBrowser: true });

  let [messageList, setMessageList] = useState([]);
  let [threadId, setThreadId] = useState("");
  let [loading, setLoading] = useState(false);
  const chatScrollRef = useRef(null);
  const inputRef = useRef("");

  //스레드를 생성하고 대화 시작을 위한 인사를 먼저 세팅한다.
  useEffect(() => {
    async function firstRun() {
      //스레드 생성
      if (threadId === "") {
        const thread = await openai.beta.threads.create();
        setThreadId(thread.id);
      }
    }

    firstRun();
  }, [openai.beta.threads, threadId]);

  useEffect(() => {
    if (chatScrollRef.current) {
      const scrollHeight = chatScrollRef.current.scrollHeight;
      const height = chatScrollRef.current.clientHeight;
      chatScrollRef.current.scrollTop = scrollHeight - height;
    }
  }, [messageList]); // 메시지 목록이 변경될 때마다 실행

  //------------  채팅 시작 버튼  ---------------//
  async function runStart() {
    setLoading(true);

    //메세지 생성
    await openai.beta.threads.messages.create(threadId, {
      role: "user",
      content: "안녕?",
    });

    //run 실행
    let run = await openai.beta.threads.runs.create(threadId, {
      assistant_id: "asst_iXmdKomVhAtle5hLnCXo6Mta",
    });

    //run 상태 확인 반복 완료될 때 까지
    while (run.status !== "completed") {
      run = await openai.beta.threads.runs.retrieve(threadId, run.id);
      //반복간격 0.5초
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    //실행 완료 후 메시지 출력
    const messages = await openai.beta.threads.messages.list(threadId);
    //메시지 리스트에 추가
    setMessageList([...messageList, messages.data[1], messages.data[0]]);

    setLoading(false);
  }

  //-----------------   전송 버튼   ---------- //

  async function sendMessage() {
    const message = inputRef.current.value;
    //로딩 시작
    setLoading(true);
    //인풋창의 텍스트를 넣어서 메세지 생성
    await openai.beta.threads.messages.create(threadId, {
      role: "user",
      content: message,
    });

    //런 실행
    let run = await openai.beta.threads.runs.create(threadId, {
      assistant_id: "asst_iXmdKomVhAtle5hLnCXo6Mta",
    });

    //실행 상태 확인 반복 완료될 때 까지
    while (run.status !== "completed") {
      run = await openai.beta.threads.runs.retrieve(threadId, run.id);
      //반복간격 0.5초
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    //실행 완료 후 메시지 출력

    const messages = await openai.beta.threads.messages.list(threadId);

    //메시지 리스트에 추가
    setMessageList([...messageList, messages.data[1], messages.data[0]]);
    //setInputMessage("");
    setLoading(false);
  }

  // -------------------    종료 버튼 ---------------//
  async function endOfInterview() {
    setLoading(true);
    //메세지 생성
    await openai.beta.threads.messages.create(threadId, {
      role: "user",
      content: "인터뷰 종료",
    });

    //run 실행
    let run = await openai.beta.threads.runs.create(threadId, {
      assistant_id: "asst_iXmdKomVhAtle5hLnCXo6Mta",
    });

    //run 상태 확인 반복 완료될 때 까지
    while (run.status !== "completed") {
      run = await openai.beta.threads.runs.retrieve(threadId, run.id);
      //반복간격 0.5초
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    //실행 완료 후 메시지 출력

    const messages = await openai.beta.threads.messages.list(threadId);

    //메시지 리스트에 추가
    setMessageList([...messageList, messages.data[1], messages.data[0]]);
    setLoading(false);
  }

  return (
    <ThemeProvider theme={theme}>
      <StyledContainer container justifyContent="center" alignItems="center">
        <Grid
          item
          xs={12}
          sx={{
            textAlign: "center",
            mb: 0.5,
          }}
        >
          <Paper
            elevation={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              p: "2px 4px",
            }}
          >
            <ListItemText primary="시작을 누르고 인터뷰를 진행하세요." />
            <ListItemText primary="완료를 누르면 기사를 작성합니다." />
          </Paper>
        </Grid>
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
            <Button variant="contained" size="small" onClick={runStart}>
              시작
            </Button>

            <Button variant="contained" size="small" onClick={endOfInterview}>
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
              mb: 2,
              bgcolor: loading ? "gray" : false,
            }}
          >
            <InputBase
              fullWidth
              placeholder="메시지를 입력하세요"
              disabled={loading}
              sx={{ ml: 1, flex: 1 }}
              inputRef={inputRef}
              onKeyDown={e => {
                if (e.key === "Enter") {
                  sendMessage(inputRef.current.value);
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
                  sendMessage(inputRef.current.value);
                }}
              >
                <SendIcon />
              </IconButton>
            )}
          </Paper>
        </Grid>
      </StyledContainer>
    </ThemeProvider>
  );
}
export default ChatPage;
