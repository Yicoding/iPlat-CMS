const COS = require('cos-nodejs-sdk-v5');
const cosconfig = require('./server/cosconfig');

const CONF = {
    http: 3005,
    https: 3004,

    /**
     * MySQL 配置，用来存储 session 和用户信息
     * 若使用了腾讯云微信小程序解决方案
     * 开发环境下，MySQL 的初始密码为您的微信小程序 appid
     */
    mysql: {
        host: 'localhost',
        port: 3306,
        // host: 'ilovelyplat.com',
        // host: '118.25.38.152',
        // port: 3306,
        // user: 'ifoodimusic',
        user: 'root',
        db: 'ifoodimusic',
        pass: '09210110063as',
        char: 'utf8mb4'
    },

    cos: new COS({
        // 必选参数
        SecretId: cosconfig.SecretId,
        SecretKey: cosconfig.SecretKey,
        // 可选参数
        FileParallelLimit: 3,    // 控制文件上传并发数
        ChunkParallelLimit: 8,   // 控制单个文件下分片上传并发数，在同园区上传可以设置较大的并发数
        ChunkSize: 1024 * 1024 * 8,  // 控制分片大小，单位 B，在同园区上传可以设置较大的分片大小
        Proxy: '',
    })

}

module.exports = CONF
