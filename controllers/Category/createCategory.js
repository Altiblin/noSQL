module.exports = (req, res) => {
    if (req.session.userId) {
        return res.render("categories/create");
    }
    res.redirect('auth/login')
};