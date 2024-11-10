import React, {useEffect, useState} from 'react';
import styles from "../../styles/review.module.css"
import {useDispatch, useSelector} from "react-redux";
import {getSlogan} from "../../store/slogan/actions";
import {useRouter} from "next/router";
import {Button, Skeleton} from "antd";
import Image from "next/image";
import {CompassOutlined, EnvironmentOutlined, HeatMapOutlined, PhoneOutlined, PushpinOutlined} from "@ant-design/icons";

function MapOutlined() {
  return null;
}

const Review = () => {
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch();
  const slogan = useSelector(state => state.slogan.about);
  const [content, setContent] = useState("")
  useEffect(() => {
    dispatch(getSlogan.request())
  }, [dispatch]);

  const router = useRouter();

  const {locale} = router;

  useEffect(() => {
    const content = (locale === 'en') ? slogan?.content_1_en : (locale === 'ru') ? slogan?.content_1_ru : slogan?.content_1
    setContent(content)
    setIsLoading(false)
  }, [locale, slogan])


  return (
    <div>

      {isLoading ?
        <Skeleton style={{width: "90%", margin: 'auto'}}/>
        :
        <div className={styles.content}>
          <div className={styles.animate}>

            <p dangerouslySetInnerHTML={{__html: content}}></p>
            <img src="/photos/moto.png" alt=""/>
          </div>
          <div className={styles.info} style={{color: slogan?.color}}>
            <div style={{width:"100%",height:'100%',position: 'relative', overflow: 'hidden'}}>
              <a
                href="https://yandex.com/maps/35/krasnodar/?utm_medium=mapframe&utm_source=maps"
                style={{color: '#eee', fontSize: '12px', position: 'absolute', top: '0px'}}
              >
                Краснодар
              </a>
              <a
                href="https://yandex.com/maps/35/krasnodar/house/ulitsa_lyotchika_pozdnyakova_2/Z0AYdgJpSkEGQFpvfXx4dnVkZg==/?ll=39.059342%2C45.097972&utm_medium=mapframe&utm_source=maps&z=16.81"
                style={{color: '#eee', fontSize: '12px', position: 'absolute', top: '14px'}}
              >
                Улица Лётчика Позднякова, 2 — Яндекс Карты
              </a>
              <iframe
                src="https://yandex.com/map-widget/v1/?ll=39.059342%2C45.097972&mode=search&ol=geo&ouri=ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgozODEyOTE1OTMwElPQoNC-0YHRgdC40Y8sINCa0YDQsNGB0L3QvtC00LDRgCwg0YPQu9C40YbQsCDQm9GR0YLRh9C40LrQsCDQn9C-0LfQtNC90Y_QutC-0LLQsCwgMiIKDcQ8HEIVU2Q0Qg%2C%2C&z=16.81"
                width="100%"
                height="100%"
                frameBorder="1"
                allowFullScreen
                style={{position: 'relative'}}
              />
            </div>
          </div>


        </div>
      }
      {/*<Image priority width={1000} height={500} src={process.env.IMAGE_URL2 + slogan?.image1} alt='Review'*/}
      {/*       className={styles.image}/>*/}
    </div>
  );
};

export default Review;