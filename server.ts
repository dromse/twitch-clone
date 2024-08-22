import { createServer } from "http";
import next from "next";
import { Server } from "socket.io";
import { parse } from "url";

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const nextServer = createServer((req, res) => {
    const parsedUrl = parse(req.url!, true);
    handle(req, res, parsedUrl);
  });

  const io = new Server(nextServer);

  io.on("connection", (socket) => {

  })

  nextServer.listen(port, () => {
    console.log(
      `> Server listening at http://localhost:${port} as ${dev ? "development" : process.env.NODE_ENV
      }`,
    );
  });
});
