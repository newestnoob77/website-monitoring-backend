import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { connectMongodb } from "./src/config/config.js";
import { monitoringRouter } from "./src/feature/website/website.router.js";
import ApplicationError from "./src/middleware/applicationError.middleware.js";
const app = express();
app.use(express.json());
app.use("/api/website", monitoringRouter);
app.use((err, req, res, next) => {
  if (err instanceof ApplicationError) {
    return res.status(err.code).send(err.message);
  }
  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(err.code).send(err.message);
  }
});

app.listen(3000, () => {
  console.log("Server is  listening 3000");
  connectMongodb();
});
