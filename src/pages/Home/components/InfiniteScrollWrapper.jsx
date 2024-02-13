import InfiniteScroll from "react-infinite-scroll-component";
import { fetchNews } from "../../../features/news/newsSlice";
import { useSelector, useDispatch } from "react-redux";

const InfiniteScrollWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const hasMore = useSelector(state => state.news.hasMore);
  const newsList = useSelector(state => state.news.newsList);
  return (
    <InfiniteScroll
      container
      dataLength={newsList.length}
      next={() => dispatch(fetchNews())}
      hasMore={hasMore}
    >
      {children}
    </InfiniteScroll>
  );
};

export default InfiniteScrollWrapper;
