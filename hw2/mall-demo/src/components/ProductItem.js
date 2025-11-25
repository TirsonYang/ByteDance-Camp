import styles from "./ProductItem.module.css";

import add from "../assets/add.svg";

function ProductItem(props){
    return (
        <div className={styles['product-item-container']}>
            
            <img src={props.photoUrl} alt="商品图片" className={styles['photo-item']} />
            <span className={styles['description']}>{props.description}</span>
            <div className={styles['price-container']}>
                <span className={styles['price']}>
                    ￥{props.price}
                </span>
                <div className={styles['add-button-container']}>
                    <img src={add} className={styles["add-icon"]} alt="添加商品" />
                </div>
            </div>

        </div>
    );
}

export default ProductItem;