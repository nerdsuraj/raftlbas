import express,{Express,Application, application} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { createServer } from 'http';
import bodyParser from 'body-parser';
// import indexRouter from './routes/index';
import { Server } from 'socket.io';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './graphql/schema.js';
import { Resolvers } from './controllers/userController.js';


dotenv.config();

const app:Application= express();
app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT || 4000;

mongoose.connect(process.env.MONGO_URI2!, {
}).then(() => console.log("🚀 ~ MongoDB connected successfully!"))
  .catch((error) => console.error("MongoDB connection error:", error));

// app.use('/api', indexRouter);

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers: Resolvers,
  context: ({ req }) => ({ req }), // Include `req` for JWT validation in context if needed
});

await apolloServer.start();
apolloServer.applyMiddleware({ app: app as any });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`GraphQL endpoint at http://localhost:${port}${apolloServer.graphqlPath}`);
});

// const httpServer = createServer(app);
// const io = new Server(httpServer);


// io.on('connection', (socket) => {
//   console.log('New WebSocket connection');
//   socket.on('disconnect', () => console.log('User disconnected'));
// });

// httpServer.listen(port, () => console.log(`Server is running on port ${port}`));
