const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {;
        // const token = req.headers.authorization.split(' ')[1];
        const token = req.cookies.jwtToken; // this does not look right
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded
        next();
    } catch (error) {
        console.log('From /auth/check-auth =>', error)
        return res.status(401).json({
            message: 'Authentication failed. Please go back'
        });
    };
};