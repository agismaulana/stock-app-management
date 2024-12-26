const prisma = require('@config/prismaClient')


const index = async (req, res) => {
    const pengawas = await prisma.pengawas.findMany({
        include: {
            user: true,
            gudang: true
        }
    })

    return res.render('layouts/template', {
        title: 'Pengawas',
        page: '../pengawas/index',
        pengawas,
        messages: req.flash('pengawasMessage')
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

    const gudangs = await prisma.gudang.findMany()

    return res.render('layouts/template', {
        title: 'Pengawas',
        page: '../pengawas/create',
        users,
        gudangs,
        messages: req.flash('pengawasMessage')
    })
}

const store = async (req, res) => {
    
    const gudang = await prisma.gudang.findUnique({
        where: {
            id: parseInt(req.body.gudangId),
            isActive: true
        }
    })

    if (!gudang) {
        req.flash('pengawasMessage', 'Gudang tidak ditemukan')
        return res.redirect('/pengawas/create')
    }
    
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
    const users = await prisma.user.findMany({
        where: {
            role: {
                name: 'Pengawas'
            }
        }
    })

    const pengawas = await prisma.pengawas.findUnique({
        where: {
            id: parseInt(req.params.id)
        },
        include: {
            user: true
        }
    })

    const gudangs = await prisma.gudang.findMany()

    return res.render('layouts/template', {
        title: 'Pengawas',
        page: '../pengawas/edit',
        pengawas,
        users,
        gudangs,
        messages: req.flash('pengawasMessage')
    })
}

const update = async (req, res) => {

    const gudang = await prisma.gudang.findUnique({
        where: {
            id: parseInt(req.body.gudangId),
            isActive: true
        }
    })

    if (!gudang) {
        req.flash('pengawasMessage', 'Gudang tidak ditemukan')
        return res.redirect('/pengawas/create')
    }

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

