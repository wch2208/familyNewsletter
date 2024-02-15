import ChatContainer from "../components/Chat/ChatContainer";
import StyledChat from "../components/Chat/StyledChat";
import ChatAppBar from "../components/Chat/ChatAppBar";
import ChatList from "../components/Chat/ChatList";
import ChatButtons from "../components/Chat/ChatButtons";
import ChatInput from "../components/Chat/ChatInput";
import LoadingIndicator from "../components/Chat/LoadingIndicator";
import useChat from "../hooks/useChat";

function ChatPage() {
  const {
    messageList,
    loading,
    inputRef,
    selectedFile,
    setLoading,
    handleSendMessage,
    handleFileSelect,
    chatScrollRef,
  } = useChat();

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
