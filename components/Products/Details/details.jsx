import React, {useState, useEffect, useContext, useCallback} from 'react';
import styles from "../../../styles/details.module.css";
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
  const {setCount} = useContext(CountContext);
  const {add, remove, isFavorite, isBasket, removeFromFavorite, addFavorite} = useContext(BasketContext);
  const [title, setTitle] = useState("");
  const [metal, setMetal] = useState("");
  const [selectedVariant, setSelectedVariant] = useState(null); // Track the selected variant
  const [price, setPrice] = useState(null); // Track the price of the selected variant
  const dispatch = useDispatch();
  const router = useRouter();
  const {name} = router.query;
  const {locale} = router;
  const stylesNotification = {
    transform: isShow ? "translate(0%)" : "translate(150%)"
  };

  function addNotification() {
    setIsShow(true);
    setTimeout(() => {
      setIsShow(false);
    }, 2000);
  }

  useEffect(() => {
    dispatch(getProduct.request({id: name}));
  }, [dispatch, name]);

  useEffect(() => {
    const t = (locale === 'en') ? product?.title_en : (locale === 'ru') ? product?.title_ru : product?.title;
    const m = (locale === 'en') ? product?.metal_en : (locale === 'ru') ? product?.metal_ru : product?.metal;
    setTitle(t);
    setMetal(m);
    if (product?.variants && product?.variants.length > 0) {
      // Set initial selected variant and price
      setSelectedVariant(product?.variants[0]);
      setPrice(product?.variants[0]?.price);
    }
  }, [locale, product]);

  const handleVariantChange = (event) => {
    const selectedVariant = product?.variants.find((variant) => variant.id === parseInt(event.target.value));
    setSelectedVariant(selectedVariant);
    setPrice(selectedVariant?.price);
  };

  const addToBaskets = useCallback(() => {
    addNotification();
    setCount((prev) => {
      return {
        ...prev,
        basket: ++prev.basket
      };
    });
    add(selectedVariant);
  }, [selectedVariant, add, setCount]);

  const removeToBasket = useCallback(() => {
    setCount((prev) => {
      return {
        ...prev,
        basket: --prev.basket
      };
    });
    remove(selectedVariant);
  }, [selectedVariant, remove, setCount]);

  const addToFavorites = () => {
    addNotification();
    addFavorite(selectedVariant);
    setCount((prev) => {
      return {
        ...prev,
        favorite: ++prev.favorite
      };
    });
  };

  const removeToFavorite = useCallback(() => {
    setCount((prev) => {
      return {
        ...prev,
        favorite: --prev.favorite
      };
    });
    removeFromFavorite(selectedVariant);
  }, [selectedVariant, removeFromFavorite, setCount]);

  return (
    <div className={styles.product}>
      <Skeleton loading={isFetching} active>
        <div className={styles.productRow}>
          <div className={styles.slider}>
            <img src={process.env.IMAGE_URL2 + product?.avatar} alt=""/>
          </div>
          <div className={styles.text}>
            <div className={styles.title}>
              <h1>{title}</h1>
            </div>
            <div className={styles.paragraph}>
              <h2>{t("infoOfProduct")}</h2>
              <h3>{product?.title}</h3>
              <p >{product?.description}</p>
            </div>


            <div className={styles.variants}>
              <div className={styles.variantSelector}>
                <label>Выберите размер:</label>
                <select onChange={handleVariantChange} value={selectedVariant?.id || ""}>
                  {product?.variants?.map((variant) => (
                    <option key={variant.id} value={variant.id}>
                      {variant.name}: {variant.value} - {variant.price} руб.
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.selectedPrice}>
                <span> Цена:{price} руб.</span>
              </div>
            </div>

            <div className={styles.buttons}>
              {!isBasket(selectedVariant) ? (
                <button onClick={addToBaskets}>
                  {t("add")} <ShoppingOutlined/>
                </button>
              ) : (
                <button onClick={removeToBasket}>
                  {t("remove")} <ShoppingOutlined/>
                </button>
              )}
              {!isFavorite(selectedVariant) ? (
                <button onClick={addToFavorites}>
                  {t("add")} <HeartOutlined/>
                </button>
              ) : (
                <button onClick={removeToFavorite}>
                  {t("remove")} <HeartOutlined/>
                </button>
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
