import styles from './Home.module.css'
import Menu from './Menu';
import Body from './Body';
import AboutMe from './AboutMe'

function Home(){
    return(
        <div className={styles['home-container']}>
            <Menu />
            <Body />
            <AboutMe />
        </div>
    )
}

export default Home;