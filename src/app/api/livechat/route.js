// pages/api/socket.js
import { Server } from "socket.io";

export default function handler(req, res) {
  if (req.method === "GET") {
    // Ensure that your socket server is only initialized once
    if (!res.socket.server.io) {
      console.log("Initializing WebSocket server...");
      
      const io = new Server(res.socket.server, {
        path: "/api/livechat/socket.io", // Ensure you use the correct path
      });
  

      io.on("connection", (socket) => {
        console.log("User connected");

        socket.on("chat_message", (msg) => {
          io.emit("chat_message", msg);  // Broadcast to all clients
        });

        socket.on("disconnect", () => {
          console.log("User disconnected");
        });
      });

      res.socket.server.io = io; // Store the socket.io server in the socket server
    }

    return res.end();
  }

  res.status(405).end(); // Method Not Allowed if not a GET request
}
