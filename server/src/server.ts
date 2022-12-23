import express, { Request, Response } from "express";

import dotenv from "dotenv";
dotenv.config();

import dbConnect from "./utils/dbConnect";

const app = express();

app.use(express.json());

dbConnect();

const PORT = process.env.PORT || 8090;
app.listen(PORT, () => {
  console.log("Server Started");
});
