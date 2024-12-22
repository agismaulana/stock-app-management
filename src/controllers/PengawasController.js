const prisma = require('@config/prismaClient')


const index = async (req, res) => {
    const pengawas = await prisma.pengawas.findMany()

    return res.render('layouts/template', {
        title: 'Pengawas',
        page: '../pengawas/index',
        pengawas
    })
}

const create = async (req, res) => {
    const users = await prisma.user.findMany({
        where: {
            role: {
                name: 'Pengawas'
            }
        }
    })

    return res.render('layouts/template', {
        title: 'Pengawas',
        page: '../pengawas/create',
        users
    })
}

const store = async (req, res) => {
    const pengawas = await prisma.pengawas.create({
        data: {
            name: req.body.name,
            telepon: req.body.telepon,
            alamat: req.body.alamat,
            user: {
                connect: {
                    id: parseInt(req.body.userId)
                }
            }
        }
    })

    req.flash('pengawasMessage', 'Pengawas berhasil ditambahkan')
    return res.redirect('/pengawas')
}

const edit = async (req, res) => {
    const pengawas = await prisma.pengawas.findUnique({
        where: {
            id: parseInt(req.params.id)
        }
    })

    return res.render('layouts/template', {
        title: 'Pengawas',
        page: '../pengawas/edit',
        pengawas
    })
}

const update = async (req, res) => {
    const pengawas = await prisma.pengawas.update({
        where: {
            id: parseInt(req.params.id)
        },
        data: {
            name: req.body.name,
            telepon: req.body.telepon,
            alamat: req.body.alamat,
            user: {
                connect: {
                    id: parseInt(req.body.userId)
                }
            }
        }
    })   

    req.flash('pengawasMessage', 'Pengawas berhasil diupdate')
    return res.redirect('/pengawas')
}

const destroy = async (req, res) => {
    await prisma.pengawas.delete({
        where: {
            id: parseInt(req.params.id)
        }
    })

    req.flash('pengawasMessage', 'Pengawas berhasil dihapus')
    return res.redirect('/pengawas')
}

module.exports = {
    index,
    create,
    store,
    edit,
    update,
    destroy
}

