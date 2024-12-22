const prisma = require('@config/prismaClient')
const index = async (req, res) => {
    const gudangs = await prisma.gudang.findMany()

    return res.render('layouts/template', {
        title: 'Gudang',
        page: '../gudang/index',
        gudangs,
        messages: req.flash('gudangMessage')
    })
}

const create = async (req, res) => {
    return res.render('layouts/template', {
        title: 'Gudang',
        page: '../gudang/create'
    })
}

const store = async (req, res) => {
    const { name, alamat, telepon } = req.body

    await prisma.gudang.create({
        data: {
            name,
            alamat,
            telepon
        }
    })

    req.flash('gudangMessage', 'Gudang berhasil ditambahkan')
    return res.redirect('/gudangs')
}

const edit = async (req, res) => {
    const gudang = await prisma.gudang.findUnique({
        where: {
            id: parseInt(req.params.id)
        }
    })

    return res.render('layouts/template', {
        title: 'Gudang',
        page: '../gudang/edit',
        gudang
    })
}

const update = async (req, res) => {
    const { name, alamat, telepon } = req.body

    await prisma.gudang.update({
        where: {
            id: parseInt(req.params.id)
        },
        data: {
            name,
            alamat,
            telepon
        }
    })

    req.flash('gudangMessage', 'Gudang berhasil diupdate')
    return res.redirect('/gudangs')
}

const destroy = async (req, res) => {

    await prisma.gudang.delete({
        where: {
            id: parseInt(req.params.id)
        }
    })

    req.flash('gudangMessage', 'Gudang berhasil dihapus')
    return res.redirect('/gudangs')
}

module.exports = {
    index,
    create,
    update,
    store,
    edit,
    destroy
}