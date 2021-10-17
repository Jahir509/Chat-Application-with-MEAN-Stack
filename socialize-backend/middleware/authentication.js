const jwt = require('jsonwebtoken')

function checkAuth(req,res,next){
    const token = req.headers.authorization.split(" ")[1];
    if(!token) res.status(401).json({
        message:"User not authorized"
    })
    try{
        const decodedData = jwt.verify(token,'KothinSercret')
        req.user = decodedData
        next();
    }
    catch (error) {
        res.status(400).send('You are not authenticated');
    }
    
}

module.exports = checkAuth;