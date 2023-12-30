// features/news/newsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// 비동기 액션을 위한 thunk를 생성합니다.
export const fetchNews = createAsyncThunk("news/fetchNews", async () => {
  const response = await fetch("https://api.familynewsletter-won.com/news");
  const data = await response.json();
  return data;
});

const newsSlice = createSlice({
  name: "news",
  initialState: {
    newsList: [], // 뉴스 목록을 저장할 배열입니다.
    titleList: [], // 뉴스 제목을 저장할 배열입니다.
    status: "idle", // 'idle', 'loading', 'succeeded', 'failed'
    error: null,
  },
  reducers: {
    // 여기에 필요한 액션 리듀서를 추가할 수 있습니다.

    //newsList의 최신 게시물의 제목 5개를 포함하는 문자열 배열을 반환합니다.
    storeLatestFiveNewsTitles(state, action) {
      state.titleList = action.payload.slice(-5).map(news => news.title);
    },
    // 삭제 후 감소하는 리듀서 함수

    // 수정 후 뉴스목록 업데이트 리듀서 함수

    // 무한스크롤 리듀서 함수
  },

  extraReducers: builder => {
    builder
      .addCase(fetchNews.pending, state => {
        state.status = "loading";
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.newsList = action.payload;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { storeLatestFiveNewsTitles } = newsSlice.actions;

export default newsSlice.reducer;
