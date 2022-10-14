const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose')

// The privarte key for mongoDb connection needs to be in a separate file that has 
// to be on .gitignore to avoid publishing the secrets
// check template-config.js for and example
const { MONGODB } = require('./config')
const resolvers = require('./graphql/resolvers')
const typeDefs = require('./graphql/typeDefs')


/*
QUERIES FOR APOLLO-SERVER

Query {
  getPosts{
    id
    body
    createdAt
  }
}

Query  {
  getPost(postId: "63492e22890bddc5ce71f16f"){
    id
    body
    createdAt
  }
}

mutation{
  createPost(body: "This is another test Post"){
    id
    body 
    createdAt
  }
}

*/

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs,
    resolvers,
    // context passed needed for authentication (not really used for anything here)
    context: ({req}) => ({req})
})


mongoose.connect(MONGODB, {useNewUrlParser: true})
    .then( () => {
        console.log("MongoDb connected")
        return server.listen({port: 5000})
    })
    .then(res => {
        console.log(`Server running at ${res.url}`)
    })