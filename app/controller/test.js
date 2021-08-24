'use strict';
const _ = require('lodash');
const moment = require('moment');

const Controller = require('egg').Controller;

class TestController extends Controller {
  async index() {
    const { ctx } = this;

    let redistest = await this.ctx.service.redis.get('redistest');
   
    if (!redistest) {
      redistest = _.now();
      await this.ctx.service.redis.set('redistest', redistest, 600);
    }
    console.log(redistest);

    ctx.body = {
      moment: moment().format('LLL'),
      redistest: redistest
    }
  }
}

module.exports = TestController;