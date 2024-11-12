import React, {useCallback, useContext, useEffect, useState} from 'react';
import styles from "../../../styles/details.module.css"
import {CheckOutlined, HeartOutlined, ShoppingOutlined} from "@ant-design/icons";

import Button from "../../ui/button/button";
import Notification from "../../notification/notification";
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {getProduct} from "../../../store/products/actions";
import CountContext from "../../../providers/countContext";
import BasketContext from "../../../providers/BasketContext";
import RateContext from "../../../providers/rateContext";
import {t} from "../../../utils/utils";
import {Image, Skeleton} from "antd";

const Details = () => {
  const product = useSelector((state) => state.product?.selectedProduct?.data);
  const isFetching = useSelector((state) => state.product?.isFetching);
  const [isShow, setIsShow] = useState(false);
  const {setCount} = useContext(CountContext)
  const {add, remove, isFavorite, isBasket, removeFromFavorite, addFavorite} = useContext(BasketContext)
  const [title, setTitle] = useState("");
  const [metal, setMetal] = useState("")
  const dispatch = useDispatch();
  const router = useRouter();
  const {name} = router.query;
  const {locale} = router;
  const stylesNotification = {
    transform: isShow ? "translate(0%)" : "translate(150%)"
  }

  function addNotification() {
    setIsShow(true)
    setTimeout(() => {
      setIsShow(false)
    }, 2000)
  }

  useEffect(() => {
    dispatch(getProduct.request({id: name}));
  }, [dispatch, name])

  useEffect(() => {
    const t = (locale === 'en') ? product?.title_en : (locale === 'ru') ? product?.title_ru : product?.title
    const m = (locale === 'en') ? product?.metal_en : (locale === 'ru') ? product?.metal_ru : product?.metal
    setTitle(t)
    setMetal(m)
  }, [locale, product])

  const addToBaskets = useCallback(() => {
    addNotification()
    setCount((prev) => {
      return {
        ...prev,
        basket: ++prev.basket
      }
    });
    add(product)
  }, [product, add, setCount]);

  const removeToBasket = useCallback(() => {
    setCount((prev) => {
      return {
        ...prev,
        basket: --prev.basket
      }
    });
    remove(product)
  }, [product, remove, setCount])

  const addToFavorites = () => {
    addNotification()
    addFavorite(product)
    setCount((prev) => {
      return {
        ...prev,
        favorite: ++prev.favorite
      }
    })
  };

  const removeToFavorite = useCallback(() => {
    setCount((prev) => {
      return {
        ...prev,
        favorite: --prev.favorite
      }
    });
    removeFromFavorite(product)
  }, [product, removeFromFavorite, setCount])


  return (
    <div className={styles.product}>
      <Skeleton loading={isFetching} active>
        <div className={styles.productRow}>
          <div className={styles.firstImg}>
            <div className={styles.slider}>
              <div>
                <Image src={process.env.IMAGE_URL2 + product?.avatar} alt=""/>
              </div>
            </div>
            <Image src={process.env.IMAGE_URL + product?.blog?.qrs?.image} className={styles.qrs} alt=""/>
          </div>

          <div className={styles.text}>
            <div className={styles.title}>
              <h1>{title}</h1>
            </div>
            <div className={styles.paragraph}>
              <p>{t("infoOfProduct")}</p>
            </div>
            <div>
              <p style={{margin: 10, fontSize: 20}}>{product?.description}</p>
            </div>
            <div className={styles.variants}>
              {product?.variants?.map((variant) => (
                <div key={variant.id} className={styles.variant}>
      <span>
          {variant.name}:{variant.value}

      </span>
                  <span>Цена: {variant.price} руб.</span>
                </div>
              ))}
            </div>


            <div className={styles.buttons}>
              {!isBasket(product) ? (
                <Button onClick={addToBaskets}>
                  {t("add")}
                  <span>
                            <ShoppingOutlined/>
                        </span>
                </Button>
              ) : (
                <Button onClick={removeToBasket}>
                  {t("remove")}
                  <span>
                            <ShoppingOutlined/>
                        </span>
                </Button>
              )}
              {!isFavorite(product) ? (
                <Button onClick={addToFavorites}>
                  {t("add")}
                  <span>
                            <HeartOutlined/>
                        </span>
                </Button>
              ) : (
                <Button onClick={removeToFavorite}>
                  {t("remove")}
                  <span>
                            <HeartOutlined/>
                        </span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </Skeleton>

      <Notification style={stylesNotification}>
                <span className="icon">
                    <CheckOutlined/>
                </span>
        <span>{t("added_basket")}</span>
      </Notification>
    </div>
  );
};

export default Details;
