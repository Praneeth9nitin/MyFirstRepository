
const { JWT_SECRET } = require("../config")
const jwt = require("jsonwebtoken")

const authMiddleware=function(req,res,next) {
    const auth = req.header.authorization
    if(!auth || !auth.startsWith('Bearer ')){
        res.status(403).json({})
    }

    const token=auth.split(' ')[1]
    try {
        const decode=jwt.verify(token,JWT_SECRET)
        req.userId=decode.userId;
        console.log(decode.userId)
        next();
    } catch (error) {
        res.status(403).json({})
    }
}

module.exports={
    authMiddleware
}
    

