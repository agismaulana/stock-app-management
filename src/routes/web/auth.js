
module.exports = (app, router) => {
    const auth = require('@controllers/AuthController')

    router.get('/login-form', auth.loginForm)
    router.post('/login', auth.login)
    router.get('/logout', auth.logout)

    app.use('/', router)
}