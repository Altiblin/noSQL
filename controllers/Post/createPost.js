const Category = require("../../models/category");

module.exports = async (req, res) => {
    if (req.session.userId) {
        try {
            const categories = await Category.find({});
            res.render("posts/create", { categories });
        } catch (error) {
            console.log(error);
            res.redirect("/");
        }
    } else {
        res.redirect("auth/login");
    }
};