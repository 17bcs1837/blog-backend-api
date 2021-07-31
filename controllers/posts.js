const Post = require('../models/post');
const formidable = require('formidable');
const fs = require('fs');

exports.postById = (req, res, next, id) => {
    Post.findById(id)
    .populate("postedBy", "_id name")
    .exec((err, post) => {
        if(err || !post) return res.status(400).json({ msg: "Couldn't find post" });

        req.post = post;
        next();
    })
}

exports.getPosts = (req, res) => {
    Post.find()
    .select("title body")
    .populate("postedBy", "_id name")
    .then( posts => {
        res.json({ posts });
    })
    .catch( err => {
        res.json({ error: error.msg });
    })
}

exports.createPost = (req, res) => {
    let form = formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if(err) return res.status(400).json({ msg: "Image couldn't be uploaded" });
        console.log(fields);
        let post = new Post(fields);

        req.profile.passoword = undefined;
        post.postedBy = req.profile;
        if(files.photo) {
            post.photo.data = fs.readFileSync(files.photo.path);
            post.photo.contentType = files.photo.type;
        }

        post.save((err, post) => {
            if(err) return res.status(400).json({ msg: "Post couldn't be saved" });
            res.json(post);
        })

    })
}

exports.postsByUser = (req, res) => {
    Post.find({ postedBy: req.profile._id })
    .populate("postedBy", "_id name")
    .sort("_created")
    .exec((err, posts) => {
        if(err) return res.status(400).json({ msg: "Couldn't find posts" });

        res.json(posts);
    })
}

exports.checkPoster = (req, res, next) => {
    let poster = req.post && req.auth && req.post.postedBy._id.equals(req.auth._id);
    if(!poster) return res.status(401).json({ msg: "Not authorised to delete post" });

    next();
}

exports.deletePost = (req, res) => {
    let post = req.post;
    post.remove((err, post) => {
        if(err) return res.status(400).json({ msg: "Couldn't delete post" });
        res.json({ msg: "Post Deleted Successfully" });
    }) 
}