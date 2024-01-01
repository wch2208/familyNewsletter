import { useSelector, useDispatch } from "react-redux";
import { fetchNews } from "../../../features/news/newsSlice";
import CardComponent from "./CardComponent";
import Grid from "@mui/material/Grid";
import InfiniteScroll from "react-infinite-scroll-component";

const ListSection = () => {
  const dispatch = useDispatch();
  const hasMore = useSelector(state => state.news.hasMore);
  const newsList = useSelector(state => state.news.newsList);

  return (
    <InfiniteScroll
      dataLength={newsList.length} // 현재 데이터 길이
      next={() => {
        dispatch(fetchNews());
      }} // 추가 데이터 로드 함수
      hasMore={hasMore} // 더 로드할 데이터가 있는지 여부
      loader={<h4>Loading...</h4>} // 로딩 중 표시할 컴포넌트
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>더 이상 표시할 기사가 없습니다.</b>
        </p>
      }
    >
      <Grid container id="list-section">
        {newsList.map(newsData => (
          <Grid item xs={12} md={6} key={newsData.id}>
            <CardComponent {...newsData} />
          </Grid>
        ))}
      </Grid>
    </InfiniteScroll>
  );
  // ...
};

export default ListSection;
