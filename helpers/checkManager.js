function checkManager(req, res, next) {
    if (!req.session.userLogin) {
        res.redirect('/?err=Anda harus login terlebih dahulu')
    } else {
        if (req.session.userLogin.role !== 'manager') {
            res.redirect('/?err=Maaf Anda tidak memiliki akses untuk halaman ini')
        } else {
            next()
        }
    }
}

module.exports = checkManager