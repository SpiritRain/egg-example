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
   * @response 200 indexJsonBody ok 
   */
  async index() {
    const { ctx } = this;

    let redistest = await this.ctx.service.redis.get('redistest');
   
    if (!redistest) {
      redistest = _.now();
      await this.ctx.service.redis.set('redistest', redistest, 600);
    }

    ctx.body = {
      moment: moment().format('LLL'),
      redistest: redistest
    }
  }

  /**
   * @summary 测试
   * @description 测试
   * @router get /redis/{key}/{value}
   * @response 200 indexJsonBody ok 
   */
   async redis_add() {
    const { ctx } = this;
    let k = this.ctx.params.key;
    let v = this.ctx.params.value;
    await this.ctx.service.redis.set(k, v, 600);
    ctx.body = {
      key: k,
      value: v
    }
  }

  /**
   * @summary 测试
   * @description 测试
   * @router get /redis/keys
   * @response 200 indexJsonBody ok 
   */
   async redis_keys() {
    const { ctx } = this;
    const redis = this.ctx.service.redis;

    let keys = await redis.keys('*');
    let res = {};

    if (_.isEmpty(keys)) {
      ctx.body = 'empty redis';
      return;
    }

    keys.forEach(async function(key, index) {
      let value = await redis.get(key);
      res[key] = value;
      console.log('fe', res, key ,value);
    })
    
    ctx.body = keys;
  }
}

module.exports = TestController;