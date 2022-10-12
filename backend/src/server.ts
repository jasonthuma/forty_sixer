import path from "path";

import { AppDataSource } from "./data-source";
import express, { Request, Response } from "express";
const app = express();
import cors from "cors";
import bodyParser from "body-parser";
import { errorHandler } from "./middleware/errorHandler";
import userRoutes from "./routes/userRoutes";
import mountainRoutes from "./routes/mountainRoutes";
import hikeRoutes from "./routes/hikeRoutes";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:8000",
  })
);

app.use("/users", userRoutes);
app.use("/mountains", mountainRoutes);
app.use("/hikes", hikeRoutes);

app.use(express.static(path.join(__dirname, "../../frontend/build")));

app.get("*", (req: Request, res: Response) => {
  res.sendFile(
    path.resolve(__dirname, "../../", "frontend", "build", "index.html")
  );
});

app.use(errorHandler);

AppDataSource.initialize()
  .then(async () => {
    app.listen(8000, () => {
      console.log("Server listening on port 8000");
    });
  })
  .catch((error) => console.log(error));
