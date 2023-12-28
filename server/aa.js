import express from "express";
import cors from "cors";
import multer from "multer";
import multerS3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";
const app = express();
const port = 80;
import dotenv from "dotenv";
dotenv.config();

import { Sequelize } from "sequelize";

app.use(cors());
app.use(express.json());

//S3
const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.VITE_AWS_ACCESS_KEY,
    secretAccessKey: process.env.VITE_AWS_SECRET_ACCESS_KEY,
  },
});

//S3 UPLOAD
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "family-newsletter",
    key: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
});

app.post("/upload", upload.array("photos"), (req, res) => {
  res.send(req.files);
});

//RDS
const sequelize = new Sequelize(
  process.env.VITE_DATABASE_NAME,
  process.env.VITE_DATABASE_USERNAME,
  process.env.VITE_DATABASE_PASSWORD,
  {
    host: process.env.VITE_DATABASE_HOST,
    dialect: "mysql",
    port: port,
  }
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//GET /health 요청에 대해 200으로 응답하는 API
app.get("/health", (req, res) => {
  res.status(200).send("Success Health Check");
});

app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    console.log("DB 연결 성공!");
  } catch (error) {
    console.error("DB 연결 실패:", error);
  }
  console.log(`Example app listening on port ${port}`);
});

const NewsArticle = sequelize.define("NewsArticle", {
  title: Sequelize.STRING,
  content: Sequelize.TEXT,
  author: Sequelize.STRING,
});

sequelize.sync();

app.post("/news", async (req, res) => {
  try {
    const article = await NewsArticle.create(req.body);
    res.json(article);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get("/news", async (req, res) => {
  try {
    const articles = await NewsArticle.findAll();
    res.json(articles);
  } catch (error) {
    res.status(400).send(error);
  }
});
