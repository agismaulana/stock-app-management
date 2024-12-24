const prisma = require('@config/prismaClient')

const index = async (req, res) => {
    const suppliers = await prisma.supplier.findMany()

    return res.render('layouts/template', {
        title: 'Supplier',
        page: '../supplier/index',
        suppliers
    })
}

const create = async (req, res) => {
    const users = await prisma.user.findMany({
        where: {
            role: {
                name: 'Supplier'
            }
        }
    })

    return res.render('layouts/template', {
        title: 'Supplier',
        page: '../supplier/create',
        users
    })
}

const store = async (req, res) => {
    const { name, telepon, alamat } = req.body

    await prisma.supplier.create({
        data: {
            name,
            telepon,
            alamat,
            User: {
                connect: {
                    id: parseInt(req.body.userId)
                }
            }
        }
    })

    req.flash('success', 'Supplier berhasil ditambahkan')
    return res.redirect('/suppliers')
}

const edit = async (req, res) => {
    const users = await prisma.user.findMany({
        where: {
            role: {
                name: 'Supplier'
            }
        }
    })

    const supplier = await prisma.supplier.findUnique({
        where: {
            id: parseInt(req.params.id)
        },
        include: {
            User: true
        }
    })

    return res.render('layouts/template', {
        title: 'Supplier',
        page: '../supplier/edit',
        supplier,
        users
    })
}

const update = async (req, res) => {
    const { name, telepon, alamat } = req.body

    await prisma.supplier.update({
        where: {
            id: parseInt(req.params.id)
        },
        data: {
            name,
            telepon,
            alamat,
            User: {
                connect: {
                    id: parseInt(req.body.user_id)
                }
            }
        }
    })

    req.flash('success', 'Supplier berhasil diupdate')
    return res.redirect('/suppliers')
}

const destroy = async (req, res) => {
    await prisma.supplier.delete({
        where: {
            id: parseInt(req.params.id)
        }
    })

    req.flash('success', 'Supplier berhasil dihapus')
    return res.redirect('/suppliers')
}

module.exports = {
    index,
    create,
    store,
    edit,
    update,
    destroy,
}