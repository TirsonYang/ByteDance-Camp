const redis = require('redis');

const client = redis.createClient({
    url: 'redis://localhsot:6379'
})

client.connect().catch(err=>{
    console.log('Redis 连接失败',err);
});

module.exports = client;
