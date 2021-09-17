/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1629370536333_6562';

  // add your middleware config here
  config.middleware = ['mid'];

  // on error handler 
  config.onerror = {
    // all(err, ctx) {
    //   // 在此处定义针对所有响应类型的错误处理方法
    //   // 注意，定义了 config.all 之后，其他错误处理方法不会再生效
    //   ctx.body = `error: ${err}`;
    //   ctx.status = 500;
    // },
    // html(err, ctx) {
    //   // html hander
    //   ctx.body = '<h3>error</h3>';
    //   ctx.status = 500;
    // },
    // json(err, ctx) {
    //   // json hander
    //   ctx.body = { message: 'error' };
    //   ctx.status = 500;
    // },
    // jsonp(err, ctx) {
    //   // 一般来说，不需要特殊针对 jsonp 进行错误定义，jsonp 的错误处理会自动调用 json 错误处理，并包装成 jsonp 的响应格式
    // },
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',

    // wechat info
    wxwork : {
      testuid: '',
      corpid: '',
      appSecret: '',
    },

    // egg-swagger-doc 配置信息。
    swaggerdoc: {
      dirScanner: './app/controller', // 配置自动扫描的控制器路径。
      // 接口文档的标题，描述或其它。
      apiInfo: {
        title: '测试文档', // 接口文档的标题。
        description: 'swagger-ui', // 接口文档描述。
        version: '1.0.0', // 接口文档版本。
      },
      schemes: ['http', 'https'], // 配置支持的协议。
      consumes: ['application/json'], // 指定处理请求的提交内容类型（Content-Type），例如application/json, text/html。
      produces: ['application/json'], // 指定返回的内容类型，仅当request请求头中的(Accept)类型中包含该指定类型才返回。
      securityDefinitions: { // 配置接口安全授权方式。
        // apikey: {
        //   type: 'apiKey',
        //   name: 'clientkey',
        //   in: 'header',
        // },
        // oauth2: {
        //   type: 'oauth2',
        //   tokenUrl: 'http://petstore.swagger.io/oauth/dialog',
        //   flow: 'password',
        //   scopes: {
        //     'write:access_token': 'write access_token',
        //     'read:access_token': 'read access_token',
        //   },
        // },
      },
      enableSecurity: false, // 是否启用授权，默认 false（不启用）。
      // enableValidate: true,    // 是否启用参数校验，默认 true（启用）。
      routerMap: true, // 是否启用自动生成路由，默认 true (启用)。
      enable: true, // 默认 true (启用)。
    },

  }

  return {
    ...config,
    ...userConfig,
  };
};