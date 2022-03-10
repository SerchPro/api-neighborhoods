const { response} = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = ( req, res = response, next ) => {

    const token = req.header('x-token')
    console.log('mi token', token)

    if( !token ) {
        res.status(401).json({ 
        ok: false,
        msg: "request without token",
        });
    }

    try {
        const { uid, username, url_user} = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        )
        req.uid = uid;
        req.username = username
        req.url_user = url_user

    }catch (err){
        console.log(err)
        res.status(401).json({ 
            ok: false,
            msg: "invalid token",
        });
    }
    next();
}

module.exports =  {
    validateJWT
}