const mongoose = require('mongoose');
const Post = require('../../models/post');

module.exports = async (req, res) => {
    const id = req.params['id'];
    const userId = req.session.userId;

    try {
        // Get the post
        const post = await Post.findById(id);
        if (!post) {
            throw new Error('Post not found');
        }

        // Delete the post from the user's posts array
        await mongoose.connection.collection('users').updateOne(
            { _id: mongoose.Types.ObjectId(userId) },
            { $pull: { posts: { _id: mongoose.Types.ObjectId(id) } } }
        );

        // Delete the post from the posts collection
        await Post.deleteOne({ _id: id });

        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
};
