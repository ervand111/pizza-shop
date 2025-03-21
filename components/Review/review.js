  import React from 'react';
import { Button, Card } from 'antd';
import { PhoneOutlined, MailOutlined, EnvironmentOutlined } from '@ant-design/icons';
import styles from "../../styles/review.module.css";

const Review = () => {
  const handleEmailClick = () => {
    window.location.href = "mailto:alekspizzak@gmail.com?subject=Запрос информации";
  };

  const handlePhoneClick = () => {
    window.open("https://wa.me/79283334105", "_blank");
  };

  const handleMapClick = () => {
    window.open("https://yandex.ru/maps/?text=Лётчика%20Позднякова%2C%202%20помещение%20А", "_blank");
  };

  return (
      <div className={styles.containerParent}>
        <div className={styles.gif}>
          <img src="/photos/gif2.gif" alt=""/>
        </div>
        <div className={styles.gif1}>
          <img src="/photos/gif1.gif" alt=""/>
        </div>
        <div className={styles.container}>
          <div className={styles.intro}>
            <h2>Ваша любимая пицца, доставленная горячей и свежей!</h2>
            <p>
              Насладитесь лучшей пиццей в городе, приготовленной из свежих ингредиентов и идеального сочетания вкусов.
              Заказывайте прямо сейчас и утолите свой аппетит!
            </p>
            <Button type="" className={styles.orderButton} onClick={handleEmailClick}>
              Заказать сейчас
            </Button>
          </div>

          <div className={styles.contactInfo}>
            <Card className={styles.contactCard} onClick={handlePhoneClick}>
              <PhoneOutlined style={{fontSize: '40px', color: 'black'}}/>
              <p>+7 928 333-41-05</p>
            </Card>
            <Card className={styles.contactCard} onClick={handleEmailClick}>
              <MailOutlined style={{fontSize: '40px', color: 'black'}}/>
              <p>alekspizzak@gmail.com</p>
            </Card>
            <Card className={styles.contactCard} onClick={handleMapClick}>
              <EnvironmentOutlined style={{fontSize: '40px', color: 'black'}}/>
              <p>Лётчика Позднякова, 2 помещение А</p>
            </Card>
          </div>
        </div>

      </div>
  );
};

  export default Review;
