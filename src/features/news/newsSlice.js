//newsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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

//addNews() 함수 이 함수는 api에 post 요청을 보낸다.
export const addNews = createAsyncThunk(
  "news/addNews",
  async ({ news, files }) => {
    try {
      const formData = new FormData();
      formData.append("title", news.title);
      formData.append("content", news.content);

      if (files && files.length > 0) {
        files.forEach(file => {
          formData.append("photos", file);
        });
      }

      const response = await axios.post(
        "https://api.familynewsletter-won.com/news",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("addNews response data:", response.data);
      return response.data;
    } catch (error) {
      console.log("addNews error: ", error);
    }
  }
);

export const updateNews = createAsyncThunk(
  "news/updateNews",
  async ({ id, title, content, files }, { rejectWithValue }) => {
    try {
      console.log(
        "업데이트 뉴스 액션크리에이터에 전달된 인자:",
        typeof id,
        typeof title,
        typeof content,
        typeof files
      );
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);

      if (files && files.length > 0) {
        files.forEach(file => {
          formData.append("photos", file);
        });
      }

      for (let [key, value] of formData.entries()) {
        console.log("api 통신 시작!!", key, value);
      }
      const response = await axios.put(
        `https://api.familynewsletter-won.com/news/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("updateNews response data:", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
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
        console.log("여기는 fetchNews 성공 builder:", action.payload);
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateNews.fulfilled, (state, action) => {
        // 업데이트된 뉴스로 상태를 업데이트
        const updatedNews = action.payload;
        console.log("여기는 updateNews 성공 builder:", updatedNews);
        state.newsList = state.newsList.map(news =>
          news.id === updatedNews.id ? { ...news, ...updatedNews } : news
        );
      })
      .addCase(updateNews.rejected, (state, action) => {
        // 에러 처리...
        state.error = action.payload || "Failed to update news";
      });
  },
});

export const { storeLatestFiveNewsTitles, storeDeleteNews } = newsSlice.actions;

export default newsSlice.reducer;
