import { config } from "dotenv";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { Hike } from "./entities/Hike";
import { Mountain } from "./entities/Mountain";
import { User } from "./entities/User";

config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: false,
  entities: [User, Hike, Mountain],
  migrations: [],
  subscribers: [],
});
