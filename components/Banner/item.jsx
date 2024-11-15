import React, {useEffect, useState} from 'react';
import styles from "../../styles/banner.module.css";
import {Skeleton} from "antd";
import Image from "next/image";

const  Item = ({item}) => {
    const [isLoading, setIsLoading] = useState(true)
    return (
        <div className={styles.bannerItem}>
            <div className={styles.products}>
                    <img src={process.env.IMAGE_URL2  + item.image}
                           style={{opacity: isLoading ? 0 : 1, transition: 'opacity 0.5s',width:"100%",height:"100%"}}
                           onLoad={() => setIsLoading(false)}
                           alt="banner image"/>
            </div>
        </div>
    );
};

export default Item;