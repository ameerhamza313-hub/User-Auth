import "dotenv/config";
import express from "express";
import { dbConnection } from "./dbConnection/config.js";
import syncDB from "./dbConnection/init.js";
import allRouter from "./routes/index.js";
const app = express();

dbConnection();
syncDB();

app.use(express.json()); /// for read json object
app.use(allRouter);

app.listen(3001, () => {
  console.log("server started at port 3001");
});
