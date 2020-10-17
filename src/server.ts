import "dotenv/config";
import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { buildSchema } from "type-graphql";
import cookieParser from "cookie-parser";
import cors from "cors";

import { PORT } from "./config";
import HelloResolver from "./resolvers/HelloResolver";
import UserResolver from "./resolvers/UserResolver";
import { createConnection } from "typeorm";
import refreshTokenRoute from "./auth/refreshTokenRoute";

(async () => {
  // Typeorm
  try {
    const connection = await createConnection();
    await connection.runMigrations();
  } catch (e) {
    throw e;
  }

  // Express
  const app = express();

  // Graphql
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  // Middleware
  app.use(cors({ origin: "http://localhost:3000", credentials: true }));
  app.use("/refresh_token", cookieParser());
  app.use("/refresh_token", refreshTokenRoute);
  apolloServer.applyMiddleware({ app, cors: false });

  // Test path
  app.get("/", (_req, res) => {
    return res.send("OK");
  });

  // Server
  app.listen(PORT, () =>
    console.log(
      `graphql server running on http://localhost:${PORT}${apolloServer.graphqlPath}`
    )
  );
})();
