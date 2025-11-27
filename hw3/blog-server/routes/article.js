const express = require('express');
const router = express.Router();
// 导入数据库连接池（config/db.js 导出的）
const pool = require('../config/db');

// ====================== 接口1：新增文章 ======================
// 请求方式：POST
// 请求地址：/api/article/add
// 请求参数：{ title: '文章标题', content: '文章内容', categoryId: 1 }
router.post('/add', async (req, res) => {
  try {
    // 解构前端传的参数（categoryId默认0：未分类）
    const { title, content, categoryId = 0 } = req.body;
    // 校验必填参数
    if (!title || !content) {
      return res.json({ code: 400, msg: '标题和内容不能为空' });
    }
    // 插入文章表
    const [result] = await pool.execute(
      'INSERT INTO article (title, content, category_id) VALUES (?, ?, ?)',
      [title, content, categoryId]
    );
    // 返回成功结果（包含新增的文章ID）
    res.json({
      code: 200,
      msg: '文章新增成功',
      data: { articleId: result.insertId }
    });
  } catch (err) {
    // 错误处理（返回错误信息，方便调试）
    res.json({ code: 500, msg: '新增失败', error: err.message });
  }
});

// ====================== 接口2：查询文章列表（支持分类筛选） ======================
// 请求方式：GET
// 请求地址：/api/article/list?categoryId=1（可选：categoryId筛选分类）
router.get('/list', async (req, res) => {
  try {
    const { categoryId } = req.query;
    // 拼接SQL（有分类则筛选，无则查全部）
    let sql = 'SELECT id, title, category_id, read_count, create_time FROM article';
    let params = [];
    if (categoryId) {
      sql += ' WHERE category_id = ?';
      params.push(categoryId);
    }
    // 按创建时间倒序（最新的在前）
    sql += ' ORDER BY create_time DESC';

    const [articles] = await pool.execute(sql, params);
    res.json({
      code: 200,
      msg: '查询成功',
      data: articles
    });
  } catch (err) {
    res.json({ code: 500, msg: '查询失败', error: err.message });
  }
});

// ====================== 接口3：查询文章详情 ======================
// 请求方式：GET
// 请求地址：/api/article/detail/:id（id是文章ID）
// ====================== 接口3：查询单篇文章详情 ======================
// 请求方式：GET
// 请求地址：/api/article/detail/:id
router.get('/detail/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // 查询包含 content 的完整文章信息
    const sql = 'SELECT id, title, category_id, content, read_count, create_time FROM article WHERE id = ?';
    const [articles] = await pool.execute(sql, [id]);
    
    if (articles.length === 0) {
      return res.json({ code: 404, msg: '文章不存在' });
    }

    res.json({
      code: 200,
      msg: '查询成功',
      data: articles[0] // 返回单篇文章
    });
  } catch (err) {
    res.json({ code: 500, msg: '查询失败', error: err.message });
  }
});

// ====================== 接口4：更新文章 ======================
// 请求方式：POST
// 请求地址：/api/article/update
// 请求参数：{ articleId: 1, title: '新标题', content: '新内容', categoryId: 2 }
router.post('/update', async (req, res) => {
  try {
    const { articleId, title, content, categoryId = 0 } = req.body;
    if (!articleId || !title || !content) {
      return res.json({ code: 400, msg: '文章ID、标题、内容不能为空' });
    }
    // 更新文章
    await pool.execute(
      'UPDATE article SET title = ?, content = ?, category_id = ? WHERE id = ?',
      [title, content, categoryId, articleId]
    );
    res.json({ code: 200, msg: '文章更新成功' });
  } catch (err) {
    res.json({ code: 500, msg: '更新失败', error: err.message });
  }
});

// ====================== 接口5：删除文章 ======================
// 请求方式：POST
// 请求地址：/api/article/delete
// 请求参数：{ articleId: 1 }
router.post('/delete', async (req, res) => {
  try {
    const { articleId } = req.body;
    if (!articleId) {
      return res.json({ code: 400, msg: '文章ID不能为空' });
    }
    // 先删草稿（关联删除），再删文章
    await pool.execute('DELETE FROM draft WHERE article_id = ?', [articleId]);
    await pool.execute('DELETE FROM article WHERE id = ?', [articleId]);
    res.json({ code: 200, msg: '文章删除成功' });
  } catch (err) {
    res.json({ code: 500, msg: '删除失败', error: err.message });
  }
});

// ====================== 接口6：阅读量+1（简化防刷：同一IP 5分钟内仅+1） ======================
// 请求方式：POST
// 请求地址：/api/article/visit
// 请求参数：{ articleId: 1, ip: '用户IP' }（前端可通过req.ip获取，这里简化传参）
router.post('/visit', async (req, res) => {
  try {
    const { articleId, ip } = req.body;
    if (!articleId || !ip) {
      return res.json({ code: 400, msg: '文章ID和IP不能为空' });
    }
    // 简化防刷：这里暂不做Redis，直接+1（新手先跑通，后续加Redis）
    await pool.execute(
      'UPDATE article SET read_count = read_count + 1 WHERE id = ?',
      [articleId]
    );
    res.json({ code: 200, msg: '阅读量更新成功' });
  } catch (err) {
    res.json({ code: 500, msg: '更新失败', error: err.message });
  }
});

// 导出路由
module.exports = router;