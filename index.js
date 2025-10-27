import express from "express";
import pkg from "json-server"; // 👈 FIXED
import path from "path";
import { fileURLToPath } from "url";

// ESM setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { create, router: jsonServerRouter, defaults } = pkg; // 👈 FIXED

const app = express();
const jsonServer = create();
const router = jsonServerRouter("db.json");
const middlewares = defaults();

app.use("/api", middlewares, router);

// Serve frontend from dist
app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
