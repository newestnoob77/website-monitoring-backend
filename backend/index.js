import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import { connectMongodb } from "./src/config/config.js";
import { monitoringRouter } from "./src/feature/website/website.router.js";
import ApplicationError from "./src/middleware/applicationError.middleware.js";
import { logRouter } from "./src/feature/log/logRouter.js";
const app = express();
app.use(express.json());
app.use("/api/website", monitoringRouter);
app.use("/api/log",logRouter)
app.use((err, req, res, next) => {
  if (err instanceof ApplicationError) {
    return res.status(err.code || 500).send(err.message);
  }
  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(400).send(err.message);
  }
  return res.status(500).send("Internal Server Error");
});

app.listen(3000, () => {
  console.log("Server is  listening 3000");
  connectMongodb();
});
