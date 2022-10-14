### GraphQL Template

Template to create fast a graphql server (Apollo) connected with mongoDB.
Assumes a collection called `template` on mongoDB.

dependencies: `apollo-server`,  `graphql`,  `mongoose`

The objects created are posts with a text body and a creation timestamp.
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

mutation{
  createPost(body: "This is another test Post"){
    id
    body 
    createdAt
  }
}
````

Start with `node index.js`

