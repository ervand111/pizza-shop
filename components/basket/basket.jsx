import React, {useContext, useEffect, useRef, useState} from "react";
import styles from "../../styles/basket.module.css";
import Item from "./item";
import Button from "../ui/button/button";
import CountContext from "providers/countContext";
import BasketContext from "providers/BasketContext";
import Products from "../Products/products";
import {useDispatch, useSelector} from "react-redux";
import {getProductsAll} from "../../store/products/actions";
import RateContext from "../../providers/rateContext";
import {t} from "../../utils/utils";
import Step1 from "./step_1";
import Step3 from "./step_3";


const Basket = () => {
  const [basketItems, setBasketItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [step, setStep] = useState(0);
  const [isShow, setIsShow] = useState(false);
  const [values, setValues] = useState({});

  const dispatch = useDispatch();
  const {price, currentRate} = useContext(RateContext);
  const {setCount} = useContext(CountContext);
  const {baskets, remove, removeFromFavorite} = useContext(BasketContext);

  const products = useSelector((state) => state.product.products) || [];
  const containerRef = useRef();
  const itemsPerPage = 3;

  useEffect(() => {
    dispatch(getProductsAll.request());
  }, [dispatch]);

  useEffect(() => {
    setBasketItems(baskets);
  }, [baskets]);

  useEffect(() => {
    const totalPrice = basketItems.reduce((acc, item) => {
      const itemPrice = item?.price || 0;
      return acc + itemPrice * (item.quantity || 1);
    }, 0);

    setTotal(totalPrice);
  }, [basketItems]);

  useEffect(() => {
    if (baskets.length > itemsPerPage) {
      setIsShow(true);
    }
  }, [baskets]);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("basket")) || [];
    setBasketItems(storedItems);
  }, []);

  const handleRemove = (itemToRemove) => {
    setCount((prev) => ({
      ...prev,
      basket: Math.max(prev.basket - 1, 0),
    }));
    remove(itemToRemove);
  };

  const updateBasketItemQuantity = (itemId, newQuantity) => {
    const updatedBasket = basketItems.map((item) =>
      item.id === itemId ? {...item, quantity: newQuantity} : item
    );
    localStorage.setItem("basket", JSON.stringify(updatedBasket));
    setBasketItems(updatedBasket);
  };

  // Handle buy button click
  const handleBuy = () => setStep(1);


  const handleSubmit = async () => {
    try {
      const response = await fetch("https://interior.dahk.am/api/payment/signIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({...values, products: basketItems}),
      });

      if (response.ok) {
        const emailPayload = {
          subject: "Подтверждение заказа",
          message: "У вас новый заказ",
        };
        try {
          await fetch("/api/sendEmail", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(emailPayload),
          });
        } catch (error) {
          console.error("Error sending email:", error);
        }

        window.location.href = "/payment/success";
      } else {
        console.error("Payment failed");
      }
    } catch (error) {
      console.error("Error during payment:", error);
    }
  };

  const styleScrolling = {
    overflowY: isShow ? "scroll" : "auto",
    height: isShow ? "450px" : "auto",
  };
  return (
    <div>
      {step === 0 ? (
        <div className={styles.basket} ref={containerRef}>
          {basketItems.length > 0 ? (
            <div>
              <div style={styleScrolling}>
                {basketItems.map((item) => (
                  <Item
                    key={item.id}
                    item={item}
                    onRemove={handleRemove}
                    removeFavorite={removeFromFavorite}
                    updateBasketItemQuantity={updateBasketItemQuantity}
                  />
                ))}
              </div>

              <div className={styles.shoppingLast}>
                <div className={styles.shoppingResult}>
                  <ul>
                    <li>
                      <span>{t("pricesTotal")}:</span>
                      <span>{total} руб</span>
                    </li>
                    <li>
                      <span>{t("general")}:</span>
                      <span>{total} руб</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Buy Button */}
              <div className={styles.shoppingStep}>
                <Button onClick={handleBuy}>{t("buy")}</Button>
              </div>
            </div>
          ) : (
            <h2 className={styles.title2} style={{color: "black"}}>
              {t("empty_basket")}
            </h2>
          )}
        </div>
      ) : step === 1 ? (
        <Step1 next={() => setStep(2)} setValues={setValues} prevStep={() => setStep(0)}/>
      )

       : step === 2 ? (
        <Step3
          inputValues={values}
          setValues={setValues}
          prevStep={() => setStep(2)}
          handleSendEmail={handleSendEmail}
          handleSubmitMail={handleSubmit}
        />
      ) : null}

      <Products products={products}/>
    </div>
  );
};

export default Basket;
