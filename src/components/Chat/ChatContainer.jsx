import { styled, Grid } from "@mui/material";

const ChatContainer = styled(({ ...otherProps }) => (
  <Grid container justifyContent="center" alignItems="center" {...otherProps} />
))(({ theme }) => ({
  backgroundColor: "#bacee0",
  height: "100vh",
  [theme.breakpoints.down("sm")]: {
    height: "calc(100vh - 80px)",
    border: "1px solid black",
  },
  width: "100vw",
  marginTop: 0,
  paddingTop: "10px",
  paddingLeft: "20px",
  paddingRight: "20px",
}));

export default ChatContainer;
