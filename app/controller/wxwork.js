'use strict';

const Controller = require('egg').Controller;

/**
 * @Controller Home
 */
class WxworkController extends Controller {
  /**
   * @summary 首页
   * @description 首页
   * @router get /
   * @response 200 baseResponse 创建成功
   */
  async index() {
    let access = await this.service.wxwork.getToken();
    this.ctx.body = {
      data: {
        access: access
      }
    };
  }
}

module.exports = WxworkController;
