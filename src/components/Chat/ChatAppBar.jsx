import { useNavigate } from "react-router-dom";
import { Box, Typography, AppBar, Toolbar, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ChatAppBar = () => {
  const navigate = useNavigate();

  return (
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
  );
};

export default ChatAppBar;
