import React, { useEffect, useRef, useState } from 'react';
import styles from "../../styles/products.module.css"
import Item from "./Item";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Notification from "../notification/notification";
import { CheckOutlined } from "@ant-design/icons";
import Image from "next/image";
import { t } from "../../utils/utils";

const Products = ({ products, title = "" }) => {
  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 2000,
    prevArrow: <Image width={20} height={20} alt='arrow' src={'/left-arrow.png'} />,
    nextArrow: <Image width={20} height={20} alt='arrow' src={'/right-arrow.png'} />,
    responsive: [
      {
        breakpoint: 1720,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1520,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rows: 1,
          prevArrow: null,
          nextArrow: null,
        },
      }
    ],
  };

  const [isShow, setIsShow] = useState(false);
  const emojiContainerRef = useRef(null);

  const stylesNotification = {
    transform: isShow ? "translate(0%)" : "translate(150%)"
  }

  const emojis = [

    '🍕⛽',
    '🍞🍅🧀🍕',
    '🍕🍔🍟',
    '🍕🥤',
    '🍺🍕',
    '🍻🍕',
    '🥤🍕',
    '🍹🍕',
    '🍸🍕',
    '🍷🍕',
    '🍶🍕',
    '🍾🍕',
  ];



  function addNotification() {
    setIsShow(true);
    setTimeout(() => {
      setIsShow(false);
    }, 2000);
  }

  return (
      <div>
        <div className={styles.pageProduct}>
            <div className={styles.offers}>

              <h2>{title}</h2>

            </div>
          <div className={styles.products}>
            <Slider {...settings}>
              {products?.map((item) => (
                  <Item addCart={addNotification} key={item.id} item={item} />
              ))}
            </Slider>
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
}

export default Products;
