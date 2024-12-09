import React, { useContext, useEffect, useState } from 'react';
import styles from '../../styles/category.module.css';
import { CheckOutlined, FilterOutlined } from '@ant-design/icons';
import Notification from '../../components/notification/notification';
import { t } from '../../utils/utils';
import Input from '../../components/ui/input/input';
import { useDispatch, useSelector } from 'react-redux';
import { getSubCategories } from 'store/category/actions';
import { filterProducts, getProductsCategories } from 'store/products/actions';
import { Button, Checkbox, Form, Skeleton } from 'antd';
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
  const [isShow, setIsShow] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter();
  const { category } = router.query;
  const { currentRate } = useContext(RateContext);
  const [ids, setIDs] = useState([]);
  const { locale } = router;

  const stylesNotification = {
    transform: isShow ? 'translate(0%)' : 'translate(150%)',
  };

  const [visibleProduct, setVisibleProduct] = useState(4);
  const loadMoreProducts = () => {
    if (visibleProduct < products.length) {
      setVisibleProduct((prev) => prev + 2);
    }
  };

  const handleScroll = (e) => {
    const target = e.target; // Համոզվեք, որ ճիշտ է
    const bottom = target.scrollHeight - target.scrollTop === target.clientHeight;
    if (bottom) {
      loadMoreProducts();
    }
  };


  useEffect(() => {
    setTimeout(() => {
      const { min, max, ids } = router.query;
      if (min !== undefined && max !== undefined && ids !== undefined) {
        form.setFieldsValue({
          start: min || 0,
          end: max || 0,
        });
      }
    }, 1000);
  }, [router.query, form]);

  const addNotification = () => {
    setIsShow(true);
    setTimeout(() => {
      setIsShow(false);
    }, 2000);
  };

  useEffect(() => {
    form.resetFields();
    dispatch(getSubCategories.request({ id: category }));
    dispatch(getProductsCategories.request({ id: category }));
  }, [form, category, dispatch]);

  useEffect(() => {
    const updateIsNav = () => {
      setIsNav(window.innerWidth >= 900);
    };
    window.addEventListener('resize', updateIsNav);
    return () => {
      window.removeEventListener('resize', updateIsNav);
    };
  }, []);

  const setUrl = (start, end, categories, id) => {
    const query = {
      min: start || 0,
      max: end || 1000000,
      ids: categories,
    };
    const updatedQuery = { ...query };
    router.push({
      pathname: '/products/' + id,
      query: updatedQuery,
    });
  };

  const handleSubmit = (values) => {
    const jsonCategories = JSON.stringify(ids);
    const query = {
      min: (values.start * currentRate.value) || 0,
      max: (values.end * currentRate.value) || 10000000,
      categories: jsonCategories,
      id: category,
    };
    dispatch(filterProducts.request(query));
    setUrl(values.start, values.end, jsonCategories, category);
  };

  const clearFilter = () => {
    router.push({
      pathname: '/products/' + category,
    });
    dispatch(getProductsCategories.request({ id: category }));
    form.resetFields();
  };

  const changes = (id, e) => {
    if (e.target.checked) {
      setIDs([...ids, id]);
    } else {
      setIDs(ids.filter((x) => x !== id));
    }
  };

  const openNav = () => {
    setIsNav(true);
  };

  const Nav = () => (

    <div className={`${styles.nav} ${isNav ? styles.active : ''}`}>
      <div className={styles.headerNav}>
        <span onClick={() => setIsNav(false)}>
          <CloseIcon />
        </span>
      </div>
      <Form onFinish={handleSubmit} form={form}>
        <ul className={styles.filterList}>
          {categories.map((item) => {
            return (
              <li key={item.id}>
                <span>{item.name}</span>
                <span>
                  <Form.Item name={['checkboxs', item.id]} valuePropName="checked">
                    <Checkbox onChange={(e) => changes(item.id, e)} />
                  </Form.Item>
                </span>
              </li>
            );
          })}
        </ul>
        <div className={styles.filterList}>
          <h3>{t('price')}</h3>
          <div className={styles.priceList}>
            <Form.Item name="start">
              <Input placeholder="From" name="startPrice" type="number" />
            </Form.Item>
            <Form.Item name="end">
              <Input placeholder="To" min={0} name="endPrice" type="number" />
            </Form.Item>
          </div>
        </div>
        <div className={styles.lastSection}>
          <Button htmlType="submit">{t('filter')}</Button>
          <Button onClick={clearFilter}>{t('clear')}</Button>
        </div>
      </Form>
    </div>
  );

  return (

    <Skeleton loading={isFetching} active>
      <div className={styles.mobileContainer}>
        <span className={styles.filterButton} onClick={openNav}>
          <FilterOutlined />
        </span>
      </div>
      <div className={styles.row} onScroll={handleScroll}>
        <Nav />
        <div className={styles.productsSection}>
          <div className={styles.productRow}>
            {products.length > 0
              ? products.reverse().map((item) => (
                <Item addCart={addNotification} key={item.id} item={item} />
              ))
              : (
                <h2 className={styles.title}>{t('product_not_found')}</h2>
              )}
          </div>
        </div>
      </div>
      <Notification style={stylesNotification}>
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

export class handleScroll {
}