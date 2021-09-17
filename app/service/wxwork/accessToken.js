'use strict';

const Service = require('egg').Service;

class AccessTokenService extends Service {

  //获取Token
  async getToken(flag) {
    flag = flag || false; //是否强制刷新accessToken
    //1. 先从缓存中获取，不过如果调用者需要强制从服务器拉取(刷新操作)则从服务器拉取
    flag ? await this.refreshToken() : await this.getTokenFromRedis();
    await this.getTokenFromRedis();
    // //2. 缓存中没有则从服务器中获取
    if (!this.access_token) {
      await this.getTokenFromServer();
    }

    return this.access_token;
  }


  //从缓存中获取Token
  async getTokenFromRedis() {
    this.access_token = await this.service.redis.get(helper.md5(`${this.config.wxwork.corpid}_${this.config.wxwork.address_secret}`));
  }

  
  //从服务器获取Token
  async getTokenFromServer() {

    // const ctx = this.ctx;
    // let url = this.config.Corp.ApiUrl;
    // if (url[url.length - 1] == '/') { // 防止程序后续出错
    //   url = url.substr(0, url.length - 1)
    // }
    // const baseUrl = url || this.config.Corp.ApiUrl;
    // const httpClient = new HttpClient({
    //   baseUrl,
    //   ctx
    // });
    // let res;
    // try {
    //   res = await httpClient.curl(`/cgi-bin/gettoken?corpid=${this.config.wxwork.corpid}&corpsecret=${this.secret}`, {
    //     method: 'GET',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     dataType: 'json'
    //   });
    // } catch (error) {
    //   ctx.logger.error(new Error(error));
    //   ctx.logger.error(new Error('whoops'));
    // }
    // //检测请求结果，并返回
    // const data = res.data;
    // if (data) {
    //   if (data.errcode !== 0) { // 获取accessToken出错时抛出异常
    //     try {
    //       throw new Error(data);
    //     } catch (error) {
    //       ctx.logger.error(JSON.stringify(data));
    //     }
    //   } else if (data.errcode === 0 && data.errmsg === 'ok') {
    //     this.access_token = data.access_token;
    //     ctx.logger.info('从服务器拿的token：↓');
    //     ctx.logger.info(this.access_token);
    //     ctx.logger.info('从服务器拿的token：↑');
    //     //将token存进缓存
    //     await this.storeToken2Cache();
    //   }
    // }
  }

  //获取的token储存
  async storeToken2Cache(token) {
    try {
      let result = await this.service.redis.set(helper.md5(`${this.config.wxwork.corpid}_${this.config.wxwork.address_secret}`), token, 7100);
      ctx.logger.info("AccessToken存入的结果:" + result);

      if (!result) {
        throw new Error('存入AccessToken失败');
      } else {
        ctx.logger.info('存入AccessToken成功');
      }
    } catch (error) {
      ctx.logger.error('存入AccessToken失败');
    }
  }

  //刷新缓存中的Token
  async refreshToken() {
    await this.getTokenFromServer();
    return this;
  }

}

module.exports = AccessTokenService;