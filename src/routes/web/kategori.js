
module.exports = (app, router) => {
    const kategori = require('@controllers/KategoriController')

    router.get('/kategories', kategori.index)
    router.get('/kategories/create', kategori.create)
    router.post('/kategories/store', kategori.store)
    router.get('/kategories/:id/edit', kategori.edit)
    router.post('/kategories/:id/update', kategori.update)
    router.get('/kategories/:id/destroy', kategori.destroy)

    app.use('/kategories', router)
}