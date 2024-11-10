import Banner from "../components/Banner/banner";
import Products from '../components/Products/products';
import Review from "../components/Review/review";
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
  const slides = useSelector(state => state.slide.slides) || {instagrams: [], slides: []};


  useEffect(() => {
    dispatch(getProductsAll.request());
    dispatch(getSlides.request());
    dispatch(getNewProducts.request());
    dispatch(getImportantProducts.request());
  }, [dispatch]);


  return (
    <>
      <Head>
        <title>Алекс Пицца</title>
      </Head>
      <Banner slides={slides?.slides}/>
      <Products products={newProducts} title={t("newSuggestion") || "Default Title"}/>
      <Review/>
      <Products products={importantProducts} title={t("bestSuggestion") || "Default Title"}/>

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
