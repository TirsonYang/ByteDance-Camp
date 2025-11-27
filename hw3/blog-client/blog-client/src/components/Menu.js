import styles from './Menu.module.css'
import homeImg from '../assets/image/home.svg'
import sofaImg from '../assets/image/sofa.svg'
import leafImg from '../assets/image/leaf.svg'
import cameraImg from '../assets/image/camera.svg'
import appendixImg from '../assets/image/appendix.svg'
import walletImg from '../assets/image/wallet.svg'
import personImg from '../assets/image/person.svg'
import githubImg from '../assets/image/github.svg'


function Menu(){
    
    return (
        <div className={styles['menu-container']}>
            <span className={styles['title']}>blog</span>
            <div className={styles['menu-list-container']}>
                <div className={styles['home-container']}>
                    <img src={homeImg} alt='home' className={styles['icon']}></img>
                    <span className={styles['text']}>主页</span>
                </div>

                <div className={styles['home-container']}>
                    <img src={sofaImg} alt='home' className={styles['icon']}></img>
                    <span className={styles['text']}>日常</span>
                </div>

                <div className={styles['home-container']}>
                    <img src={leafImg} alt='home' className={styles['icon']}></img>
                    <span className={styles['text']}>片刻</span>
                </div>

                <div className={styles['home-container']}>
                    <img src={cameraImg} alt='home' className={styles['icon']}></img>
                    <span className={styles['text']}>专题</span>
                </div>
                
                <div className={styles['home-container']}>
                    <img src={appendixImg} alt='home' className={styles['icon']}></img>
                    <span className={styles['text']}>邻居</span>
                </div>

                <div className={styles['home-container']}>
                    <img src={walletImg} alt='home' className={styles['icon']}></img>
                    <span className={styles['text']}>留言</span>
                </div>

                <div className={styles['home-container']}>
                    <img src={personImg} alt='home' className={styles['icon']}></img>
                    <span className={styles['text']}>关于</span>
                </div>


            </div>


            {/*TODO 这里需要调用接口*/}
            <div className={styles['menu-statistics-container']}>
                <span className={styles['statistics-title']}>站点统计</span>
                <div className={styles['statistics-container']}>
                    <div className={styles['statistics-card']}>
                        <span>文章</span>
                        <span>18</span>
                    </div>
                    <div className={styles['statistics-card']}>
                        <span>分类</span>
                        <span>7</span>
                    </div>
                    <div className={styles['statistics-card']}>
                        <span>留言</span>
                        <span>32</span>
                    </div>
                    <div className={styles['statistics-card']}>
                        <span>运营</span>
                        <span>23天</span>
                    </div>
                </div>
            </div>

            <div className={styles['follow-me-container']}>
                <span className={styles['statistics-title']}>
                    follow me
                </span>

                <a
                    href='https://github.com/TirsonYang'
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles['link-wrapper']}
                >
                <div className={styles['icon-container']}>
                    <img src={githubImg} alt='github' className={styles['icon']}></img>
                </div>
                </a>
            </div>
        </div>
    );
}

export default Menu;