const app = express();
const port = 80;
import express from "express";
import dotenv from "dotenv";
dotenv.config();

import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.VITE_DATABASE_NAME,
  process.env.VITE_DATABASE_USERNAME,
  process.env.VITE_DATABASE_PASSWORD,
  {
    host: process.env.VITE_DATABASE_HOST,
    dialect: "mysql",
  }
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/news", (req, res) => {
  res.send("news 요청 받았음.");
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
