import React, {useEffect, useState, useContext} from 'react';
import styles from "../../styles/header.module.css"
import {
    CloseOutlined,
    HeartOutlined, MenuOutlined,
    SearchOutlined, ShoppingOutlined
} from '@ant-design/icons';
import Link from "next/link";
import SearchBox from "./searchBox";
import LanguageSwitcher from "./languageSwitcher";
import MobileMenu from "./mobileMenu";
import {useRouter} from "next/router";
import CountContext from 'providers/countContext';
import CurrentSwitcher from "./currentSwitcher";
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
                <link rel="icon" type="image/png" href="/logo.png"/>
                <div className={styles.contentHeader}>
                    <div>
                        <ul className={styles.headerMenu}>
                            {categories.map((item) => {
                                const {name, name_en, name_ru, id} = item;
                                // eslint-disable-next-line react-hooks/rules-of-hooks
                                const router = useRouter();
                                const isActive = Number(router.query.category) === id;
                                const title = (locale === 'en') ? name_en : (locale === 'ru') ? name_ru : name
                                return (
                                    <li key={id} className={isActive ? styles.activeCategory : null}>
                                        <Link href={`/products/${id}`}>
                                            {title}
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
                        <div className={styles.logo}>
                            <Link href={'/home'}>
                                <Image preview={false} src="/logo.png" alt=""/>
                            </Link>
                        </div>
                    </div>
                    <div>
                        <div className={styles.icons}>
                            <ul>
                                <li>
                                    <div className={styles.searchBox}>
                                        <span onClick={openSearchBox}>
                                            {isSearchBox ? <CloseOutlined onClick={openSearchBox}/> : <SearchOutlined/>}

                                        </span>
                                        {isSearchBox ?
                                            <SearchBox onClose={openSearchBox}/>
                                            : null
                                        }
                                    </div>
                                </li>
                                <li>
                                    <span className={styles.countBasket}>{count.basket}</span>
                                    <Link href={'/basket'}> <ShoppingOutlined/></Link>
                                </li>
                                <li>
                                    <span className={styles.countBasket}>{count.favorite}</span>
                                    <Link href={'/favorite'}><HeartOutlined/></Link>
                                </li>

                                <CurrentSwitcher openDrb={isOpenDrb} isOpenDrbFlag={isOpenDrbFlag}
                                                 setIsOpenDrb={setIsOpenDrb} setIsOpenDrbFlag={setIsOpenDrbFlag}/>
                                <LanguageSwitcher openDrb={isOpenDrb} isOpenDrbFlag={isOpenDrbFlag}
                                                  setIsOpenDrb={setIsOpenDrb} setIsOpenDrbFlag={setIsOpenDrbFlag}/>

                            </ul>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default Header;