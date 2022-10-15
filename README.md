### GraphQL Template

Template to create fast a graphql server (Apollo) connected with mongoDB with a layer of user authentication
Assumes a collection called `template` on mongoDB.

dependencies: `apollo-server`,  `graphql`,  `mongoose`

User profiles can be registered and loged-in, the context of the current user logged-in is needed in order to create a post.
Example of how to generate and handle auth-tokens.

Supported actions:

````

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

**** MUTATIONS ****

mutation{
  createPost(body: "This is another test Post"){
    id
    body 
    createdAt
  }
}

mutation {
  register(registerInput: {
    username:"tet"
    password:"1234"
    confirmPassword:"1234"
    email:"marc@test.com"
  }){
    id 
    email 
    token 
    username 
    createdAt
  }
}

mutation{
  login(username: "tet", password: "1234"){
    id
    username
    email
  }
}

mutation{
  createPost(body: "Another post with auth") {
    id
    body 
    createdAt
  }
}


````

Start with `node index.js` or `nodemon index.js`

