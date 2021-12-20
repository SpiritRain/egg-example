'use strict';

const Controller = require('egg').Controller;

const _ = require('lodash');
const encryptKey = 'shuinfo'
// 文件
const sheetToken =  'shtcnIk6obqls5nCPzfVxTZ8Qcf'
// 表格
const sheetId =  '0GiZFI'

var tenantToken

/**
 * @Controller Feishu
 */
class FeishuController extends Controller {
  /**
   * @summary 首页
   * @description 首页
   * @router get /feishu/
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
  async sync_options() {
    let user_id = this.ctx.request.body.user_id || '';
    let employee_id = this.ctx.request.body.employee_id || '';
    let token = this.ctx.request.body.token || '';
    let linkage_params = this.ctx.request.body.linkage_params || {};
    let key = '9cd5b4cf899492079cd5b4cf89949207';

    let result = JSON.stringify({
      options: [{
          "id": "id1",
          "value": "name1"
        },
        {
          "id": "id2",
          "value": "name2"
        },
        {
          "id": "id3",
          "value": "name3"
        }
      ],
      i18nResources: [{
          "locale": "zh_cn",
          "isDefault": true,
          "texts": {
            "name1": "值1",
            "name2": "值2",
            "name3": "值3"
          }
        },
        {
          "locale": "en_us",
          "isDefault": false,
          "texts": {
            "name1": "value1",
            "name2": "value2",
            "name3": "value3"
          }
        }
      ]

    });

    let resStr = this.ctx.helper.sha256Encrypt(key, result)


    this.ctx.body = {
      code: 0,
      msg: 'success',
      data: {
        result: resStr
      },
      // un: this.ctx.helper.sha256Decrypt(key, resStr)
    };
  }
}

module.exports = FeishuController;