# GraphQL API with TypeScript, Express, and WebSocket Support

This project is a GraphQL API built with Node.js and Express, using TypeScript for clean, strongly-typed code. It includes JWT-based authentication, database integration (MongoDB or PostgreSQL), and real-time communication with WebSocket support.

## Project Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/nerdsuraj/raftlbas
   cd raftlbas

   npm install

   
DATABASE_URL=mongodb+srv://soorajkrpandit:5Kqq6vdWIm5LizAY@cluster0.venxf.mongodb.net/sample_restaurants?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=suraj
PORT=4000

npm start


## Features
1.GraphQL API with TypeScript-based schema and resolvers
2.JWT Authentication for securing endpoints
3.Database Integration with MongoDB or PostgreSQL
4.Caching for improved performance
5.Real-Time Communication using Socket.IO
6.Technologies Used
7.Node.js, Express, TypeScript, GraphQL, JWT
8.MongoDB/PostgreSQL with Mongoose/Sequelize ORM
9.Socket.IO for real-time WebSocket support

Start the Server:

bash
Copy code
npm start
GraphQL Playground: Access at http://localhost:4000/graphql.

WebSocket Communication: Use Socket.IO to connect and communicate with the server.

## Postman Collection

5. **Postman API Collection**:
   - A Postman API collection has been included in this project to simplify testing and demonstrate all available endpoints.
   - You can find the collection file at `postman_collection.json` in the root directory of the project.
   - **To use the Postman collection**:
     1. Open Postman.
     2. Click on **Import** in the top left.
     3. Select the `postman_collection.json` file from the project directory.
     4. The collection will appear in your Postman under **Collections**, where you can test each API endpoint with the correct request format and headers.

Make sure to update or regenerate the collection in Postman if you add new endpoints, ensuring all routes are up to date in the `postman_collection.json`.
