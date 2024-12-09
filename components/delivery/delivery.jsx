import React from 'react';
import styles from '../../styles/delivery.module.css'
import Link from "next/link";
import {Image} from "antd";
const Delivery = () => {
    return (
        <div className={styles.delivery}>
            <div className={styles.deliveryItem}></div>
            <div className={styles.deliveryItemCenter}>
                <img src="/photos/deliveres.webp" alt=""/>
            </div>
            <div className={styles.deliveryText}>
                <h3>Бесплатная доставка</h3>
                <p>Наслаждайтесь горячей пиццей прямо у вашего порога! Быстро, вкусно и удобно.</p>
                <a href="https://wa.me/79283334105" style={{textDecoration:'none'}} target="_blank" rel="noopener noreferrer">
                    <button className={styles.btnDelivery}>Заказать</button>
                </a>
            </div>
        </div>

    );
};

export default Delivery;