import React, {useContext, useEffect, useState} from 'react';
import styles from "../../styles/basket.module.css";
import {CloseOutlined, HeartFilled, HeartOutlined} from "@ant-design/icons";
import BasketContext from 'providers/BasketContext';
import CountContext from 'providers/countContext';
import RateContext from "../../providers/rateContext";
import {Image} from "antd";
import {t, truncateContent} from "../../utils/utils";
import {useRouter} from "next/router";

const Item = ({item, onRemove, updateBasketItemQuantity, removeFavorite}) => {
  const [quantity, setQuantity] = useState(item.quantity); // Local state for item quantity
  const {addFavorite, isFavorite} = useContext(BasketContext); // Context for favorites
  const {count, setCount} = useContext(CountContext); // Context for count updates
  const [title, setTitle] = useState(""); // Localized title
  const [metal, setMetal] = useState(""); // Localized metal description
  const router = useRouter();
  const {locale} = router;

  // Update the item quantity whenever it changes
  useEffect(() => {
    updateBasketItemQuantity(item.id, quantity);
  }, [item.id, quantity]);

  // Set localized values for the title and metal
  useEffect(() => {
    const localizedTitle = locale === 'en' ? item?.title_en : locale === 'ru' ? item?.title_ru : item?.title;
    const localizedMetal = locale === 'en' ? item?.metal_en : locale === 'ru' ? item?.metal_ru : item?.metal;
    setTitle(localizedTitle);
    setMetal(localizedMetal);
  }, [locale, item]);

  // Increment item quantity
  const increment = () => setQuantity(prev => prev + 1);

  // Decrement item quantity (minimum is 1)
  const decrement = () => setQuantity(prev => Math.max(prev - 1, 1));

  // Add item to favorites
  const addToFavorites = () => {
    setCount(prev => ({...prev, favorite: prev.favorite + 1}));
    addFavorite(item);
  };

  // Remove item from favorites
  const removeFromFavorites = () => {
    setCount(prev => ({...prev, favorite: prev.favorite - 1}));
    removeFavorite(item);
  };

  return (
    <div className={styles.basketDiv}>
      {/* Product Image */}
      <div>
        <div className={styles.basketPicture}>
          <Image preview={false} src={`${process.env.IMAGE_URL2}${item.avatar}`} alt={title}/>
        </div>
        <div className={styles.basketText}>
          <div className={styles.basketSpan}>
            <span>{truncateContent(item.title, 27)}</span>
          </div>
        </div>
      </div>

      {/* Basket Item Details */}
      <div className={styles.basketItem}>
        <div className={styles.buttons}>
          <button onClick={decrement}>-</button>
          <span>{quantity}</span>
          <button onClick={increment}>+</button>
        </div>

        {/* Price Display */}
        <div className={styles.price}>
    <span>
        {item?.variants?.length > 0 ? `${item.variants[0].price} руб` : null}
    </span>
        </div>


        {/* Action Icons */}
        <div className={styles.icons}>
          <ul>
            <li>
              {isFavorite(item) ? (
                <HeartFilled onClick={removeFromFavorites}/>
              ) : (
                <HeartOutlined onClick={addToFavorites}/>
              )}
            </li>
            <li>
              <CloseOutlined onClick={() => onRemove(item)}/>
            </li>
          </ul>
        </div>

        {/* Mobile View Title */}
        <div className={styles.mobileTitle}>
          <div className={styles.basketText}>
            <div className={styles.basketSpan}>
              <span>{item.label}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
