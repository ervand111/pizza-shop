import React, {useCallback, useContext, useEffect, useState} from 'react';
import styles from "../../styles/products.module.css";
import {HeartFilled, HeartOutlined, ShoppingFilled, ShoppingOutlined} from "@ant-design/icons";
import Link from "next/link";
import CountContext from 'providers/countContext';
import BasketContext from 'providers/BasketContext';
import RateContext from "../../providers/rateContext";
import Image from "next/image";
import {t} from "../../utils/utils";
import {useSelector} from "react-redux";
import {Skeleton} from "antd";


const Item = ({item, addCart}) => {
  const {setCount} = useContext(CountContext)
  const isFetching = useSelector((state) => state.product?.isFetching);
  const {add, remove, isFavorite, isBasket, removeFromFavorite, addFavorite} = useContext(BasketContext)
  const {price, currentRate} = useContext(RateContext)
  const [isLoading, setIsLoader] = useState(true)
  const removeToBasket = useCallback(() => {
    setCount((prev) => {
      return {
        ...prev,
        basket: --prev.basket
      }
    });
    remove(item)
  }, [item, remove, setCount])

  const removeToFavorite = useCallback(() => {
    setCount((prev) => {
      return {
        ...prev,
        favorite: --prev.favorite
      }
    });
    removeFromFavorite(item)
  }, [item, removeFromFavorite, setCount])

  const addToBaskets = useCallback(() => {
    setCount((prev) => {
      return {
        ...prev,
        basket: ++prev.basket
      }
    });
    item.price = item.variants[0].price;
    add(item)
    addCart()
  }, [item, add, addCart, setCount]);

  const addToFavorite = useCallback(() => {
    setCount((prev) => {
      return {
        ...prev,
        favorite: ++prev.favorite
      }
    });
    addFavorite(item)
    addCart()
  }, [item, addCart, addFavorite, setCount]);

  useEffect(() => {
  }, [item])
  return (
    <div className={styles.item}>
      <Skeleton loading={isFetching} active>
        <div className={styles.productItem}>
          <div className={styles.productItemImg}>
            <Link href={{
              pathname: '/product/[name]/',
              query: {name: item.id},
            }}>

              <Image
                src={process.env.IMAGE_URL2 + item.avatar}
                style={{opacity: isLoading ? 0 : 1, transition: 'opacity 0.5s'}}
                onLoad={() => setIsLoader(false)}
                width={300}
                height={100}
                alt={item.title}
                priority
              />
            </Link>
            <div className={styles.wishlist}>
              {!isFavorite(item) ? (
                <HeartOutlined onClick={addToFavorite}/>
              ) : (
                <HeartFilled onClick={removeToFavorite}/>
              )}
            </div>
          </div>
          <div className={styles.productItemText}>
            <div className={styles.text}>
              <h3>{item.title}</h3>
              <p>{item?.variants?.length > 0 ? item.variants[0].price : 0} руб</p>
            </div>
            <div className={styles.addCard}>

              {!isBasket(item) ? (
                <button onClick={addToBaskets}> {t("add")} <ShoppingOutlined/> </button>

              ) : (
                <button onClick={removeToBasket}> {t('remove')} <ShoppingFilled/></button>
              )}

            </div>
          </div>
          <div>
          </div>
        </div>

      </Skeleton>

    </div>
  );
};

export default Item;
