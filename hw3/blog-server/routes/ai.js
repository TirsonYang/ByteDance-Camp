const express = require('express');
const router = express.Router();

// ====================== 接口：生成写作模板 ======================
// 请求方式：POST
// 请求地址：/api/ai/write
// 请求参数：{ type: 'tech', title: 'React SSR 实战' }（type：tech/生活）
router.post('/write', async (req, res) => {
  try {
    const { type, title } = req.body;
    if (!type || !title) {
      return res.json({ code: 400, msg: '文章类型和标题不能为空' });
    }
    // 自定义模板（体现你的创造，可根据需求扩展）
    const templates = {
      // 技术博客模板
      tech: `# ${title}\n
## 一、核心知识点
1. 
2. 

## 二、实现步骤
1. 环境准备：
2. 核心代码：
3. 测试验证：

## 三、踩坑记录
1. 
2. 

## 四、总结
`,
      // 生活随笔模板
      life: `# ${title}\n
## 一、经历回顾
- 时间：
- 地点：
- 过程：

## 二、感悟总结
1. 
2. 

## 三、后续计划
`,
      // 默认模板
      default: `# ${title}\n
## 一、正文
## 二、总结
`
    };
    // 返回模板内容
    res.json({
      code: 200,
      msg: '模板生成成功',
      data: { content: templates[type] || templates.default }
    });
  } catch (err) {
    res.json({ code: 500, msg: '生成失败', error: err.message });
  }
});

module.exports = router;