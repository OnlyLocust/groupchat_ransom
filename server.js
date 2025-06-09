import { createServer } from "http";
import { parse } from "url";
import next from "next";
import { Server } from "socket.io";
import dotenv from "dotenv";

dotenv.config();

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port);

  const users = new Map(); // name => { socketId, lastSeen }

  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    // When user joins
    socket.on("join", (name) => {
      if (users.has(name)) {
        io.to(socket.id).emit("duplicate");
        socket.disconnect(true);
      } else {
        users.set(name, { socketId: socket.id, lastSeen: Date.now() });
        io.emit("welcome", name);
        io.emit("all", Array.from(users.keys()));
      }
    });

    // When user sends a message
    socket.on("send", ({ name, msg }) => {
      const user = users.get(name);
      if (user) user.lastSeen = Date.now(); // update heartbeat
      io.emit("recv", { name, msg });
    });

    // Heartbeat from client
    socket.on("heartbeat", (name) => {
      const user = users.get(name);
      if (user) user.lastSeen = Date.now();
    });

    // When user leaves manually
    socket.on("leave", (name) => {
      users.delete(name);
      io.emit("leaving", name);
      io.emit("all", Array.from(users.keys()));
    });

    // Cleanup on socket disconnect (optional)
    socket.on("disconnect", () => {
      for (const [name, user] of users.entries()) {
        if (user.socketId === socket.id) {
          users.delete(name);
          io.emit("leaving", name);
          io.emit("all", Array.from(users.keys()));
          break;
        }
      }
    });
  });

  // Check inactive users every 1 minute
  setInterval(() => {
    const now = Date.now();
    const timeout = 3 * 60 * 1000; // 5 minutes

    for (const [name, { lastSeen }] of users.entries()) {
      if (now - lastSeen > timeout) {
        console.log(`⏱️ Removing inactive user: ${name}`);
        users.delete(name);
        io.emit("leave", name);
        io.emit("all", Array.from(users.keys()));
      }
    }
  }, 1 * 60 * 1000); // every 1 minute

  console.log(
    `🚀 Server listening on port : ${port} (${
      dev ? "development" : "production"
    })`
  );
});
