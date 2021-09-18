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
    this.ctx.body = {
      
    };
  }

  /**
   * @summary 飞书测试
   * @description 飞书测试
   * @router post /fstest
   * @response 200 baseResponse 创建成功
   */
  async fstest() {
    let user_id = this.ctx.request.body.user_id || '';
    let employee_id = this.ctx.request.body.employee_id || '';
    let token = this.ctx.request.body.token || '';
    let linkage_params = this.ctx.request.body.linkage_params || {};
    let key = '9cd5b4cf899492079cd5b4cf89949207';

    let result =JSON.stringify( {
      options : [
        {
          id: 'id1',
          value: 'value1'
        }, {
          id: 'id2',
          value: 'value2'
        }
      ],
      user_id,
      employee_id,
      token,
      linkage_params
    });
  
    let resStr = this.ctx.helper.sha256Encrypt(key, result)


    this.ctx.body = {
      code : 0,
      msg : 'success',
      data : {
        result: resStr
      },
      // un: this.ctx.helper.sha256Decrypt(key, resStr)
    };
  }
}

module.exports = HomeController;
