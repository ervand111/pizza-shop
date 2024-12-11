import React, { useEffect, useState } from 'react';
import Details from "../../components/Products/Details/details";
import Products from "../../components/Products/products";
import { useDispatch, useSelector } from "react-redux";
import App from "../../components/Layouts/app";
import { getImportantProducts, getProductsAll } from "../../store/products/actions";

const Index = () => {
    const [category, setCategory] = useState('');
    const products = useSelector((state) => state?.product?.importantProducts);
    const dispatch = useDispatch();

    useEffect(() => {
        if (category) {
            dispatch(getProductsAll.request(category));
        } else {
            dispatch(getImportantProducts.request());
        }
    }, [dispatch, category]);

    return (
      <div>
          <Details />
          <div>
              {/*<Products products={products} />*/}
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
