import React, { useState, useEffect, useContext, useCallback } from 'react';
import styles from "../../../styles/details.module.css";
import { CheckOutlined, HeartOutlined, ShoppingOutlined } from "@ant-design/icons";
import Notification from "../../notification/notification";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../../store/products/actions";
import CountContext from "../../../providers/countContext";
import BasketContext from "../../../providers/BasketContext";
import { t } from "../../../utils/utils";
import { Skeleton } from "antd";

const Details = () => {
  const product = useSelector((state) => state.product?.selectedProduct?.data);
  const isFetching = useSelector((state) => state.product?.isFetching);
  const [isShow, setIsShow] = useState(false);
  const { setCount } = useContext(CountContext);
  const { add, remove, isFavorite, isBasket, removeFromFavorite, addFavorite } = useContext(BasketContext);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [price, setPrice] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const { name } = router.query;
  const { locale } = router;

  const stylesNotification = {
    transform: isShow ? "translate(0%)" : "translate(150%)",
  };

  function addNotification() {
    setIsShow(true);
    setTimeout(() => {
      setIsShow(false);
    }, 2000);
  }

  useEffect(() => {
    if (name) {
      dispatch(getProduct.request({ id: name }));
    }
  }, [dispatch, name]);

  useEffect(() => {
    if (product) {
      const defaultVariant = product.variants?.[0] || null;
      setSelectedVariant(defaultVariant);
      setPrice(defaultVariant?.price || 0);
    }
  }, [product]);

  const handleVariantChange = (event) => {
    const selected = product?.variants.find((variant) => variant.id === parseInt(event.target.value));
    setSelectedVariant(selected);
    setPrice(selected?.price || 0);
  };

  const addToBaskets = useCallback(() => {
    addNotification();
    setCount((prev) => ({
      ...prev,
      basket: ++prev.basket,
    }));

    const productWithDetails = {
      ...selectedVariant,
      title: product?.title,
      avatar: product?.avatar,
    };
    add(productWithDetails);
  }, [selectedVariant, product, add, setCount]);

  const removeToBasket = useCallback(() => {
    setCount((prev) => ({
      ...prev,
      basket: --prev.basket,
    }));
    remove(selectedVariant);
  }, [selectedVariant, remove, setCount]);

  const addToFavorites = () => {
    addNotification();

    const productWithDetails = {
      ...selectedVariant,
      title: product?.title,
      avatar: product?.avatar,
      price: selectedVariant?.price,
    };

    addFavorite(productWithDetails);
    setCount((prev) => ({
      ...prev,
      favorite: ++prev.favorite,
    }));
  };

  const removeToFavorite = useCallback(() => {
    setCount((prev) => ({
      ...prev,
      favorite: --prev.favorite,
    }));
    removeFromFavorite(selectedVariant);
  }, [selectedVariant, removeFromFavorite, setCount]);

  return (
    <div className={styles.product}>
      <Skeleton loading={isFetching} active>
        <div className={styles.productRow}>
          <div className={styles.slider}>
            <img
              src={process.env.IMAGE_URL2 + product?.avatar}
              alt={product?.title || "Product Image"}
            />
          </div>
          <div className={styles.text}>
            <div className={styles.title}>
              <h1>{product?.title}</h1>
            </div>
            <div className={styles.paragraph}>
              <h2>{t("infoOfProduct")}</h2>
              <p>{product?.description}</p>
            </div>
            <div className={styles.variants}>
              <div className={styles.variantSelector}>
                <label>{t("choose_size")}</label>
                <select onChange={handleVariantChange} value={selectedVariant?.id || ""}>
                  {product?.variants?.map((variant) => (
                    <option key={variant.id} value={variant.id}>
                      {variant.name}: {variant.value} - {variant.price} руб.
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.selectedPrice}>
                <span>{t("price")}: {price} руб.</span>
              </div>
            </div>
            <div className={styles.buttons}>
              {!isBasket(selectedVariant) ? (
                <button onClick={addToBaskets}>
                  {t("add")} <ShoppingOutlined />
                </button>
              ) : (
                <button onClick={removeToBasket}>
                  {t("remove")} <ShoppingOutlined />
                </button>
              )}
              {!isFavorite(selectedVariant) ? (
                <button onClick={addToFavorites}>
                  {t("add")} <HeartOutlined />
                </button>
              ) : (
                <button onClick={removeToFavorite}>
                  {t("remove")} <HeartOutlined />
                </button>
              )}
            </div>
          </div>
        </div>
      </Skeleton>
      <Notification style={stylesNotification}>
        <span className="icon">
          <CheckOutlined />
        </span>
        <span>{t("added_basket")}</span>
      </Notification>
    </div>
  );
};

export default Details;
