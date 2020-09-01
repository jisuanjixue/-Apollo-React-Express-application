// #1 Import Express and Apollo Server
const express = require('express');
const session = require('express-session');
const { ApolloServer } = require('apollo-server-express');
// import { authMiddleware } from './auth_middleware';
const uuid = require('uuid/v4');
const passport = require('passport')
const { GraphQLLocalStrategy, buildContext } =  require('graphql-passport')

// #2 Import mongoose
// const mongoose = require('./config/database');

const users = [
  {
    id: '1',
    firstName: 'Maurice',
    lastName: 'Moss',
    email: 'maurice@moss.com',
    password: 'abcdefg'
  },
  {
    id: '2',
    firstName: 'Roy',
    lastName: 'Trenneman',
    email: 'roy@trenneman.com',
    password: 'imroy'
  }
];

const User = {
  getUsers: () => users,
  addUser: (user) => users.push(user),
}
// #3 Import GraphQL type definitions
const typeDefs = require('./schema');
// const typeDefsAuth = require('./modules/auth/graphqlSchema');
// const arryTypeDefs = [typeDefs, typeDefsAuth]


// #4 Import GraphQL resolvers
const resolversPost = require('./modules/post/resolvers');
const resolversAuth = require('./modules/auth/resolvers');
// const arryResolvers = [resolvers, resolversAuth]

const SESSION_SECRECT = 'bad secret';

passport.use(
  new GraphQLLocalStrategy((email, password, done) => {
    const users = User.getUsers();
    const matchingUser = users.find(user => email === user.email && password === user.password);
    const error = matchingUser ? null : new Error('no matching user');
    done(error, matchingUser);
  }),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const users = User.getUsers();
  const matchingUser = users.find(user => user.id === id);
  done(null, matchingUser);
});

// #6 Initialize an Express application
const app = express();

app.use(session({
  genid: (req) => uuid(),
  secret: SESSION_SECRECT,
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

// #5 Initialize an Apollo server
const server = new ApolloServer({ 
  // typeDefs: [typeDefsAuth, typeDefsPost], 
  typeDefs, 
  resolvers: [resolversAuth,resolversPost], 
  context: ({ req, res }) => buildContext({ req, res, User }),
  playground: {
    settings: {
      'request.credentials': 'same-origin',
    },
  },
});

// #7 Use the Express application as middleware in Apollo server
server.applyMiddleware({ app });

// #8 Set the port that the Express application will listen to
app.listen(4000);
// app.listen({ port: 3000 }, () => {
  console.log(`Server running on http://localhost:${4000}${server.graphqlPath}`);
// });