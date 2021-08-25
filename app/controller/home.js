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
   * @response 200 indexJsonBody 创建成功
   */
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
}

module.exports = HomeController;
