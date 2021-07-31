const User = require('../models/user');
const jwt = require('jsonwebtoken');
const expressJWT = require('express-jwt');

exports.signup = async (req, res) => {
    try {
        const checkUser = await User.findOne({ email: req.body.email });
        if(checkUser) {
            return res.json({ error: "Email Already Exists"});
        }

        const user = new User(req.body);
        await user.save();
        return res.json({ msg: "Signup Successful" });
    } catch(err) {
        res.json({ msg: err.msg });
    }
}

exports.signin = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if(!user) {
            return res.json({ error: "Check email and password"});
        }

        const match = await user.comparePassword(req.body.password);
        if(!match) {
            return res.json({ error: "Check email and password"});
        }

        const token = jwt.sign({ _id: user._id}, process.env.JWT_SECRET);
        res.cookie("jwt-token", token, {expire: new Date() + 9999});
        user.password = undefined;
        user.created = undefined;
        user.__v = undefined;
        console.log(user)
        return res.json(user)
    } catch(err) {
        console.log(err)
    }
}

exports.authCheck = expressJWT({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
    requestProperty: 'auth'
})

exports.isAuthorized = (req, res, next) => {
    const isAuthorized = req.profile && req.auth && req.profile._id.equals(req.auth._id);
    if(!isAuthorized) {
        return res.status(403).json({ msg: "Not Authorized" });
    }
    console.log(isAuthorized)
    next();
}

exports.unauthorizedError = (err, req, res, next) => {
    if(err.name === 'UnauthorizedError') return res.status(400).json({ msg: 'Unauthorized Error. No Token Found' });
    next();
}