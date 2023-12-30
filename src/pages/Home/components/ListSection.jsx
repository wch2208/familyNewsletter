// features/news/NewsList.jsx

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchNews } from "../../../features/news/newsSlice";
import CardComponent from "./CardComponent";
import Grid from "@mui/material/Grid";

const ListSection = () => {
  const dispatch = useDispatch();
  const newsList = useSelector(state => state.news.newsList);
  const newsStatus = useSelector(state => state.news.status);

  useEffect(() => {
    // 비동기 작업의 상태를 감지하여 초기상태일때만 api 통신 실행
    if (newsStatus === "idle") {
      dispatch(fetchNews());
    }
  }, [newsStatus, dispatch]);

  // 기존의 코드에서 useState로 담았던 data 대신에
  // 리덕스로 전역상태 값 newsList를 참조한다.
  return (
    <Grid container id="list-section">
      {newsList.map(newsData => (
        <Grid item xs={12} md={6} key={newsData.id}>
          <CardComponent {...newsData} />
        </Grid>
      ))}
    </Grid>
  );
  // ...
};

export default ListSection;
