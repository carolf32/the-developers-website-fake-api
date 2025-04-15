import express from "express";
import "reflect-metadata";
import { commentRouter } from "./routes/commentRouter";
import { userRouter } from "./routes/userRouter";

const app = express();

app.use(express.json());

app.use("/api", commentRouter);
app.use("/api/users", userRouter);

export default app;
