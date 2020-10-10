import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { buildSchema } from "type-graphql";

import { dbConfig, PORT } from "./config";
import HelloResolver from "./resolvers/hello";
import UserResolver from "./resolvers/user";
import { createConnection } from "typeorm";

(async () => {
  const app = express();

  await createConnection(dbConfig);

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, UserResolver],
      validate: false,
    }),
  });

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
