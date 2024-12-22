const prisma = require('@config/prismaClient')
const bcrypt = require('bcrypt')

const index = async (req, res) => {
    const users = await prisma.user.findMany({
        include: {
            role: true
        }
    })

    return res.render('layouts/template', {
        title: 'User',
        page: '../user/index',
        users
    })
}

const create = async (req, res) => {
    const roles = await prisma.role.findMany({
        where: {
            name: {
                not: 'Super Admin'
            }
        }
    });

    return res.render('layouts/template', {
        title: 'User',
        page: '../user/create',
        roles
    })
}

const store = async (req, res) => {
    let { username, email, password, roleId } = req.body

    roleId = parseInt(roleId)
    password = await bcrypt.hash(password, 10)

    await prisma.user.create({
        data: {
            username,
            email,
            password,
            role: {
                connect: {
                    id: roleId
                }
            }
        }
    })

    req.flash('success', 'User berhasil ditambahkan')
    return res.redirect('/users')
}

const edit = async (req, res) => {
    const user = await prisma.user.findUnique({
        where: {
            id: parseInt(req.params.id)
        }
    })

    const roles = await prisma.role.findMany({
        where: {
            name: {
                not: 'Super Admin'
            }
        }
    });

    return res.render('layouts/template', {
        title: 'User',
        page: '../user/edit',
        user,
        roles
    })
}

const update = async (req, res) => {
    let { username, email, password, roleId } = req.body

    const user = await prisma.user.findUnique({
        where: {
            id: parseInt(req.params.id)
        }
    })

    roleId = parseInt(roleId)
    if (!password || ["", null, undefined].includes(password)) {
        password = user.password
    } else {
        password = await bcrypt.hash(password, 10)
    }

    await prisma.user.update({
        where: {
            id: parseInt(req.params.id)
        },
        data: {
            username,
            email,
            password,
            role: {
                connect: {
                    id: roleId
                }
            }
        }
    })

    req.flash('success', 'User berhasil diupdate')
    return res.redirect('/users')
}

const destroy = async (req, res) => {
    const user = await prisma.user.findUnique({
        where: {
            id: parseInt(req.params.id)
        },
        include: {
            role: true,
            supplier: true,
            pengawas: true
        }
    })

    if (user.role.name === 'Supplier') {
        await prisma.supplier.delete({
            where: {
                id: user.supplier.id
            }
        })
    }

    if (user.role.name === 'Pengawas') {
        await prisma.pengawas.delete({
            where: {
                id: user.pengawas.id
            }
        })
    }

    await prisma.user.delete({
        where: {
            id: parseInt(req.params.id)
        }
    })

    req.flash('success', 'User berhasil dihapus')
    return res.redirect('/users')
}

module.exports = {
    index,
    create,
    store,
    edit,
    update,
    destroy
}