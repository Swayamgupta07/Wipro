const jwt = require('jsonwebtoken');
const User = require('../models/User');

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                next();
            } else {
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        });
    } else {
        res.locals.user = null;
        next();
    }
};

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                res.redirect('/auth/login');
            } else {
                next();
            }
        });
    } else {
        res.redirect('/auth/login');
    }
};

const authorize = (...roles) => {
    return (req, res, next) => {
        if (!res.locals.user || !roles.includes(res.locals.user.role)) {
            return res.status(403).send("<h1>403 Forbidden</h1><p>You don't have permission to access this page.</p><a href='/'>Go Home</a>");
        }
        next();
    };
};

module.exports = { requireAuth, checkUser, authorize };
