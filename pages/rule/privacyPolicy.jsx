import React from 'react';
import App from '../../components/Layouts/app';
import PolicyIndex from '../../components/Rule/policyIndex';

const PrivacyPolicy = () => {
  return (
    <div>
      <PolicyIndex/>
    </div>
  );
};

PrivacyPolicy.getLayout = function getLayout(page) {
  return (
    <App>
      {page}
    </App>
  );
};

export default PrivacyPolicy;
