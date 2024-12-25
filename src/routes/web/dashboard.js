module.exports = (app, router) => {
  const dashboard = require('@controllers/DashboardController');

  router.get('/', dashboard.index);

  app.use('/', router);
};
