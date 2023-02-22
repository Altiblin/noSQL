const Post = require('../../models/post')
const Category = require("../../models/category");

module.exports = async (req, res) => {
    try {
        const categories = await Category.find({});
        res.render("posts/update", { categories });
    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
};