import jsonServer from "json-server";

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

// Use middlewares
server.use(middlewares);

// Serve JSON routes
server.use("/api", router); // all API calls prefixed with /api

// Use Render's PORT or fallback
const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`JSON Server running at http://localhost:${PORT}`);
});
