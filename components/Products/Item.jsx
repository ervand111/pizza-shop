import React, { useCallback, useContext, useEffect, useState } from 'react';
import styles from "../../styles/products.module.css";
import { HeartFilled, HeartOutlined, ShoppingFilled, ShoppingOutlined } from "@ant-design/icons";
import Link from "next/link";
import CountContext from 'providers/countContext';
import BasketContext from 'providers/BasketContext';
import RateContext from "../../providers/rateContext";
import Image from "next/image";
import { t } from "../../utils/utils";
import { useSelector } from "react-redux";
import { Skeleton } from "antd";
import {useRouter} from "next/router";

const Item = ({ item, addCart }) => {
  const { setCount } = useContext(CountContext);
  const isFetching = useSelector((state) => state.product?.isFetching);
  const { add, remove, isFavorite, isBasket, removeFromFavorite, addFavorite } = useContext(BasketContext);
  const { price, currentRate } = useContext(RateContext);
  const [isLoading, setIsLoader] = useState(true);
  const [animate, setAnimate] = useState(false);
  const [removeAnimate, setRemoveAnimate] = useState(false);
  const [isAddedToBasket, setIsAddedToBasket] = useState(false); // State to control icon visibility




  const removeToBasket = useCallback(() => {
    setCount((prev) => {
      return {
        ...prev,
        basket: --prev.basket
      };
    });
    remove(item);
  }, [item, remove, setCount]);

  const removeToFavorite = useCallback(() => {
    setCount((prev) => {
      return {
        ...prev,
        favorite: --prev.favorite
      };
    });
    removeFromFavorite(item);
  }, [item, removeFromFavorite, setCount]);

  const addToBaskets = useCallback(() => {
    setCount((prev) => {
      return {
        ...prev,
        basket: ++prev.basket
      };
    });
    item.price = item?.variants[0]?.price;
    add(item);
    addCart();
    setIsAddedToBasket(true); // Set icon visibility to 'none' when added to basket
  }, [item, add, addCart, setCount]);

  const addToFavorite = useCallback(() => {
    setCount((prev) => {
      return {
        ...prev,
        favorite: ++prev.favorite
      };
    });
    addFavorite(item);
    addCart();
  }, [item, addCart, addFavorite, setCount]);

  const handleAddToBasket = () => {
    setAnimate(true);
    setTimeout(() => {
      setAnimate(false);
      addToBaskets();
    }, 1000);
  };

  const removeIsBasket = () => {
    setRemoveAnimate(true);
    setTimeout(() => {
      setRemoveAnimate(false);
      removeToBasket();
      setIsAddedToBasket(false); // Set icon visibility back to 'block' when removed from basket
    }, 1000);
  };

  useEffect(() => {
  }, [item]);

  return (
    <div className={styles.item}>
      <div className={styles.wishlist}>
        {!isFavorite(item) ? (
          <HeartOutlined onClick={addToFavorite}/>
        ) : (
          <HeartFilled onClick={removeToFavorite}/>
        )}
      </div>
      <Skeleton loading={isFetching} active>

        <div className={styles.productItem}>
          <div className={styles.productItemImg}>
            <Link
                href={{
                  pathname: '/product/[name]/',
                  query: {name: item.id}
                }}
                as={`/product/${item.id}`} // Օգտագործեք `as` ստուգելու համար
            >
              <Image
                  src={process.env.IMAGE_URL2 + item.avatar}
                  style={{opacity: isLoading ? 0 : 1, transition: 'opacity 0.5s'}}
                  onLoad={() => setIsLoader(false)}
                  width={240}
                  height={240}
                  alt={item.title}
                  priority
              />
            </Link>
          </div>
          <div className={styles.productItemText}>
            <div className={styles.text}>
              <h3>{item.title}</h3>
              <p>{item?.variants?.length > 0 ? item.variants[0].price : 0} руб</p>
            </div>
            <div className={styles.addCard}>
              <div
                  className={`${styles.basketIcon} ${animate ? styles.animate : ''} ${removeAnimate ? styles.animates : ''}`}
                  style={{opacity: isAddedToBasket ? 0 : 1}}
              >
                <ShoppingFilled/>
              </div>
              {!isBasket(item) ? (
                  <button onClick={handleAddToBasket}>
                    {t("add")} <ShoppingOutlined/>
                  </button>
              ) : (
                  <button onClick={removeIsBasket}>
                    {t("remove")} <ShoppingFilled/>
                  </button>
              )}
            </div>
          </div>
        </div>

      </Skeleton>
    </div>
  );
};

export default Item;
