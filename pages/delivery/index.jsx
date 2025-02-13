import React from 'react';
import App from "../../components/Layouts/app";
import Delivery from "../../components/deliveries/delivery";

const Index = () => {
  return (
    <>
      <Delivery/>
    </>
  );
};

Index.getLayout = function getLayout(page) {
  return (
    <App>
      {page}
    </App>
  )
}

export default Index;

