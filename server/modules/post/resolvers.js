// #1 Import the model created with mongoose
// const Post = require('./models/post');
const uuid = require('uuid/v4');

// #2 Create resolver functions to handle GraphQL queries
/**
 * Query resolver "posts" must return values in response to
 * the query "posts" in GraphQL schema.
 */
const resolvers = {
  Query: {
    // Query which returns posts list
    posts: (parent, args, context) => context.Post.getPosts(),
  },

/**
 * Mutation resolver addPost creates a new document in MongoDB
 * in response to the "addPost" mutation in GraphQL schema.
 * The mutation resolvers must return the created object.
 */
  Mutation: {
    addPost:  (parent, {title, content}, context) => {
      // Create a new record in the database
      // new Post({ title: post.title, content: post.content });
      const newPost = { _id: uuid(), title, content} 
      // Save the record and return it
      // return newPost.save();
      context.Post.addPost(newPost);
      return  { post: newPost };
    }
  }
};

module.exports = resolvers;