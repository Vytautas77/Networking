import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./routers/user.js";
import eventRouter from "./routers/event.js";
import "dotenv/config";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", userRouter);
app.use("/events", eventRouter);

mongoose
  .connect(process.env.DB_CONNECT)
  .then(() => console.log("CONNECTED!!!"))
  .catch((err) => {
    console.log(err);
  });

app.listen(process.env.PORT, () =>
  console.log(`App started IN ${process.env.PORT} PORT`)
);
