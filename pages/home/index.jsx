import React, {useEffect, useState} from 'react';
import Banner from "../../components/Banner/banner";
import Products from '../../components/Products/products';
import Review from "../../components/Review/review";
import App from "../../components/Layouts/app";
import {t} from "../../utils/utils";
import {useDispatch, useSelector} from "react-redux";
import {getImportantProducts, getNewProducts, getProductsAll} from "store/products/actions";
import {getSlides} from "../../store/slides/actions";

const Index = () => {
    const dispatch = useDispatch();
    const newProducts = useSelector((state) => state.product.newProducts) || [];
    const importantProducts = useSelector((state) => state.product.importantProducts) || [];
    const slides = useSelector(state => state.slide.slides) || {instagrams: [], slides: []};
    const [instagramData, setInstagramData] = useState([]);

    useEffect(() => {
        dispatch(getProductsAll.request());
        dispatch(getSlides.request());
        dispatch(getNewProducts.request());
        dispatch(getImportantProducts.request());

    }, [dispatch]);

    return (
        <>
            <Banner slides={slides?.slides}/>
            <Products products={importantProducts}/>
            <Products products={newProducts} title={t("newSuggestion")}/>
            <Review />
        </>
    );
};

//
Index.getLayout = function getLayout(page) {
    return (
        <App>
            {page}
        </App>
    )
}

export default Index;

