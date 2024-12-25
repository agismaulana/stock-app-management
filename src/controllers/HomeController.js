const prisma = require('@config/prismaClient');

const dashboard = async (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login-form');
  }

  try {
    const totalTransaksi = await prisma.transaksi.count();
    const totalBarang = await prisma.barang.count();
    const totalGudang = await prisma.gudang.count();
    const totalUsers = await prisma.user.count();

    const username = req.session.user.username || 'Guest';

    return res.render('layouts/template', {
      title: 'Dashboard',
      page: '../index',
      username,
      totalTransaksi,
      totalBarang,
      totalGudang,
      totalUsers,
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    req.flash('errorMessage', 'Failed to load dashboard data');
    return res.redirect('/');
  }
};

module.exports = {
  dashboard,
};
