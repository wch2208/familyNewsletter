import { Backdrop, CircularProgress } from "@mui/material";

const LoadingIndicator = ({ loading }) => {
  return (
    <Backdrop open={loading} sx={{ zIndex: 10 }}>
      <CircularProgress color="primary" />
    </Backdrop>
  );
};

export default LoadingIndicator;
