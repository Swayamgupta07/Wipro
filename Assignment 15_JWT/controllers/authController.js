const User = require('../models/User');
const jwt = require('jsonwebtoken');

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: 120 
    });
};

module.exports.signup_get = (req, res) => {
    res.render('register');
};

module.exports.login_get = (req, res) => {
    res.render('login');
};

module.exports.signup_post = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const user = await User.create({ name, email, password, role });
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: 120 });
        res.status(201).json({ user: user._id });
    } catch (err) {
        console.error("Signup Error Detailed:", err);
        res.status(400).json({ error: 'Error: ' + err.message });
    }
};

module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            const auth = await user.matchPassword(password);
            if (auth) {
                const token = createToken(user._id);
                res.cookie('jwt', token, { httpOnly: true, maxAge: 120 });
                res.status(200).json({ user: user._id });
            } else {
                throw Error('incorrect password');
            }
        } else {
            throw Error('incorrect email');
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports.logout_get = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
};
