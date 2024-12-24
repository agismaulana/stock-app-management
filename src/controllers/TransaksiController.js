const prisma = require('@config/prismaClient')
const uuid = require('uuid')

const index = async (req, res) => {
    const transaksi = await prisma.transaksi.findMany({
        include: {
            TransaksiDetail: true,
            pengawas: true,
            gudang: true
        }
    }) 

    return res.render("layouts/template", {
        title: "Transaksi",
        page: "../transaksi/index",
        transaksi,
        messages: req.flash('transaksiMessage')
    })
}

const create = async (req, res) => {
    const gudangs = await prisma.gudang.findMany()
    const pengawas = await prisma.pengawas.findMany()

    const barangs = await prisma.barang.findMany({
        include: {
            Supplier: true
        }
    })

    return res.render("layouts/template", {
        title: "Transaksi",
        page: "../transaksi/create",
        barangs,
        gudangs,
        pengawas
    })
}

const store = async (req, res) => {
    const {
        gudangId,
        pengawasId,
        barang,
        typeTransaksi,
        tanggal,
        totalBarang,
        status,
        keterangan
    } = req.body

    await prisma.transaksi.create({
        data: {
            typeTransaksi,
            tanggal: new Date(tanggal),
            total: parseFloat(totalBarang),
            status,
            keterangan,
            gudang: {
                connect: {
                    id: parseInt(gudangId)
                }
            },
            pengawas: {
                connect: {
                    id: parseInt(pengawasId)
                }
            },
            TransaksiDetail: {
                createMany: {
                    data: barang.map((value, index) => {
                        return {
                            jumlah: parseFloat(value.jumlah),
                            barangId: parseInt(value.id),
                            harga: parseFloat(value.harga),
                            uuid: uuid.v4(),
                            createdAt: new Date(),
                            updatedAt: new Date()
                        }
                    })
                }
            }
        }
    })

    req.flash('transaksiMessage', 'Transaksi berhasil ditambahkan')
    return res.redirect('/transaksi')
}

const edit = async (req, res) => {
    const gudangs = await prisma.gudang.findMany()
    const pengawas = await prisma.pengawas.findMany()

    const barangs = await prisma.barang.findMany({
        include: {
            Supplier: true
        }
    })

    const transaksi = await prisma.transaksi.findUnique({
        where: {
            id: parseInt(req.params.id)
        },
        include: {
            TransaksiDetail: true,
            pengawas: true,
            gudang: true
        }
    })

    return res.render("layouts/template", {
        title: "Transaksi",
        page: "../transaksi/edit",
        transaksi,
        barangs,
        gudangs,
        pengawas
    })
}

const update = async (req, res) => {
    const {
        gudangId,
        pengawasId,
        barang,
        typeTransaksi,
        tanggal,
        totalBarang,
        status,
        keterangan
    } = req.body

    await prisma.transaksiDetail.deleteMany({
        where: {
            transaksiId: parseInt(req.params.id)
        }
    })

    await prisma.transaksi.update({
        where: {
            id: parseInt(req.params.id)
        },
        data: {
            typeTransaksi,
            tanggal: new Date(tanggal),
            total: parseFloat(totalBarang),
            status,
            keterangan,
            gudang: {
                connect: {
                    id: parseInt(gudangId)
                }
            },
            pengawas: {
                connect: {
                    id: parseInt(pengawasId)
                }
            },
            TransaksiDetail: {
                createMany: {
                    data: barang.map((value, index) => {
                        return {
                            jumlah: parseFloat(value.jumlah),
                            barangId: parseInt(value.id),
                            harga: parseFloat(value.harga),
                            uuid: uuid.v4(),
                            createdAt: new Date(),
                            updatedAt: new Date()
                        }
                    })
                }
            }
        }
    })

    req.flash('transaksiMessage', 'Transaksi berhasil diupdate')
    return res.redirect('/transaksi')
}

const destroy = async (req, res) => {
    await prisma.transaksiDetail.deleteMany({
        where: {
            transaksiId: parseInt(req.params.id)
        }
    })

    await prisma.transaksi.delete({
        where: {
            id: parseInt(req.params.id)
        }
    })

    req.flash('transaksiMessage', 'Transaksi berhasil dihapus')
    return res.redirect('/transaksi')
}

module.exports = {
    index,
    create,
    store,
    edit,
    update,
    destroy
}