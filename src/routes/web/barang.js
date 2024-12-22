
module.exports = (app, router) => {
    const barang = require('@controllers/BarangController')

    router.get('/barangs', barang.index)
    router.get('/barangs/create', barang.create)
    router.post('/barangs/store', barang.store)
    router.get('/barangs/:id/edit', barang.edit)
    router.post('/barangs/:id/update', barang.update)
    router.get('/barangs/:id/destroy', barang.destroy)

    app.use('/barangs', router)
}