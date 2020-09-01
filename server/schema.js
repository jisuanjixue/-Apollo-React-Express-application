const typeDefsPost = require('./modules/post/graphqlSchema')
const typeDefsAuth = require('./modules/auth/graphqlSchema')

const typeDefs = gql`
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
  ${typeDefsPost}
  ${typeDefsAuth}
`

module.exports = typeDefs
