//EditBtn.jsx
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "axios";
import { useDispatch } from "react-redux";
import { storeDeleteNews } from "../../../features/news/newsSlice";
import EditCard from "../components/EditCard";
import { useState } from "react";
import Backdrop from "@mui/material/Backdrop";

const options = ["수정 ( Edit )", "삭제 ( Delete )"];

const ITEM_HEIGHT = 48;

export default function LongMenu(targetCard) {
  const [editOn, setEditOn] = useState(false);
  const [id, setId] = useState(0);
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
      setId(targetCard.id);
      setEditOn(true);
    }

    if (e.target.innerText === "삭제 ( Delete )") {
      //전역상태 newsList에 삭제 요청 보내기
      dispatch(storeDeleteNews(id));
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
      deleteNews(id);
    }
  }

  const editClose = () => {
    setEditOn(false);
  };

  return (
    <>
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
              id={id}
              key={option}
              divider={true}
              onClick={e => {
                handleEditDel(e);
                handleClose();
              }}
              onTouchEnd={e => {
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
      {editOn ? (
        <>
          <Backdrop open={editOn} />
          <EditCard id={id} editClose={editClose} />
        </>
      ) : null}
    </>
  );
}
