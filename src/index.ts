import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import router from "./routes";

const app = express();
const PORT = process.env.PORT || 8000;

dotenv.config();

// App middlewares
app.use(express.json());
app.use(cors());
app.use("/api", router);

app.listen(PORT, () => {
  console.log(`[LISTENING] Server listening on PORT ${PORT}...`);
});
