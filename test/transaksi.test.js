require('module-alias/register');
const { index, store, create, edit, update, destroy } = require('@controllers/TransaksiController');
const prisma = require('@config/prismaClient');
const httpMocks = require('node-mocks-http');

const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const { parse } = require('path');

const app = express();

// Set up session and flash middleware
app.use(
  session({
    secret: 'test-secret',
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());

describe('transaksi masuk', () => {
  it('should render transaksi masuk page', async () => {
    const req = httpMocks.createRequest({
      method: 'GET',
      url: '/transaksi',
      flash: jest.fn(),
    });
    const res = httpMocks.createResponse();
    await index(req, res);
    expect(res._getStatusCode()).toBe(200);
  });
  it('should render create transaksi', async () => {
    const req = httpMocks.createRequest({
      method: 'GET',
      url: '/transaksi/create',
    });

    const res = httpMocks.createResponse();
    await create(req, res);
    expect(res._getStatusCode()).toBe(200);
  });
  it('should added transaction out', async () => {
    const gudangs = await prisma.gudang.findFirst();
    const pengawas = await prisma.pengawas.findFirst();
    let barang = await prisma.barang.findUnique({ where: { name: 'Food' } });
    const supplier = await prisma.supplier.findFirst();
    const kategori = await prisma.kategori.findFirst();

    if (!barang) {
      await prisma.barang.create({
        data: {
          name: 'Food',
          harga: 10000,
          sale_price: 10000,
          deskripsi: 'test',
          photo: '',
          stock: 0,
          Supplier: {
            connect: {
              id: parseInt(supplier.id),
            },
          },
          Kategori: {
            connect: {
              id: parseInt(kategori.id),
            },
          },
        },
      });

      barang = await prisma.barang.findUnique({ where: { name: 'Food' } });
    }

    const req = await httpMocks.createRequest({
      method: 'POST',
      url: '/transaksi/store',
      body: {
        gudangId: parseInt(gudangs.id),
        pengawasId: parseInt(pengawas.id),
        typeTransaksi: 'Keluar',
        tanggal: '2024-12-20',
        status: 'Belum Lunas',
        keterangan: 'test',
        barang: [
          {
            id: 1,
            jumlah: 10,
            harga: barang.harga,
            total: barang.harga * 10,
          },
        ],
        totalBarang: 100000,
      },
      flash: jest.fn(),
    });

    const res = await {
      redirect: jest.fn(),
    };
    await store(req, res).then(() => {
      expect('Transaksi berhasil ditambahkan').toBe('Transaksi berhasil ditambahkan');
      expect(res.redirect).toHaveBeenCalledWith('/transaksi');
    });
  });
  it('should added Transaction', async () => {
    const gudangs = await prisma.gudang.findFirst();
    const pengawas = await prisma.pengawas.findFirst();
    const barang = await prisma.barang.findUnique({ where: { id: 1 } });

    const req = await httpMocks.createRequest({
      method: 'POST',
      url: '/transaksi/store',
      body: {
        gudangId: parseInt(gudangs.id),
        pengawasId: parseInt(pengawas.id),
        typeTransaksi: 'Masuk',
        tanggal: '2024-12-20',
        status: 'Belum Lunas',
        keterangan: 'test',
        barang: [
          {
            id: 1,
            jumlah: 20,
            harga: barang.harga,
            total: barang.harga * 20,
          },
        ],
        totalBarang: 40000,
      },
      flash: jest.fn(),
    });

    const res = await {
      redirect: jest.fn(),
    };

    await store(req, res).then(() => {
      expect('Transaksi berhasil ditambahkan').toBe('Transaksi berhasil ditambahkan');
      expect(res.redirect).toHaveBeenCalledWith('/transaksi');
    });
  });
  it('should render edit transaksi', async () => {
    const transaksi = await prisma.transaksi.findFirst();
    const req = httpMocks.createRequest({
      method: 'GET',
      params: { id: transaksi.id },
      url: `/transaksi/${transaksi.id}/edit`,
    });
    const res = httpMocks.createResponse();
    await edit(req, res);
    expect(res._getStatusCode()).toBe(200);
  });
  it('should update transaksi', async () => {
    const transaksi = await prisma.transaksi.findFirst();
    const req = await httpMocks.createRequest({
      method: 'POST',
      params: { id: transaksi.id },
      url: `/transaksi/${transaksi.id}`,
      body: {
        gudangId: 7,
        pengawasId: 1,
        typeTransaksi: 'Masuk',
        tanggal: '2024-12-20',
        status: 'Belum Lunas',
        keterangan: 'test',
        barang: [
          {
            id: 1,
            jumlah: 20,
            harga: 10000,
            total: 200000,
          },
        ],
        totalBarang: 40000,
      },
      flash: jest.fn(),
    });
    const res = await {
      redirect: jest.fn(),
    };
    await update(req, res).then(() => {
      expect('Transaksi berhasil diubah').toBe('Transaksi berhasil diubah');
      expect(res.redirect).toHaveBeenCalledWith('/transaksi');
    });
  });
  it('should delete transaksi', async () => {
    const transaksi = await prisma.transaksi.findFirst();
    const req = httpMocks.createRequest({
      method: 'POST',
      params: { id: transaksi.id },
      url: `/transaksi/${transaksi.id}`,
      flash: jest.fn(),
    });
    const res = httpMocks.createResponse();
    await destroy(req, res);
    expect(res._getStatusCode()).toBe(302);
  });
});
