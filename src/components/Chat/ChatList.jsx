import { List, ListItem, ListItemText, Paper } from "@mui/material";

const ChatList = ({ messageList }) => {
  return (
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
  );
};

export default ChatList;
