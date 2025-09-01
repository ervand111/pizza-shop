import React, { useContext, useEffect, useState } from 'react';
import styles from '../../styles/category.module.css';
import { CheckOutlined, FilterOutlined } from '@ant-design/icons';
import Notification from '../../components/notification/notification';
import { t } from '../../utils/utils';
import Input from '../../components/ui/input/input';
import { useDispatch, useSelector } from 'react-redux';
import { getSubCategories } from 'store/category/actions';
import { getProductsCategories } from 'store/products/actions';
import { Button, Form, Skeleton } from 'antd';
import Item from '../../components/Products/Item';
import App from '../../components/Layouts/app';
import { useRouter } from 'next/router';
import RateContext from '../../providers/rateContext';
import { CloseIcon } from 'next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon';

const Index = () => {
  const categories = useSelector((state) => state.category?.subCategories?.data) || [];
  const products = useSelector((state) => state.product.products) || [];
  const isFetching = useSelector((state) => state.product.isFetching);
  const dispatch = useDispatch();
  const [isNav, setIsNav] = useState(typeof window !== 'undefined' && window.innerWidth >= 900);
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter();
  const { category } = router.query;
  const { currentRate } = useContext(RateContext);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [displayLimit, setDisplayLimit] = useState(6); // default products count

  useEffect(() => {
    form.resetFields();
    dispatch(getSubCategories.request({ id: category }));
    dispatch(getProductsCategories.request({ id: category }));
  }, [category, dispatch]);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  useEffect(() => {
    const updateNavVisibility = () => setIsNav(window.innerWidth >= 900);
    window.addEventListener('resize', updateNavVisibility);
    return () => window.removeEventListener('resize', updateNavVisibility);
  }, []);

  const showNotification = () => {
    setIsNotificationVisible(true);
    setTimeout(() => setIsNotificationVisible(false), 2000);
  };

  const loadMoreProducts = () => {
    if (displayLimit < filteredProducts.length) {
      setDisplayLimit((prev) => prev + 2);
    }
  };

  const handleScroll = (e) => {
    if (e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight) {
      loadMoreProducts();
    }
  };

  const handleFilter = (values) => {
    const { title } = values;

    const filtered = products.filter((product) =>
      !title || product.title.toLowerCase().includes(title.toLowerCase())
    );

    setFilteredProducts(filtered);
  };

  const clearFilters = () => {
    router.push(`/products/${category}`);
    dispatch(getProductsCategories.request({ id: category }));
    form.resetFields();
  };

  return (
    <Skeleton loading={isFetching} active>

      <div className={styles.row} onScroll={handleScroll}>
        <div className={styles.productsSection}>
          <Form form={form} onFinish={handleFilter} className={styles.searchMain}>
            <Form.Item name="title" style={{ width: '100%' }}>
              <Input placeholder="Поиск по названию" />
            </Form.Item>
            <Button htmlType="submit" type="primary" className={styles.searchBtn}>
              Поиск
            </Button>
            <Button onClick={clearFilters} className={styles.clearBtn}>
              Очистить
            </Button>
          </Form>

          <div className={styles.productRow}>
            {filteredProducts.slice(0, displayLimit).length > 0 ? (
              filteredProducts.slice(0, displayLimit).map((item) => (
                <Item addCart={showNotification} key={item.id} item={item} />
              ))
            ) : (
              <h2 className={styles.title}>{t('product_not_found')}</h2>
            )}
          </div>
        </div>
      </div>
      <Notification
        style={{ transform: isNotificationVisible ? 'translate(0%)' : 'translate(150%)' }}
      >
        <span className="icon">
          <CheckOutlined />
        </span>
        <span>{t('added_basket')}</span>
      </Notification>
    </Skeleton>
  );
};

Index.getLayout = (page) => <App>{page}</App>;

export default Index;
