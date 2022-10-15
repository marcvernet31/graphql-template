
// Apollo comes with its own error classes
// https://www.apollographql.com/docs/apollo-server/data/errors/
const { UserInputError } = require('apollo-server')
// JSON web tokens are a way of securing claims between two parties
// jwt is a library to generate and translate these tokens
const jwt = require('jsonwebtoken')
// Bcrypt is a hashing algorithm designed for web passwords
const bcrypt = require('bcryptjs')

// Validation functions. Check that inputs are correct before sending to database
const {  validateRegisterInput, validateLoginInput } = require('../../util/validators');
const { SECRET_KEY }= require('../../config')
const User = require('../../models/User')


function generateToken(user) {
    return jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username
    },
    SECRET_KEY,
    {expiresIn: '1h'}
    )
}

module.exports = {
    Mutation: {
        async login(_, {username, email, password, confirmPassword}) {
            const {errors, valid} = validateLoginInput(username, password)
            const user = await User.findOne({username})

            // correct validation
            if(!valid){
                throw new UserInputError('Wrong credentials', {errors})
            }
    
            // cehck if the user exists
            if(!user){
                errors.general = "User not found"
                throw new UserInputError('User not found', {errors})
            }

            // Check if the password matches the one in the database
            const match = await bcrypt.compare(password, user.password)
            if(!match){
                errors.general = "Wrong credentials"
                throw new UserInputError('Wrong credentials', {errors})
            }

            // generate token
            const token = generateToken(user)

            return {
                ... user._doc,
                id: user._id,
                token
            }
        },
        
        async register(_, {
            registerInput:{username, email, password, confirmPassword}}
        ) {
            console.log("username: ", username)
            // Execute input validation and check that its correct
            const { valid, errors } = validateRegisterInput(username, email, password, confirmPassword)
            if(!valid) {
                throw new UserInputError('Errors', {errors})
            }

            // Check if the new user exists already
            const user = await User.findOne({username})
            console.log("user: ", user)

            if(user) {
                throw new UserInputError('Username is taken', {
                    errors: {
                        username: "This username is taken"
                    }
                })
            }

            // hash password
            password = await bcrypt.hash(password, 12)

            // Upload new user object to database
            const newUser = new User({
                email,
                username,
                password,
                createdAt: new Date().toISOString()
            })
            
            console.log("newUser: ", newUser)
            const res = await newUser.save()

            // create auth token
            const token = generateToken(res);

            return {
                ... res._doc,
                id: res._id,
                token
            }
        }
    }
}