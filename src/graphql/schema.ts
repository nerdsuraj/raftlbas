import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
  }

  type Address {
    building: String!
    coord: [Float!]!
    street: String!
    zipcode: String!
  }

  type Grade {
    date: String!
    grade: String!
    score: Int!
  }

  type Restaurant {
    id: ID!
    address: Address!
    borough: String!
    cuisine: String!
    grades: [Grade!]!
    name: String!
    restaurant_id: String!
  }

  type Query {
    studentList: [User]
    restaurantList: [Restaurant!]!
  }

  type Mutation {
    register(username: String!, email: String!, password: String!): User
    login(username: String!, password: String!): String
  }
`;
