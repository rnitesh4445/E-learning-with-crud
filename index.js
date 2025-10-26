const jsonServer = await import("json-server");

const server = jsonServer.default.create();
const router = jsonServer.default.router("db.json");
const middlewares = jsonServer.default.defaults();
const port = process.env.PORT || 8080;

server.use(middlewares);
server.use(router);

server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
