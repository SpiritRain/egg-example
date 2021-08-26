'use strict';

const moment = require('moment');
const crypto = require('crypto');
const _ = require('lodash');

module.exports = {
  // 格式化时间
  formatTime : (time = _.now()) => moment(time).format('YYYY-MM-DD HH:mm:ss'),

  fen2yuan : (fen) => Intl.NumberFormat('zh-CN', { style: 'currency', currency: 'CNY' }).format(fen / 100),

  md5(str) {
    let md5 = crypto.createHash('md5');
    md5.update(str);
    let sign = md5.digest('hex');
    // console.log(sign);
  
    return sign;
  },

  sha1(str) {
    let sha1String = crypto.createHash('sha1');
    sha1String.update(str);
    let sign = sha1String.digest('hex');
    // console.log(sign);
  
    return sign;
  },

  /**
   * 生成随机字符串
   * @param {number} len 
   */
  randomString (len) {
    len = len || 32;
    const $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    const maxPos = $chars.length;
    let str = '';
    for (let i = 0; i < len; i++) {
      str += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return str;
  }
}

exports.success = ({ ctx, res = null, msg = '请求成功' }) => {
  ctx.body = { code: 0, data: res, msg };
  ctx.status = 200;
};

