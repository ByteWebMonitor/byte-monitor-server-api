const path = require('path');
const koaBody = require('koa-body');
const koaStatic = require('koa-static');
const todoRouter = require('./routers/todo');
const deviceRouter = require('./routers/device');
const errorRouter = require('./routers/error');
const performanceRouter = require('./routers/performance');
const adminRouter = require('./routers/admin');

const Koa = require('koa');
const cors = require('koa2-cors');
const Koa_Session = require('koa-session');
const app = new Koa();

// 配置koa-session
const session_signed_key = ["some secret hurr"];  // 这个是配合signed属性的签名key
const session_config = {
  key: 'koa:sess', /**  cookie的key。 (默认是 koa:sess) */
  maxAge: 360000,   /**  session 过期时间，以毫秒ms为单位计算 。*/
  autoCommit: true, /** 自动提交到响应头。(默认是 true) */
  overwrite: true, /** 是否允许重写 。(默认是 true) */
  httpOnly: true, /** 是否设置HttpOnly，如果在Cookie中设置了"HttpOnly"属性，那么通过程序(JS脚本、Applet等)将无法读取到Cookie信息，这样能有效的防止XSS攻击。  (默认 true) */
  signed: true, /** 是否签名。(默认是 true) */
  rolling: true, /** 是否每次响应时刷新Session的有效期。(默认是 false) */
  renew: false, /** 是否在Session快过期时刷新Session的有效期。(默认是 false) */
};
const session = Koa_Session(session_config, app)
app.keys = session_signed_key;
// 使用中间件，注意有先后顺序
app.use(session);

// 为应用使用中间件
// 静态文件中间件
app.use(cors());
app.use(koaStatic(path.join(__dirname, '../public')));
// 请求体 parse 中间件，用于 parse json 格式请求体
app.use(koaBody());

/** 若后面的路由抛错，则封装为错误响应返回
 * 错误响应格式为
 * {
 *   error: message
 * }
 */
app.use(async function errorHandler(ctx, next) {
  try {
    await next();
  } catch (err) {
    // 抛出的错误可以附带 status 字段，代表 http 状态码
    // 若没有提供，则默认状态码为 500，代表服务器内部错误
    ctx.status = err.status || 500;
    ctx.body = {error: err.message};
  }
});

// 为应用使用路由定义
// 使用待办事项业务路由
app.use(todoRouter);
app.use(deviceRouter);
app.use(errorRouter);
app.use(performanceRouter);
app.use(adminRouter);

module.exports = app;
