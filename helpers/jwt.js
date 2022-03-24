
const jwt = require("jsonwebtoken");


const createJWT = (uid) =>{
    const payload = {uid}
    jwtResponse = jwt.sign(payload, process.env.SECRET_JWT_SEED, {expiresIn:'2h'})
    tokenParts = jwtResponse.split('.')
    return { jwtResponse , tokenParts}
}

module.exports = {
    createJWT
}