const { gql } = require('apollo-server')

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.

// The ! indicates 
module.exports = gql`
    # This "Post" type defines the queryable fields for every post in our data source.
    type Post {
        id: ID!
        body: String!
        createdAt: String!
    }

    # The "Query" type is special: it lists all of the available queries that
    # clients can execute, along with the return type for each. In this
    # case, the "posts" query returns an array of zero or more Posts (defined above).
    type Query {
        getPosts: [Post]
        getPost(postId: ID!): Post
    }

    # the mutation type allows to perform actions on the database
    type Mutation {
        createPost(body: String!): Post!
        deletePost(postId: ID!): String!
    }
`