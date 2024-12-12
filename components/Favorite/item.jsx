import React, { useContext, useCallback, useState, useEffect } from 'react';
import styles from "../../styles/favorite.module.css";
import {
    HeartFilled,
    CheckOutlined,
    ShoppingOutlined,
    ShoppingFilled,
} from "@ant-design/icons";
import BasketContext from 'providers/BasketContext';
import CountContext from 'providers/countContext';
import Notification from 'components/notification/notification';
import RateContext from "../../providers/rateContext";
import { Image } from "antd";
import { t, truncateContent } from "../../utils/utils";
import { useRouter } from "next/router";

const Item = ({ item, onRemove }) => {
    const { add, remove, isBasket } = useContext(BasketContext);
    const { setCount } = useContext(CountContext);
    const [isShow, setIsShow] = useState(false);
    const { price, currentRate } = useContext(RateContext);
    const [title, setTitle] = useState("");
    const [metal, setMetal] = useState("");
    const stylesNotification = {
        transform: isShow ? "translate(0%)" : "translate(150%)",
    };
    const router = useRouter();
    const { locale } = router;

    const addToBaskets = useCallback(() => {
        setCount((prev) => ({
            ...prev,
            basket: prev.basket + 1,
        }));

        const basketItem = {
            ...item,
            price: item?.variants?.length > 0 ? item.variants[0].price : 0,
            variants: item.variants || [],
        };

        add(basketItem);
        setIsShow(true);

        setTimeout(() => {
            setIsShow(false);
        }, 2000);
    }, [item, setCount, add]);

    const removeToBasket = useCallback(() => {
        setCount((prev) => ({
            ...prev,
            basket: prev.basket - 1,
        }));
        remove(item);
    }, [item, setCount, remove]);

    useEffect(() => {
        const t = locale === 'en' ? item?.title_en : locale === 'ru' ? item?.title_ru : item?.title;
        const m = locale === 'en' ? item?.metal_en : locale === 'ru' ? item?.metal_ru : item?.metal;
        setTitle(t);
        setMetal(m);
    }, [locale, item]);

    return (
      <div className={styles.favoriteDiv}>
          <div>
              <div className={styles.favoritePicture}>
                  <Image preview={false} src={`${process.env.IMAGE_URL2}${item.avatar}`} alt="" />
              </div>
              <div className={styles.favoriteText}>
                  <div className={styles.favoriteSpan}>
                      <span>{truncateContent(item.title, 27)}</span>
                  </div>
              </div>
          </div>
          <div className={styles.favoriteItem}>
              <div className={styles.favoriteRow}>
                  <div className={styles.price}>
                      <p>{item?.price} руб</p>
                  </div>
                  <div className={styles.rowR}>
                      <div className={styles.mobileIcons}>
                          <div className={styles.icons}>
                              <ul>
                                  <li><HeartFilled onClick={() => onRemove(item)} /></li>
                                  <li><ShoppingOutlined /></li>
                              </ul>
                          </div>
                      </div>
                  </div>
              </div>
              <div className={styles.icons}>
                  <ul>
                      <li><HeartFilled onClick={() => onRemove(item)} /></li>
                      <li>
                          {!isBasket(item) ? (
                            <ShoppingOutlined onClick={addToBaskets} />
                          ) : (
                            <ShoppingFilled onClick={removeToBasket} />
                          )}
                      </li>
                  </ul>
              </div>
              <div className={styles.mobileTitle}>
                  <div className={styles.favoriteText}>
                      <div className={styles.favoriteSpan}>
                          <span>{item.label}</span>
                      </div>
                  </div>
              </div>
          </div>
          <Notification style={stylesNotification}>
                <span className="icon">
                    <CheckOutlined />
                </span>
              <span>{t("added_basket")}</span>
          </Notification>
      </div>
    );
};

export default Item;
