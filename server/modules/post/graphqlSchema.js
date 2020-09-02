// #1 Import the gql method from apollo-server-express
const { gql } = require('apollo-server-express');

// #2 Construct a schema with gql and using the GraphQL schema language
const typeDefsPost = gql`
  type Post {
    _id: ID,
    title: String,
    content: String
  }
  extend type Query {
    posts: [Post]
  }
  type postPayload {
    post: Post
  }
  extend type Mutation {
    addPost(title: String!, content: String!): postPayload,
  }
`;

module.exports = typeDefsPost;