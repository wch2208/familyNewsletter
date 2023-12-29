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
      icon: <PlayCircleOutlineIcon onClick={() => onSendMessage("안녕?")} />,
      name: "인터뷰 시작",
    },
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
          }}
        />
      ),
      name: "기사 생성",
    },
    {
      icon: (
        <FastForwardIcon
          onClick={() => {
            onSendMessage(
              "안녕? 내 이름은 Tester, 근황에 대해서 이야기할게. 나는 지난주에 콘서트에 다녀왔어. 자주 듣는 곡이었지만 라이브로 들으면 평소와 다른 감동이 느껴져서 콘서트에 가는 것이 좋더라. 좋아하는 가수가 있다면 콘서트에 가는 것을 추천해!. 인터뷰 종료."
            );
            alert(
              "테스트 인터뷰 내용을 기반으로 기사를 생성합니다. 이후 저장버튼을 누르면 홈화면에 기사가 추가됩니다."
            );
          }}
        />
      ),
      name: "테스트 실행",
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
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
    </>
  );
}
