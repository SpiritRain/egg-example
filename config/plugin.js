'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  redis: {
    enable: true,
    package: 'egg-redis'
  },
  
  // 配置 egg-sequelize 插件信息。
  sequelize: {
    enable: true, // 是否启用。
    package: 'egg-sequelize', // 指定包名称。
  },

  // 配置 egg-swagger-doc 插件信息。
  swaggerdoc: {
    enable: true, // 是否启用。
    package: 'egg-swagger-doc', // 指定包名称。
  }
};