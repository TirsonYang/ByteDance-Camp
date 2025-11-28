import styles from './Home.module.css'
import Menu from './Menu';
import Body from './Body';
import Aside from './Aside'

function Home(){
    return(
        <div className={styles['home-container']}>
            <Menu />
            <Body />
            <Aside />
        </div>
    )
}

export default Home;