import React from 'react';
import styles from "../../styles/contactus.module.css";

const Info = ({info, children}) => {
    return (
        <div className={styles.info}>
            <div>
                <div className={styles.iconContact}>{children}</div>
            </div>
            <div>
                <span>{info.title}</span>
                {info.key === 'address' ?
                  <p>
                    <a target="_blank" rel="noopener noreferrer"
                       href={`https://maps.google.com?q=${encodeURIComponent(info.info)}`}>{info.info[0]}
                    </a>
                  </p>

                  : null}

              {info.key === 'phone' ?
                info.info.map((item, index) => (
                  <p key={index}>
                  <a href={`whatsapp://send?phone=${item}`}>{item}</a>
                            </p>
                        ))
                    : null}
                {info.key === 'email' ?
                        info.info.map((item, index) => (
                            <p key={index}>
                                <a href={`mailto:${item}`}>{item}</a>
                            </p>
                        ))
                    : null}

            </div>
        </div>
    );
};

export default Info;