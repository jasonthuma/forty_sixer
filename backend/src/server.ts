import { AppDataSource } from "./data-source";
import express from "express";
const app = express();
import cors from "cors";
import bodyParser from "body-parser";
import { errorHandler } from "./middleware/errorHandler";
import userRoutes from "./routes/userRoutes";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: "https://localhost:3000",
  })
);

app.use("/users", userRoutes);

app.use(errorHandler);

AppDataSource.initialize()
  .then(async () => {
    app.listen(8000, () => {
      console.log("Server listening on port 8000");
    });
  })
  .catch((error) => console.log(error));
