import React, {useEffect, useState} from 'react';
import styles from "../../styles/footer.module.css"
import {
  FacebookOutlined,
  InstagramOutlined,
  MailOutlined,
  PhoneOutlined,
  PushpinOutlined
} from "@ant-design/icons";
import Lastpage from "../Lastpage/lastpage";
import {useRouter} from "next/router";
import Link from "next/link";
import {t} from "../../utils/utils";
import {Image} from "antd";

const Footer = ({contact, categories}) => {
  const [addresses, setAddresses] = useState([])
  const router = useRouter();
  const {locale} = router;
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const t = contact?.addresses || "[]"
    const address = JSON.parse(t);
    const newArr = address.map((item) => {
      return item.address;
    })
    setAddresses(newArr)
  }, [contact])

  return (
    <div>
      <footer className={styles.footer}>
        <div>
          <div className={styles.logo}>
            <Image preview={false} src="./photos/logo.jpg" alt="logo" className="logo" />

          </div>
          <div className={styles.socials}>
            <div className={styles.itemSocial}>
              <a href="https://www.instagram.com/poel.am/" target="_blank" rel="noopener noreferrer">
                <InstagramOutlined/>
              </a>
            </div>
            <div className={styles.itemSocial}>
              <a target="_blank" rel="noopener noreferrer"
                 href="https://www.facebook.com/profile.php?id=100064626914118&mibextid=LQQJ4d">
                <FacebookOutlined/>
              </a>
            </div>
          </div>
        </div>
        <div className={styles.pages}>
          <div>
            <h4>{t("categories")}</h4>
            <ul>
              {categories.map((item) => {
                const {name, id} = item;
                const isActive = router.query.category === name;
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
          <div>
            <h4>{t("pages")}</h4>
            <ul>
              <li><Link href={'/contact'}>{t("contact_us")}</Link></li>
              <li><Link href={'/about'}>{t("about_us")}</Link></li>
              <li><Link href={'/faqs'}>Вопросы</Link></li>
            </ul>
          </div>
          <div>
            <h4>{t("feedback")}</h4>
            <ul>
              <li><span><MailOutlined/></span><a href={"mailto:" + contact.email}>{contact.email}</a></li>
              <li><span><PhoneOutlined/></span>
                <a
                  href={`whatsapp://send?phone=${contact.phone}`}>{contact.phone}</a>
              </li>

                <li>
                  <p>
                    <span><PushpinOutlined/></span>
                    <a target="_blank" rel="noopener noreferrer"
                       href={`https://maps.google.com?q=${encodeURIComponent(addresses[0])}`}>{addresses[0]}</a>
                  </p>
                </li>
            </ul>

          </div>
        </div>
      </footer>
      <Lastpage scroll={scroll}/>
    </div>
  );
};

export default Footer;
