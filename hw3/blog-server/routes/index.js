const express = require('express');
const router = express.Router();

// 导入各功能路由
const articleRouter = require('./article');
const draftRouter = require('./draft');
const aiRouter = require('./ai');

// 挂载子路由（接口前缀：/api/xxx）
router.use('/article', articleRouter); // 文章相关接口：/api/article/xxx
router.use('/draft', draftRouter);     // 草稿相关接口：/api/draft/xxx
router.use('/ai', aiRouter);           // AI写作相关接口：/api/ai/xxx

// 导出汇总后的路由
module.exports = router;