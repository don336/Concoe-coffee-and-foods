import express from "express";
import connect from "./db/mongoose";
import { errors } from "celebrate";
import routes from "./routes/index";
connect();
const app = express();
// app.use(cors());
app.use(express.json());
app.use(errors());
app.use(routes);
app.get("/", (req, res) => {
  return res.status(200).send("Home");
});
app.use((req, res) => {
  return res.status(404).json({ message: "resource not found" });
});

export default app;
