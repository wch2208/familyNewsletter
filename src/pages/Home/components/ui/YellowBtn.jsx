import { Button, styled } from "@mui/material";

const YellowBtn = styled(({ ...otherProps }) => (
  <Button variant="outlined" {...otherProps} />
))({
  zIndex: 0,
  position: "absolute",
  top: "500px",
  left: "50%",
  transform: "translate(-50%, -50%)",
  border: "3px solid white",
  color: "black",
  fontSize: "20px",
  backgroundColor: "#FEE500",
  "&:hover": {
    backgroundColor: "#FEE500",
    color: "black",
    border: "3px solid red",
  },
});

export default YellowBtn;
