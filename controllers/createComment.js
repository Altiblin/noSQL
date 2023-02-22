const path = require('path');
const Post = require('../models/post');
const mongoose = require('mongoose');

module.exports = (req, res) => {
    const userId = req.session.userId;
    const comment = {
        text: req.body.comment,
        createdBy: userId,
    };

    Post.findById(req.body.postId, async (error, post) => {
        if (error) {
            console.log(error);
            return res.redirect("/");
        }
        if (!post) {
            console.log('Post not found');
            return res.redirect("/");
        }
        post.comments.push(comment);
        post.save((error) => {
            if (error) {
                console.log(error);
                return res.redirect("/");
            }
            res.redirect(`/post /${post._id}`);
        });
    });
};
