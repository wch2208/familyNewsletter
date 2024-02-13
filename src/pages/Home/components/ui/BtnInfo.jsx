import { styled, Typography } from "@mui/material";

const BtnInfo = styled(({ ...otherProps }) => (
  <Typography variant="subtitle1" {...otherProps} />
))({
  zIndex: 1,
  position: "absolute",
  top: "540px",
  left: "50%",
  transform: "translate(-50%, -50%)",
  color: "white",
  width: "90%",
  textAlign: "center",
});

export default BtnInfo;
