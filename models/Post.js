const { model, Schema } = require('mongoose')

// Everything in Mongoose starts with a Schema. 
// Each schema maps to a MongoDB collection and defines 
// the shape of the documents within that collection.


const postSchema = new Schema({
    body: String,
    createdAt: String,
    username: String
})

module.exports = model('Post', postSchema)