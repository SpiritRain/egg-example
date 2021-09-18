'use strict';
const _ = require('lodash');
const moment = require('moment');

const Controller = require('egg').Controller;

/**
 * @Controller Test
 */
class TestController extends Controller {
  /**
   * @summary 测试
   * @description 测试
   * @router get /test
   * @response 200 baseResponse ok 
   */
  async index() {
    let yuan = this.ctx.helper.fen2yuan(3370)
    let helptime = this.ctx.helper.formatTime();
    let redistest = await this.ctx.service.redis.get('redistest');
   
    if (!redistest) {
      redistest = _.now();
      await this.ctx.service.redis.set('redistest', redistest, 600);
    }

    this.ctx.body = {
      data: {
        menv: this.app.config.menv,
        money: yuan,
        help: helptime,
        md5: this.ctx.helper.md5(helptime),
        moment: moment().format('LLL'),
        redistest: redistest
      }
    }
  }

  /**
   * @summary 抛出异常555
   * @description 抛出异常555
   * @router get /error
   * @response 200 baseResponse ok 
   */
  async err() {
    this.ctx.throw(555, "Test Error handler 555");
  }

  /**
   * @summary 抛出异常errstatus
   * @description 抛出异常errstatus
   * @router get /error/{error}
   * @response 200 baseResponse ok 
   */
  async err_status() {
    let errcode = parseInt(this.ctx.params.err) || 500;
    this.ctx.throw(errcode, "Test err " + errcode);
  }

  /**
   * @summary 添加redis
   * @description 添加redis key/value
   * @router get /redis/{key}/{value}
   * @response 200 baseResponse ok 
   */
  async redis_add() {
    let k = this.ctx.params.key;
    let v = this.ctx.params.value;
    await this.ctx.service.redis.set(k, v, 600);
    this.ctx.body = {
      key: k,
      value: v
    }
  }

  /**
   * @summary 展示所有redis key
   * @description 展示所有redis key
   * @router get /redis/keys
   * @response 200 baseResponse ok 
   */
  async redis_keys() {
    const redis = this.ctx.service.redis;

    let keys = await redis.keys('*');
    let res = {};

    if (_.isEmpty(keys)) {
      this.ctx.body = 'empty redis';
      return;
    }

    await Promise.all(keys.map(async (key) => {
      res[key] = await redis.get(key);
    }))

    this.ctx.body = {
      data: res
    };
  }

  /**
   * @summary 机器人发送消息
   * @description 机器人发送msg
   * @router get /encoding/{msg}
   * @response 200 baseResponse 创建成功
   */
  async fs_encoding() {
    const key = '9cd5b4cf899492079cd5b4cf89949207';
    let source = this.ctx.params.source;
    let encode = this.ctx.helper.sha256Encrypt(key, source);
    let decode = this.ctx.helper.sha256Decrypt(key, encode);
    this.ctx.body = {
      source,
      encode,
      decode
    }
  }

  /**
   * @summary 机器人发送消息
   * @description 机器人发送msg
   * @router get /bot/{msg}
   * @response 200 baseResponse 创建成功
   */
   async bot_msg() {
    let msg = this.ctx.params.msg || "no msg";
    let res = await this.ctx.curl(this.config.wxwork.boot_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }, 
      data: {
        "msgtype": "text",
        "text": {
            "content": msg
        }
      },
      dataType: 'json'
    });
    this.ctx.body = {
      data: {
        msg: msg,
        res: res,
      }
    };
  }
}

module.exports = TestController;