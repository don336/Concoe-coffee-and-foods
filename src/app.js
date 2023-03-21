import express from "express";
import connect from "./db/mongoose";
import { errors } from "celebrate";

connect();
const app = express();
app.use(express.json());
app.use(errors());
app.get("/", (req, res) => {
  return res.status(200).send("Home");
});
app.use((req, res) => {
  return res.status(404).json({ message: "resource not found" });
});

export default app;
