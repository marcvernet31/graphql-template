const postsResolvers = require('./posts')

// Resolvers define the technique for fetching the types defined in the
// schema.

// Using an index file is just a way of having the functions 
// more organized in case of having resolvers for different objects
// ... functions could be defined directly here
module.exports = {
    Query: {
        ... postsResolvers.Query
    },
    Mutation: {
        ... postsResolvers.Mutation
    }
}