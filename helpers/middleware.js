function middleware(req, res, next) {
    if (!req.session.userLogin) {
        res.redirect('/?err=Anda harus login terlebih dahulu')
    } else {
        next()
    }
}

module.exports = middleware