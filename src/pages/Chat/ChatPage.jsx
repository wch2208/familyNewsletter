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

function ChatPage() {
  return (
    <Grid
      Container
      fiexed
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        bgcolor: "#bacee0",
        height: "100vh",
        width: "100vw",
        maxWidth: "1024px",
        m: "0 auto",
        pt: 2,
        pl: 2,
        pr: 2,
        pb: 12,
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
        item
        xs={12}
        sx={{ maxHeight: "calc(100% - 64px)", overflowY: "auto", mb: 0.5 }}
      >
        <List>
          {/* 메시지 리스트 아이템들을 여기에 추가 */}
          <ListItem>
            <Paper elevation={1} sx={{ p: 1, maxWidth: "70%" }}>
              <ListItemText primary="메시지 내용1메시지 내용1메시지 내용1메시지 내용1메시지 내용1메시지 내용1메시지 내용1메시지 내용1메시지 내용1메시지 내용1메시지 내용1메시지 내용1메시지 내용1" />
            </Paper>
          </ListItem>
          <ListItem sx={{ justifyContent: "flex-end" }}>
            <Paper
              elevation={1}
              sx={{
                p: 1,
                maxWidth: "70%",
                bgcolor: "#FEE500",
              }}
            >
              <ListItemText primary="메시지 내용2메시지 내용2메시지 내용2메시지 내용2메시지 내용2메시지 내용2메시지 내용2메시지 내용2메시지 내용2메시지 내용2메시지 내용2메시지 내용2메시지 내용2메시지 내용2" />
            </Paper>
          </ListItem>
          <ListItem>
            <Paper elevation={1} sx={{ p: 1, maxWidth: "70%" }}>
              <ListItemText primary="메시지 내용1메시지 내용1메시지 내용1메시지 내용1메시지 내용1메시지 내용1메시지 내용1메시지 내용1메시지 내용1메시지 내용1메시지 내용1메시지 내용1메시지 내용1" />
            </Paper>
          </ListItem>
          <ListItem sx={{ justifyContent: "flex-end" }}>
            <Paper
              elevation={1}
              sx={{
                p: 1,
                maxWidth: "70%",
                bgcolor: "#FEE500",
              }}
            >
              <ListItemText primary="메시지 내용2메시지 내용2메시지 내용2메시지 내용2메시지 내용2메시지 내용2메시지 내용2메시지 내용2메시지 내용2메시지 내용2메시지 내용2메시지 내용2메시지 내용2메시지 내용2" />
            </Paper>
          </ListItem>
          <ListItem>
            <Paper elevation={1} sx={{ p: 1, maxWidth: "70%" }}>
              <ListItemText primary="메시지 내용1메시지 내용1메시지 내용1메시지 내용1메시지 내용1메시지 내용1메시지 내용1메시지 내용1메시지 내용1메시지 내용1메시지 내용1메시지 내용1메시지 내용1" />
            </Paper>
          </ListItem>
          <ListItem sx={{ justifyContent: "flex-end" }}>
            <Paper
              elevation={1}
              sx={{
                p: 1,
                maxWidth: "70%",
                bgcolor: "#FEE500",
              }}
            >
              <ListItemText primary="메시지 내용2메시지 내용2메시지 내용2메시지 내용2메시지 내용2메시지 내용2메시지 내용2메시지 내용2메시지 내용2메시지 내용2메시지 내용2메시지 내용2메시지 내용2메시지 내용2" />
            </Paper>
          </ListItem>
          <ListItem>
            <Paper elevation={1} sx={{ p: 1, maxWidth: "70%" }}>
              <ListItemText primary="메시지 내용1메시지 내용1메시지 내용1메시지 내용1메시지 내용1메시지 내용1메시지 내용1메시지 내용1메시지 내용1메시지 내용1메시지 내용1메시지 내용1메시지 내용1" />
            </Paper>
          </ListItem>
          <ListItem sx={{ justifyContent: "flex-end" }}>
            <Paper
              elevation={1}
              sx={{
                p: 1,
                maxWidth: "70%",
                bgcolor: "#FEE500",
              }}
            >
              <ListItemText primary="메시지 내용2메시지 내용2메시지 내용2메시지 내용2메시지 내용2메시지 내용2메시지 내용2메시지 내용2메시지 내용2메시지 내용2메시지 내용2메시지 내용2메시지 내용2메시지 내용2" />
            </Paper>
          </ListItem>
          <ListItem>
            <Paper elevation={1} sx={{ p: 1, maxWidth: "70%" }}>
              <ListItemText primary="메시지 내용1메시지 내용1메시지 내용1메시지 내용1메시지 내용1메시지 내용1메시지 내용1메시지 내용1메시지 내용1메시지 내용1메시지 내용1메시지 내용1메시지 내용1" />
            </Paper>
          </ListItem>
          <ListItem sx={{ justifyContent: "flex-end" }}>
            <Paper
              elevation={1}
              sx={{
                p: 1,
                maxWidth: "70%",
                bgcolor: "#FEE500",
              }}
            >
              <ListItemText primary="메시지 내용2메시지 내용2메시지 내용2메시지 내용2메시지 내용2메시지 내용2메시지 내용2메시지 내용2메시지 내용2메시지 내용2메시지 내용2메시지 내용2메시지 내용2메시지 내용2" />
            </Paper>
          </ListItem>
          <ListItem>
            <Paper elevation={1} sx={{ p: 1, maxWidth: "70%" }}>
              <ListItemText primary="메시지 내용1메시지 내용1메시지 내용1메시지 내용1메시지 내용1메시지 내용1메시지 내용1메시지 내용1메시지 내용1메시지 내용1메시지 내용1메시지 내용1메시지 내용1" />
            </Paper>
          </ListItem>
          <ListItem sx={{ justifyContent: "flex-end" }}>
            <Paper
              elevation={1}
              sx={{
                p: 1,
                maxWidth: "70%",
                bgcolor: "#FEE500",
              }}
            >
              <ListItemText primary="메시지 내용2메시지 내용2메시지 내용2메시지 내용2메시지 내용2메시지 내용2메시지 내용2메시지 내용2메시지 내용2메시지 내용2메시지 내용2메시지 내용2메시지 내용2메시지 내용2" />
            </Paper>
          </ListItem>
          <ListItem>
            <Paper elevation={1} sx={{ p: 1, maxWidth: "70%" }}>
              <ListItemText primary="메시지 내용1메시지 내용1메시지 내용1메시지 내용1메시지 내용1메시지 내용1메시지 내용1메시지 내용1메시지 내용1메시지 내용1메시지 내용1메시지 내용1메시지 내용1" />
            </Paper>
          </ListItem>
          <ListItem sx={{ justifyContent: "flex-end" }}>
            <Paper
              elevation={1}
              sx={{
                p: 1,
                maxWidth: "70%",
                bgcolor: "#FEE500",
              }}
            >
              <ListItemText primary="메시지 내용2메시지 내용2메시지 내용2메시지 내용2메시지 내용2메시지 내용2메시지 내용2메시지 내용2메시지 내용2메시지 내용2메시지 내용2메시지 내용2메시지 내용2메시지 내용2" />
            </Paper>
          </ListItem>

          {/* 더 많은 메시지들... */}
        </List>
      </Grid>
      <Grid item xs={12} sx={{ mb: 0.5 }}>
        <Stack spacing={2} direction="row" sx={{ justifyContent: "center" }}>
          <Button variant="contained" size="small">
            시작
          </Button>
          <Button variant="contained" size="small">
            재시작
          </Button>
          <Button variant="contained" size="small">
            완료
          </Button>
        </Stack>
      </Grid>

      <Grid item xs={12}>
        <Paper
          variant="outlined"
          sx={{ display: "flex", alignItems: "center", p: "2px 4px" }}
        >
          <InputBase
            fullWidth
            placeholder="메시지를 입력하세요"
            sx={{ ml: 1, flex: 1 }}
          />
          <IconButton color="primary" sx={{ p: "10px" }}>
            <SendIcon />
          </IconButton>
        </Paper>
      </Grid>
    </Grid>
  );
}
export default ChatPage;
