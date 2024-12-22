const prisma = require('@config/prismaClient')

const index = async (req, res) => {
    const kategories = await prisma.kategori.findMany()

    return res.render("layouts/template", {
        title: "Kategori",
        page: "../kategori/index",
        messages: req.flash('kategoriMessage'),
        kategories
    })
}

const create = async (req, res) => {
    return res.render("layouts/template", {
        title: "Kategori",
        page: "../kategori/create",
    })
}

const store = async (req, res) => {
    const { name } = req.body

    await prisma.kategori.create({
        data: {
            name
        }
    })

    req.flash('kategoriMessage', 'Kategori berhasil ditambahkan')
    return res.redirect('/kategories')
}

const edit = async (req, res) => {
    const kategori = await prisma.kategori.findUnique({
        where: {
            id: parseInt(req.params.id)
        }
    })

    return res.render('layouts/template', {
        title: 'Kategori',
        page: '../kategori/edit',
        kategori
    })
}

const update = async (req, res) => {
    const { name } = req.body

    await prisma.kategori.update({
        where: {
            id: parseInt(req.params.id)
        },
        data: {
            name
        }
    })

    req.flash('kategoriMessage', 'Kategori berhasil diupdate')
    return res.redirect('/kategories')
}

const destroy = async (req, res) => {
    await prisma.kategori.delete({
        where: {
            id: parseInt(req.params.id)
        }
    })

    req.flash('kategoriMessage', 'Kategori berhasil dihapus')
    return res.redirect('/kategories')
}

module.exports = {
    index,
    create,
    store,
    edit,
    update,
    destroy
}