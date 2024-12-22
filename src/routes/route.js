module.exports = (app, router) => {

    const home = require('@controllers/HomeController')

    router.get('/', home.dashboard)
    router.get('/router', (req, res) => {
        app._router.stack.forEach((r) => {
            console.log(r.route)
        })
    })

    require('./web/auth')(app, router)
    require('./web/user')(app, router)
    require('./web/supplier')(app, router)
    require('./web/gudang')(app, router)
    require('./web/pengawas')(app, router)
    require('./web/kategori')(app, router)
    require('./web/barang')(app, router)

    app.use('/', router)
}