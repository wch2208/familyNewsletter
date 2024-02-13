import InfiniteScrollWrapper from "./InfiniteScrollWrapper";
import NewsList from "./NewsList";

const ListSection = () => {
  return (
    <InfiniteScrollWrapper>
      <NewsList />
    </InfiniteScrollWrapper>
  );
};

export default ListSection;
