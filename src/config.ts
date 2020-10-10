import { ConnectionOptions } from "typeorm";

export const PORT = process.env.PORT || 4000;

export const dbConfig = {
  type: "postgres",
  database: "test",
  username: "postgres",
  password: "123",
  synchronize: true,
  entities: ["./build/entities/**/*.js"],
} as ConnectionOptions;
