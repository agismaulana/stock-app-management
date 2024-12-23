const prisma = require('@config/prismaClient')

const index = async (req, res) => {
    const transaksi = await prisma.transaksi.findMany({
        include: {
            TransaksiDetail: true
        }
    }) 

    return res.render("layouts/template", {
        title: "Transaksi",
        page: "../transaksi/index",
        transaksi
    })
}

module.exports = {
    index
}