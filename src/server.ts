import { ApolloServer, gql } from "apollo-server-express";
import express from "express";
import { PORT } from "./config";

(async () => {
  const app = express();

  const apolloServer = new ApolloServer({
    typeDefs: gql`
      type Query {
        hello: String!
      }
    `,
    resolvers: {
      Query: {
        hello: () => "hello world",
      },
    },
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
