import React, {useEffect, useState, useContext} from 'react';
import styles from "../../styles/header.module.css"
import {
    CloseOutlined,
    HeartOutlined, MenuOutlined,
    SearchOutlined, ShoppingOutlined
} from '@ant-design/icons';
import Link from "next/link";
import SearchBox from "./searchBox";
import MobileMenu from "./mobileMenu";
import {useRouter} from "next/router";
import CountContext from 'providers/countContext';
import {Image} from "antd";

const Header = ({categories}) => {
    const [isSearchBox, setIsSearchBox] = useState(false)
    const [isMenu, setIsMenu] = useState(false)
    const {count, setCount} = useContext(CountContext)
    const router = useRouter();
    const {locale} = router;
    const [isOpenDrb, setIsOpenDrb] = useState(false)
    const [isOpenDrbFlag, setIsOpenDrbFlag] = useState(false)
    useEffect(() => {
        const handleRouteChange = () => {
            setIsSearchBox(false);
        };

        router.events.on('routeChangeComplete', handleRouteChange);

        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, [router.events]);

    useEffect(() => {
        const basket = +localStorage.getItem('basketCount');
        const favorite = +localStorage.getItem('favoriteCount');
        setCount(() => {
            return {
                favorite,
                basket
            };
        })
    }, [setCount])

    function openSearchBox() {
        setIsSearchBox(!isSearchBox)
    }

    function handlerMenu() {
        setIsMenu(!isMenu)
    }
    function handleClose(){
        setIsMenu(false)
    }

    return (
        <div>
            <header className={styles.header}>
                <link rel="icon" type="image/png" href="/photos/logo.jpg"/>
                <div className={styles.contentHeader}>
                    <div>
                        <ul className={styles.headerMenu}>
                            {categories.map((item) => {
                                const {name, id} = item;
                                // eslint-disable-next-line react-hooks/rules-of-hooks
                                const router = useRouter();
                                const isActive = Number(router.query.category) === id;
                                return (
                                  <li key={id} className={isActive ? styles.activeCategory : null}>
                                      <Link href={`/products/${id}`}>
                                          {name}
                                      </Link>
                                  </li>
                                );
                            })}
                        </ul>
                    </div>

                    <div className={styles.mobileMenu}>
                       <span className={styles.btnMenu} onClick={handlerMenu}>
                           <MenuOutlined/>
                       </span>
                        <div className={`${styles.menuStyle} ${isMenu ? styles.active : null}`}>
                            <MobileMenu handlerClosing={handleClose} handlerClose={handlerMenu}/>
                        </div>
                    </div>
                    <div>
                        <div className={styles.logoText}>
                            <Link href={'/home'}>
                                <p>Алекс пицца</p>
                            </Link>
                        </div>
                        <div className={styles.logo}>
                            <Link href={'/home'}>
                                <Image preview={false} src="/photos/logo.jpg" alt=""/>
                            </Link>
                        </div>
                    </div>

                    <div>

                        <div className={styles.icons}>
                            <ul>
                                <li>
                                    {/*<div className={styles.searchBox}>*/}
                                    {/*    <span onClick={openSearchBox}>*/}
                                    {/*        {isSearchBox ? <CloseOutlined onClick={openSearchBox}/> : <SearchOutlined/>}*/}

                                    {/*    </span>*/}
                                    {/*    {isSearchBox ?*/}
                                    {/*      <SearchBox onClose={openSearchBox}/>*/}
                                    {/*      : null*/}
                                    {/*    }*/}
                                    {/*</div>*/}
                                </li>
                                <li>
                                    <span className={styles.countBasket}>{count.basket}</span>
                                    <Link href={'/basket'}> <ShoppingOutlined/></Link>
                                </li>
                                <li>
                                    <span className={styles.countBasket}>{count.favorite}</span>
                                    <Link href={'/favorite'}><HeartOutlined/></Link>
                                </li>

                            </ul>
                        </div>

                        <div>
                            <a href="https://wa.me/79283334105" target="_blank" rel="noopener noreferrer">
                                <button className={styles.btnDelivery}>Заказы</button>
                            </a>
                        </div>

                    </div>
                </div>
            </header>
        </div>
    );
};

export default Header;