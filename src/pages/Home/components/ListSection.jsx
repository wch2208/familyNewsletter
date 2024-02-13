import InfiniteScrollWrapper from "./InfiniteScrollWrapper";
import NewsList from "../components/NewsList";

const ListSection = () => {
  return (
    <InfiniteScrollWrapper>
      <NewsList />
    </InfiniteScrollWrapper>
  );
};

export default ListSection;
