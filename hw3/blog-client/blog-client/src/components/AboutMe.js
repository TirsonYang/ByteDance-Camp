import styles from './AboutMe.module.css'
import positionUrl from '../assets/image/position.svg'
import educationUrl from '../assets/image/education.svg'


function AboutMe(){
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
            </div>
            
        </div>
    );
}

export default AboutMe;