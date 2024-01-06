//UpdateBtn.jsx
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import PropTypes from "prop-types";

InputFileUpload.propTypes = {
  onFileSelect: PropTypes.func,
};

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

export default function InputFileUpload({ onFileSelect }) {
  const handleFileChange = e => {
    //초기화
    onFileSelect([]);
    //onFileSelect(...e.target.files); 이것은 단일 파일 업로드 방식
    onFileSelect([...e.target.files]); //여러 파일을 업로드하려고 한다.
  };

  return (
    <Button
      sx={{ justifyContent: "center", height: "45px", p: 0 }}
      component="label"
      variant="text"
    >
      <AddAPhotoIcon sx={{ p: 0 }} />
      <VisuallyHiddenInput type="file" multiple onChange={handleFileChange} />
    </Button>
  );
}
