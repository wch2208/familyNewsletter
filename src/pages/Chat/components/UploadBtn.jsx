import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function InputFileUpload() {
  return (
    <Button
      sx={{ justifyContent: "center", height: "45px", p: 0 }}
      component="label"
      variant="text"
    >
      <AddAPhotoIcon sx={{ p: 0 }} />
      <VisuallyHiddenInput type="file" />
    </Button>
  );
}
