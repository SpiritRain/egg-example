'use strict';

const Controller = require('egg').Controller;

/**
 * @Controller Home
 */
class HomeController extends Controller {
  /**
   * @summary 首页
   * @description 首页
   * @router get /
   * @response 200 baseResponse 创建成功
   */
  async index() {
    this.ctx.body = 'hi, egg';
  }
}

module.exports = HomeController;
