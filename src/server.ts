import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { buildSchema } from "type-graphql";

import { PORT } from "./config";
import HelloResolver from "./resolvers/hello";

(async () => {
  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({ resolvers: [HelloResolver] }),
  });

  apolloServer.applyMiddleware({ app, cors: false });

  // Test path
  app.get("/", (_req, res) => {
    return res.send("OK");
  });

  app.listen(PORT, () =>
    console.log(
      `server running on http://localhost:${PORT}${apolloServer.graphqlPath}`
    )
  );
})();
