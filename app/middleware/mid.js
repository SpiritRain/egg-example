//middleware handler

const showMsg = false

module.exports = (options, app) => {
  return async function (ctx, next) {
    try {
      await next();
      if (ctx.body && showMsg) {
        ctx.body['code'] = 200;
        ctx.body['message'] = 'success';
      }
    } catch (err) {
      switch (err.status) {
        case 555:
          handleErr555(ctx, err);
          break;
        default:
          throw err;
      }
    } finally {
      if (ctx.body && showMsg) {
        ctx.body['env'] = app.config.env;
        ctx.body['version'] = app.config.pkg.version;
        ctx.body['timestamp'] = ctx.helper.formatTime();
      }
    }
  }
}

function handleErr555(ctx, err) {
  ctx.body = {
    code: err.status,
    message: 'failed',
    data: err.message,
  }
}