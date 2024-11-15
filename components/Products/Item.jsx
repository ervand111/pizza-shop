import React, {useCallback, useContext, useEffect, useState} from 'react';
import styles from "../../styles/products.module.css";
import {HeartFilled, HeartOutlined, ShoppingFilled, ShoppingOutlined} from "@ant-design/icons";
import Link from "next/link";
import CountContext from 'providers/countContext';
import BasketContext from 'providers/BasketContext';
import {useRouter} from "next/router";
import RateContext from "../../providers/rateContext";
import {truncateContent} from "../../utils/utils";
import {Skeleton} from 'antd';
import Image from "next/image";


const Item = ({item, addCart}) => {
    console.log(item)
    const {setCount} = useContext(CountContext)
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

    return (
        <div className={styles.item}>
            <>
                <Link href={{
                    pathname: '/product/[name]/',
                    query: {name: item.id},
                }}>

                    <Image
                        src={process.env.IMAGE_URL2 + item.avatar}
                        style={{opacity: isLoading ? 0 : 1, transition: 'opacity 0.5s'}}
                        onLoad={() => setIsLoader(false)}
                        width={400}
                        height={400}
                        alt={item.title}
                        priority
                    />
                </Link>
                {isLoading ?
                    <Skeleton/>
                    :
                    <div className={styles.info}>
                        <div className={styles.productItem}>
                            <div>
                                <div className={styles.span}>
                                    <span>{truncateContent(item.title, 27)}</span>
                                </div>
                                <div>
                                    <p>{price(item.price)}</p>
                                </div>
                            </div>
                            <div className={styles.icon}>
                                <ul>
                                    <li>
                                        {!isBasket(item) ? (
                                            <ShoppingOutlined onClick={addToBaskets}/>
                                        ) : (
                                            <ShoppingFilled onClick={removeToBasket}/>
                                        )}
                                    </li>
                                    <li>
                                        {!isFavorite(item) ? (
                                            <HeartOutlined onClick={addToFavorite}/>
                                        ) : (
                                            <HeartFilled onClick={removeToFavorite}/>
                                        )}
                                    </li>
                                </ul>
                            </div>
                            <div className={styles.textItem}>
                                <p>Идеальный а Добрый 0,5 (л) ||
                                    палочке</p>
                            </div>

                        </div>
                    </div>
                }

            </>
        </div>
    );
};

export default Item;
