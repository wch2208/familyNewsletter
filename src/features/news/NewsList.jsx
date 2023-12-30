// features/news/NewsList.jsx
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchNews } from "./newsSlice";
import CardComponent from "../../pages/Home/components/CardComponent";
import Grid from "@mui/material/Grid";

const NewsList = () => {
  const dispatch = useDispatch();
  const newsList = useSelector(state => state.news.newsList);
  const newsStatus = useSelector(state => state.news.status);

  useEffect(() => {
    if (newsStatus === "idle") {
      dispatch(fetchNews());
    }
  }, [newsStatus, dispatch]);

  // 뉴스 목록을 렌더링하는 로직을 여기에 추가합니다.
  return (
    <>
      {newsList.map(newsData => (
        <Grid item xs={12} md={6} key={newsData.id}>
          <CardComponent {...newsData} />
        </Grid>
      ))}
    </>
  );
  // ...
};

export default NewsList;
