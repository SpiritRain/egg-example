'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/fstest', controller.home.fstest);

  router.get('/test', controller.test.index);
  router.get('/bot/:msg', controller.test.bot_msg);
  router.get('/error', controller.test.err);
  router.get('/error/:err', controller.test.err_status);
  router.get('/redis/keys', controller.test.redis_keys);
  router.get('/redis/:key/:value', controller.test.redis_add);
  router.get('/encode/:source', controller.test.fs_encoding);

  // router.redirect('/', '/swagger-ui.html' , 302); //重定向到swagger-ui.html

  router.get('/wxworkapi/index', controller.wxwork.index);
};
