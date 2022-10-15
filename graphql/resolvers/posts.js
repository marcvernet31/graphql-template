const Post = require('../../models/Post')
const checkAuth = require('../../util/check-auth')


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
        async createPost(_, {body}, context) {
            // Check that the user is loged in ans has auth to post
            const user = checkAuth(context)

            const newPost = new Post({
                body,
                createdAt: new Date().toISOString()
            })
            const post = await newPost.save()
            return post;
        }
    }
}