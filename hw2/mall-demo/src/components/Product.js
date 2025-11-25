import { useState } from "react";
import './Product.module.css';
import {Pagination} from 'antd';
import ProductItem from "./ProductItem";

// 图片路径
import photo1 from "../assets/photo/1.png";
import photo2 from "../assets/photo/2.png"; 
import photo3 from "../assets/photo/3.png";
import photo4 from "../assets/photo/4.png";
import photo5 from "../assets/photo/5.png";
import photo6 from "../assets/photo/6.png";
import photo7 from "../assets/photo/7.png";
import photo8 from "../assets/photo/8.png";
import photo9 from "../assets/photo/9.png";
import photo10 from "../assets/photo/10.png";
import photo11 from "../assets/photo/11.png";

import styles from "./Product.module.css";

const mockProducts = [
    {id:1, photoUrl: photo1,description:"ins网红辣妹通勤免烤速干指甲油 持久不掉色奶茶裸粉豆沙色可剥无毒美甲" ,price:59},
    {id:2, photoUrl: photo2,description:"无线蓝牙头戴式耳机高音质重低音超长续航学生党通勤游戏折叠便携触控耳麦" ,price:399},
    {id:3, photoUrl: photo3,description:"丝绒雾面哑光口红显白不拔干烂番茄豆沙色学生党平价持久不沾杯网红同款" ,price:129},
    {id:4, photoUrl: photo4,description:"1.8L电热水壶防干烧自动断电保温静音家用宿舍学生党不锈钢高颜值煮水壶",price:239},
    {id:5, photoUrl: photo5,description:"耐高温玻璃水杯高硼硅防烫带刻度大容量便携家用办公泡茶咖啡学生党ins同款",price:39},
    {id:6, photoUrl: photo6,description:"小众高级香水淡香浓香可选花果香木质香学生党平价约会通勤斩男不撞香爆款",price:799},
    {id:7, photoUrl: photo7,description:"不锈钢防水手表夜光日历石英表风学生党平价约会通勤商务百搭高颜值",price:400},
    {id:8, photoUrl: photo8,description:"微单数码相机防抖长焦高清像素学生党旅游vlog便携家用办公记录神器网红款",price:1199},
    {id:9, photoUrl: photo9,description:"5G智能手机大内存高清摄像长续航快充学生党游戏轻薄高颜值网红爆款",price:129},
    {id:10, photoUrl: photo10,description:"金属防风打火机创意个性复古款男士礼品充电煤油便携耐用网红爆款打火机",price:239},
    {id:11, photoUrl: photo11,description:"轻薄笔记本电脑高性能大内存长续航学生党办公电竞游戏本高清屏网红同款",price:5999}
]

function Product({ searchTerm, sortType }){

    // 分页
    const [currentPage,setCurrentPage]=useState(1);
    const pageSize=8;
    const startIndex = (currentPage-1)*pageSize;
    const endIndex = currentPage*pageSize;
    const handlePageChange =(page)=>{
        setCurrentPage(page);
    }
    
    let filteredProducts = mockProducts.filter(product =>
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    if (sortType === "price-desc") {
        filteredProducts.sort((a, b) => b.price - a.price);
    } else if (sortType === "price-asc") {
        filteredProducts.sort((a, b) => a.price - b.price);
    }
    
    const currentProducts = filteredProducts.slice(startIndex,endIndex);
    // const totalPages = Math.ceil(filteredProducts.length / pageSize);

    return (
        <div className={styles["product-container"]}>

            <div className={styles["product-item-container"]}>
                {currentProducts.map((product)=>(
                    <ProductItem 
                    key={product.id}
                    photoUrl={product.photoUrl}
                    description={product.description}
                    price={product.price}
                    />
                ))}
            </div>

            <Pagination 
            current={currentPage}
            pageSize={pageSize}
            total={filteredProducts.length}
            onChange={handlePageChange}
            showSizeChanger={false}
            style={{marginTop:"20px"}}
            />

        </div>
    );
}

export default Product;