const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        const authToken = token.split(' ')[1]; // Extracting the token without 'Bearer'
        jwt.verify(authToken, process.env.JWT_SEC, (err, payload) => {
            if (err) {
                return res.status(403).json("Token is not valid");
            }
            req.object_id = payload._id;
            req.role = payload.role;
            next();
        });
    } else {
        return res.status(401).json("You are not authenticated");
    }
};


const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.role.includes('admin')) {
            next();
        } else {
            res.status(403).json("you are not allowed to do this");
        }
    });
}
module.exports = { verifyToken, verifyTokenAndAdmin };