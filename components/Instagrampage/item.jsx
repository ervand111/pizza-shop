import React from 'react';
import styles from "../../styles/instagrampage.module.css";
import {Image} from "antd";

const Item = ({item}) => {
    return (
        <div className={styles.item}>
            <a href={item.permalink} target="_blank" rel="noreferrer">
                {item.media_type === 'VIDEO' ? (
                    <video autoPlay={true} muted loop playsInline>
                        <source src={item.media_url}/>
                    </video>
                ) : (
                    <Image preview={false} src={item.media_url} alt="Instagram posts" />
                )}
            </a>
        </div>
    );
};

export default Item;