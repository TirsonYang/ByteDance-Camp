

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
// 导入后续要写的新增博客组件（先占位，后续创建）
import NewArticle from './components/NewArticle';
// 简单的首页组件（显示文章列表+新增按钮）
import Home from './components/Home';

import styles from './App.module.css'


function App() {
    return (
        <BrowserRouter>
            {/* 导航栏：放新增博客按钮，所有页面都能看到 */}
      <nav style={{ background: '#f5f5f5' }}>
        {/* 首页链接 */}
        <Link to="/" style={{ marginRight: '20px', textDecoration: 'none'}}>首页</Link>
        {/* 新增博客按钮（跳转新增页面） */}
        <Link to="/new-article">
          <button className={styles['circle-cross']}>
            </button>
        </Link>
      </nav>

      {/* 路由规则：不同路径对应不同组件 */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new-article" element={<NewArticle />} />
        <Route path="/new-article/:id" element={<NewArticle />} />
      </Routes>
        </BrowserRouter>
    )
}

export default App;
