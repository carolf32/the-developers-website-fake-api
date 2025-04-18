import express from "express";
import { ErrorRequestHandler } from "express";
import "reflect-metadata";
import { commentRouter } from "./routes/commentRouter";
import { userRouter } from "./routes/userRouter";
import { HandleErrors } from "./middlewares/handleErrors.middleware";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", commentRouter);
app.use("/api/users", userRouter);

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  HandleErrors.execute(error, req, res, next);
};

app.use(errorHandler);

export default app;
