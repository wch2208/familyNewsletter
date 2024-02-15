import { Stack, Fab } from "@mui/material";
import { useState } from "react";
import { addNews } from "../../features/news/newsSlice";

const ChatButtons = ({ messageList, setLoading, handleSendMessage }) => {
  const [end, setEnd] = useState(false);

  return (
    <>
      {end ? (
        <Fab
          color="primary"
          variant="extended"
          sx={{
            position: "fixed",
            left: "50%",
            transform: "translateX(-50%)",
            top: "13%",
            width: "59%",
            height: "5%",
            zIndex: 1,
          }}
          onClick={() => {
            setEnd(false);
            dispatch(addNews({ news, files: selectedFile }));
            setLoading(true);
            setTimeout(() => {
              window.location.href = "/";
            }, 2000);
          }}
        >
          이 인터뷰 결과를 게시하기
        </Fab>
      ) : messageList.length === 0 ? (
        <Stack direction="row">
          <Fab
            color="primary"
            variant="extended"
            sx={{
              position: "fixed",
              height: "5%",
              left: "50%",
              transform: "translateX(-50%)",
              bottom: "50%",
              zIndex: 1,
            }}
            onClick={() => {
              handleSendMessage("안녕?");
            }}
          >
            인터뷰 시작
          </Fab>
          <Fab
            color="primary"
            variant="extended"
            sx={{
              position: "fixed",
              height: "5%",
              left: "50%",
              transform: "translateX(-50%)",
              bottom: "40%",
              zIndex: 1,
            }}
            onClick={() => {
              handleSendMessage(
                "안녕? 내 이름은 Tester, 근황에 대해서 이야기할게. 나는 지난주에 콘서트에 다녀왔어. 자주 듣는 곡이었지만 라이브로 들으면 평소와 다른 감동이 느껴져서 콘서트에 가는 것이 좋더라. 좋아하는 가수가 있다면 콘서트에 가는 것을 추천해"
              );
            }}
          >
            테스트 실행
          </Fab>
        </Stack>
      ) : (
        <Fab
          color="primary"
          variant="extended"
          sx={{
            position: "fixed",
            height: "5%",
            left: "50%",
            transform: "translateX(-50%)",
            top: "13%",
            zIndex: 1,
          }}
          onClick={() => {
            handleSendMessage("인터뷰 종료");
            setEnd(true);
          }}
        >
          인터뷰 종료
        </Fab>
      )}
    </>
  );
};

export default ChatButtons;
