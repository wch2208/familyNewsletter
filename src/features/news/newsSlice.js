import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// 비동기 액션을 위한 thunk를 생성합니다.
const newsPerPage = 10; // 페이지당 보여줄 뉴스 개수
export const fetchNews = createAsyncThunk(
  "news/fetchNews",
  async (_, { getState }) => {
    const currentPage = getState().news.currentPage;
    const limit = newsPerPage;
    const offset = (currentPage - 1) * limit;
    const response = await fetch(
      `https://api.familynewsletter-won.com/news?limit=${limit}&offset=${offset}`
    );
    let data = await response.json();
    return data;
  }
);

const newsSlice = createSlice({
  name: "news",
  initialState: {
    newsList: [], // 뉴스 목록을 저장할 배열입니다.
    titleList: [], // 뉴스 제목을 저장할 배열입니다.
    currentPage: 1, // 현재 페이지 번호입니다.
    hasMore: true, // 더 로드할 데이터가 있는지 여부입니다.
    status: "idle", // 'idle', 'loading', 'succeeded', 'failed'
    error: null,
  },
  reducers: {
    // 여기에 필요한 액션 리듀서를 추가할 수 있습니다.

    //newsList의 최신 게시물의 제목 5개를 포함하는 문자열 배열을 반환합니다.
    storeLatestFiveNewsTitles(state, action) {
      state.titleList = action.payload.slice(0, 5).map(news => news.title);
    },
    // 삭제 후 newsList가 감소하는 액션 크리에이터
    storeDeleteNews(state, action) {
      const id = action.payload;
      state.newsList = state.newsList.filter(news => news.id !== id);
    },

    // 수정 후 뉴스목록 업데이트 액션 크리에이터
    storeUpdateNewsList(state, action) {
      //전달 받은 객체를 하나의 변수에 할당
      const updatedNews = action.payload;

      //업데이트 하려면 기존의 뉴스 목록에서 수정할 뉴스를 참조
      state.newsList = state.newsList.map(news => {
        if (news.id === updatedNews.id) {
          //기존의 목록에서 아이디가 일치하는 대상을 제거하고 업데이트뉴스를 그 자리에 넣는다.
          return { ...news, ...updatedNews };
        }
        return news; // 기존의 뉴스 목록을 그대로 반환한다.
      });
    },
  },

  //createAsyncThunk의해 생성된 비동기 작업을 관리하는 코드
  extraReducers: builder => {
    builder
      .addCase(fetchNews.pending, state => {
        state.status = "loading";
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Append new news to the existing list
        /*
        서버에 요청을 보낼 때 limit, offset을 변경해서 보내므로 action.payload는 계속 변경된다.
        그러므로 기존의 newsList에 새로운 통신 받은 데이터를 추가한다.
        */
        state.newsList = [...state.newsList, ...action.payload];
        // Increment page after successful fetch
        state.currentPage += 1;
        // 리미트로 5개를 가져오는데, 실제로 가져온 데이터(action.payload)가 5보다 적으면
        // fasle로 변하면서 더이상 next 속성이 동작하지 않는다.
        state.hasMore = action.payload.length === newsPerPage;
        console.log(action.payload);
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
} = newsSlice.actions;

export default newsSlice.reducer;
