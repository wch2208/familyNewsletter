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
import SendIcon from "@mui/icons-material/Send";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import OpenAI from "openai";
import { useState, useEffect, useRef } from "react";

function ChatPage() {
  const apiKey = import.meta.env.VITE_API_KEY;
  const openai = new OpenAI({ apiKey: apiKey, dangerouslyAllowBrowser: true });

  let [inputMessage, setInputMessage] = useState("");
  let [messageList, setMessageList] = useState([]);
  let [threadId, setThreadId] = useState("");
  let [loading, setLoading] = useState(false);
  const chatScrollRef = useRef(null);

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
    console.log("시작 버튼 감지");
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
      console.log("run 감지중");
    }

    //실행 완료 후 메시지 출력
    const messages = await openai.beta.threads.messages.list(threadId);
    //메시지 리스트에 추가
    setMessageList([...messageList, messages.data[1], messages.data[0]]);

    setLoading(false);

    console.log("messageList:", messageList);
  }

  //-----------------   전송 버튼   ---------- //
  async function sendMessage(inputMessage) {
    console.log("전송 버튼 감지");
    //로딩 시작
    setLoading(true);
    //인풋창의 텍스트를 넣어서 메세지 생성
    await openai.beta.threads.messages.create(threadId, {
      role: "user",
      content: inputMessage,
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
      console.log("run 감지중");
    }

    //실행 완료 후 메시지 출력

    const messages = await openai.beta.threads.messages.list(threadId);

    //메시지 리스트에 추가
    setMessageList([...messageList, messages.data[1], messages.data[0]]);
    setInputMessage("");
    setLoading(false);
  }

  // -------------------    종료 버튼 ---------------//
  async function endOfInterview() {
    console.log("종료 버튼 감지");
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
    setInputMessage("");
    setLoading(false);
  }

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{
        bgcolor: "#bacee0",
        height: "100vh",
        width: "100vw",
        maxWidth: "1024px",
        m: "0 auto",
        pt: 1,
        pl: 2,
        pr: 2,
      }}
    >
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
      <Grid
        id="chatScroll"
        item
        xs={12}
        ref={chatScrollRef}
        sx={{
          maxHeight: "calc(84vh - 64px)",
          minHeight: "calc(84vh - 64px)",
          overflowY: "auto",
          mb: 0.5,
        }}
      >
        <List>
          {messageList.map((data, index) =>
            data.role === "assistant" ? (
              <ListItem key={index}>
                <Paper elevation={1} sx={{ p: 1, maxWidth: "70%" }}>
                  <ListItemText primary={data.content[0].text.value} />
                </Paper>
              </ListItem>
            ) : (
              <ListItem key={index} sx={{ justifyContent: "flex-end" }}>
                <Paper
                  elevation={1}
                  sx={{
                    p: 1,
                    maxWidth: "70%",
                    bgcolor: "#FEE500",
                  }}
                >
                  <ListItemText primary={data.content[0].text.value} />
                </Paper>
              </ListItem>
            )
          )}
        </List>
      </Grid>
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
          sx={{ display: "flex", alignItems: "center", p: "2px 4px", mb: 2 }}
        >
          <InputBase
            fullWidth
            placeholder="메시지를 입력하세요"
            value={inputMessage}
            disabled={loading}
            sx={{ ml: 1, flex: 1 }}
            onChange={e => {
              setInputMessage(e.target.value);
            }}
            onKeyDown={e => {
              if (e.key === "Enter") {
                sendMessage(inputMessage);
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
                sendMessage(inputMessage);
              }}
            >
              <SendIcon />
            </IconButton>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
}
export default ChatPage;
