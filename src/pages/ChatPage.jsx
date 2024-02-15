import OpenAI from "openai";
import { useState, useEffect, useRef } from "react";
import ChatContainer from "../components/Chat/ChatContainer";
import StyledChat from "../components/Chat/StyledChat";
import ChatAppBar from "../components/Chat/ChatAppBar";
import ChatList from "../components/Chat/ChatList";
import ChatButtons from "../components/Chat/ChatButtons";
import ChatInput from "../components/Chat/ChatInput";
import LoadingIndicator from "../components/Chat/LoadingIndicator";

function ChatPage() {
  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_API_KEY,
    dangerouslyAllowBrowser: true,
  });
  const [messageList, setMessageList] = useState([]);
  const [threadId, setThreadId] = useState("");
  const [loading, setLoading] = useState(false);
  const chatScrollRef = useRef(null);
  const inputRef = useRef("");
  const [news, setNews] = useState({});
  const [selectedFile, setSelectedFile] = useState([]);

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

    //run 실행
    let run = await openai.beta.threads.runs.create(threadId, {
      assistant_id: "asst_iXmdKomVhAtle5hLnCXo6Mta",
    });

    //run 상태 확인 반복 완료될 때 까지
    while (run.status !== "completed") {
      run = await openai.beta.threads.runs.retrieve(threadId, run.id);
      console.log(run.status);
      if (run.status === "failed") {
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

  const handleFileSelect = files => {
    setSelectedFile(prev => [...prev, ...files]);
  };

  return (
    <ChatContainer>
      <ChatAppBar />
      <StyledChat item xs={12} ref={chatScrollRef}>
        <ChatList messageList={messageList} />
      </StyledChat>
      <ChatButtons
        messageList={messageList}
        setLoading={setLoading}
        handleSendMessage={handleSendMessage}
      />
      <ChatInput
        loading={loading}
        messageList={messageList}
        handleFileSelect={handleFileSelect}
        selectedFile={selectedFile}
        handleSendMessage={handleSendMessage}
        inputRef={inputRef}
      />
      <LoadingIndicator loading={loading} />
    </ChatContainer>
  );
}

export default ChatPage;
