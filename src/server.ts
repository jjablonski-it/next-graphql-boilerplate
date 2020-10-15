import "dotenv/config";
import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { buildSchema } from "type-graphql";
import cookieParser from "cookie-parser";

import { dbConfig, PORT } from "./config";
import HelloResolver from "./resolvers/HelloResolver";
import UserResolver from "./resolvers/UserResolver";
import { createConnection } from "typeorm";
import refreshTokenRoute from "./auth/refreshTokenRoute";

(async () => {
  await createConnection(dbConfig);
  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  // Middleware
  app.use("/refresh_token", cookieParser());
  app.use("/refresh_token", refreshTokenRoute);
  apolloServer.applyMiddleware({ app, cors: false });

  // Test path
  app.get("/", (_req, res) => {
    return res.send("OK");
  });

  app.listen(PORT, () =>
    console.log(
      `graphql server running on http://localhost:${PORT}${apolloServer.graphqlPath}`
    )
  );
})();
