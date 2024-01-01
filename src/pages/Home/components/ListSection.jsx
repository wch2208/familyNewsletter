// features/news/NewsList.jsx

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchNews } from "../../../features/news/newsSlice";
import CardComponent from "./CardComponent";
import Grid from "@mui/material/Grid";
import InfiniteScroll from "react-infinite-scroll-component";

const ListSection = () => {
  const dispatch = useDispatch();
  const hasMore = useSelector(state => state.news.hasMore);
  let newsList = useSelector(state => state.news.newsList);
  //newsList.sort((a, b) => b - a);
  // newsList.sort((a, b) => {
  //   const dateA = new Date(a.createdAt);
  //   const dateB = new Date(b.createdAt);
  //   return dateB - dateA; // 내림차순 정렬
  // });

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  // 기존의 코드에서 useState로 담았던 data 대신에
  // 리덕스로 전역상태 값 newsList를 참조한다.
  return (
    <Grid container id="list-section">
      <InfiniteScroll
        dataLength={newsList.length} // 현재 데이터 길이
        next={() => {
          dispatch(fetchNews());
        }} // 추가 데이터 로드 함수
        hasMore={hasMore} // 더 로드할 데이터가 있는지 여부
        loader={<h4>Loading...</h4>} // 로딩 중 표시할 컴포넌트
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>모든 데이터를 불러왔습니다</b>
          </p>
        }
      >
        {newsList.map(newsData => (
          <Grid item xs={12} md={6} key={newsData.id}>
            <CardComponent {...newsData} />
          </Grid>
        ))}
      </InfiniteScroll>
    </Grid>
  );
  // ...
};

export default ListSection;
