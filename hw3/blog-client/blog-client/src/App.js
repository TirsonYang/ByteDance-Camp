

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
// 导入后续要写的新增博客组件（先占位，后续创建）
import NewArticle from './components/NewArticle';
// 简单的首页组件（显示文章列表+新增按钮）
import Home from './components/Home';

import styles from './App.module.css'

import Category from './components/Category';


function App() {
    return (
        <BrowserRouter>
      {/* <nav style={{ background: 'rgb(210,220,226)'}}>
        <Link to="/" style={{ marginRight: '20px', textDecoration: 'none'}}>首页</Link>
        <Link to="/new-article">
          <button className={styles['circle-cross']}>
            </button>
        </Link>
      </nav> */}

      {/* 路由规则：不同路径对应不同组件 */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new-article" element={<NewArticle />} />
        <Route path="/new-article/:id" element={<NewArticle />} />
        <Route path="/new-category/" element={<Category />} />
      </Routes>
        </BrowserRouter>
    )
}

export default App;
