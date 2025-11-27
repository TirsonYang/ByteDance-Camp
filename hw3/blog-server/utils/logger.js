const fs = require('fs');
const path = require('path');

const writeSSRErrorLog = (error,articleId)=>{
    const logPath = path.join(
        __dirname,'../ssr-error.log'
    );
    const logContent = `[${new Date().toLocaleString()}] 文章ID:${articleId || '无'} 错误:${error.stack || error.message}\n`;
    fs.appendFile(logPath,logContent,(err)=>{
        if(err){
            console.log('日志写入失败：',err);
        }
    })
};
module.exports = {writeSSRErrorLog}