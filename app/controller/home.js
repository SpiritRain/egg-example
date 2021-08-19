'use strict';
const _ = require('lodash');
const moment = require('moment');

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    let x = 1;
    ctx.body = 'hi, egg ';
    ctx.body += _.now();
    ctx.body +=  moment().format('LL');
  }
}

module.exports = HomeController;
