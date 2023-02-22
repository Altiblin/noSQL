const path = require('path')
const Post = require('../../models/post')
const mongoose = require('mongoose')

module.exports = (req, res) => {
    const {image} = req.files
    const userId = req.session.userId;

    image.mv(path.resolve(__dirname, '..', '../public/img/post', image.name), (error) => {
        Post.create({...req.body, createdBy: userId, image: `/img/post/${image.name}`, categories: req.body.categories}, async (error, post) => {
            if (error) {
                console.log(error);
                return res.redirect("/");
            }

            try {
                await mongoose.connection.collection('users').updateOne(
                    { _id: mongoose.Types.ObjectId(userId) },
                    { $push: { posts: post } }
                );
                res.redirect("/");
            } catch (error) {
                console.log(error);
                res.redirect("/");
            }
        });
    })
}


