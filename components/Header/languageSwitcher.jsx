import React, {useEffect, useState} from 'react';
import styles from "../../styles/header.module.css";
import {useRouter} from "next/router";
import {DownOutlined} from "@ant-design/icons";
import {languages} from "../../utils/utils";
import Link from "next/link";
import {Image} from "antd";

const LanguageSwitcher = ({setIsOpenDrb, isOpenDrbFlag, setIsOpenDrbFlag}) => {
    const router = useRouter();
    const [currentLanguage, setCurrentLanguage] = useState('Հայ')
    const [currentFlag, setCurrentFlag] = useState('/amFlag.png')
    const [langs, setLangs] = useState([]);
    const { pathname, asPath, query } = router
    const [set, setSet] = useState(false)
    const {locale} = router;
    useEffect(() => {
        const language = languages.find(x=>x.value===locale);
        setCurrentFlag(language.flag)
        setCurrentLanguage(language.name)
    }, [router]);

    useEffect(() => {
        setLangs(languages.filter(x => x.name !== currentLanguage))
    }, [currentLanguage])

    const changeLanguage = (newLang, item) => {
        setCurrentLanguage(item.name)
        setCurrentFlag(item.flag)
        const l = JSON.stringify({name: item.name, flag: item.flag})
        localStorage.setItem('lang', l);
        const scrollY = window.scrollY; // Save the current scroll position
        router.push(router.asPath, undefined, { locale: newLang }).then(() => {
            window.scrollTo(0, scrollY);
        });
    };


    function Switch() {
        return (<div className={styles.drb}>
            <ol className={styles.drbContent}>
                {langs.map((item) => (
                    <li key={item.id}>
                        <div key={item.value} className={styles.drbLangRow} onClick={() => changeLanguage(item.value, item)}>
                            <Image preview={false} src={item.flag} alt=""/>
                            <span>{item.name}</span>
                        </div>
                    </li>
                ))}
            </ol>
        </div>)
    }

    function openFlagDrb() {
        setIsOpenDrbFlag(!isOpenDrbFlag);
        setIsOpenDrb(false)
    }

    return (
        <li onClick={openFlagDrb} className={styles.languageForSize}>
            <Image preview={false} src={currentFlag} alt=""/>
            <span>{currentLanguage} {isOpenDrbFlag ? <Switch/> : null}
                                   </span>
            <span className={isOpenDrbFlag ? styles.rotateArrow : null}>
                                       <DownOutlined/>
                                   </span>
        </li>


    );
};

export default LanguageSwitcher;