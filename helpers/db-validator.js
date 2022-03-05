
const Usuario = require('../models/User.model')

const emailExists = async(email) => {
    const user = await Usuario.findOne({ email });
    if (user) {
        throw new Error(`the email: ${ email } is already registered`)
    }
}

const usernameExists = async( username ) => {
    const user = await Usuario.findOne({ username });
    if (user) {
        // If the user is found, send the message username is taken
        throw new Error(`the username: ${ username } already taken.`)
    }
}

module.exports = {
    emailExists,
    usernameExists
}