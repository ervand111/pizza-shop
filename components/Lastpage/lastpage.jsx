import React from 'react';
import styles from "../../styles/lastpage.module.css"
import {ArrowDownOutlined, ArrowUpOutlined} from "@ant-design/icons";

const Lastpage = ({scroll}) => {
    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    return (
        <div>
            <footer className={styles.footer}>
                <div className={styles.text}>
                    <div className={styles.paragraph}>
                        <p>© 2024 <a target="_blank" rel="noopener noreferrer"
                                     href="https://www.linkedin.com/company/94111612/admin/feed/posts/">HiveSpace</a>
                        </p>
                    </div>
                    <div className={styles.text}>
                        {scroll ?
                            <div onClick={handleClick} className={styles.span}>
                                <span><ArrowUpOutlined/></span>
                            </div>
                            : null}
                    </div>
                </div>
            </footer>

        </div>
    );
};

export default Lastpage;