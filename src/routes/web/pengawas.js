
module.exports = (app, router) => {
    const supplier = require('@controllers/PengawasController')

    router.get('/pengawas', supplier.index)
    router.get('/pengawas/create', supplier.create)
    router.post('/pengawas/store', supplier.store)
    router.get('/pengawas/:id/edit', supplier.edit)
    router.post('/pengawas/:id/update', supplier.update)
    router.get('/pengawas/:id/destroy', supplier.destroy)

    app.use('/pengawas', router)
}