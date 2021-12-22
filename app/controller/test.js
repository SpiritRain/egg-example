'use strict';
const _ = require('lodash');
const moment = require('moment');
const {
  QRCode
} = require('../extend/qrcode')
// const QRCode = require('../extend/artqrcode')
const jimp = require('jimp');

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

  async qrcode() {
    let text = this.ctx.query.text;
    if (!text) text = 'Test QR Code'

    let qr = new QRCode(text)
    // let matrix  = qr.toMatrix();
    console.log(qr.toString())
    let image = await qr.toArtQR()
    // let buffer = await image.png().toBuffer()
    image.write('qr.png')
    let base 
    image.getBase64(jimp.MIME_JPEG, function (err, src) {
        console.log("rb is \n")
        // console.log(src);
        base = src
      })
    this.ctx.body = `<html><body>
    <img src="${base}"/>
    </body></html>`
  }

  async image() {
    const eye = await (await jimp.read('app/public/electron/eye.png')).resize(150, 150);

    const image = new jimp(1024, 1024, 'pink')
      .blit(eye, 50, 50)
      // .writeAsync(`eye_150x150.png`);


    let materials = {
        col2: "./app/public/electron/col2.png",
        col3: "./app/public/electron/col3.png",
        // col4: "",
        corner: "./app/public/electron/corner.png",
        eye: "./app/public/electron/eye.png",
        row2: ["./app/public/electron/row2.png","./app/public/electron/row2_2.png"],
        row2col2: "./app/public/electron/row2col2.png",
        row2col3: "./app/public/electron/row2col3.png",
        row3: "./app/public/electron/row3.png",
        row3col2: "./app/public/electron/row3col2.png",
        row4: "./app/public/electron/row4.png",
        single: "./app/public/electron/single.png"
    }

    let resize = {
      eye: {w: 7, h: 7},
      row2col3: {w: 3, h: 2},
      row3col2: {w: 2, h: 2},
      row4: {w: 4, h: 1},
      col4: {w: 1, h: 4},
      row2col2: {w: 2, h: 2},
      row3: {w: 3, h: 1},
      col3: {w: 1, h: 3},
      corner: {w: 2, h: 2},
      row2: {w: 2, h: 1},
      col2: {w: 1, h: 2},
      single: {w: 1, h: 1},
    }

    let images ={}

    for (var obj in materials) {
      if (materials[obj] instanceof Array ) {
        images[obj] = await Promise.all(materials[obj].map(async src => (await jimp.read(src)).resize(resize[obj].w, resize[obj].h)))
        
      } else {
        images[obj] = await(await jimp.read(materials[obj])).resize(resize[obj].w, resize[obj].h)
      }
    }

    console.log(images)

    this.ctx.body = {
      materials
    }
  }
}

module.exports = TestController;