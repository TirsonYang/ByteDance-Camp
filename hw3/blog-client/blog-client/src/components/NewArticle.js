import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function NewArticle() {
  // 1. 路由参数：获取文章ID（编辑模式才有）
  const { id } = useParams(); // 从 /new-article/:id 中取id
  const isEditMode = !!id; // 有id=编辑模式，无id=新增模式

  // 2. 表单状态
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categoryId, setCategoryId] = useState(1);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false); // 提交loading

  // 3. 路由跳转
  const navigate = useNavigate();

  // 4. 编辑模式：加载文章详情（组件挂载时）
  useEffect(() => {
    if (isEditMode) {
      const fetchArticleDetail = async () => {
        try {
          const res = await axios.get(`http://localhost:3001/api/article/detail/${id}`);
          if (res.data.code === 200) {
            const article = res.data.data;
            // 数据回显（注意字段映射：category_id → categoryId）
            setTitle(article.title);
            setContent(article.content);
            setCategoryId(article.category_id || 0);
          } else {
            setMsg('加载文章失败：' + res.data.msg);
          }
        } catch (err) {
          setMsg('加载失败：' + (err.response?.data?.msg || err.message));
        }
      };
      fetchArticleDetail();
    }
  }, [id, isEditMode]);

  // 5. 表单提交（区分新增/编辑接口）
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      setMsg('标题和内容不能为空！');
      return;
    }

    setLoading(true);
    try {
      let res;
      if (isEditMode) {
        // 编辑模式：调用更新接口
        res = await axios.post('http://localhost:3001/api/article/update', {
          articleId: id, // 后端需要的articleId
          title,
          content,
          categoryId
        });
      } else {
        // 新增模式：调用原有新增接口
        res = await axios.post('http://localhost:3001/api/article/add', {
          title,
          content,
          categoryId
        });
      }

      if (res.data.code === 200) {
        const successMsg = isEditMode ? '修改成功！' : '新增成功！';
        setMsg(successMsg + ' 即将返回首页～');
        setTimeout(() => navigate('/'), 2000);
      } else {
        setMsg((isEditMode ? '修改' : '新增') + '失败：' + res.data.msg);
      }
    } catch (err) {
      setMsg('请求失败：' + (err.response?.data?.msg || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      {/* 标题区分新增/编辑 */}
      <h1>{isEditMode ? '编辑文章' : '发布文章'}</h1>
      
      <form onSubmit={handleSubmit}>
        {/* 标题输入框 */}
        <div style={{ marginBottom: '10px' }}>
          <label>标题：</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            placeholder="请输入博客标题"
            disabled={loading} // loading时禁用
          />
        </div>

        {/* 内容文本域 */}
        <div style={{ marginBottom: '10px' }}>
          <label>内容：</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ width: '100%', height: '300px', padding: '8px', marginTop: '5px' }}
            placeholder="请输入博客内容"
            disabled={loading}
          />
        </div>

        {/* 分类选择 */}
        <div style={{ marginBottom: '10px' }}>
          <label>分类：</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(Number(e.target.value))}
            style={{ padding: '8px', marginTop: '5px' }}
            disabled={loading}
          >
            <option value={0}>未分类</option>
            <option value={1}>技术博客</option>
            <option value={2}>生活随笔</option>
          </select>
        </div>

        {/* 提交按钮（区分文字 + loading禁用） */}
        <button
          type="submit"
          style={{ 
            padding: '8px 20px', 
            background: '#aacbb9', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1
          }}
          disabled={loading}
        >
          {loading ? '提交中...' : (isEditMode ? '保存修改' : '提交博客')}
        </button>
      </form>

      {/* 提示信息 */}
      {msg && <p style={{ marginTop: '10px', color: msg.includes('成功') ? 'green' : 'red' }}>{msg}</p>}
    </div>
  );
}

export default NewArticle;