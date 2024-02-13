import { Typography, styled } from "@mui/material";

const TitleTypography = styled(({ ...otherProps }) => (
  <Typography variant="h2" {...otherProps} />
))({
  zIndex: 1,
  position: "absolute",
  top: "100px",
  left: "50%",
  transform: "translate(-50%, -50%)",
});

export default TitleTypography;
