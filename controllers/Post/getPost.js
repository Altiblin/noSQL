const Post = require('../../models/post');

module.exports = async (req, res) => {
    const post = await Post.findById(req.params.id).populate("createdBy").populate('comments.createdBy').exec();
    res.render("posts/post", {post});
}