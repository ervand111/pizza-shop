import React, { useEffect, useState } from 'react';
import styles from "../../styles/banner.module.css";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Item from "./item";


const Banner = ({slides}) => {
    const [interval, setInterval] = useState(2000);
    useEffect(()=>{
        setInterval(4000)
    },[slides])
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: Number(interval),
    };

    return (
      <div className={styles.parentBanner}>

          <div className={styles.container}>
              <Slider {...settings}>
                  {slides?.map((item) => (
                    <Item key={item.id} item={item}/>
                  ))}
              </Slider>
          </div>
      </div>

    );
};

export default Banner;
