import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { createServer } from 'http';
import bodyParser from 'body-parser';
import { Server as SocketIOServer } from 'socket.io';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './graphql/schema.js';
import { Resolvers } from './controllers/userController.js';
import jwt from 'jsonwebtoken';

dotenv.config();

const app: Application = express();
app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT || 4000;


// MongoDB connection
mongoose.connect(process.env.MONGO_URI2!, {
}).then(() => console.log("🚀 ~ MongoDB connected successfully!"))
  .catch((error) => console.error("MongoDB connection error:", error));

const httpServer = createServer(app);


const io = new SocketIOServer(httpServer, {
  cors: {
    origin: '*', // Configure this based on your client
  },
});

// Middleware for JWT validation with Socket.IO
io.use((socket, next) => {
  console.log("🚀 ~ io.use ~ socket.handshake.auth", socket.handshake)
  const token =  socket.handshake.auth?.token || socket.handshake.headers?.auth;;
  console.log("🚀 ~ io.use ~ token:", token)
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET!, (err: any, decoded: any) => {
      if (err) return next(new Error("Authentication error"));
      socket.data.user = decoded; // Attach decoded token data to socket
      next();
    });
  } else {
    next(new Error("No token provided"));
  }
});


// Handle WebSocket connections
io.on("connection", (socket) => {
  console.log("User connected:", socket.data.user);

  // Join specific rooms
  socket.on("joinRoom", (room) => {
    socket.join(room);
    console.log(`User ${socket.data.user.id} joined room: ${room}`);
  });

  // Broadcast messages to clients in a room
  socket.on("message", (room, message) => {
    io.to(room).emit("message", message);
  });

  // Disconnect
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Initialize Apollo Server
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers: Resolvers,
  context: ({ req }) => ({ req }), // Include `req` for JWT validation in context if needed
});

await apolloServer.start();
apolloServer.applyMiddleware({ app: app as any });

httpServer.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`GraphQL endpoint at http://localhost:${port}${apolloServer.graphqlPath}`);
});

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
//   console.log(`GraphQL endpoint at http://localhost:${port}${apolloServer.graphqlPath}`);
// });