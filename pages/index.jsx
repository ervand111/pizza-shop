import Banner from "../components/Banner/banner";
import Products from '../components/Products/products';
import Review from "../components/Review/review";
import Insta from "../components/Instagrampage/instagram";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {getImportantProducts, getNewProducts, getProducts, getProductsAll} from "../store/products/actions";
import {t} from "../utils/utils";
import App from "../components/Layouts/app";
import Head from 'next/head';
import {getSlides} from "../store/slides/actions";

function Home() {
    const dispatch = useDispatch();
    const newProducts = useSelector((state) => state.product.newProducts) || [];
    const importantProducts = useSelector((state) => state.product.importantProducts) || [];
    const slides = useSelector(state => state.slide.slides) || {instagrams:[], slides:[]};

    const [instagramData, setInstagramData] = useState([]);

    useEffect(() => {
        dispatch(getProductsAll.request());
        dispatch(getSlides.request());
        dispatch(getNewProducts.request());
        dispatch(getImportantProducts.request());

        fetchInstagramData();
    }, [dispatch]);



    const fetchInstagramData = async () => {
        try {
            const response = await fetch('https://graph.instagram.com/me/media?fields=id,media_type,username,permalink,media_url&access_token=IGQWRQY012d3plVERsTDZAyZATdzSFhVMHFlcnJVWEx2N0lkMmx5dDVHSVp3TzBhYjNnMFFtdTctZA2YtZAHloY21LbjJHTVU4RXRpdHcxTTk3M2dWRHF4TngxcFJSczVWQWV5aGMyWGhZAYURKRTAzTmVucjZAqalBjRzgZD');
            const data = await response.json();
            const lastSixPosts = data.data.slice(0, 5);
            setInstagramData(lastSixPosts);
        } catch (error) {
            console.error('Error fetching Instagram data:', error);
        }
    };



    return (
        <>
            <Head>
                <title>Poel</title>
            </Head>
            <Banner slides={slides?.slides}/>
            <Products products={importantProducts} title={t("bestSuggestion")}/>
            <Review/>
            <Products products={newProducts} title={t("newSuggestion")}/>
            <Insta posts={instagramData}/>
        </>
    );
};


Home.getLayout = function getLayout(page) {
    return (
        <App>
            {page}
        </App>
    )
}

export default Home;
