import { PropTypes } from "prop-types";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import FastForwardIcon from "@mui/icons-material/FastForward";
import { useState } from "react";
import Backdrop from "@mui/material/Backdrop";

export default function BasicSpeedDial({ news, onSendMessage, addNews }) {
  //PropTypes 정의
  BasicSpeedDial.propTypes = {
    news: PropTypes.object,
    onSendMessage: PropTypes.func,
    addNews: PropTypes.func,
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const actions = [
    {
      icon: (
        <CancelIcon
          onClick={() => {
            onSendMessage("인터뷰 종료");
            alert(
              "인터뷰를 종료합니다. 이제 챗봇이 기사를 작성합니다. 결과를 포스팅하려면 저장버튼을 누르세요."
            );
          }}
        />
      ),
      name: "인터뷰 종료",
    },
    {
      icon: (
        <SaveAsIcon
          onClick={() => {
            addNews(news);
            window.location.href = "/";
          }}
        />
      ),
      name: "기사 생성",
    },
  ];

  return (
    <>
      <Backdrop open={open} />
      <SpeedDial
        ariaLabel="SpeedDial basic"
        sx={{ position: "fixed", bottom: "65px", right: "27px", zIndex: 3 }}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map(action => (
          <SpeedDialAction
            key={action.name}
            // icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
    </>
  );
}
