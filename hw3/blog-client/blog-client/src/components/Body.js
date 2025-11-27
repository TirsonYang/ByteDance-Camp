import styles from './Body.module.css'
import imgUrl from '../assets/image/img.png'
import BlogItem from './BlogItem'
import axios from 'axios';
import { useEffect, useState } from 'react';

function Body() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  // 可选：分类筛选（默认查全部，可根据需求传值）
  const [categoryId, setCategoryId] = useState('');

  useEffect(() => {
    const fetchAllArticles = async () => {
      try {
        // 1. 适配后端 GET 请求 + 可选 categoryId 参数
        const res = await axios.get('http://localhost:3001/api/article/list', {
          params: { categoryId } // 自动拼接为 ?categoryId=xxx（空则不拼接）
        });

        // 2. 适配后端响应格式：先判断 code 是否为 200
        if (res.data.code !== 200) {
          throw new Error(res.data.msg || '查询文章列表失败');
        }

        // 3. 字段名映射：下划线 → 小驼峰（前端开发习惯）
        const formatArticles = res.data.data.map(item => ({
          id: item.id,
          title: item.title,
          categoryId: item.category_id, // 下划线转小驼峰
          readCount: item.read_count,
          createTime: item.create_time, // 后端返回的时间字符串（如 2023-07-01）
          // 注意：list 接口无 content，先设为空，后续通过详情接口补充
          content: '' 
        }));

        // 4. 更新状态
        setArticles(formatArticles);
        setLoading(false);
      } catch (err) {
        setError('文章列表加载失败：' + err.message);
        setLoading(false);
      }
    };

    fetchAllArticles();
  }, [categoryId]); // 依赖 categoryId，筛选分类时重新请求

  // 可选：补充「查询单篇文章详情」的函数（解决 content 缺失）
  const fetchArticleDetail = async (articleId) => {
    try {
      const res = await axios.get(`http://localhost:3001/api/article/detail/${articleId}`);
      if (res.data.code === 200) {
        // 更新对应文章的 content
        setArticles(prev => prev.map(art => 
          art.id === articleId ? { ...art, content: res.data.data.content } : art
        ));
      }
    } catch (err) {
      console.error('查询文章详情失败：', err);
    }
  };

  return (
    <div className={styles['body-container']}>
      <div className={styles['body-image']}>
        <img src={imgUrl} alt='img' />
      </div>
      <div className={styles['body-text-container']}>
        {loading && <div style={{ padding: '20px' }}>文章列表加载中...</div>}
        {error && <div style={{ padding: '20px', color: 'red' }}>{error}</div>}
        
        {!loading && !error && articles.length > 0 ? (
          articles.map((article) => (
            <BlogItem 
              key={article.id}
              article={article}
              // 传递「加载详情」的函数给子组件（可选）
              fetchDetail={() => fetchArticleDetail(article.id)}
              onDelete={(deletedId)=>{
                setArticles(prev => prev.filter(art => art.id !== deletedId));
              }}
            />
          ))
        ) : (
          !loading && !error && <div style={{ padding: '20px' }}>暂无文章</div>
        )}
      </div>
    </div>
  );
}

export default Body;