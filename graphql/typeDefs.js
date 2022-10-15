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
        username: String!
    }

    type User {
        id: ID!
        email: String!
        username: String!
        token: String!
        createdAt: String!
    }

    # The "Query" type is special: it lists all of the available queries that
    # clients can execute, along with the return type for each. In this
    # case, the "posts" query returns an array of zero or more Posts (defined above).
    type Query {
        getPosts: [Post]
        getPost(postId: ID!): Post
    }

    # Usially a register input would also have a confirmPassword and a email
    input RegisterInput {
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
    }

    # the mutation type allows to perform actions on the database
    type Mutation {
        register(registerInput: RegisterInput): User!
        login(username: String!, password: String!): User!
        createPost(body: String!): Post!
        deletePost(postId: ID!): String!
    }
`



