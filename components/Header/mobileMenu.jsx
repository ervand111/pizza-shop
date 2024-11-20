import React, {useContext, useEffect} from 'react';
import styles from "../../styles/header.module.css";
import Link from "next/link";
import {CloseOutlined} from "@ant-design/icons";
import Select from "../ui/select/select";
import Input from "../ui/input/input";
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {getCategories} from "../../store/category/actions";
import {Image} from "antd";
import RateContext from "../../providers/rateContext";
import {languages} from "../../utils/utils";

const MobileMenu = ({handlerClose,handlerClosing}) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const {change,currentRate,rates} = useContext(RateContext)

    const {locale} = router;

    const categories = useSelector((state) => state.category?.categories) || [];
    useEffect(() => {
        dispatch(getCategories.request());
    }, [dispatch])

    function changeRate(e) {
        change({current: e.target.value})
    }
    function changeLanguage(e){
        router.push(router.asPath, undefined, { locale: e.target.value });
    }
    useEffect(() => {
        router.events.on('routeChangeComplete', handlerClosing);

        return () => {
            router.events.off('routeChangeComplete', handlerClosing);
        };
    }, []);
    return (
        <div className={styles.mobileMenuLists}>
            <div className={styles.headerMobileMenu}>
                   <Link href='/home'><Image preview={false} src="/photos/logo.jpg" alt="" width={100} height={100} style={{borderRadius:"50%"}}/></Link>
                <span className={styles.closeIcon} onClick={handlerClose}>
                    <CloseOutlined/>
                </span>
            </div>
            <div className={styles.lists}>
                <ul>
                    {categories.map((item) => {
                        return (
                            <li key={item.id}>
                                <Link href={`/products/${item.id}`}>
                                    {item.name}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default MobileMenu;