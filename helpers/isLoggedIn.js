function isLoggedIn(req, res, next) {
    if (req.session.userLogin) {
        res.redirect('/?err=Logout dahulu sebelum melakukan login kembali')
    } else {
        next()
    }
}

module.exports = isLoggedIn