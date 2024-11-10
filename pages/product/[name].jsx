import React, { useEffect, useState } from 'react';
import Details from "../../components/Products/Details/details";
import Products from "../../components/Products/products";
import { useDispatch, useSelector } from "react-redux";
import App from "../../components/Layouts/app";
import styles from "../../styles/products.module.css";
import { getImportantProducts, getProductsAll } from "../../store/products/actions";

const Index = () => {
    const [category, setCategory] = useState(''); // Store the selected category
    const products = useSelector((state) => state?.product?.importantProducts);
    const dispatch = useDispatch();

    // Fetch products based on category or all important products
    useEffect(() => {
        if (category) {
            dispatch(getProductsAll.request(category)); // Fetch products for the selected category
        } else {
            dispatch(getImportantProducts.request()); // Fetch all important products
        }
    }, [dispatch, category]);

    return (
      <div>
          <Details />
          <div className={styles.detailsMargin}>
              <hr />
              <Products products={products} />
          </div>
      </div>
    );
};

// Custom layout for this page
Index.getLayout = function getLayout(page) {
    return (
      <App>
          {page}
      </App>
    );
};

export default Index;
