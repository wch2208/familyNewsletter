// features/news/newsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// 비동기 액션을 위한 thunk를 생성합니다.

export const fetchNews = createAsyncThunk(
  "news/fetchNews",
  async (_, { getState }) => {
    const currentPage = getState().news.currentPgae;
    const limit = 10;
    const offset = (currentPage - 1) * limit;
    const response = await fetch(
      `https://api.familynewsletter-won.com/news?limit=${limit}&offset=${offset}`
    );
    let data = await response.json();
    // data.sort((a, b) => {
    //   const dateA = new Date(a.createdAt);
    //   const dateB = new Date(b.createdAt);
    //   return dateB - dateA; // 내림차순 정렬
    // });
    console.log("fetching dada");
    return data;
  }
);

const newsSlice = createSlice({
  name: "news",
  initialState: {
    newsList: [], // 뉴스 목록을 저장할 배열입니다.
    titleList: [], // 뉴스 제목을 저장할 배열입니다.
    currentPgae: 1, // 현재 페이지 번호입니다.
    hasMore: true, // 더 로드할 데이터가 있는지 여부입니다.
    status: "idle", // 'idle', 'loading', 'succeeded', 'failed'
    error: null,
  },
  reducers: {
    // 여기에 필요한 액션 리듀서를 추가할 수 있습니다.

    //현재페이지 + 1
    storeIncreasePage(state) {
      state.currentPgae += 1;
      console.log("IncreasePage");
    },

    // Set the hasMore flag
    setHasMore(state, action) {
      state.hasMore = action.payload;
    },

    //newsList의 최신 게시물의 제목 5개를 포함하는 문자열 배열을 반환합니다.
    storeLatestFiveNewsTitles(state, action) {
      state.titleList = action.payload.slice(-5).map(news => news.title);
    },
    // 삭제 후 newsList가 감소하는 액션 크리에이터
    storeDeleteNews(state, action) {
      const id = action.payload;
      state.newsList = state.newsList.filter(news => news.id !== id);
    },

    // 수정 후 뉴스목록 업데이트 액션 크리에이터
    storeUpdateNewsList(state, action) {
      //전달 받은 객체를 하나의 변수에 할당한다.
      const updatedNews = action.payload;

      //업데이트 하려면 기존의 뉴스 목록에서 수정할 뉴스를 참조해야한다.
      state.newsList = state.newsList.map(news => {
        if (news.id === updatedNews.id) {
          //기존의 목록에서 아이디가 일치하는 대상을 제거하고 업데이트뉴스를 그 자리에 넣는다.
          return { ...news, ...updatedNews };
        }
        return news; // 기존의 뉴스 목록을 그대로 반환한다.
      });
    },

    // 무한스크롤 리듀서 함수
  },

  extraReducers: builder => {
    builder
      .addCase(fetchNews.pending, state => {
        state.status = "loading";
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Append new news to the existing list
        state.newsList = [...state.newsList, ...action.payload];
        // Increment page after successful fetch
        state.currentPage += 1;
        // Check if there is more data to load
        state.hasMore = action.payload.length === 10; // Assuming limit is 10
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {
  storeLatestFiveNewsTitles,
  storeDeleteNews,
  storeUpdateNewsList,
  storeIncreasePage,
} = newsSlice.actions;

export default newsSlice.reducer;
