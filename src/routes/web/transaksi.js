
module.exports = (app, router) => {
    const transaksi = require('@controllers/TransaksiController')

    router.get('/transaksi', transaksi.index)
    router.get('/transaksi/create', transaksi.create)
    router.post('/transaksi/store', transaksi.store)
    router.get('/transaksi/:id/edit', transaksi.edit)
    router.post('/transaksi/:id/update', transaksi.update)
    router.get('/transaksi/:id/destroy', transaksi.destroy)

    app.use('/transaksi', router)
}