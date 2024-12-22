
const dashboard = (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login-form')
    }

    return res.render('layouts/template', {
        title: 'Dashboard',
        page: '../index'
    })
}

module.exports = {
    dashboard
}