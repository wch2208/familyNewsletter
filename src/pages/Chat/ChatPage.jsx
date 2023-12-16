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
import { StyledContainer, StyledChat } from "../../components/common/Theme";

function ChatPage() {
  const apiKey = import.meta.env.VITE_API_KEY;
  const openai = new OpenAI({ apiKey: apiKey, dangerouslyAllowBrowser: true });
  const [messageList, setMessageList] = useState([]);
  const [threadId, setThreadId] = useState("");
  const [loading, setLoading] = useState(false);
  const chatScrollRef = useRef(null);
  const inputRef = useRef("");

  //스레드를 생성
  useEffect(() => {
    async function createThread() {
      if (threadId === "") {
        const thread = await openai.beta.threads.create();
        setThreadId(thread.id);
      }
    }

    createThread();
  }, [openai.beta.threads, threadId]);

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
      //반복간격 0.5초
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    //실행 완료 후 메시지 출력
    const messages = await openai.beta.threads.messages.list(threadId);
    //메시지 리스트에 추가
    setMessageList([...messageList, messages.data[1], messages.data[0]]);
    inputRef.current.value = "";
    setLoading(false);
  }

  return (
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
