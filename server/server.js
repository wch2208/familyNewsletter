import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
import express from "express";
import cors from "cors";
import { Sequelize } from "sequelize";
const app = express();
const port = 80;
app.use(cors());
app.use(express.json());

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: "mysql",
  }
);

app.get("/", (req, res) => {
  res.send("Family Newsletter database");
});

app.get("/health", (req, res) => {
  res.status(200).send("Success Health Check");
});

app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    console.log("DB 연결 성공!");
  } catch (err) {
    console.log("DB 연결 X", err);
  }
  console.log(`Example app listening on port ${port}`);
});

// 모델 정의
const NewsArticle = sequelize.define("NewsArticle", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

// 데이터베이스와 모델 동기화
sequelize.sync();

app.post("/news", async (req, res) => {
  try {
    const article = await NewsArticle.create(req.body);
    res.status(201).json(article);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get(`/news`, async (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : 10; // 한 페이지에 표시할 항목의 수
  const offset = req.query.offset ? parseInt(req.query.offset) : 0; //건너뛸 항목의 수
  try {
    const articles = await NewsArticle.findAll({
      limit: limit,
      offset: offset,
      order: [["createdAt", "DESC"]], // 최신 순으로 내림차순 정렬
    });
    res.json(articles);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.put("/news/:id", async (req, res) => {
  try {
    const article = await NewsArticle.findByPk(req.params.id);
    if (article) {
      await article.update(req.body);
      res.send(article);
    } else {
      res.status(404).send("Article not found");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

app.delete("/news/:id", async (req, res) => {
  try {
    const article = await NewsArticle.findByPk(req.params.id);
    if (article) {
      await article.destroy();
      res.send("Article deleted");
    } else {
      res.status(404).send("Article not found");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});
