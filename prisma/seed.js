const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')

const prisma = new PrismaClient()

const main = async () => {
    const role = await prisma.role.createMany({
        data: [
            { name: 'Super Admin' },
            { name: 'Supplier' },
            { name: 'Pengawas' },
        ]
    })

    const admin = await prisma.user.create({
        data: {
            username: 'superadmin',
            email: 'admin@superadmin.com',
            password: await bcrypt.hash('superadmin', 10),
            roleId: 1
        }
    })

}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })