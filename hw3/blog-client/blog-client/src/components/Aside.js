import styles from './Aside.module.css'
import positionUrl from '../assets/image/position.svg'
import educationUrl from '../assets/image/education.svg'
import { useState,useEffect } from 'react';
import axios from 'axios';


function Aside(){

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [categoryId, setCategoryId] = useState('');

    const fetchAllArticles = async()=>{
        try{
            const res = await axios.get('http://localhost:3001/api/article/list',{
                params: {categoryId}
            });

            if(res.data.code!==200){
                throw new Error(res.data.msg||'猜你喜欢失败');
            }

            const formatArticles = res.data.data.map(
                item =>({
                    id: item.id,
                    title: item.title,
                    categoryId: item.categoryId,
                    readCount: item.read_count,
                    createTime: item.create_time,
                    content: ''
                })
            );

            setArticles(formatArticles);
            setLoading(false);
        }catch(err){
            setError('猜你喜欢加载失败'+err.message);
            setLoading(false);
        }
    }


    useEffect(() => {
        fetchAllArticles();
    }, [categoryId]); // 依赖categoryId，分类变化时重新请求



    return (
        <div className={styles['about-me-container']}>


            <span className={styles['title']}>About Me</span>
            <div className={styles['about-me-content-container']}>
                <div className={styles['text-container']}>
                    <img src={positionUrl}
                    alt='位置'>
                    </img>
                    <span>
                        陕西省西安市
                    </span>
                </div>

                <div className={styles['text-container']}>
                    <img src={educationUrl}
                    alt='学校'>
                    </img>
                    <span>
                        西安电子科技大学
                    </span>
                </div>

            </div>

            <span className={styles['title']}>猜你喜欢</span>
            <div className={styles['like-container']}> 

                {loading && <div style={{ padding: '20px' }}>文章列表加载中...</div>}

                {error && <div style={{ padding: '20px', color: 'red' }}>{error}</div>}

                {!loading&& !error && articles.length>0?(
                    articles.slice(0,5).map((article)=>(
                        <div
                            className={styles['like-item']}
                            key={article.id}
                            article={article}
                        >
                            {article.title}
                        </div>
                    ))
                ):(
                    !loading && !error && <div style={{ padding: '20px' }}>暂无文章</div>
                )}
                
            </div>
            
        </div>
    );
}

export default Aside;