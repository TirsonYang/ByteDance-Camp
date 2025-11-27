const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// ====================== 接口1：保存草稿 ======================
// 请求方式：POST
// 请求地址：/api/draft/save
// 请求参数：{ articleId: 1, content: '草稿内容' }
router.post('/save', async (req, res) => {
  try {
    const { articleId, content } = req.body;
    if (!articleId || !content) {
      return res.json({ code: 400, msg: '文章ID和草稿内容不能为空' });
    }
    // 先查该文章是否已有草稿
    const [draft] = await pool.execute(
      'SELECT id FROM draft WHERE article_id = ?',
      [articleId]
    );
    if (draft.length > 0) {
      // 有则更新
      await pool.execute(
        'UPDATE draft SET content = ? WHERE article_id = ?',
        [content, articleId]
      );
    } else {
      // 无则插入
      await pool.execute(
        'INSERT INTO draft (article_id, content) VALUES (?, ?)',
        [articleId, content]
      );
    }
    res.json({ code: 200, msg: '草稿保存成功' });
  } catch (err) {
    res.json({ code: 500, msg: '保存失败', error: err.message });
  }
});

// ====================== 接口2：查询草稿 ======================
// 请求方式：GET
// 请求地址：/api/draft/get/:articleId（articleId是文章ID）
router.get('/get/:articleId', async (req, res) => {
  try {
    const { articleId } = req.params;
    const [draft] = await pool.execute(
      'SELECT content, update_time FROM draft WHERE article_id = ?',
      [articleId]
    );
    if (draft.length === 0) {
      return res.json({ code: 404, msg: '暂无草稿', data: { content: '' } });
    }
    res.json({
      code: 200,
      msg: '查询成功',
      data: draft[0]
    });
  } catch (err) {
    res.json({ code: 500, msg: '查询失败', error: err.message });
  }
});

module.exports = router;