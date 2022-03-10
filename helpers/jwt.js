
const jwt = require("jsonwebtoken");


const createJWT = (uid, username, url_user) =>{
    //jwt.sign({valorEncrip},palabraSecreta,{opciones})
    //sadasdouasodi.dausdioasudio.1231231231235
    const payload = {uid, username, url_user}
    jwtResponse = jwt.sign(payload, process.env.SECRET_JWT_SEED, {expiresIn:'24h'})
    tokenParts = jwtResponse.split('.')
    //console.log(jwtResponse)
    return { jwtResponse , tokenParts}
}

module.exports = {
    createJWT
}