const { gql } = require('apollo-server-express');

const typeDefsAuth = gql`
  type User {
    id: ID
    firstName: String
    lastName: String
    email: String
  }
  extend type Query {
    currentUser: User
  }
  type AuthPayload {
    user: User
  }
  extend type Mutation {
    signup(firstName: String!, lastName: String!, email: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
    logout: Boolean
  }
`;

module.exports = typeDefsAuth;