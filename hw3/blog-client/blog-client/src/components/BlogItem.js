import { useState, useRef, useEffect } from 'react';
import styles from './BlogItem.module.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// 接收父组件传递的 article 和 fetchDetail
function BlogItem({ article, fetchDetail,onDelete }) {
  // 解构字段（加默认值，适配空值）
  const { 
    title = '未命名文章', 
    createTime = '未知时间', 
    content = '',
    readCount = 0 // 新增阅读量展示（可选）
  } = article || {};

  const [isExpanded, setIsExpanded] = useState(false);
  const [showExpandBtn, setShowExpandBtn] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false); // 新增：删除loading状态
  const contentRef = useRef(null);
  const COLLAPSED_HEIGHT = 200;
  const [contentRealHeight, setContentRealHeight] = useState(COLLAPSED_HEIGHT);

  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/new-article/${article.id}`); // 跳转到编辑页面，携带文章ID
  };

  // 组件挂载时加载文章详情（获取 content）
  useEffect(() => {
    if (article.id && !content) {
      fetchDetail(); // 调用父组件传递的函数，加载 content
    }
  }, [article.id, content, fetchDetail]);

  // 计算内容高度（依赖 content 更新）
  useEffect(() => {
    if (contentRef.current && content) {
      const realHeight = contentRef.current.scrollHeight;
      setContentRealHeight(realHeight);
      setShowExpandBtn(realHeight > COLLAPSED_HEIGHT);
    }
  }, [content, COLLAPSED_HEIGHT]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) return;
    contentRef.current.scrollTop = 0;
  };

  const getContentHeight = () => {
    return isExpanded ? `${contentRealHeight}px` : `${COLLAPSED_HEIGHT}px`;
  };

  const deleteArticle = async () => {
    // 1. 二次确认：防止误删
    if (!window.confirm('确定要删除这篇文章吗？删除后无法恢复！')) {
      return;
    }

    // 2. 标记loading，防止重复点击
    setIsDeleting(true);

    try {
      // 核心修正：请求地址 + 参数传递（和后端接口匹配）
      const res = await axios.post(
        'http://localhost:3001/api/article/delete', // 正确地址：无/${article.id}
        { articleId: article.id } // 正确传参：请求体传articleId（和后端req.body.articleId匹配）
      );

      // 3. 完整的响应处理（覆盖后端所有返回码）
      if (res.data.code === 200) {
        // 通知父组件更新列表（替代刷新页面，更优雅）
        if (onDelete) {
          onDelete(article.id);
        }
        // 可选：如果没有父组件回调，再用刷新（不推荐）
        // window.location.reload();
      } else if (res.data.code === 400) {
        alert(`删除失败：${res.data.msg}`); // 捕获后端"文章ID不能为空"等提示
      } else if (res.data.code === 500) {
        alert(`删除失败：${res.data.msg}`); // 捕获后端数据库错误
      }
    } catch (err) {
      // 捕获前端侧错误（网络异常、地址错误等）
      console.error('删除文章失败：', err);
      alert(`删除失败：${err.message || '网络异常，请稍后重试'}`);
    } finally {
      // 无论成功/失败，都取消loading状态
      setIsDeleting(false);
    }
};

  return (
    <div className={styles.articleCard}>
      <h3 className={styles.articleTitle}>{title}</h3>
      {/* 新增：展示创建时间 + 阅读量 */}
      <div className={styles.articleMeta}>
        <span>{createTime}</span>
        <span>阅读量：{readCount}</span>
        <span 
          onClick={handleEdit} 
          className={styles['edit-icon']}
          style={{ marginLeft: '10px', cursor: 'pointer', color: '#4096ff' }}
        >
          编辑
        </span>
        <span onClick={deleteArticle} className={styles['delete-icon']}>删除</span>
      </div>
      {/* 内容容器：content 为空时显示加载 */}
      <div
        ref={contentRef}
        className={`${styles.articleContent} ${isExpanded ? styles.expanded : styles.collapsed}`}
        style={{ height: getContentHeight() }}
      >
        {content || '内容加载中...'}
      </div>
      {showExpandBtn && (
        <button className={styles.expandBtn} onClick={toggleExpand}>
          {isExpanded ? '收起全文' : '展开全文'}
        </button>
      )}
    </div>
  );
}

export default BlogItem;