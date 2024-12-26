const prisma = require('@config/prismaClient');

const index = async (req, res) => {
  let options;
  if (req.session.usesr && req.session.user.role === 'Supplier') {
    options = {
      where: {
        supplierId: req.session.user.supplierId,
      },
    };
  }

  const barangs = await prisma.barang.findMany({
    ...options,
    include: {
      Kategori: true,
      Supplier: true,
      Gudang: true,
    },
  });

  return res.render('layouts/template', {
    title: 'Barang',
    page: '../barang/index',
    barangs,
    messages: req.flash('barangMessage'),
  });
};

const create = async (req, res) => {
  const kategories = await prisma.kategori.findMany();
  const suppliers = await prisma.supplier.findMany();
  const gudangs = await prisma.gudang.findMany();

  return res.render('layouts/template', {
    title: 'Barang',
    page: '../barang/create',
    kategories,
    suppliers,
    gudangs,
    messages: req.flash('barangMessage'),
  });
};

const store = async (req, res) => {
  const { name, harga, deskripsi, sale_price, berat, tipe, banyak, gudangId, kategoriId, supplierId } = req.body;

  if (name != RegExp(/^[a-zA-Z0-9]+$/)) {
    req.flash('barangMessage', 'Nama barang tidak boleh menggunakan simbol');
    return res.redirect('/barangs/create');
  }

  if (isNaN(banyak)) {
    req.flash('barangMessage', 'data banyak harus menggunakan numerik');
    return res.redirect('/barangs/create');
  }

  await prisma.barang.create({
    data: {
      name,
      harga,
      sale_price,
      deskripsi,
      photo: '',
      stock: 0,
      berat,
      tipe,
      banyak,
      Gudang: {
        connect: {
          id: parseInt(gudangId),
        },
      },
      Kategori: {
        connect: {
          id: parseInt(kategoriId),
        },
      },
      Supplier: {
        connect: {
          id: parseInt(supplierId),
        },
      },
    },
  });

  req.flash('barangMessage', 'Barang berhasil ditambahkan');
  return res.redirect('/barangs');
};

const edit = async (req, res) => {
  const barang = await prisma.barang.findUnique({
    where: {
      id: parseInt(req.params.id),
    },
    include: {
      Kategori: true,
      Supplier: true,
    },
  });

  const kategories = await prisma.kategori.findMany();
  const suppliers = await prisma.supplier.findMany();
  const gudangs = await prisma.gudang.findMany();

  return res.render('layouts/template', {
    title: 'Barang',
    page: '../barang/edit',
    barang,
    kategories,
    suppliers,
    gudangs,
    messages: req.flash('barangMessage'),
  });
};

const update = async (req, res) => {
  const { name, harga, deskripsi, sale_price, berat, tipe, banyak, gudangId, kategoriId, supplierId } = req.body;

  if (name != RegExp(/^[a-zA-Z0-9]+$/)) {
    req.flash('barangMessage', 'Nama barang tidak boleh menggunakan simbol');
    return res.redirect('/barangs/create');
  }

  if (isNaN(banyak)) {
    req.flash('barangMessage', 'data banyak harus menggunakan numerik');
    return res.redirect('/barangs/create');
  }

  await prisma.barang.update({
    where: {
      id: parseInt(req.params.id),
    },
    data: {
      name,
      harga,
      sale_price,
      deskripsi,
      photo: '',
      stock: 0,
      berat,
      tipe,
      banyak,
      Gudang: {
        connect: {
          id: parseInt(gudangId),
        },
      },
      Kategori: {
        connect: {
          id: parseInt(kategoriId),
        },
      },
      Supplier: {
        connect: {
          id: parseInt(supplierId),
        },
      },
    },
  });

  req.flash('barangMessage', 'Barang berhasil diupdate');
  return res.redirect('/barangs');
};

const destroy = async (req, res) => {
  await prisma.barang.delete({
    where: {
      id: parseInt(req.params.id),
    },
  });

  req.flash('barangMessage', 'Barang berhasil dihapus');
  return res.redirect('/barangs');
};

module.exports = {
  index,
  create,
  store,
  edit,
  update,
  destroy,
};
