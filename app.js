const fs = require('fs');
const https = require('https');
const http = require('http');

const Koa = require('koa');
const cors = require('koa2-cors');
const debug = require('debug')('iplat');
const response = require('./middlewares/response');
const bodyParser = require('koa-bodyparser');

const config = require('./config');
const env = process.env.NODE_ENV;

// 同步读取密钥和签名证书
const options = {
  key: fs.readFileSync('./server/index.key'),
  cert: fs.readFileSync('./server/index.crt')
};

const app = new Koa();

const koaBody = require('koa-body');
app.use(koaBody({
  multipart: true
}));

// 定义server
const httpsServer = https.createServer(options, app.callback());
const httpServer = http.createServer(app.callback());

// 跨域
app.use(cors());

// 使用响应处理中间件
app.use(response);

// 解析请求体
app.use(bodyParser());

// 引入路由分发
const router = require('./routes');
app.use(router.routes());

// https监听3000端口
httpsServer.listen(config[env].https, () => debug(`listening on port ${config[env].https}`));
// http监听3003端口
httpServer.listen(config[env].http, () => debug(`listening on port ${config[env].http}`));
