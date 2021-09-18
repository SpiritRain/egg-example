'use strict';

const moment = require('moment');
const crypto = require('crypto');
const _ = require('lodash');
const clearEncoding = 'utf8';
const cipherEncoding = 'base64';

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
    // iv = '4f6ec76094a43dc7'
    iv = iv || Buffer.alloc(16).join('')// 16位向量
    key = crypto.createHash('sha256').update(key).digest();
    const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
    cipher.setAutoPadding(true);
    let newSrc = iv  + source
    // console.log('bak:', newSrc)
    return cipher.update(newSrc, clearEncoding, cipherEncoding) + cipher.final(cipherEncoding);
  },

  /** 
   * 飞书解密
   */
   sha256Decrypt (key, data, iv) {
    iv = iv || Buffer.alloc(16).join(''); 
    key = crypto.createHash('sha256').update(key).digest();
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    decipher.setAutoPadding(true);
    let result = decipher.update(data, cipherEncoding, clearEncoding) + decipher.final(clearEncoding)
    return result.substring(iv.length)
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