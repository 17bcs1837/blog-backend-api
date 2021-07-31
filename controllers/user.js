const User = require('../models/user');
const _ = require('lodash');

exports.userById = (req, res, next, id) => {
    User.findById(id).then((user) => {
        if(!user) return res.status(400).json({ msg: "User not found" });

        req.profile = user;
        next();
    })
    .catch(err => {
        res.json({msg:err})
    })
};

exports.allUsers = (req, res) => {
    User.find().then( users => {
        if(!users) return res.status(400).json({ msg: "Users not found" });

        return res.status(200).json({ msg: users });
    })
}

exports.getUser = (req, res) => {
    req.profile.password = undefined;
    res.json({ msg: req.profile });
}

exports.updateUser = (req, res) => {
    let user = req.profile;
    user = _.extend(user, req.body);
    
    user.save((err, user) => {
        if(err) return res.status(400).json({ msg: "Couldn't Update User"});

        user.password = undefined;
        return res.json({ msg: user });
    })
}

exports.deleteUser = (req, res) => {
    let user = req.profile;
    user.remove((err, user) => {
        if(err) return res.status(400).json({ msg: "Couldn't Delete User "});

        res.json({ msg: "User Deleted "});
    })
}