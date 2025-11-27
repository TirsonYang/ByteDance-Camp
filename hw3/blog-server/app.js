const express = require('express');
const cors = require('cors');

const appConfig = require('./config/app');
const apiRouter = require('./routes/index');
const {createLimiter} = require('./utils/limiter');
const app = express();

app.use(cors({origin: appConfig.cors.origin,credentials:true}));
app.use(express.json());
app.use('/api',createLimiter());
app.use('/api',apiRouter);

app.listen(appConfig.port,()=>{
    console.log(`后端服务运行在http://localhost: ${appConfig.port}`);
})


