module.exports = (req, res) => {
    res.render('auth/register', {
        errors: req.flash('registrationErrors')
    })
}