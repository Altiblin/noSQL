const path = require('path');
const Post = require('../../models/post');
const mongoose = require('mongoose');

module.exports = (req, res) => {
    const { image } = req.files;
    const userId = req.session.userId;
    const postId = req.params['id'];

    // Move the image to the public/img/post directory
    image.mv(path.resolve(__dirname, '..', '../public/img/post', image.name), async (error) => {
        if (error) {
            console.log(error);
            return res.redirect("/");
        }

        try {
            // Find the post and update it
            const post = await Post.findOneAndUpdate(
                postId,
                {
                    ...req.body,
                    createdBy: userId,
                    image: `/img/post/${image.name}`,
                    categories: req.body.categories
                }
            );

            // Get the user
            const user = await mongoose.connection.collection('users').findOne({ _id: mongoose.Types.ObjectId(userId) });
            if (!user) {
                throw new Error("User not found");
            }

            // Update the post in the user's posts array
            let postIndex = user.posts.findIndex(p => p._id.toString() === postId);
            console.log(postIndex)
            if (postIndex !== -1) {
                user.posts[postIndex] = post;
            }
            // Update the user document
            await mongoose.connection.collection('users').updateOne(
                { _id: mongoose.Types.ObjectId(userId) },
                { $set: { posts: user.posts } }
            );

            // Redirect to the updated post
            res.redirect(`/`);
        } catch (error) {
            console.log(error);
            res.redirect("/");
        }
    });
}
