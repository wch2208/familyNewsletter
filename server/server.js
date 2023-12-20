import express from "express";
import cors from "cors";

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// 임시 뉴스기사 데이터
/**
 {
    id: number,
    title: string,
    content: string,
    author: string,
  },
 */
const newsArticles = [
  // 추가적인 뉴스기사 객체를 여기에...
];

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// 뉴스기사 데이터를 조회하는 라우트
app.get("/news", (req, res) => {
  // 뉴스기사 데이터를 클라이언트에 전달
  res.json(newsArticles);
});

// 뉴스기사 데이터를 추가하는 라우트
app.post("/news", (req, res) => {
  // 클라이언트로부터 받은 데이터를 기사 목록에 추가
  const newArticle = req.body; // 클라이언트의 요청 본문에서 새 기사 데이터를 가져옴
  newsArticles.push(newArticle); // 기사 목록에 새 기사를 추가
  res.json({ message: "뉴스기사가 추가되었습니다.", newArticle });
});
