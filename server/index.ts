import express from "express";
import path from "path";
import dotenv from "dotenv";
import { connect } from "mongoose";

import { apiRouter, assetsRouter } from "./src/routes";

dotenv.config({ path: ".env.local" });

const { MONGODB_URI } = process.env;

MONGODB_URI &&
  connect(MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true });

const app = express();

app.use(express.json());
app.use("/api/v1", apiRouter);

app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "static/index.html"));
});

app.get("/search", (_req, res) => {
  res.sendFile(path.join(__dirname, "static/index.html"));
});

/* Add your routes here */

// Remember remove the assets router in production
app.get("/*", assetsRouter, (_req, res) => {
  res.status(404).sendFile(path.join(__dirname, "static/index.html"));
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log();
  console.log(`  App running in port ${PORT}`);
  console.log();
  console.log(`  > Local: \x1b[36mhttp://localhost:\x1b[1m${PORT}/\x1b[0m`);
});
