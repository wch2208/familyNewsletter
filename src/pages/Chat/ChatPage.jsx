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
  Backdrop,
  CircularProgress,
  Button,
  Stack,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import OpenAI from "openai";
import { useState, useEffect, useRef } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import InputFileUpload from "./components/UploadBtn";

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
  const [end, setEnd] = useState(false);
  const [selectedFile, setSelectedFile] = useState([]);

  //파일첨부하면 상태데이터로 등록되는지 확인
  useEffect(() => {
    console.log("파일첨부:", selectedFile);
  }, [selectedFile]);

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
  const addNews = async (news, files) => {
    try {
      //formData 객체 생성
      const formData = new FormData();
      formData.append("title", news.title);
      formData.append("content", news.content);
      if (files && files.length > 0) {
        files.forEach(file => {
          formData.append("photos", file);
        });
      }

      const response = await axios.post(
        "https://api.familynewsletter-won.com/news",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Article added:", response.data); // 서버의 응답을 콘솔에 출력
    } catch (error) {
      console.error("Error adding news:", error);
    }
  };

  const handleFileSelect = files => {
    setSelectedFile(prevFiles => [...prevFiles, ...files]);
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

      {end ? (
        <Button
          variant="contained"
          onClick={() => {
            setEnd(false);
            addNews(news, selectedFile);
            //window.location.href = "/";
          }}
        >
          이 인터뷰 결과를 게시하기
        </Button>
      ) : messageList.length === 0 ? (
        <Stack direction="row">
          <Button
            variant="contained"
            onClick={() => {
              handleSendMessage("안녕?");
            }}
          >
            시작하기
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              handleSendMessage(
                "안녕? 내 이름은 Tester, 근황에 대해서 이야기할게. 나는 지난주에 콘서트에 다녀왔어. 자주 듣는 곡이었지만 라이브로 들으면 평소와 다른 감동이 느껴져서 콘서트에 가는 것이 좋더라. 좋아하는 가수가 있다면 콘서트에 가는 것을 추천해"
              );
            }}
          >
            테스트 실행
          </Button>
        </Stack>
      ) : (
        <Button
          variant="contained"
          sx={{ height: "36px", fontSize: "14px" }}
          onClick={() => {
            handleSendMessage("인터뷰 종료");
            setEnd(true);
            alert(
              "인터뷰를 종료합니다. 이제 챗봇이 기사를 작성합니다. 결과를 포스팅하려면 저장버튼을 누르세요."
            );
          }}
        >
          인터뷰 끝내기
        </Button>
      )}

      <Grid item xs={12}>
        <Paper
          variant="outlined"
          sx={{
            display: "flex",
            alignItems: "center",
            bgcolor: loading || messageList.length == 0 ? "gray" : false,
          }}
        >
          <InputFileUpload onFileSelect={handleFileSelect} />

          <InputBase
            fullWidth
            placeholder="메세지를 입력하세요."
            disabled={loading || messageList.length == 0}
            sx={{ ml: 0 }}
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
      <Backdrop open={loading} sx={{ zIndex: 3 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </StyledContainer>
  );
}
export default ChatPage;
