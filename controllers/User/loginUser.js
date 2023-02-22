const bcrypt = require('bcrypt')
const User = require('../../models/User')

module.exports = (req, res) => {
    const {
        email,
        password
    } = req.body;
    // try to find the User
    User.findOne({
        email
    }, (error, user) => {
        if (user) {
            // compare passwords.
            bcrypt.compare(password, user.password, (error, same) => {
                if (same) {
                    req.session.userId = user._id
                    res.redirect('/')
                } else {
                    res.redirect('auth/login')
                }
            })
        } else {
            return res.redirect('auth/login')
        }
    })
}