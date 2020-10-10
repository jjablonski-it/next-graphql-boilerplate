import express from "express";
import { PORT } from "./config";

(async () => {
  const app = express();

  // Test path
  app.get("/", (_req, res) => {
    return res.send("OK");
  });

  app.listen(PORT, () =>
    console.log(`server running on http://localhost:${PORT}`)
  );
})();
