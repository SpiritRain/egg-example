'use strict';

const moment = require('moment');
const crypto = require('crypto');
const _ = require('lodash');

module.exports = {
  // 格式化时间
  formatTime: (time = _.now()) => moment(time).format('YYYY-MM-DD HH:mm:ss'),

  fen2yuan: (fen) => Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency: 'CNY'
  }).format(fen / 100),

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
  randomString(len) {
    len = len || 32;
    const $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    const maxPos = $chars.length;
    let str = '';
    for (let i = 0; i < len; i++) {
      str += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return str;
  },

  /** 
   * 飞书加密
   */
   sha256Encrypt(key, source, iv) {
    // iv = crypto.randomBytes(16)
    iv = iv || Buffer.alloc(16); // 16位向量
    const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
    cipher.setAutoPadding(true);
    let newSrc = Buffer.alloc(source.length + iv.length);
    iv.copy(newSrc, 0, 0, iv.length);
    newSrc.write(source, iv.length);
    let cipherChunks = [];
    let txt = cipher.update(newSrc, 'utf8', 'base64')
    cipherChunks.push(txt);
    cipherChunks.push(cipher.final('base64'));
    return cipherChunks.join('');
  },

  /** 
   * 飞书解密
   */
   sha256Decrypt (key, data, iv) {
    iv = iv || Buffer.alloc(16); 
    let cipherChunks = [];
    let decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    decipher.setAutoPadding(true);
    cipherChunks.push(decipher.update(data, 'base64', 'utf8'));
    cipherChunks.push(decipher.final('utf8'));
    console.log(cipherChunks.slice(0, iv.length))
    return cipherChunks.slice(0, iv.length)[1];
   }
}

exports.success = ({
  ctx,
  res = null,
  msg = '请求成功'
}) => {
  ctx.body = {
    code: 0,
    data: res,
    msg
  };
  ctx.status = 200;
};