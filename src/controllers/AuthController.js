const prisma = require('@config/prismaClient');
const flash = require('express-flash');
const bcrypt = require('bcrypt');

const loginForm = (req, res) => {
  return res.render('layouts/main-auth', {
    title: 'Login',
    page: '../auth/login',
    messages: req.flash('loginMessage'),
  });
};

const login = async (req, res) => {
  const user = await prisma.user.findFirst({
    where: {
      email: req.body.email,
    },
    include: {
      role: true,
    },
  });

  if (!user) {
    req.flash('loginMessage', 'Email atau password salah');
    return res.redirect('/login-form');
  }

  if (!(await bcrypt.compare(req.body.password, user.password))) {
    req.flash('loginMessage', 'Email atau password salah');
    return res.redirect('/login-form');
  }

  req.session.user = {
    username: user.username,
    email: user.email,
    id: user.id,
    role: user.role.name,
  };
  req.session.isAuthenticated = true;

  return res.redirect('/');
};

const logout = (req, res) => {
  req.session.destroy();
  return res.redirect('/login-form');
};

module.exports = {
  loginForm,
  login,
  logout,
};
