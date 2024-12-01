import React from 'react';
import App from '../../components/Layouts/app';
import OfferIndex from '../../components/rule/offerIndex';

const PublicOffer = () => {
  return (
    <div>
      <OfferIndex/>
    </div>
  );
};
PublicOffer.getLayout = function getLayout(page) {
  return (
    <App>
      {page}
    </App>
  )
}

export default PublicOffer;