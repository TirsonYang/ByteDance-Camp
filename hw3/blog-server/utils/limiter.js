const rateLimit = require('express-rate-limit');

function createLimiter(windowMs=10*60*1000,max=100000){
    return rateLimit({
        windowMs,
        max,
        message: {code:429,msg:'请求太频繁，请稍后再试'}
    });
};
module.exports = {createLimiter};