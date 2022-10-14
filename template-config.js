const username = "marc"
const password = "????"
const cluster = "cluster0"
const collection = "template"

// retrieve the url from mongodb, Connect > Connect your application

module.exports = {
    MONGODB:  `mongodb+srv://${username}:${password}${cluster}.mda5m.mongodb.net/${collection}?retryWrites=true&w=majority`
}