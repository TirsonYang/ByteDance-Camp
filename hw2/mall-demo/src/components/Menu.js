import React from "react";
import styles from "./Menu.module.css";
import { Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';

import refresh from "../assets/refresh.svg";
import home from "../assets/home.svg";
import shop from "../assets/shop.svg";

import { useState } from "react";

function Menu({ onSearchChange, onSortChange }) {

    const [inputValue, setInputValue] = useState("");
    function reload() {
        window.location.reload();
    }

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }

    const handleSearch = () => {
        onSearchChange(inputValue);
    }

    const items = [
        {
            label: "综合",
            key: "default"
        },
        {
            label: "价格从高到低",
            key: "price-desc"
        },
        {
            label: "价格从低到高",
            key: "price-asc"
        }
    ]

    const handleSortClick = ({ key }) => {
        onSortChange(key);
    }

    return (
        <div className={styles["menu-container"]}>
            <input
                type="text"
                className={styles["search-input"]}
                placeholder="输入商品名称"
                value={inputValue}
                onChange={handleInputChange}
            ></input>

            <Button
                icon={<SearchOutlined />}
                className={styles["search-button"]}
                onClick={handleSearch}
            >
                搜索
            </Button>

            <img src={home} alt="home" onClick={reload} />
            <img src={shop} alt="shop" onClick={reload} />
            <img src={refresh} alt="refresh" onClick={reload} />

            <Dropdown menu={{ items, onClick: handleSortClick }}>
                <Button type="link" onClick={e => e.preventDefault()} >
                    <Space>
                        排序
                        <DownOutlined />
                    </Space>
                </Button>
            </Dropdown>
        </div>
    );
}

export default Menu;