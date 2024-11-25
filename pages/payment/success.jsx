import React from 'react';
import App from "../../components/Layouts/app";
import styles from "../../styles/payment.module.css";

const Success = () => {
  const emojis = ['🎊', '🎉', '🥳', '✨', '🌟', '🍩', '🎂', '🧁', '🍹', '🍫', '🍿', '🎈', '🎀', '🎁'];

  return (
    <App>
      <div className={styles.successWrapper}>
        <div className={styles.iconWrapper}>
          🍕
          <div className={styles.pizzaIcon}>🎉</div>
        </div>
        <h2 className={styles.thankYou}>Спасибо 🎈</h2>
        <h4 className={styles.message}>
          Ваш заказ принят!🍕
        </h4>
        {/* Dynamic Confetti */}
        <div className={styles.confetti}>
          {emojis.map((emoji, index) => (
            <span
              key={index}
              className={styles.emoji}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 1}s`,
              }}
            >
              {emoji}
            </span>
          ))}
        </div>
      </div>
    </App>
  );
};

export default Success;
