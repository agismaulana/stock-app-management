const prisma = require("@config/prismaClient")

const index = async (req, res) => {
    let options;
    if(req.session.usesr && req.session.user.role === "Supplier") {
        options = {
            where: {
                supplierId: req.session.user.supplierId
            }
        } 
    }

    const barangs = await prisma.barang.findMany({
        ...options,
        include: {
            Kategori: true,
            Supplier: true
        }
    })

    return res.render('layouts/template', {
        title: 'Barang',
        page: '../barang/index',
        barangs,
        messages: req.flash('barangMessage')
    })
}

const create = async (req, res) => {
    const kategories = await prisma.kategori.findMany()
    const suppliers = await prisma.supplier.findMany()

    return res.render('layouts/template', {
        title: 'Barang',
        page: '../barang/create',
        kategories,
        suppliers
    })
}

const store = async (req, res) => {
    const { name, harga, deskripsi, sale_price, kategoriId, supplierId } = req.body

    await prisma.barang.create({
        data: {
            name,
            harga,
            sale_price,
            deskripsi,
            photo: '',
            stock: 0,
            Kategori: {
                connect: {
                    id: parseInt(kategoriId)
                }
            },
            Supplier: {
                connect: {
                    id: parseInt(supplierId)
                }
            }
        }
    })

    req.flash('barangMessage', 'Barang berhasil ditambahkan')
    return res.redirect('/barangs')
}

const edit = async (req, res) => {
    const barang = await prisma.barang.findUnique({
        where: {
            id: parseInt(req.params.id)
        },
        include: {
            Kategori: true,
            Supplier: true
        }
    })

    const kategories = await prisma.kategori.findMany()
    const suppliers = await prisma.supplier.findMany()

    return res.render('layouts/template', {
        title: 'Barang',
        page: '../barang/edit',
        barang,
        kategories,
        suppliers
    })
}

const update = async (req, res) => {
    const { name, harga, deskripsi, sale_price, kategoriId, supplierId } = req.body

    await prisma.barang.update({
        where: {
            id: parseInt(req.params.id)
        },
        data: {
            name,
            harga,
            sale_price,
            deskripsi,
            photo: '',
            stock: 0,
            Kategori: {
                connect: {
                    id: parseInt(kategoriId)
                }
            },
            Supplier: {
                connect: {
                    id: parseInt(supplierId)
                }
            }
        }
    })

    req.flash('barangMessage', 'Barang berhasil diupdate')
    return res.redirect('/barangs')
}

const destroy = async (req, res) => {
    await prisma.barang.delete({
        where: {
            id: parseInt(req.params.id)
        }
    })

    req.flash('barangMessage', 'Barang berhasil dihapus')
    return res.redirect('/barangs')
}

module.exports = {
    index,
    create,
    store,
    edit,
    update,
    destroy
}