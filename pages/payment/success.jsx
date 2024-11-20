import React from 'react';
import App from "../../components/Layouts/app";
import styles from "../../styles/payment.module.css"
const Success = () => {
    return (
        <div>
            <App>
              <div className={styles.background}>
                <h2>Спасибо</h2>
                <h4>За покупки</h4>

              </div>
            </App>
        </div>
    );
};

export default Success;