const jwt = require('../lib/jwt');
const { SECRET } = require('../config/config');


const authMiddleware = async (req, res, next) => {
    const token = req.cookies['auth'];

    if (!token) {
        return next();
    }

    try {
        const decodedToken = await jwt.verify(token, SECRET);

        req.user = decodedToken;
        res.locals.isAuthenticated = true;
        res.locals.user = decodedToken;

        next();
    } catch {
        res.clearCookie('auth');
        res.redirect('/auth/login');
    }
};

const isAuthMiddleware = (req, res, next) => {
    if (!req.user) {
        return res.redirect('/auth/login');
    }

    next();
};

module.exports = {
    authMiddleware,
    isAuthMiddleware,
}