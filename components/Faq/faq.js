import React, { useState } from 'react';
import { Collapse, Typography } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import styles from "../../styles/faq.module.css";

const { Panel } = Collapse;
const { Title } = Typography;

const Faq = () => {
    const [items, setItems] = useState([
        {
            id: 1,
            question: "Как сделать заказ в Aleks Pizza?",
            answer: "Вы можете сделать заказ через наш сайт или позвонить нам напрямую. Мы находимся в Краснодаре и рады предложить вам лучшие пиццы с доставкой на дом.",
        },
        {
            id: 2,
            question: "Как я могу оплатить заказ?",
            answer: "Мы принимаем оплату картами, наличными при доставке, а также онлайн-оплату через наш сайт.",
        },
        {
            id: 3,
            question: "Когда я получу свой заказ?",
            answer: "Доставка по Краснодару занимает около 30-60 минут. Время доставки может варьироваться в зависимости от расстояния и загруженности.",
        },
        {
            id: 4,
            question: "Какие есть варианты доставки?",
            answer: "Мы предлагаем доставку на дом и возможность самовывоза из нашего ресторана в Краснодаре.",
        },
        {
            id: 5,
            question: "Могу ли я отменить или изменить заказ?",
            answer: "Да, вы можете отменить или изменить заказ, позвонив нам, если заказ ещё не отправлен.",
        },
        {
            id: 6,
            question: "Какие пиццы вы предлагаете?",
            answer: "Мы предлагаем разнообразные пиццы, такие как классическая Маргарита, Пепперони, Гавайская и другие. У нас есть что-то для каждого!",
        },
        {
            id: 7,
            question: "Могу ли я вернуть или обменять заказ?",
            answer: "Если возникли проблемы с качеством заказа, пожалуйста, свяжитесь с нами, и мы постараемся вам помочь.",
        },
    ]);

    return (
      <div className={styles.facParent}>
          <div className={styles.faq}>
              <h2>Часто задаваемые вопросы</h2>
              <Collapse
                accordion
                bordered={false}
                expandIcon={({isActive}) => <DownOutlined rotate={isActive ? 180 : 0}/>}
                style={{background: '#f9f9f9', borderRadius: '8px'}}
              >
                  {items.map((item) => (
                    <Panel header={item.question} key={item.id}>
                        <p>{item.answer}</p>
                    </Panel>
                  ))}
              </Collapse>
          </div>
      </div>

    );
};

export default Faq;
