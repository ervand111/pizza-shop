import React, {useContext, useEffect} from 'react';
import App from "../../components/Layouts/app";
import styles from "../../styles/payment.module.css";
import BasketContext from "../../providers/BasketContext";
import CountContext from "../../providers/countContext";

const Success = () => {
  const emojis = ['🎊', '🎉', '🥳', '✨', '🌟', '🍩', '🎂', '🧁', '🍹', '🍫', '🍿', '🎈', '🎀', '🎁'];
  const {emptyBasket} = useContext(BasketContext)
  const {setCount, count} = useContext(CountContext)

  useEffect(() => {
    emptyBasket()
    setCount({favorite:count.favorite, basket:0})
  },[])
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
