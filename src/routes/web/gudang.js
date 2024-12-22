
module.exports = (app, router) => {
    const gudang = require('@controllers/GudangController')

    router.get('/gudangs', gudang.index)
    router.get('/gudangs/create', gudang.create)
    router.post('/gudangs/store', gudang.store)
    router.get('/gudangs/:id/edit', gudang.edit)
    router.post('/gudangs/:id/update', gudang.update)
    router.get('/gudangs/:id/destroy', gudang.destroy)

    app.use('/gudangs', router)
}