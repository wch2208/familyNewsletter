import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  storeDeleteNews,
  storeUpdateNewsList,
} from "../../../features/news/newsSlice";

const options = ["수정 ( Edit )", "삭제 ( Delete )"];

const ITEM_HEIGHT = 48;

export default function LongMenu(targetCard) {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleEditDel(e) {
    if (e.target.innerText === "수정 ( Edit )") {
      //여기는 수정 창 띄우기
      //수정하기 창을 나타내려면 상태값을 통해 오픈상태를 감지해야한다. 그리고 오픈이 감지되면 id를 받아서 newsList 중 해당 id의 뉴스의 제목과 내용을 dialog의 form에 넣어줘야한다. 사용자가 일부 내용을 수정하고 완료버튼을 누르면 아래의 수정하기 로직을 수행한다.
      //전역상태 newsList에 수정 요청 보내기 이것은 UpdatedFormDialog에서 완료버튼을 누를 때 동작
      dispatch(storeUpdateNewsList(targetCard.id));
    }

    if (e.target.innerText === "삭제 ( Delete )") {
      //전역상태 newsList에 삭제 요청 보내기
      dispatch(storeDeleteNews(targetCard.id));
    }

    if (e.target.innerText === "삭제 ( Delete )") {
      //데이터베이스에 삭제 요청 보내기
      const deleteNews = async id => {
        try {
          const response = await axios.delete(
            `https://api.familynewsletter-won.com/news/${id}`
          );
          console.log("Article deleted:", response.data); // 서버의 응답을 콘솔에 출력
        } catch (error) {
          console.error("Error fetching news:", error);
        }
      };
      deleteNews(targetCard.id);
    }
  }

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "140px",
          },
        }}
      >
        {options.map(option => (
          <MenuItem
            id={targetCard.id}
            key={option}
            divider={true}
            onClick={e => {
              handleEditDel(e);
              handleClose();
            }}
            sx={{
              justifyContent: "center",
              color: option === "삭제 ( Delete )" ? "red" : "blue",
            }}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
