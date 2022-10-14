const Post = require('../../models/Post')


module.exports = {
    Query: {
        async getPosts(){
            try {
                const posts = await Post.find();
                return posts;
            } catch(err) {
                throw new Error(err)
            }
        },
        async getPost(_, {postId}) {
            try {
                const post = await Post.findById(postId);
                if(post) {
                    return post;
                }
            } catch(err) {
                throw new Error(err)
            }
        } 
    },
    Mutation: {
        async createPost(_, {body}) {
            const newPost = new Post({
                body,
                createdAt: new Date().toISOString()
            })
            const post = await newPost.save()
            return post;
        }
    }
}