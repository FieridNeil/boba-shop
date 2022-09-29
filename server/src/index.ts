import express, { Application, Request, Response } from "express";
import cors from "cors";
import { query, dbinit } from "./db/db";

const app: Application = express();
const PORT = process.env.PORT || 3001;
app.use(express.json());
app.use(cors());

// dbinit()
//   .then(() => console.log("DB INITIALIZED"))
//   .catch((err) => console.log(err));

app.get("/", (req: Request, res: Response) => {
  res.json({ status: 200 });
});

app.get("/get_menu", async (req: Request, res: Response) => {
  try {
    const data = await query({});
    res.json({ data });
  } catch (e) {
    console.log("Failed to query menu", e);
  }
});

app.listen(PORT, () => {
  console.log("server is listening on port", PORT);
});
