import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
import { S3Client } from "@aws-sdk/client-s3";
import multer from "multer";
import multerS3 from "multer-s3";
import express from "express";
import cors from "cors";
import { Sequelize } from "sequelize";
const app = express();
const port = 80;
app.use(cors());
app.use(express.json());

//s3
const s3 = new S3Client({
  //
  region: "ap-northeast-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_S3_BUCKET,
    key: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
});

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
  // 데이터베이스와 모델 동기화
  await sequelize.sync();

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
  imageUrl: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
});

app.get(`/news`, async (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : 10; // 한 페이지에 표시할 항목의 수
  const offset = req.query.offset ? parseInt(req.query.offset) : 0; //건너뛸 항목의 수
  try {
    const articles = await NewsArticle.findAll({
      limit: limit,
      offset: offset,
      order: [["updatedAt", "DESC"]], // 최신 순으로 내림차순 정렬
    });
    res.json(articles);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post("/news", upload.array("photos"), async (req, res) => {
  let imageUrls = [];
  if (req.files && req.files.length > 0) {
    imageUrls = req.files.map(file => file.location);
  } else {
    imageUrls = ["https://picsum.photos/1920/1300"];
  }

  try {
    const newArticleData = {
      title: req.body.title,
      content: req.body.content,
      imageUrl: imageUrls.join(";"),
    };

    const newArticle = await NewsArticle.create(newArticleData);
    res.status(201).json(newArticle);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.put("/news/:id", upload.array("photos"), async (req, res) => {
  try {
    const article = await NewsArticle.findByPk(req.params.id);
    if (!article) {
      return res.status(404).send("Article not found");
    }

    let imageUrls = [];
    if (req.files && req.files.length > 0) {
      imageUrls = req.files.map(file => file.location);
    } else {
      imageUrls = ["https://picsum.photos/1920/1300"];
    }

    const updatedData = {
      title: req.body.title || article.title,
      content: req.body.content || article.content,
      imageUrl: imageUrls.join(";"),
    };

    await article.update(updatedData);
    res.send(article);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.delete("/news/:id", async (req, res) => {
  try {
    const article = await NewsArticle.findByPk(req.params.id);
    if (article) {
      await article.destroy();
      res.send(article);
    } else {
      res.status(404).send("Article not found");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});
