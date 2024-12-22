
module.exports = (app, router) => {
    const supplier = require('@controllers/SupplierController')

    router.get('/suppliers', supplier.index)
    router.get('/suppliers/create', supplier.create)
    router.post('/suppliers/store', supplier.store)
    router.get('/suppliers/:id/edit', supplier.edit)
    router.post('/suppliers/:id/update', supplier.update)
    router.get('/suppliers/:id/destroy', supplier.destroy)

    app.use('/suppliers', router)
}