import React from 'react';
import styles from "../../styles/lastpage.module.css";
import { ArrowDownOutlined, ArrowUpOutlined, WhatsAppOutlined } from "@ant-design/icons";

const Lastpage = ({ scroll }) => {
    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleWhatsAppClick = () => {
        window.open('https://wa.me/79283334105', '_blank');
    };

    return (
      <div>
          <footer className={styles.footer}>
              <div className={styles.text}>
                  <div className={styles.paragraph}>
                      <p>© 2024 {'Алекс пицца. Все права защищены.'}</p>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.linkedin.com/company/geeklab1/mycompany/"
                      >
                          GeekLab
                      </a>
                  </div>
                  <div className={styles.text}>

                      {scroll ? (
                        <div onClick={handleClick} className={styles.span}>
                            <span><ArrowUpOutlined/></span>
                        </div>
                      ) : null}

                  </div>
              </div>
          </footer>
      </div>
    );
};

export default Lastpage;
