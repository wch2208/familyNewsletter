import { Grid, Paper, Badge, Fab, InputBase, IconButton } from "@mui/material";
import InputFileUpload from "../common/UploadBtn";
import SendIcon from "@mui/icons-material/Send";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const ChatInput = ({
  loading,
  messageList,
  handleFileSelect,
  selectedFile,
  handleSendMessage,
  inputRef,
}) => {
  return (
    <Grid item xs={12}>
      <Paper
        variant="outlined"
        sx={{
          mb: 1.5,
          display: "flex",
          alignItems: "center",
          bgcolor: loading || messageList.length == 0 ? "gray" : false,
        }}
      >
        <Badge
          badgeContent={selectedFile.length}
          color="secondary"
          sx={{ position: "relative", width: "50px", mr: 2 }}
        >
          <InputFileUpload onFileSelect={handleFileSelect} />
        </Badge>
        {selectedFile.length > 0 ? (
          <Fab
            color="secondary"
            variant="extended"
            sx={{
              position: "fixed",
              left: 20,
              bottom: "70px",
              zIndex: 1,
              fontSize: "10px",
              height: "25px",
            }}
            onClick={() => {
              setSelectedFile([]);
            }}
          >
            삭제
          </Fab>
        ) : null}

        <InputBase
          fullWidth
          autoFocus={true}
          multiline={true}
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
          <AccessTimeIcon sx={{ mr: 1.5 }} />
        ) : (
          <IconButton
            color="primary"
            sx={{ p: "10px", mr: 1.5 }}
            onClick={() => {
              handleSendMessage(inputRef.current.value);
            }}
          >
            <SendIcon />
          </IconButton>
        )}
      </Paper>
    </Grid>
  );
};

export default ChatInput;
