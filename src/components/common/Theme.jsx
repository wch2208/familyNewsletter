// import { Grid } from "@mui/material";
// import styled from "@emotion/styled";
// import { ThemeProvider, createTheme } from "@mui/material/styles";

// // ---------------------------- 채팅창 컨테이너 스타일 -------------------------------//
// export const StyledContainer = styled(Grid)(({ theme }) => ({
//   backgroundColor: "#bacee0",
//   height: "100vh",
//   width: "100vw",
//   maxWidth: "1024px",
//   margin: "0, auto",
//   paddingTop: "10px",
//   paddingLeft: "20px",
//   paddingRight: "20px",

//   // 미디어 쿼리를 사용하여 브레이크포인트에 따른 스타일 정의
//   [theme.breakpoints.up("md")]: {
//     border: "4px solid black",
//     borderRadius: "30px",
//     height: "84vh",
//     width: "900px",
//     margin: "auto",
//     marginTop: "5%",
//   },
// }));

// // ---------------------------- 대화창 컴포넌트 스타일 -------------------------------//
// export const StyledChat = styled(Grid)(({ theme }) => ({
//   maxHeight: "calc(84vh - 64px)",
//   minHeight: "calc(84vh - 64px)",
//   overflowY: "auto",
//   mb: 0.5,

//   // 미디어 쿼리를 사용하여 브레이크포인트에 따른 스타일 정의
//   [theme.breakpoints.up("md")]: {
//     maxHeight: "calc(64vh - 64px)",
//     minHeight: "calc(64vh - 64px)",
//   },
// }));

// /* eslint-disable react/prop-types */
// function Theme({ children }) {
//   // theme 기본 값

//   const theme = createTheme({
//     //여기서 기본값 수정할 수 있음
//   });

//   return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
// }

// export default Theme;
