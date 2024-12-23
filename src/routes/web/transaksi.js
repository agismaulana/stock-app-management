
module.exports = (app, router) => {
    const transaksi = require('@controllers/TransaksiController')

    router.get('/transaksi', transaksi.index)

    app.use('/transaksi', router)
}