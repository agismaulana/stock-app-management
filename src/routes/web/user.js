
module.exports = (app, router) => {
    const user = require('@controllers/UserController')

    router.get('/users', user.index)
    router.get('/create', user.create)
    router.post('/store', user.store)
    router.get('/:id/edit', user.edit)
    router.post('/:id/update', user.update)
    router.get('/:id/destroy', user.destroy)

    app.use('/users', router)
}

