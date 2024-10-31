import React from 'react';
import styles from "../../styles/instagrampage.module.css"
import Item from "./item";
import {t} from "../../utils/utils";

const Insta = ({posts}) => {
    return (
        <div>
            <div className={styles.content}>
                <div className={styles.contentText}>
                    <h2>{t("follow_us")}</h2>
                </div>
                <div className={styles.contentRaw}>
                    {posts?.map((item) => (
                        <Item item={item} key={item.id}/>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Insta;