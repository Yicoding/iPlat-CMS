## 开始使用

#### 安装依赖

```bash
# 安装全局依赖
npm i pm2 nodemon -g

# 安装项目依赖
npm i
```

#### 启动项目

```bash
# 开发环境，监听文件变化自动重启，并会输出 debug 信息
npm run dev

# 线上部署环境
npm run prd
```

- Node 进程管理工具：`pm2`

## 项目结构

```
iPlat-CMS
├── README.md
├── app.js
├── controllers
│   ├── index.js
├── middlewares
│   └── response.js
├── routes
│    └── index.js
├── server
│   └── cosconfig.js
├── tools
│   └── util.js
├── config.js
├── nodemon.json
├── package.json
├── process.prod.json
├── processes.json
└── qcloud.js
```
`app.js` 是 Demo 的主入口文件，Demo 使用 Koa 框架，在 `app.js` 创建一个 Koa 实例并响应请求。

`routes/index.js` 是 Demo 的路由定义文件

`controllers` 存放 Demo 所有业务逻辑的目录，`index.js` 不需要修改，他会动态的将 `controllers` 文件夹下的目录结构映射成 modules 的 Object，例如 Demo 中的目录将会被映射成如下的结构：

密钥：https://www.bt.cn/admin/safe
key直接复制，crt文件需要证书+根证书