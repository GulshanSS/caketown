import express, { Request, Response } from "express";

const app = express();

app.use(express.json());

app.listen(8090, () => {
  console.log("Server Started");
});
